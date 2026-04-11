# Stack

Este documento resume el stack por workspace y apunta a los archivos donde se define el
comportamiento exacto.

## Runtime Y Entorno

- Version de Node esperada:
  [../.nvmrc](../.nvmrc)
- Restricciones de `npm` y comandos raiz:
  [../package.json](../package.json)
- Configuracion de `npm`:
  [../.npmrc](../.npmrc)

## Stack Por Workspace

| Workspace            | Stack principal                                                      | Archivos para confirmar                                                                                                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-playground`   | React, Vite, TypeScript, Tailwind CSS, Vitest                        | [package.json](../apps/react-playground/package.json), [tsconfig.json](../apps/react-playground/tsconfig.json), [vite.config.ts](../apps/react-playground/vite.config.ts), [vitest.config.ts](../apps/react-playground/vitest.config.ts) |
| `angular-playground` | Angular, TypeScript, Tailwind CSS, Vitest via Angular tooling        | [package.json](../apps/angular-playground/package.json), [tsconfig.json](../apps/angular-playground/tsconfig.json), [angular.json](../apps/angular-playground/angular.json)                                                              |
| `ts-playground`      | Node.js, TypeScript, nodemon, ts-node, Vitest                        | [package.json](../apps/ts-playground/package.json), [tsconfig.json](../apps/ts-playground/tsconfig.json), [nodemon.json](../apps/ts-playground/nodemon.json), [vitest.config.ts](../apps/ts-playground/vitest.config.ts)                 |
| `@playground/utils`  | Package TypeScript compartido con build por `tsc` y tests con Vitest | [package.json](../packages/utils/package.json), [tsconfig.json](../packages/utils/tsconfig.json)                                                                                                                                         |

## Tooling Compartido

- Scripts y aliases raiz:
  [../package.json](../package.json)
- Runner interactivo de workspaces:
  [../cli/features/workspaces/run-command.mjs](../cli/features/workspaces/run-command.mjs)
- Limpieza de artefactos:
  [../cli/features/cleanup/clean-workspace.mjs](../cli/features/cleanup/clean-workspace.mjs)
- ESLint:
  [../eslint.config.mjs](../eslint.config.mjs)
  [../configs/eslint/index.mjs](../configs/eslint/index.mjs)
- TypeScript base:
  [../tsconfig.base.json](../tsconfig.base.json)
- Vitest compartido:
  [../configs/vitest/createVitestConfig.mjs](../configs/vitest/createVitestConfig.mjs)
- Prettier:
  [../.prettierrc.mjs](../.prettierrc.mjs)
  [../.prettierignore](../.prettierignore)
