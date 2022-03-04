const path = require("path");

const cwd = process.cwd();
const srcPath = path.join(cwd, "./src");
const distPath = path.resolve(cwd, "./dist");
const libPath = path.resolve(cwd, "./dist/lib");

module.exports = {
  cwd,
  srcPath,
  distPath,
  libPath
};
