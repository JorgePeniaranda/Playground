import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';

const angularTsFiles = ['apps/angular-playground/**/*.ts'];
const angularHtmlFiles = ['apps/angular-playground/**/*.html'];

const angularTemplateConfigs = [
  ...angular.configs.templateRecommended,
  ...angular.configs.templateAccessibility.slice(1),
];

export default defineConfig(
  ...angular.configs.tsRecommended.map((config) => ({
    ...config,
    files: angularTsFiles,
  })),
  {
    files: angularTsFiles,
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
    },
  },
  ...angularTemplateConfigs.map((config) => ({
    ...config,
    files: angularHtmlFiles,
  })),
);
