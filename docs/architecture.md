# Architecture

This repo is a small monorepo used as a playground/template for code experiments.

## Layout

Primary directories:

- [../apps/react-playground](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground)
- [../apps/ts-playground](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground)
- [../packages/utils](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils)
- [../configs/eslint](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint)
- [../scripts](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts)
- [../docs](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs)
- [../.vscode](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode)

## Monorepo Shape

- Root `package.json` manages workspaces under `apps/*` and `packages/*`.
- Each app owns its runtime/build/test scripts.
- Shared packages own reusable utilities consumed by apps.
- Root scripts are used for orchestration and shared workflows.
- Shared linting and formatting live at the repo root.

## Command Model

There are two layers of commands:

1. App-local commands defined in each workspace `package.json`
2. Root commands that orchestrate workspaces

Root interactive commands are implemented in:

- [../scripts/run-workspace-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/run-workspace-command.mjs)

That runner is intended to:

- prompt for `react` or `ts` when no workspace is provided
- allow bypass with `--workspace`
- support `--help`
- support `--all`

Shared packages are exposed through explicit root aliases such as `build:utils` and `check:utils`.

## Tooling Ownership

- ESLint assembly entrypoint:
  [../eslint.config.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/eslint.config.mjs)
- ESLint modules:
  [../configs/eslint](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint)
- Prettier config:
  [../.prettierrc.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierrc.mjs)
- Shared TS base config:
  [../tsconfig.base.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/tsconfig.base.json)

## Editor And Debugging

- Editor defaults:
  [../.editorconfig](/C:/Users/USUARIO/Documents/Proyectos/Playground/.editorconfig)
- Node version pin: [../.nvmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.nvmrc)
- VS Code debug config:
  [../.vscode/launch.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/launch.json)
- VS Code background tasks:
  [../.vscode/tasks.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/tasks.json)

## Documentation Rule

Keep architectural explanations here, but do not duplicate volatile values if a config file already
owns them.

Examples:

- For exact dependency versions, read the relevant `package.json`.
- For Node version, read `.nvmrc`.
- For supported root commands, read the root `package.json`.
