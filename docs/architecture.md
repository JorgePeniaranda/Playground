# Architecture

Este repo es un monorepo pequeño para experimentar con varios playgrounds manteniendo una capa de
tooling compartida y una forma uniforme de correr tareas.

## Vista Rapida

- `apps/`: aplicaciones y playgrounds ejecutables
- `packages/`: codigo reutilizable compartido
- `configs/`: configuracion comun de herramientas
- `cli/`: utilidades CLI organizadas por feature
- `docs/`: contexto estable y de alto nivel

## Modelo Del Monorepo

- El root define workspaces en `apps/*` y `packages/*`.
- Cada workspace es responsable de sus scripts de runtime, build, test y lint.
- El root expone una interfaz comun para operar uno o varios workspaces.
- La configuracion compartida vive en el root o en `configs/`.

## Workspaces

- `apps/angular-playground`: playground UI de Angular
- `apps/react-playground`: playground UI de React con Vite
- `apps/ts-playground`: playground orientado a Node.js y TypeScript
- `packages/utils`: helpers compartidos consumidos por otros workspaces

Para detalles exactos de dependencias, scripts o project references, revisa el `package.json` y el
`tsconfig.json` del workspace correspondiente.

## Capas De Comandos

Hay dos niveles de comandos:

1. Scripts locales definidos por cada workspace
2. Comandos raiz que delegan en uno o varios workspaces

El punto de entrada principal del runner es
[../cli/features/workspaces/run-command.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/cli/features/workspaces/run-command.mjs).

El runner:

- descubre workspaces desde sus manifests
- soporta seleccion interactiva, `--workspace`, argumento posicional y `--all`
- usa `playgroundConfig.id` y `playgroundConfig.label` cuando existen
- mantiene una interfaz uniforme para `dev`, `build`, `lint`, `test`, `check` y comandos similares

## Tooling Compartido

- Scripts y comandos raiz:
  [../package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- ESLint:
  [../eslint.config.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/eslint.config.mjs)
  [../configs/eslint/index.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/eslint/index.mjs)
- TypeScript base:
  [../tsconfig.base.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/tsconfig.base.json)
- Vitest compartido:
  [../configs/vitest/createVitestConfig.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/configs/vitest/createVitestConfig.mjs)
- Formato:
  [../.prettierrc.mjs](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierrc.mjs)
  [../.prettierignore](/C:/Users/USUARIO/Documents/Proyectos/Playground/.prettierignore)
