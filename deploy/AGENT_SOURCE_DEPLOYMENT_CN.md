# Agent 本地源码部署指南

本文说明如何把 `fengzengfly/CP-API` 仓库部署到 HexHub 中名为 `us-8c8g` 的 VPS。部署目录为 `/sub2api`。源码由 VPS 使用 SSH key 从 GitHub clone/pull，再在 VPS 本地构建 Docker 镜像；不使用 SCP，也不推送 Docker Hub。

项目根目录的 `AGENTS.md` 提供本指南的入口。HexHub MCP 是本机服务；
从本机 Codex MCP 配置读取服务地址，不要猜测端口、资产别名或改走本地 SSH。
若会话未自动暴露 HexHub 工具，可通过已配置的本机 MCP HTTP 端点执行
`initialize`、`notifications/initialized`、`tools/list` 和 `tools/call`；
后续请求保持同一 `Mcp-Session-Id`，先用 `list_assets` 获取目标服务器别名。

## 部署约束

- 只有用户明确要求部署时才执行线上变更。
- 只部署已提交并推送到 `fengzengfly/CP-API` 的代码。未提交改动不会随 Git 拉取部署；需要发布的本地修改必须先按用户授权提交并推送。不要擅自 push、force-push、切换本地 remote 或提交用户改动。
- VPS 只应从 GitHub 拉取源码。不要用 SCP、rsync 或其他文件传输方式替代 Git；不要把 `.env`、本地配置、插件私钥或数据库数据放进仓库。`plugins/` 可能含签名私钥。
- 不覆盖服务器上的 `docker-compose.yml`，也不改 `.env`、`data/`、`postgres_data/` 或 `redis_data/`。只精确修改应用服务的 `image` 字段。
- 不运行 `docker compose down`，不重建 PostgreSQL/Redis，不运行 `docker system prune`。
- 如果 Postgres、Redis 或当前应用不健康，磁盘不足，或无法完成数据库备份，停止部署并报告；不要把数据库修复和应用发布混在一起。
- 该项目数据库迁移是前向迁移。回退应用镜像不一定能回退数据库 schema；不要自动恢复数据库备份。

## 1. 确认代码已推送

在本地项目根目录检查分支、远程和工作区：

```powershell
git status --short --branch
git remote -v
git log -1 --oneline
Test-Path Dockerfile
```

确认 `Test-Path` 返回 `True`，并确认需要部署的提交已推送到 `git@github.com:fengzengfly/CP-API.git`。Git 部署只包含已提交并推送的内容；工作区若有未提交改动，先停止并按用户授权处理，不要自行提交、丢弃或绕过 Git 打包上传。

本地远程约定：`origin` 是私有 `CP-API` 日常提交仓库，`fork` 是 `fengzengfly/sub2api`，`upstream` 是官方 `Wei-Shaw/sub2api`。如尚未配置，先核对地址后执行一次：

```bash
git remote rename origin fork
git remote add origin git@github.com:fengzengfly/CP-API.git
git remote add upstream git@github.com:Wei-Shaw/sub2api.git
git push -u origin main
```

同步新功能时先 fetch/审阅官方上游，再合并到本地并按用户要求推送私有仓库；不要直接把上游变化部署到 VPS。

## 2. VPS 通过 SSH 拉取源码

通过 HexHub `list_assets` 按名称查找 `us-8c8g`，使用当前会话返回的 `asset_ref`，不要写死或复用过期值。目标服务器已配置 GitHub SSH key。使用 HexHub `shell` 验证仓库可读并确定默认分支：

如果出现 `Host key verification failed`，先检查 `/root/.ssh/known_hosts`。只在将 GitHub 官方 SSH host-key 指纹与实时取得的 key 指纹核对一致后，才把 key 加入 `known_hosts`；参考 [GitHub 官方 SSH 指纹文档](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)。截至 2026-11-02，GitHub ED25519 指纹为 `SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU`，以后仍须重新核对官方文档。不要设置 `StrictHostKeyChecking=no`，也不要未经核验就信任 `ssh-keyscan` 输出。

```bash
set -euo pipefail
repo=git@github.com:fengzengfly/CP-API.git
branch=$(git ls-remote --symref "$repo" HEAD | awk '$1 == "ref:" { sub("refs/heads/", "", $2); print $2 }')
test -n "$branch" || { echo 'repository is empty or default branch is missing' >&2; exit 1; }
src=/sub2api/source

if [ ! -e "$src" ]; then
  git clone --depth 1 --branch "$branch" "$repo" "$src"
elif [ -d "$src/.git" ]; then
  test "$(git -C "$src" remote get-url origin)" = "$repo"
  test -z "$(git -C "$src" status --porcelain)" || { echo 'source checkout is dirty; stop' >&2; exit 1; }
  git -C "$src" pull --ff-only origin "$branch"
else
  echo "$src exists but is not the expected Git checkout; stop and inspect it" >&2
  exit 1
fi

commit=$(git -C "$src" rev-parse --short HEAD)
version=$(tr -d '\r\n' < "$src/backend/cmd/server/VERSION")
tag="local-$commit"
printf 'branch=%s commit=%s version=%s tag=%s\n' "$branch" "$commit" "$version" "$tag"
```

