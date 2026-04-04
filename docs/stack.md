# Stack

This document explains where to find the current stack and tooling setup.

Do not treat version numbers here as the only source of truth. Always confirm against the referenced
files.

## Runtime And Environment

- Node version expectation: [../.nvmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.nvmrc)
- npm constraints: [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- npm behavior: [../.npmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.npmrc)

## Workspace Stack

### React Playground

See:

- [../apps/react-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/package.json)
- [../apps/react-playground/tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/tsconfig.json)
- [../apps/react-playground/vite.config.ts](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/vite.config.ts)
- [../apps/react-playground/vitest.config.ts](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/vitest.config.ts)

This workspace contains:

- React application code
- Vite dev/build tooling
- TypeScript
- Tailwind CSS v4 through `@tailwindcss/vite`
- Vitest for tests

### Angular Playground

See:

- [../apps/angular-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/package.json)
- [../apps/angular-playground/tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/tsconfig.json)
- [../apps/angular-playground/angular.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/angular.json)

This workspace contains:

- Angular application code
- Angular CLI build and dev tooling
- TypeScript
- Tailwind CSS v4 through PostCSS and CSS-first imports
- Angular's built-in test runner powered by Vitest

### TypeScript Playground

See:

- [../apps/ts-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/package.json)
- [../apps/ts-playground/tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/tsconfig.json)
- [../apps/ts-playground/vitest.config.ts](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/vitest.config.ts)
- [../apps/ts-playground/nodemon.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/nodemon.json)

This workspace contains:

- Node-oriented TypeScript code
- `nodemon` for local iteration
- `ts-node` for direct execution
- Vitest for tests

### Shared Utils Package

See:

- [../packages/utils/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils/package.json)
- [../packages/utils/tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils/tsconfig.json)

This workspace contains:

- Shared TypeScript helpers for cross-workspace reuse
- `tsc` build output for runtime consumption
- Vitest-ready test scripts, even when no tests exist yet

## Shared Tooling

- Root scripts: [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- ESLint: [../eslint.config.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/eslint.config.mjs)
  [../configs/eslint/index.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint/index.mjs)
- Prettier: [../.prettierrc.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierrc.mjs)
  [../.prettierignore](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierignore)
- TypeScript base config:
  [../tsconfig.base.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/tsconfig.base.json)
- Interactive root command runner:
  [../scripts/run-workspace-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/run-workspace-command.mjs)
- Workspace artifact cleanup helper:
  [../scripts/clean-workspace.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/scripts/clean-workspace.mjs)
- Shared Vitest config helper:
  [../configs/vitest/createVitestConfig.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/vitest/createVitestConfig.mjs)
- VS Code workspace recommendations:
  [../.vscode/extensions.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/extensions.json)
- VS Code MCP integration:
  [../.vscode/mcp.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/.vscode/mcp.json)

## Root Command Conventions

The root command surface is intentionally small:

- main commands such as `dev`, `build`, `clean`, `lint`, `format`, `typecheck`, `test`, and
  `check`
- global aliases such as `build:all`, `clean:all`, `format:all`, `format:check:all`,
  `typecheck:all`, `test:all`, and `check:all`
- repo-wide linting commands such as `lint:all` and `lint:fix:all`

Single-workspace execution should usually go through the root runner with a workspace argument.

Examples:

- `npm run dev -- angular`
- `npm run dev -- react`
- `npm run lint -- ts`
- `npm run format -- utils`
- `npm run typecheck -- utils`
- `npm run check -- --all`

## Verification

If you need to know what is really supported, inspect the scripts and configs directly:

- root commands: [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- per-app commands:
  [../apps/react-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/package.json)
  [../apps/ts-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/package.json)
- shared package commands:
  [../packages/utils/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils/package.json)
