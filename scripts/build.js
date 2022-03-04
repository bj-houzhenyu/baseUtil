const rimraf = require("rimraf");

const { distPath } = require("./var");
const { runRollup } = require("./rollup");
const { makeOption, copyFiles } = require("./main");

function runBuild() {
  rimraf(distPath, {}, async () => {
    await runRollup(makeOption());
    copyFiles();
  });
}

runBuild();
