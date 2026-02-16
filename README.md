<h1 align="center">Playground</h1>

Monorepo con dos aplicaciones playground para experimentar con snippets de código.

| App                  | Stack                          | Tests                            |
| -------------------- | ------------------------------ | -------------------------------- |
| **ts-playground**    | TypeScript, Node.js, ts-node   | Jest + ts-jest                   |
| **react-playground** | React 19, Vite, TypeScript     | Vitest + @testing-library/react  |

## Requisitos

- [Node.js](https://nodejs.org/) (v18+)
- Un package manager: [npm](https://docs.npmjs.com/), [Yarn](https://yarnpkg.com/),
  [pnpm](https://pnpm.io/) o [Bun](https://bun.sh/)

## Instalacion

```sh
git clone https://github.com/JorgePeniaranda/playground.git
cd playground
npm install
```

## Estructura

```
apps/
  ts-playground/        # TypeScript (Node.js) — Jest, ts-node, nodemon
  react-playground/     # React (Vite) — Vitest, @testing-library/react
saves/                  # Snippets archivados (excluidos de compilacion y linting)
```

La configuracion compartida vive en la raiz: ESLint (`eslint.config.mjs`), Prettier
(`.prettierrc.mjs`), TypeScript base (`tsconfig.base.json`).

## Scripts

### Raiz (todos los workspaces)

```sh
npm run lint          # Ejecutar ESLint
npm run lint:fix      # Ejecutar ESLint con auto-fix
npm run format        # Formatear con Prettier
npm run format:check  # Verificar formato
npm run ts:check      # Verificar tipos en todos los workspaces
npm test              # Ejecutar tests en todos los workspaces
npm run build         # Compilar todos los workspaces
```

### ts-playground

```sh
npm run dev -w ts-playground          # Dev con nodemon + ts-node (auto-reload)
npm test -w ts-playground             # Ejecutar tests con Jest
npm run test:watch -w ts-playground   # Tests en modo watch
npx jest path/to/file.test.ts         # Ejecutar un test especifico
npm run build -w ts-playground        # Compilar a apps/ts-playground/out/
```

### react-playground

```sh
npm run dev -w react-playground          # Dev server con Vite
npm test -w react-playground             # Ejecutar tests con Vitest
npm run test:watch -w react-playground   # Tests en modo watch
npx vitest run path/to/file.test.tsx     # Ejecutar un test especifico
npm run build -w react-playground        # Build a apps/react-playground/dist/
```

## Tooling

- **TypeScript** — ES2022, strict mode
- **ESLint 9** — flat config con `typescript-eslint` (strict + stylistic), React, JSX a11y, Prettier
- **Prettier** — 100 chars, single quotes, trailing commas, 2 espacios; plugins para organizar
  imports y ordenar clases de Tailwind
- **Dependencias** — versiones exactas (`save-exact=true` en `.npmrc`), lock files en `.gitignore`
