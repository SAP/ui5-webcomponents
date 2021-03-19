const fs = require("fs");
const chokidar = require("chokidar");
const postcss = require("postcss");
const postcssComponents = require("../../components-package/postcss.components");

const srcFiles = process.argv[2];

const run = path => {
	fs.readFile(path, (err, css) => {
		postcss(postcssComponents.plugins)
			.process(css, { from: path })
			.then(result => {
				console.log("Processed: ", path);
			});
	});
};

let ready = false; // Do nothing until the ready event has been fired (we don't want to recompile all files initially)

const watcher = chokidar.watch(srcFiles);

watcher.on("ready", () => {
	ready = true; // Initial scan is over -> waiting for changes or new files
});
watcher.on("add", path => {
	if (ready) {
		run(path);
	}
});
watcher.on("change", path => {
	if (ready) {
		run(path);
	}
});
