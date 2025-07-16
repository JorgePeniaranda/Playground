<h1 align="center">Playground</h1>

## Descripción

Este es un proyecto de ejemplo con un entorno configurado para TypeScript, ESLint y Nodemon.

## Requisitos

- [Node.js](https://nodejs.org/en/download/package-manager)
- Un runtime de JavaScript como
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Bun](https://bun.sh/),
  [Yarn](https://yarnpkg.com/getting-started/install), o [PNPM](https://pnpm.io/installation).

## Instalación

1. Clona este repositorio:

   ```sh
   git clone https://github.com/JorgePeniaranda/playground.git
   ```

2. Navega al directorio del proyecto:

   ```sh
   cd playground
   ```

3. Instala las dependencias usando tu runtime de JavaScript preferido:

   Con npm:

   ```sh
   npm install
   ```

   Con Yarn:

   ```sh
   yarn install
   ```

   Con PNPM:

   ```sh
   pnpm install
   ```

   Con Bun:

   ```sh
   bun install
   ```

## Scripts

Estos son los scripts disponibles en el proyecto:

- `start`: Ejecuta el archivo compilado `index.js` desde la carpeta `out`.

  ```sh
  npm start
  ```

- `start:dev`: Ejecuta `index.ts` usando `ts-node` (modo desarrollo).

  ```sh
  npm run start:dev
  ```

- `dev`: Ejecuta `index.ts` usando `nodemon` y `ts-node` para reiniciar automáticamente en caso de
  cambios (modo desarrollo).

  ```sh
  npm run dev
  ```

- `build`: Compila el proyecto TypeScript a JavaScript.

  ```sh
  npm run build
  ```

- `lint`: Ejecuta ESLint en el proyecto para encontrar y reportar problemas.

  ```sh
  npm run lint
  ```

- `lint:fix`: Ejecuta ESLint en el proyecto y automáticamente corrige problemas.

  ```sh
  npm run lint:fix
  ```

- `ts:check`: Verifica errores de compilación en el proyecto TypeScript sin emitir archivos de
  salida.

  ```sh
  npm run ts:check
  ```

- `format`: Formatea todo el código usando Prettier.

  ```sh
  npm run format
  ```

- `format:check`: Verifica el formato del código usando Prettier.

  ```sh
  npm run format:check
  ```

- `test`: Comando por defecto para pruebas (actualmente no configurado).

  ```sh
  npm test
  ```
