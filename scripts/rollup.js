const { rollup } = require("rollup");

function runIfFunc(fn, ...options) {
  return typeof fn === "function" ? fn(...options) : undefined;
}

async function runRollup(option, callbacks = {}) {
  try {
    const { input, output } = option;
    const content = { name: output.name || "index" };
    const { onStart, afterRollup, onFinish } = callbacks;
    
    runIfFunc(onStart, content, option);
    const bundle = await rollup(input);
    
    runIfFunc(afterRollup, content, option);
        
    await bundle.write(output);
    runIfFunc(onFinish, content, option);
  } catch (e) {
    throw e;
  }
}

module.exports = { runRollup };