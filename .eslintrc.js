module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
  ],
  rules: {
    "no-console": "off",
    "no-debugger": "off",

    "indent": ["error", 4, {"SwitchCase": 1}],
    "quotes": ["error", "double"],
    "max-len": ["off", { "ignoreStrings": true, "code": 120 }],
    "no-param-reassign": ["error", { "props": false }],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
