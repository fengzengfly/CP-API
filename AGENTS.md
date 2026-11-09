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
- Before switching images, verify a PostgreSQL backup and record the running
  release using `deploy/rollback.sh --record`. Keep the pinned previous image.
- Use `deploy/rollback.sh --check` to verify rollback readiness. Running
  `bash /sub2api/source/deploy/rollback.sh` rolls back only the application.
  Database migrations are forward-only; never automatically restore a database
  backup or discard new production data.
- Do not stop/recreate PostgreSQL or Redis, run Compose down, or prune images
  during an application release.
