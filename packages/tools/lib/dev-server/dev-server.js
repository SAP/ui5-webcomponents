const fs = require("fs");
const { createServer } = require('vite');

const startVite = async (port) => {
	const server = await createServer({
		// any valid user config options, plus `mode` and `configFile`
		// configFile: false,
		// root: __dirname,
		server: {
			port: port,
			strictPort: true,
			open: true,
		},
		logLevel: 'info',
		clearScreen: false,
	})
	await server.listen()
	server.printUrls()
	return server;
};

const rmPortFile = () => {
	console.log("rm");
	// exit handler must be sync
	try {
		fs.rmSync(".dev-server-port");
	} catch (e) {}
	process.exit();
}

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException", "SIGTERM"].forEach((eventType) => {
	process.on(eventType, rmPortFile);
});

(async () => {
	let retries = 10;
	let port = 8080;
	while (retries--) {
		console.log(`taking port ${port}`);
		fs.writeFileSync(".dev-server-port", `${port}`);
		const command = `yarn vite --port=${port} --strictPort --open`;
		try {
			// execSync(command, {stdio: 'pipe'});
			const server = await startVite(port);
			if (server) {
				// server started, don't try other ports
				break;
			}
		} catch (e) {
			// uncomment for debug
			// console.log(e.toString());
			if (e.toString().includes("already in use")) {
				console.log(`Port ${port} already in use`)
				port++;
				continue;
			}
			// other error or CTRL-C
			process.exit();
		}
		// no error normal exit
		// process.exit();
	}
})();