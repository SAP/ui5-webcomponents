import 'zx/globals';

// don't print executed commands and their output
$.verbose = false;

const restArgs = process.argv.slice(2);
const watchMode = restArgs.length && restArgs[0] === "-w";
console.log({watchMode})

let inputFiles = await globby("src/**/parameters-bundle.css");
if (watchMode && process.env.REST_THEMES) {
  console.log("!!!!!!!!!!! REST THEMES")
  inputFiles = inputFiles.filter(x => !x.includes("/sap_fiori_3/"));
} else if (watchMode) {
  inputFiles = inputFiles.filter(x => x.includes("/sap_fiori_3/"));
} else {
  inputFiles = inputFiles.filter(x => x.includes("/sap_fiori_3/"));
}

// run all postcss processes in parallel as passing the glob directly to postcss makes them processed sequentially.
// and the amount of imports give a big speed up when run in parallel
await Promise.all(inputFiles.map(file => {
  return $`postcss ${file} --config config/postcss.themes --base src --dir dist/css/ ${restArgs}`;
}));
