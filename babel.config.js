const presets = [
  ["@babel/env", {
    "debug": process.env.NODE_ENV === "production",
    "modules": false,
  }],
  "@babel/react",
  "@babel/typescript",
]

const plugins = [
  ["@babel/plugin-transform-runtime"],
  ["@babel/plugin-syntax-dynamic-import"],
  ["@babel/plugin-proposal-class-properties", {
    "loose": true
  }],
  ["transform-imports", {
    "@material-ui/core": {
      "transform": "@material-ui/core/es/${member}"
    },
    "lodash-es": {
      "transform": "lodash-es/${member}"
    }
  }],
  ["babel-plugin-styled-components", {
    "ssr": false
  }],
]

module.exports = {
  presets,
  plugins,
}
