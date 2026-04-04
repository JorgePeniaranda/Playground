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

Root command orchestration lives in:

- [../scripts/run-workspace-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/run-workspace-command.mjs)
- [../scripts/build-packages.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/build-packages.mjs)

The interactive workspace runner is intended to:

- prompt for a single workspace when no workspace is provided
- allow bypass with `--workspace`
- support `--help`
- support `--all` where the command allows it
- discover app workspaces from `apps/*/package.json` instead of relying on a hardcoded list
  using repo-specific `playgroundConfig` metadata

`build-packages.mjs` is separate from the interactive runner. It discovers workspaces under
`packages/` and builds them without a prompt.

Apps can reference shared packages through TypeScript project references for local editor/build
awareness. Package-wide build flows are implemented in repo scripts so they do not depend on a
manually maintained package list in `package.json`.

## Tooling Ownership

- ESLint assembly entrypoint:
  [../eslint.config.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/eslint.config.mjs)
- ESLint modules:
  [../configs/eslint](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint)
- Prettier config:
  [../.prettierrc.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierrc.mjs)
- Shared TS base config:
  [../tsconfig.base.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/tsconfig.base.json)
- Shared Vitest config factory:
  [../configs/vitest/createVitestConfig.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/vitest/createVitestConfig.mjs)

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
