const path = require("path");
const fs = require("fs-extra");
const { cwd, srcPath, distPath, libPath } = require("./var");
const package = require(path.resolve(cwd, "./package.json"))
const { makePlugins } = require("./plugins")

const modules = fs.readdirSync(srcPath).map(name => {
  return path.resolve(srcPath, name)
});

function makeOption() {
  return {
    input: {
      input: modules,
      external: ["axios", "@vue/composition-api"],
      plugins: makePlugins()
    },
    output: {
      dir: libPath,
      format: "esm",
      sourcemap: true,
      name: "util",
      globals: {
        "axios": "Axios",
        "@vue/composition-api": "compositionAPI"
      }
    }
  }
}

function copyFiles() {
  const readmePath = path.join(cwd, "/readme.md")
  fs.copyFile(readmePath, path.join(distPath, "/readme.md"))
  fs.writeFile(path.join(distPath, "/package.json"), JSON.stringify({
    name: package.name,
    version: package.version,
    description: package.description,
    main: "lib/index.js",
    files: ["lib", "readme.md", "package.json"],
    repository: package.repository,
    homepage: package.homepage,
    bugs: package.bugs,
    author: package.author,
    license: package.license,
    devDependencies: {},
    peerDependencies: package.peerDependencies
  }, null, 2))
}

module.exports = {
  makeOption,
  copyFiles
}
