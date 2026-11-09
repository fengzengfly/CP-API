import gzip
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "rollback.sh"
COMPOSE = """services:
  sub2api:
    image: sub2api:old
    ports:
      - "15080:8080"
  postgres:
    image: postgres:18-alpine
  redis:
    image: redis:8-alpine
"""
FAKE_DOCKER = r"""#!/usr/bin/env python3
import json, os, pathlib, re, sys
root = pathlib.Path(os.environ["SUB2API_DEPLOY_DIR"])
state_file = root / "docker-state.json"
state = json.loads(state_file.read_text())
args = sys.argv[1:]
with (root / "calls.jsonl").open("a") as log:
    log.write(json.dumps(args) + "\n")
if args[0] == "compose":
    command = args[3:]
    if command[0] == "config":
        pass
    elif command[0] == "ps":
        print(command[-1] + "-cid")
    elif command[0] == "up":
        assert command == ["up", "-d", "--no-deps", "--no-build", "--pull", "never", "sub2api"]
        image = re.search(r"^    image: (.+)$", (root / "docker-compose.yml").read_text(), re.M)[1]
        state["running_image"] = state["images"][image]
        state_file.write_text(json.dumps(state))
    else:
        sys.exit(2)
elif args[:2] == ["image", "tag"]:
    state["images"][args[3]] = args[2]
    state_file.write_text(json.dumps(state))
elif args[:2] == ["image", "inspect"]:
    print(state["images"][args[-1]])
elif args[0] == "inspect":
    field = args[2]
    if field == "{{json .State}}":
        print(json.dumps({"Running": True, "Health": {"Status": "healthy" if state["healthy"] else "unhealthy"}}))
    elif field == "{{.Image}}":
        print(state["running_image"])
    elif field == "{{.Config.Image}}":
        print("sub2api:old")
    else:
        sys.exit(2)
else:
    sys.exit(2)
"""


class RollbackTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="sub2api rollback ")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.compose = self.root / "docker-compose.yml"
        self.compose.write_text(COMPOSE)
        binary = self.root / "bin"
        binary.mkdir()
        docker = binary / "docker"
        docker.write_text(FAKE_DOCKER)
        docker.chmod(0o755)
        self.state_file = self.root / "docker-state.json"
        self.state_file.write_text(json.dumps({
            "running_image": "sha256:old",
            "images": {"sub2api:old": "sha256:old", "sub2api:new": "sha256:new"},
            "healthy": True,
        }))
        self.backup = self.root / "backup.sql.gz"
        with gzip.open(self.backup, "wb") as output:
            output.write(b"-- test database backup\n")
        self.env = {
            **os.environ,
            "PATH": str(binary) + os.pathsep + os.environ["PATH"],
            "SUB2API_DEPLOY_DIR": str(self.root),
            "SUB2API_DB_BACKUP": str(self.backup),
        }

    def run_script(self, *args, success=True):
        result = subprocess.run(
            ["bash", str(SCRIPT), *args], env=self.env,
            capture_output=True, text=True,
        )
        self.assertEqual(result.returncode == 0, success, result.stdout + result.stderr)
        return result

    def record(self):
        self.run_script("--record")
        return json.loads((self.root / "releases/rollback.json").read_text())

    def test_record_check_and_idempotent_rollback(self):
        saved = self.record()
        self.assertEqual(saved["image_id"], "sha256:old")
        self.assertEqual(Path(saved["compose_snapshot"]).read_text(), COMPOSE)
        self.assertEqual((self.root / "releases/rollback.json").stat().st_mode & 0o777, 0o600)
        self.compose.write_text(COMPOSE.replace("sub2api:old", "sub2api:new"))
        self.run_script("--check")
        self.assertIn("sub2api:new", self.compose.read_text())
        self.run_script()
        expected = COMPOSE.replace("sub2api:old", saved["image_tag"])
        self.assertEqual(self.compose.read_text(), expected)
        self.run_script("--rollback")
        self.assertEqual(self.compose.read_text(), expected)
        state = json.loads(self.state_file.read_text())
        self.assertEqual(state["running_image"], "sha256:old")
        self.assertEqual(state["images"][saved["image_tag"]], "sha256:old")

    def test_missing_record_does_not_change_configuration(self):
        self.run_script(success=False)
        self.assertEqual(self.compose.read_text(), COMPOSE)

    def test_record_requires_valid_database_backup(self):
        self.backup.write_bytes(b"not gzip")
        self.run_script("--record", success=False)
        self.assertFalse((self.root / "releases/rollback.json").exists())

    def test_record_rejects_unhealthy_service(self):
        state = json.loads(self.state_file.read_text())
        state["healthy"] = False
        self.state_file.write_text(json.dumps(state))
        self.run_script("--record", success=False)
        self.assertFalse((self.root / "releases/rollback.json").exists())

    def test_compose_drift_is_not_overwritten(self):
        self.record()
        changed = COMPOSE.replace("15080", "16080")
        self.compose.write_text(changed)
        self.run_script(success=False)
        self.assertEqual(self.compose.read_text(), changed)

    def test_retargeted_image_is_rejected(self):
        saved = self.record()
        state = json.loads(self.state_file.read_text())
        state["images"][saved["image_tag"]] = "sha256:new"
        self.state_file.write_text(json.dumps(state))
        self.run_script("--check", success=False)
        self.assertEqual(self.compose.read_text(), COMPOSE)


if __name__ == "__main__":
    unittest.main()
