import 'zx/globals';

// don't print executed commands and their output
$.verbose = false;

const inputFiles = await globby("src/**/parameters-bundle.css");

const restArgs = process.argv.slice(2);

// run all postcss processes in parallel as passing the glob directly to postcss makes them processed sequentially.
// and the amount of imports give a big speed up when run in parallel
await Promise.all(inputFiles.map(file => {
  return $`postcss ${file} --config config/postcss.themes --base src --dir dist/css/ ${restArgs}`;
}));
