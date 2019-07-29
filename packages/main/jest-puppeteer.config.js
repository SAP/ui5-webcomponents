/* eslint-disable */
// jest-puppeteer.config.js
module.exports = {
	launch: {
		// dumpio: true,
		// headless: false
	},
	server: {
		command: 'cd ../playground && serve -l 8080',
		port: 8080,
		launchTimeout: 10000,
		debug: true,
		usedPortAction: 'ignore',
	},
	browserContext: 'default',
}