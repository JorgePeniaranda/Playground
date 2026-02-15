/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'tw', 'twMerge', 'cn'],
  printWidth: 100,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  quoteProps: 'consistent',
  proseWrap: 'always',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
};