若 SSH 权限失败、仓库为空、默认分支缺失、checkout remote 不匹配或工作区不干净，停止并报告；不要退回 SCP/rsync，也不要覆盖现有目录。记录本次输出的 `branch`、`commit`、`version` 和 `tag`，后续命令沿用这些值。

## 3. VPS 预检查与备份

使用 HexHub `shell` 在 `us-8c8g` 上检查当前部署：

```bash
cd /sub2api
docker compose ps -a
docker inspect sub2api --format '{{.State.Status}}/{{if .State.Health}}{{.State.Health.Status}}{{end}}'
docker inspect sub2api-postgres --format '{{.State.Status}}/{{if .State.Health}}{{.State.Health.Status}}{{end}}'
docker inspect sub2api-redis --format '{{.State.Status}}/{{if .State.Health}}{{.State.Health.Status}}{{end}}'
df -h /sub2api
```

应用、Postgres、Redis 必须处于 healthy，且磁盘空间足够。记录 Compose 中应用原来的 image 值，以便回滚。部署会触发应用启动和数据库迁移，先导出数据库备份并检查压缩包：

```bash
set -euo pipefail
commit=$(git -C /sub2api/source rev-parse --short HEAD)
tag="local-$commit"
umask 077
mkdir -p /sub2api/backups
docker exec sub2api-postgres sh -lc 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > "/sub2api/backups/sub2api-$tag.sql.gz"
gzip -t "/sub2api/backups/sub2api-$tag.sql.gz"
```

备份失败或健康检查不通过时停止，不要继续切镜像。

## 4. 构建镜像

从已 clone/pull 的干净源码构建：

```bash
set -euo pipefail
src=/sub2api/source
commit=$(git -C "$src" rev-parse --short HEAD)
tag="local-$commit"
version=$(tr -d '\r\n' < "$src/backend/cmd/server/VERSION")
docker build --pull \
  --build-arg VERSION="$version" \
  --build-arg COMMIT="$commit" \
  -t "sub2api:$tag" "$src"
```

构建成功后确认 `docker image inspect "sub2api:$tag"` 可读。首次构建可能耗时较长；如果 HexHub 调用等待超时，先用 `pgrep -af 'docker build'` 和 `docker image ls` 检查原构建是否仍在运行。不要重复启动构建；等待原构建结束并确认 tag 是否生成。

## 5. 精确切换应用镜像

在切换前，保存当前健康容器的真实镜像 ID 和 Compose 快照，并固定一个独立回滚标签：

```bash
set -euo pipefail
src=/sub2api/source
commit=$(git -C "$src" rev-parse --short HEAD)
SUB2API_DB_BACKUP="/sub2api/backups/sub2api-local-$commit.sql.gz" \
  bash "$src/deploy/rollback.sh" --record
bash "$src/deploy/rollback.sh" --check
```

脚本依赖 Bash、Python 3、flock、gzip 和 Docker Compose，默认操作 `/sub2api`。
`--record` 会检查应用、PostgreSQL 和 Redis 健康状态以及数据库备份压缩包，
将元数据写到 `/sub2api/releases/rollback.json`，同时保留每次记录的历史目录。
只在**新镜像切换之前**执行一次 `--record`；上线后再次执行会将回滚点覆盖为新版本。
不要删除记录中的镜像标签或历史目录。

先用 HexHub `read` 读取 `/sub2api/docker-compose.yml`，确认应用服务当前 image 行；用 HexHub `edit` 只把该行替换为：

```yaml
image: sub2api:<tag>
```

不要把仓库里的 `deploy/docker-compose.yml` 复制到服务器；它可能覆盖线上端口、环境变量、卷和其他运维配置。修改后先验证配置，再只更新应用服务：

```bash
cd /sub2api
docker compose config -q
docker compose up -d --no-deps sub2api
```

## 6. 验收与回滚

检查 `docker compose ps`：应用、Postgres、Redis 均应 healthy。确认 `docker inspect sub2api --format '{{.Config.Image}}'` 返回刚构建的 tag，并从服务器本机对 `docker compose ps` 显示的映射端口请求 `/health`，预期 HTTP 200。若应用启动失败，查看 `docker compose logs --tail 100 sub2api`，注意不要把日志中的密码、令牌或自动生成的管理员凭据复制到对话中。

若应用镜像自身有问题，先检查回滚条件，再执行回滚：

```bash
bash /sub2api/source/deploy/rollback.sh --check
bash /sub2api/source/deploy/rollback.sh
```

脚本验证已保存标签对应的镜像 ID，拒绝覆盖 image 之外发生了变化的 Compose 配置，
只替换 `services.sub2api.image`，使用 `--no-deps --no-build --pull never` 重建应用，
并等待最多 180 秒确认原镜像恢复且健康。不会重新构建旧源码，不会重建数据库或 Redis，
不会自动恢复数据库备份；回滚前后的 Compose 快照和数据库备份均留存。
`--check` 不更改 Compose 或容器，但会创建操作锁文件。

回滚后再次检查应用健康与 `/health`。若问题与数据库迁移/schema 有关，
停止自动操作并报告；数据库恢复需要依据备份另行评估和授权。

保留本次源码目录、Git commit、镜像 tag 和数据库备份，作为发布记录及回滚依据。部署完成后向用户报告源码分支和 commit、镜像 tag、健康检查结果和备份位置。
