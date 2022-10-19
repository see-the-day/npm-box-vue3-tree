module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    'plugin:vue/vue3-recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended']
    }
  ],
  globals: {
    defineProps: 'writable',
    defineEmits: 'writable',
    defineExpose: 'writable'
  },
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': [
      0,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-member-accessibility': [0, { accessibility: 'no-public' }],
    '@typescript-eslint/no-use-before-define': [
      0,
      {
        functions: true,
        classes: true,
        variables: false
      }
    ],
    'global-require': 0,
    'lines-between-class-members': [
      // 要求或禁止在类成员之间出现空行
      2,
      'always',
      {
        exceptAfterSingleLine: true //  跳过对单行类成员之后的空行的检查
      }
    ],
    'no-useless-constructor': 1,
    'vue/no-v-html': 0,
    'max-classes-per-file': 0,
    'no-nested-ternary': 0, // 禁止使用嵌套的三元表达式
    'no-restricted-globals': 0, // 禁用特定的全局变量
    'no-use-before-define': 0, // 禁止定义前使用
    'no-unused-expressions': 0, // 禁止未使用过的表达式
    'prefer-destructuring': [
      2,
      {
        array: false,
        object: true
      }
    ],
    'import/prefer-default-export': 0, // When there is only a single export from a module, prefer using default export over named export.
    // 'import/extensions': 0, // Ensure consistent use of file extension within the import path
    'import/no-extraneous-dependencies': 0, // Forbid the use of extraneous packages
    'import/no-named-as-default-member': 0,
    'vue/no-multiple-template-root': 0,
    'vue/max-attributes-per-line': 0,
    'vue/comment-directive': 0,
    'vue/no-v-model-argument': 0,
    'prefer-promise-reject-errors': 0,
    'vue/attribute-hyphenation': 0,
    camelcase: 0,
    'no-undef': 'off',
    'no-debugger': 'off'
  }
}
