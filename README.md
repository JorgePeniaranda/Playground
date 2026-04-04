# Playground

Monorepo de experimentacion para probar ideas en Angular, React y TypeScript compartiendo tooling,
scripts raiz y un paquete utilitario comun.

## Que Incluye

| Workspace                 | Id del runner | Proposito                 | Stack principal                                      |
| ------------------------- | ------------- | ------------------------- | ---------------------------------------------------- |
| `apps/angular-playground` | `angular`     | Playground UI con Angular | Angular 21, TypeScript, Tailwind CSS 4, Vitest       |
| `apps/react-playground`   | `react`       | Playground UI con React   | React 19, Vite 8, TypeScript, Tailwind CSS 4, Vitest |
| `apps/ts-playground`      | `ts`          | Playground para Node.js   | TypeScript, Node.js, nodemon, ts-node, Vitest        |
| `packages/utils`          | `utils`       | Utilidades compartidas    | TypeScript, build con `tsc`, Vitest                  |

## Requisitos

- Node.js `20.19.0` o superior
- npm `10` o superior

## Puesta En Marcha

```sh
npm install
```

Levantar un workspace en modo interactivo:

```sh
npm run dev
```

Levantar uno puntual sin prompt:

```sh
npm run dev -- react
npm run dev -- angular
npm run dev -- ts
```

## Comandos Del Root

El root expone un set corto de comandos y delega en `scripts/run-workspace-command.mjs`.

```sh
npm run dev
npm run build
npm run clean
npm run lint
npm run format
npm run typecheck
npm run test
npm run check
```

Tambien puedes ejecutar sobre un workspace concreto:

```sh
npm run build -- ts
npm run test -- react
npm run check -- utils
npm run lint -- --workspace angular
```

Y para correr todo el repo cuando aplica:

```sh
npm run build:all
npm run clean:all
npm run lint:all
npm run format:check:all
npm run typecheck:all
npm run test:all
npm run check:all
```

## Flujo Recomendado

1. Instalar dependencias con `npm install`.
2. Arrancar el workspace que quieras explorar con `npm run dev -- <id>`.
3. Validar cambios con `npm run check -- <id>` o `npm run check:all`.
4. Si modificas utilidades compartidas, usar `npm run build:packages` antes de verificar apps que las
   consumen.

## Estructura Del Repo

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
scripts/
```

## Documentacion

- Vista general de arquitectura:
  [docs/architecture.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/architecture.md)
- Stack y tooling por workspace:
  [docs/stack.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/stack.md)

## Licencia

Este proyecto se distribuye bajo licencia MIT. El texto completo esta en
[LICENSE](/C:/Users/USUARIO/Documents/Proyectos/Playground/LICENSE).
