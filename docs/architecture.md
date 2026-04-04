# Architecture

This repository is a small monorepo for experiments, comparisons and reusable setup across
multiple frontend and TypeScript workspaces.

## Layout

Primary directories:

- [../apps/angular-playground](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground)
- [../apps/react-playground](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground)
- [../apps/ts-playground](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground)
- [../packages/utils](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils)
- [../configs/eslint](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint)
- [../configs/vitest](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/vitest)
- [../scripts](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts)
- [../docs](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs)
- [../.vscode](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode)

## Monorepo Model

- The root [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
  defines workspaces under `apps/*` and `packages/*`.
- Application workspaces own their runtime, build and test scripts.
- Shared packages provide reusable code for apps and other workspaces.
- Cross-workspace orchestration lives in repo scripts instead of duplicated root aliases.
- Shared linting, formatting and base TypeScript settings are centralized at the root.

## Workspace Relationships

- `apps/angular-playground` is an Angular application.
- `apps/react-playground` is a React + Vite application.
- `apps/ts-playground` is a Node-oriented TypeScript application.
- `packages/utils` is a reusable TypeScript package consumed by the apps.

Applications that depend on shared packages use TypeScript project references for local editor and
build awareness. The actual dependency shape should always be confirmed in the workspace
`tsconfig.json` and `package.json` files.

## Command Architecture

There are two command layers:

1. Workspace-local scripts defined in each workspace `package.json`
2. Root commands that dispatch to one or many workspaces

Root command orchestration lives in:

- [../scripts/run-workspace-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/run-workspace-command.mjs)
- [../scripts/build-packages.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/build-packages.mjs)

The shared runner is responsible for:

- prompting for a workspace when no target is provided
- supporting `--workspace`, positional workspace ids and `--all`
- exposing `--help`
- discovering workspaces from `apps/*/package.json` and `packages/*/package.json`
- using `playgroundConfig.id` and `playgroundConfig.label` when present

Examples:

- `npm run dev -- react`
- `npm run build -- ts`
- `npm run check -- utils`
- `npm run test -- --all`

`build-packages.mjs` stays separate because package compilation is a repo-level concern that may
need to run before app workflows.

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
- Node version pin:
  [../.nvmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.nvmrc)
- VS Code debug config:
  [../.vscode/launch.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/launch.json)
- VS Code background tasks:
  [../.vscode/tasks.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/tasks.json)
- VS Code recommended extensions:
  [../.vscode/extensions.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/extensions.json)
- VS Code MCP servers:
  [../.vscode/mcp.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/mcp.json)

## Documentation Rule

Keep architectural explanations here, but avoid duplicating volatile values already owned by config
files.

Examples:

- For exact dependency versions, read the relevant `package.json`.
- For Node version, read `.nvmrc`.
- For supported root commands, read the root `package.json`.
