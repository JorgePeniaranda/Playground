# Playground

Monorepo pequeño para experimentar con código en workspaces de apps y paquetes compartidos:

- `angular-playground`: Angular + TypeScript
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
  angular-playground/
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
npm run dev -- react
npm run build -- ts
npm run test -- react
npm run check -- utils
npm run check:all
```

Los comandos del root usan el runner interactivo para apps y paquetes. Si prefieres evitar el
prompt, puedes pasar el id del workspace como argumento posicional o con `--workspace`.

Los workspaces del runner se descubren automaticamente desde `apps/*/package.json` y
`packages/*/package.json`. Cuando existe, se usa la metadata `playgroundConfig.id` y
`playgroundConfig.label` para mostrar ids amigables como `react`, `ts` y `utils`.

Scripts utiles para paquetes compartidos:

```sh
npm run build:packages
```

`build:packages` compila los paquetes bajo `packages/*`.

Si necesitas correr el runner con flags:

```sh
npm run test -- --workspace react
npm run check -- --workspace ts
npm run build -- --all
npm run lint -- -w utils -- --max-warnings 0
npm run dev -- --help
```

## Documentacion

- Arquitectura y layout del monorepo:
  [docs/architecture.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/architecture.md)
- Stack y tooling actual:
  [docs/stack.md](/C:/Users/USUARIO/Documents/Proyectos/Playground/docs/stack.md)
