# AGENTS

This file is a map, not a source of truth.

If you need project details, read the relevant file instead of trusting this document.

## Start Here

- Repo overview and technical layout:
  [docs/architecture.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/architecture.md)
- Tooling and stack: [docs/stack.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/stack.md)

## Source Of Truth

- Root scripts and workspace orchestration:
  [package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- Workspace manifests:
  [apps/react-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/package.json)
  [apps/ts-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/package.json)
- Shared ESLint config:
  [configs/eslint/index.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint/index.mjs)
- Shared Prettier config:
  [.prettierrc.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierrc.mjs)
- Prettier ignore rules:
  [.prettierignore](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierignore)
- Root workspace command runner:
  [cli/features/workspaces/run-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/cli/features/workspaces/run-command.mjs)
- Node version expectation: [.nvmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.nvmrc)
- Editor defaults: [.editorconfig](/C:/Users/USUARIO/Documents/Proyectos/Playground/.editorconfig)
- VS Code launch/debug setup:
  [.vscode/launch.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/launch.json)
  [.vscode/tasks.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/tasks.json)

## Working Rules

- If a task touches one app, inspect that app's `package.json` and `tsconfig.json` first.
- If a task touches shared tooling, inspect the root config files first.
- After changing scripts or tooling, prefer validating through the root commands in `package.json`.
- If behavior and docs disagree, trust the config and update the docs.
