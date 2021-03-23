const chokidar = require("chokidar");
const commandLineArgs = require("command-line-args");
const psList = require("ps-list");
const fkill = require("fkill");
const { exec } = require("child_process");

const options = commandLineArgs([
	{ name: "srcFiles", type: String },
	{ name: "packageName", type: String },
]);
const packageName = options.packageName;

const restartPostcss = async () => {
	let retryCount = 5;
	let processes;

	while (retryCount) {
		try {
			console.log("Getting processes list...");
			processes = await psList();
			retryCount = 0;
		} catch (e) {
			console.log("failed, retrying...");
			retryCount--;
		}
	}

	const process = processes.find(p => p.cmd.includes("postcss") && p.cmd.endsWith(`-w --packageName=${packageName}`));
	if (process) {
		await fkill(process.pid);

		exec(`npx nps build.styles.components`, (err, stdout, stderr) => {
			if (err) {
				console.log(`Could not rebuild CSS for ${packageName}`);
				console.log(err);
			}

			console.log(stderr);
			console.log(stdout);
		});

		exec(`npx nps watch.styles.components`, (err, stdout, stderr) => {
			if (err) {
				console.log(`Could not restart the postcss process for ${packageName}`);
				console.log(err);
			}

			console.log(stderr);
			console.log(stdout);
		});
	} else {
		console.log(`Cound not find the postcss process to restart for ${packageName}`);
	}
};

let ready = false; // Do nothing until the ready event has been fired (we don't want to recompile all files initially)
const watcher = chokidar.watch(options.srcFiles);
watcher.on("ready", () => {
	ready = true; // Initial scan is over -> waiting for new files
});
watcher.on("add", async path => {
	if (ready) {
		await restartPostcss();
	}
});
