# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Overview

Monorepo with npm workspaces containing two playground apps for experimenting with code snippets.
The `saves/` directory holds archived code snippets excluded from compilation and linting.

## Structure

```
apps/
  ts-playground/     # TypeScript (Node.js) — Jest, ts-node, nodemon
  react-playground/  # React (Vite) — Vitest, @testing-library/react
```

Shared config lives at root: ESLint (`eslint.config.mjs`), Prettier (`.prettierrc.mjs`), TypeScript
base (`tsconfig.base.json`).

## Commands

### Root (all workspaces)

- **Lint:** `npm run lint` / `npm run lint:fix`
- **Type check:** `npm run ts:check`
- **Format:** `npm run format` / `npm run format:check`
- **Test all:** `npm test`
- **Build all:** `npm run build`

### ts-playground

- **Dev:** `npm run dev -w ts-playground` (nodemon + ts-node)
- **Test:** `npm test -w ts-playground` / `npx jest path/to/file.test.ts`
- **Build:** `npm run build -w ts-playground` (compiles to `apps/ts-playground/out/`)

### react-playground

- **Dev:** `npm run dev -w react-playground` (Vite dev server)
- **Test:** `npm test -w react-playground`
- **Build:** `npm run build -w react-playground` (outputs to `apps/react-playground/dist/`)

## Architecture

- **TypeScript** targeting ES2022, strict mode; base config in `tsconfig.base.json`
- **ts-playground:** `NodeNext` module resolution, Jest with `ts-jest` preset
- **react-playground:** Vite + React 19, `bundler` module resolution, Vitest + jsdom
- **ESLint 9** flat config with `typescript-eslint` strict + stylistic, Prettier integration, and
  import ordering
- **Prettier** config in `.prettierrc.mjs`: 100 char width, single quotes, trailing commas, 2-space
  tabs

## Code Style

- `no-console` is set to warn — use `// eslint-disable-next-line no-console` when console usage is
  intentional
- Imports must be ordered by group (builtin → external → internal → parent → sibling → index) with
  alphabetical sorting, enforced by `eslint-plugin-import`
- `save-exact=true` in `.npmrc` — all dependency versions are pinned exact (no `^` or `~`)
- Lock files are gitignored; any package manager (npm, yarn, pnpm, bun) can be used
