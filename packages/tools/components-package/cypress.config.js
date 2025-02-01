const { defineConfig } = require('cypress')
const path = require("path");
const coverageTask = require('@cypress/code-coverage/task');

const suites = {
	SUITE1: [
		"**/specs/base/*.cy.{jsx,tsx}",
		"**/specs/[A-I]*.cy.{js,jsx,ts,tsx}",
	],
	SUITE2: [
		"**/specs/[^A-I]*.cy.{js,jsx,ts,tsx}",
	],
};

module.exports = defineConfig({
	component: {
		setupNodeEvents(on, config) {
			coverageTask(on, config)
			return config
		},
		supportFile: path.join(__dirname, "cypress/support/component.js"),
		indexHtmlFile: path.join(__dirname, "cypress/support/component-index.html"),
		specPattern: getSpecsBySuite(process.env.TEST_SUITE),
		devServer: {
			bundler: 'vite',
		}
	},
	video: false,
	screenshotOnRunFailure: false,
	scrollBehavior: false,
	viewportHeight: 1080,
	viewportWidth: 1440,
})

function getSpecsBySuite(suite) {
	return suites[suite] || [
		"**/specs/*.cy.{js,ts,jsx,tsx}",
		"**/specs/**/*.cy.{js,ts,jsx,tsx}",
	];
}
