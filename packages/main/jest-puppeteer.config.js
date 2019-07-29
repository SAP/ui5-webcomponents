/* eslint-disable */
// jest-puppeteer.config.js
module.exports = {
	launch: {
		// dumpio: true,
		// headless: false
	},
	server: {
		command: 'cd ../playground/ && serve',
		port: 8080,
		launchTimeout: 10000,
		debug: true,
		usedPortAction: 'ignore',
	},
	browserContext: 'default',
}
