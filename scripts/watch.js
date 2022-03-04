const fs = require("fs");
const colors = require("colors-console");
const { srcPath } = require("./var");
const { runRollup } = require("./rollup");
const { makeOption } = require("./main");

function throttle(callback, layout = 400) {
  let t = undefined;
  function throttle(...args) {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      callback.apply(this, args);
    }, layout);
  }
  throttle.clear = function() {
    if (t) clearTimeout(t);
  };
  return throttle;
}

function useTempstamp() {
  function tempstamp() {
    if (tempstamp.start) {
      const start = tempstamp.start;
      delete tempstamp.start;
      return (new Date().getTime() - start) / 1000;
    } else return tempstamp.start = new Date().getTime();
  }
  tempstamp.start = new Date().getTime();
  return tempstamp;
}

const rollupCallbacks = {
  onStart: (context) => {
    const { name } = context;
    context.timestamp = useTempstamp();
    process.stdout.write(colors("yellow", `Building ${name} ... \n`));
  },
  onFinish: (context) => {
    process.stdout.write(colors("blue", `Done in ${context.timestamp()}s \n`));
  }
};

async function buildModule() {
  try {
    await runRollup(makeOption(), rollupCallbacks);
    return true;
  } catch (e) {
    process.stdout.write(colors("red", `${e} \n\n`));
    return false;
  }
}

// watch src
fs.watch(srcPath, throttle(async (eventType, filename) => {
  const timestamp = useTempstamp();
  process.stdout.write(colors("yellow", `${eventType} => ${filename}...\n`));
  if (await buildModule()) {
    process.stdout.write(colors("blue", `Done in ${timestamp()}s \n\n`));
  }
}));
