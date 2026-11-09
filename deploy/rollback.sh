#!/usr/bin/env bash
# Save the running release before deployment, or return to that pinned image.
set -euo pipefail
umask 077
cd "${SUB2API_DEPLOY_DIR:-/sub2api}"
for tool in docker python3 flock gzip; do
  command -v "$tool" >/dev/null || { printf 'Missing command: %s\n' "$tool" >&2; exit 1; }
done
exec 9>.source-release.lock
flock -n 9 || { echo 'Another release operation is running.' >&2; exit 1; }
python3 - "${1:---rollback}" "$PWD" <<'PY'
import datetime
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time

action, directory = sys.argv[1:]
root = Path(directory)
compose = root / "docker-compose.yml"
releases = root / "releases"
pointer = releases / "rollback.json"


def command(*args):
    return subprocess.check_output(args, text=True).strip()


def dc(*args):
    return command("docker", "compose", "-f", str(compose), *args)


def image_line(text):
    inside = False
    found = []
    for index, line in enumerate(text.splitlines(keepends=True)):
        if re.match(r"^  sub2api:\s*(?:#.*)?$", line):
            inside = True
        elif line.strip() and not line.lstrip().startswith("#") and re.match(r"^\S|^  \S", line):
            inside = False
        if inside and re.match(r"^    image:\s*\S", line):
            found.append(index)
    if len(found) != 1:
        raise RuntimeError("Expected exactly one image line in services.sub2api.")
    return found[0]


def normalized(text):
    lines = text.splitlines(keepends=True)
    lines[image_line(text)] = "    image: <release-image>\n"
    return "".join(lines)


def atomic_write(path, text, mode=0o600):
    temporary = path.with_name(path.name + ".tmp")
    with temporary.open("w", encoding="utf-8", newline="") as output:
        os.chmod(temporary, mode)
        output.write(text)
        output.flush()
        os.fsync(output.fileno())
    os.replace(temporary, path)


def container(service):
    ids = dc("ps", "--all", "--quiet", service).splitlines()
    if len(ids) != 1:
        raise RuntimeError("Expected one container for " + service)
    return ids[0]


def healthy(container_id):
    state = json.loads(command("docker", "inspect", "--format", "{{json .State}}", container_id))
    return state.get("Running") is True and state.get("Health", {}).get("Status") == "healthy"


def validate_saved():
    state = json.loads(pointer.read_text(encoding="utf-8"))
    image_id = command("docker", "image", "inspect", "--format", "{{.Id}}", state["image_tag"])
    if image_id != state["image_id"]:
        raise RuntimeError("Saved image is missing or its tag has changed.")
    saved = Path(state["compose_snapshot"]).read_text(encoding="utf-8")
    current = compose.read_text(encoding="utf-8")
    if normalized(saved) != normalized(current):
        raise RuntimeError("Compose changed beyond the application image; review before rollback.")
    dc("config", "--quiet")
    return state, current


try:
    if not compose.is_file() or compose.is_symlink():
        raise RuntimeError("Expected a regular docker-compose.yml in the deployment directory.")
    if action == "--record":
        backup = Path(os.environ.get("SUB2API_DB_BACKUP", ""))
        if not backup.is_file() or backup.stat().st_size == 0:
            raise RuntimeError("Set SUB2API_DB_BACKUP to a verified pre-deployment .sql.gz backup.")
        command("gzip", "-t", str(backup))
        dc("config", "--quiet")
        for service in ("sub2api", "postgres", "redis"):
            if not healthy(container(service)):
                raise RuntimeError(service + " is not healthy; stop deployment.")
        current = compose.read_text(encoding="utf-8")
        image_line(current)
        cid = container("sub2api")
        image_id = command("docker", "inspect", "--format", "{{.Image}}", cid)
        original_image = command("docker", "inspect", "--format", "{{.Config.Image}}", cid)
        stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        release = releases / (stamp + "-" + str(os.getpid()))
        release.mkdir(parents=True, mode=0o700)
        image_tag = "sub2api:rollback-" + release.name.lower()
        command("docker", "image", "tag", image_id, image_tag)
        snapshot = release / "docker-compose.yml"
        atomic_write(snapshot, current)
        state = dict(
            recorded_at=stamp, image_id=image_id, image_tag=image_tag,
            original_image=original_image, compose_snapshot=str(snapshot),
            database_backup=str(backup.resolve()),
        )
        metadata = json.dumps(state, indent=2) + "\n"
        atomic_write(release / "rollback.json", metadata)
        atomic_write(pointer, metadata)
        print("Previous image pinned:", image_tag)
        print("Rollback metadata:", pointer)
        print("Database backup:", state["database_backup"])
    elif action in ("--check", "--rollback"):
        state, current = validate_saved()
        print("Previous image:", state["image_tag"])
        print("Database backup (not automatically restored):", state["database_backup"])
        if action == "--rollback":
            lines = current.splitlines(keepends=True)
            lines[image_line(current)] = "    image: " + state["image_tag"] + "\n"
            replacement = "".join(lines)
            atomic_write(compose, replacement, compose.stat().st_mode & 0o777)
            try:
                dc("config", "--quiet")
            except subprocess.CalledProcessError:
                atomic_write(compose, current, compose.stat().st_mode & 0o777)
                raise
            dc("up", "-d", "--no-deps", "--no-build", "--pull", "never", "sub2api")
            deadline = time.monotonic() + 180
            while time.monotonic() < deadline:
                cid = container("sub2api")
                if healthy(cid) and command("docker", "inspect", "--format", "{{.Image}}", cid) == state["image_id"]:
                    print("Rollback complete: application is healthy on the saved image.")
                    break
                time.sleep(3)
            else:
                raise RuntimeError("Rollback health check timed out. Inspect application logs; database was not restored.")
    else:
        raise RuntimeError("Usage: rollback.sh [--record|--check|--rollback]")
except (OSError, ValueError, RuntimeError, subprocess.CalledProcessError) as error:
    print("Rollback operation failed:", error, file=sys.stderr)
    sys.exit(1)
PY
