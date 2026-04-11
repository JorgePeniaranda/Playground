# Stack

Este documento resume el stack por workspace y apunta a los archivos donde se define el
comportamiento exacto.

## Runtime Y Entorno

- Version de Node esperada:
  [../.nvmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.nvmrc)
- Restricciones de `npm` y comandos raiz:
  [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- Configuracion de `npm`:
  [../.npmrc](/C:/Users/USUARIO/Documents/Proyectos/Playground/.npmrc)

## Stack Por Workspace

| Workspace            | Stack principal                                                      | Archivos para confirmar                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-playground`   | React, Vite, TypeScript, Tailwind CSS, Vitest                        | [package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/package.json), [tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/tsconfig.json), [vite.config.ts](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/vite.config.ts), [vitest.config.ts](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/vitest.config.ts) |
| `angular-playground` | Angular, TypeScript, Tailwind CSS, Vitest via Angular tooling        | [package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/package.json), [tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/tsconfig.json), [angular.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/angular.json)                                                                                                            |
| `ts-playground`      | Node.js, TypeScript, nodemon, ts-node, Vitest                        | [package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/package.json), [tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/tsconfig.json), [nodemon.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/nodemon.json), [vitest.config.ts](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/vitest.config.ts)                 |
| `@playground/utils`  | Package TypeScript compartido con build por `tsc` y tests con Vitest | [package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils/package.json), [tsconfig.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils/tsconfig.json)                                                                                                                                                                                                                                     |

## Tooling Compartido

- Scripts y aliases raiz:
  [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- Runner interactivo de workspaces:
  [../cli/features/workspaces/run-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/cli/features/workspaces/run-command.mjs)
- Limpieza de artefactos:
  [../cli/features/cleanup/clean-workspace.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/cli/features/cleanup/clean-workspace.mjs)
- ESLint:
  [../eslint.config.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/eslint.config.mjs)
  [../configs/eslint/index.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint/index.mjs)
- TypeScript base:
  [../tsconfig.base.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/tsconfig.base.json)
- Vitest compartido:
  [../configs/vitest/createVitestConfig.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/vitest/createVitestConfig.mjs)
- Prettier:
  [../.prettierrc.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierrc.mjs)
  [../.prettierignore](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierignore)
