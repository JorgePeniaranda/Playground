# Playground

Monorepo de experimentacion para comparar y mantener playgrounds de Angular, React y TypeScript
con tooling compartido, comandos raiz consistentes y un paquete utilitario comun.

## Panorama

El repo agrupa playgrounds de interfaz y de TypeScript bajo una misma capa de tooling. La idea es
que cada workspace mantenga sus scripts y su stack, mientras el root ofrece una forma uniforme de
correr tareas y validar cambios.

## Workspaces

| Workspace | Id | Rol |
| --- | --- | --- |
| `apps/angular-playground` | `angular` | Playground UI en Angular |
| `apps/react-playground` | `react` | Playground UI en React |
| `apps/ts-playground` | `ts` | Playground de Node.js y TypeScript |
| `packages/utils` | `utils` | Helpers compartidos |

## Requisitos

- Node.js `20.19.0` o superior
- npm `10` o superior

## Inicio Rapido

```sh
npm install
npm run dev
```

Ejemplos utiles:

```sh
npm run dev -- react
npm run dev -- angular
npm run dev -- ts
npm run check -- react
npm run check:all
```

## Comandos

Los comandos raiz delegan en `cli/features/workspaces/run-command.mjs` y mantienen una interfaz
comun.

```sh
npm run dev
npm run build
npm run clean
npm run lint
npm run format
npm run format:check
npm run typecheck
npm run test
npm run test:coverage
npm run check
```

Versiones repo-wide cuando aplican:

```sh
npm run build:all
npm run clean:all
npm run lint:all
npm run lint:fix:all
npm run format:all
npm run format:check:all
npm run typecheck:all
npm run test:all
npm run test:coverage:all
npm run check:all
```

## Estructura

```text
apps/
  angular-playground/
  react-playground/
  ts-playground/
packages/
  utils/
configs/
  eslint/
  vitest/
docs/
cli/
```

## Referencias

- [cli/README.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/cli/README.md)
- [docs/README.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/README.md)
- [docs/architecture.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/architecture.md)
- [docs/stack.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/stack.md)
- [package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/package.json)
- [apps/angular-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/angular-playground/package.json)
- [apps/react-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/react-playground/package.json)
- [apps/ts-playground/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/apps/ts-playground/package.json)
- [packages/utils/package.json](/C:/Users/USUARIO/Documents/Proyectos/Playground/packages/utils/package.json)

## Licencia

Este proyecto se distribuye bajo licencia MIT. El texto completo esta en
[LICENSE](/C:/Users/USUARIO/Documents/Proyectos/Playground/LICENSE).
