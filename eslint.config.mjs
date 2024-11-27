import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.node } },
    { ignores: ['dist', 'node_modules', 'test'] },
    {
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'semi': 'error',
            'no-require-imports': false
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]
