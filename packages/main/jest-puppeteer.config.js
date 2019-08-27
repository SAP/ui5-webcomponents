/* eslint-disable */
// jest-puppeteer.config.js
module.exports = {
	launch: {
		// dumpio: true,
		// headless: false
	},
	server: {
		command: 'cd ./test/sap/ui/webcomponents/main/ && serve -l 8080',
		port: 8080,
		launchTimeout: 10000,
		debug: true,
		usedPortAction: 'ignore',
	},
	browserContext: 'default',
}
