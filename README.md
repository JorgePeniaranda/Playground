# Playground

Monorepo pequeño para experimentar con código en workspaces de apps y paquetes compartidos:

- `react-playground`: React + Vite + TypeScript
- `ts-playground`: TypeScript orientado a Node.js
- `@playground/utils`: utilidades TypeScript compartidas

## Requisitos

- Node.js `20.19.0` o superior
- npm `10` o superior

## Instalacion

```sh
npm install
```

## Estructura

```text
apps/
  react-playground/
  ts-playground/
packages/
  utils/
configs/
  eslint/
docs/
scripts/
```

## Uso Diario

Los comandos raiz usan un runner interactivo para elegir workspace cuando aplica.

```sh
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run check
```

Tambien puedes evitar el prompt:

```sh
npm run dev:react
npm run dev:ts
npm run dev:utils
npm run build:react
npm run build:ts
npm run build:utils
npm run test:react
npm run test:ts
npm run test:utils
npm run check:all
```

Los comandos interactivos del root siguen apuntando a los apps. Para el paquete compartido usa los
aliases `:*utils` o `npm run <script> -w @playground/utils`.

Si necesitas correr el runner con flags:

```sh
npm run test -- --workspace react
npm run check -- --workspace ts
npm run build -- --all
npm run dev -- --help
```

## Documentacion

- Arquitectura y layout del monorepo:
  [docs/architecture.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/architecture.md)
- Stack y tooling actual:
  [docs/stack.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/stack.md)
