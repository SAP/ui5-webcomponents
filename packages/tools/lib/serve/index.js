const fs = require("fs");
const commandLineArgs = require("command-line-args");
const { exec } = require("child_process");
const colors = require("colors/safe");

const options = commandLineArgs([
	{ name: "packageName", type: String },
	{ name: "dir", type: String },
]);

const dir = options.dir;
const packageName = options.packageName;

function* serverGenerator(callback) {
	let port = 8080; // always start from port 8080
	while (1) {
		const command = `serve --no-port-switching --no-clipboard -l ${port} ${dir}`;
		console.log(`Executing: ${command}`);
		yield exec(command, callback);
		port++;
	}
}

const gen = serverGenerator(err => {
	console.log("Port taken");
	requestAnotherPort();
});

const requestAnotherPort = () => {
	const serveProcess = gen.next().value;
	serveProcess.stdout.on('data', data => {
		const matches = data.match(/Accepting connections at .*?:(\d+)/);
		if (matches) {
			console.log(colors.yellow(`Reserved port ${matches[1]} for the ${packageName} package`));
			fs.writeFileSync(".port", matches[1]);
		}
	});
}

requestAnotherPort();