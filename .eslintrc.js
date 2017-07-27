module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "forOf": true,
            "jsx": true,
            "es6": true
        }
    },
    "rules": {
        "comma-dangle": 0,
        "react/prop-types": 0,
        "object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
        "comma-spacing": 0,//逗号前后的空格
        "indent": [2, 4],//缩进风格
        "eol-last": 0,
        "spaced-comment": 0,
        "prefer-const": 1,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/no-unused-prop-types":1,
        "prefer-template":1,
        "react/jsx-filename-extension":0,
        "no-use-before-define":0,
        "class-methods-use-this": 0,
        "react/forbid-prop-types": 0,
        "arrow-body-style": [
            2,
            "as-needed"
        ],
    }
};