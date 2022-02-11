const fs = require("fs");
const path = require("path");
const commandLineArgs = require("command-line-args");
const { exec } = require("child_process");
const colors = require("cli-color");
const isPortReachable = require("is-port-reachable");

const options = commandLineArgs([
	{ name: "port", type: Number },
	{ name: "portStep", type: Number },
	{ name: "packageName", type: String },
	{ name: "dir", type: String },
	{ name: "config", type: String },
]);
const serveConfig = path.join(__dirname, `serve.json`);

const requestPort = async () => {
	const serveProcess = (await gen.next()).value;
	serveProcess.stdout.on('data', data => {
		const matches = data.match(/Accepting connections at .*?:(\d+)/);
		if (matches) {
			console.log(colors.yellow(`Reserved port ${matches[1]} for the ${options.packageName} package.`));
			fs.writeFileSync(".port", matches[1]);
		}
	});
};

async function* serverGenerator(callback, port = 8080, step = 1) {
	while (true) {
		const portInUse = await isPortReachable(port, { host: "127.0.0.1" });
		if (!portInUse) {
			const command = `serve --config "${serveConfig}" --no-port-switching --no-clipboard -l ${port} ${options.dir}`;
			console.log(colors.yellow(`Executing: ${command}`));
			const serveProcess = exec(command, (err) => {
				console.log(colors.yellow(`Port ${port} already in use.`));
				callback();
			});
			yield serveProcess;
		}
		port += step;
	}
}

const gen = serverGenerator(requestPort, options.port, options.portStep);

requestPort();
