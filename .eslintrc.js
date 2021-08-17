module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: {
        jest: true,
    },
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                // Unused args and vars are only permitted if they start with _
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'no-await-in-loop': 'off',
        'no-plusplus': 'off',
        'unicorn/no-null': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {
                directory: './src',
            },
        },
    },
    globals: {
        fail: 'readonly',
    },
}
