import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  ...compat.plugins('simple-import-sort'),
  ...compat.config({
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      curly: 'warn',
      'default-case': 'warn',
      'import/no-duplicates': 'error',
      'import/no-anonymous-default-export': 'off',
      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: [/*'className',*/ 'children', /*'id',*/ 'key', 'ref'],
        },
      ],
      'require-await': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            [
              '^@/layouts/',
              '^@/pages/((?!/hooks/).)*$',
              '^@/components/',
              'components',
              '^\\.(\\.)?/((?!components)[a-z\\d-]+/)?[a-z\\d-]+(?<!-slice)$',
              '^@/assets/',
            ],
            ['^@/store/', '^\\.(\\.)?/([a-z\\d/-]+)-slice\\u0000?$'],
            [
              '/providers',
              '/hooks/',
              '^@/(?!interfaces)',
              '^@/interfaces',
              '\\.(props|interface)\\u0000$',
            ],
            ['^public/.+\\.svg\\?url$', '^public/.+\\.png$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  }),
];

export default eslintConfig;
