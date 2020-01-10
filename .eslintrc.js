module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        semi: ['error', 'never'],
        indent: ['error', 2],
        'max-len': ['error', {
            code: 150,
            tabWidth: 2
        }],
        'require-atomic-updates': 'off'
    }
};
