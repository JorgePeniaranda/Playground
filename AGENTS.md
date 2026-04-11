# AGENTS

This file is a map, not a source of truth.

If you need project details, read the relevant file instead of trusting this document.

## Start Here

- Repo overview and technical layout:
  [docs/architecture.md](docs/architecture.md)
- Tooling and stack: [docs/stack.md](docs/stack.md)

## Source Of Truth

- Root scripts and workspace orchestration:
  [package.json](package.json)
- Workspace manifests:
  [apps/react-playground/package.json](apps/react-playground/package.json)
  [apps/ts-playground/package.json](apps/ts-playground/package.json)
- Shared ESLint config:
  [configs/eslint/index.mjs](configs/eslint/index.mjs)
- Shared Prettier config:
  [.prettierrc.mjs](.prettierrc.mjs)
- Prettier ignore rules:
  [.prettierignore](.prettierignore)
- Root workspace command runner:
  [cli/features/workspaces/run-command.mjs](cli/features/workspaces/run-command.mjs)
- Node version expectation: [.nvmrc](.nvmrc)
- Editor defaults: [.editorconfig](.editorconfig)
- VS Code launch/debug setup:
  [.vscode/launch.json](.vscode/launch.json)
  [.vscode/tasks.json](.vscode/tasks.json)

## Working Rules

- If a task touches one app, inspect that app's `package.json` and `tsconfig.json` first.
- If a task touches shared tooling, inspect the root config files first.
- After changing scripts or tooling, prefer validating through the root commands in `package.json`.
- If behavior and docs disagree, trust the config and update the docs.
