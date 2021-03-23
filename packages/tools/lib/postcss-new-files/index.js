const chokidar = require("chokidar");
const commandLineArgs = require("command-line-args");
const { exec } = require("child_process");

const options = commandLineArgs([
	{ name: "srcFiles", type: String },
]);

const runPostcss = path => {
	let command = `postcss ${path} --config config/postcss.components --base src --dir dist/css/`;
	console.log(`Executing: ${command}`);
	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.log(`Could not run postcss for ${path}. Error: ${err}`);
		}
	});

	command = `${command} -w`;
	console.log(`Executing: ${command}`);
	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.log(`Could not run postcss in watch mode for ${path}. Error: ${err}`);
		}
	});
};

let ready = false; // Do nothing until the ready event has been fired (we don't want to recompile all files initially)
const watcher = chokidar.watch(options.srcFiles);
watcher.on("ready", () => {
	ready = true; // Initial scan is over -> waiting for new files
});
watcher.on("add", path => {
	if (ready) {
		runPostcss(path);
	}
});
