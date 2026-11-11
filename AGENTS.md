# Project Operations

## Production Deployment

- The production target is the HexHub SSH asset named `us-8c8g`. Discover its
  current `asset_ref` using the configured local HexHub MCP service.
- Follow [the source deployment guide](deploy/AGENT_SOURCE_DEPLOYMENT_CN.md).
  The deployment root is `/sub2api`; the Git checkout is `/sub2api/source`.
- Publish the requested frontend customizations together with the upstream merge
  to `origin` (`fengzengfly/CP-API`), then use `git pull --ff-only origin main`
  on the server and build the Docker image there.
- Inspect the live Compose configuration before changing it. Preserve the live
  environment, ports and data volumes. Update only the application image.
- For every deployment, capture the production checkout commit before pulling,
  then compare it with the pulled commit for changes under
  `backend/migrations/*.sql`. Review every changed migration before proceeding.
- Before building/switching the application image, create and verify a fresh
  PostgreSQL backup, even when no migration files changed. After the new backup
  passes validation, retain only the two newest deployment database backups.
  Then record the running release using `deploy/rollback.sh --record`. Keep the
  pinned previous image.
- SQL migrations are embedded in the application and run during normal startup
  through the migration runner, which tracks filenames and checksums in
  `schema_migrations`. Do not execute migration SQL manually. If startup or
  migration fails, stop rollout, inspect redacted logs, and use the application
  rollback procedure only after checking readiness.
- Use `deploy/rollback.sh --check` to verify rollback readiness. Running
  `bash /sub2api/source/deploy/rollback.sh` rolls back only the application.
  Database migrations are forward-only; never automatically restore a database
  backup or discard new production data.
- Do not stop/recreate PostgreSQL or Redis, run Compose down, or prune images
  during an application release.
