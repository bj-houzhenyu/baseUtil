// const eslint = require("@rollup/plugin-eslint");
const { getBabelOutputPlugin } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");

const env = process.env.NODE_ENV;

// function eslintPlugin() {
//   return env === "production" ? [eslint({ throwOnError: true })] : [];
// }

function terserPlugin() {
  return env === "production" ? [terser()] : [];
}

function makePlugins() {
  return [
    getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
    // ...eslintPlugin(),
    ...terserPlugin()
  ];
}

module.exports = { makePlugins };
