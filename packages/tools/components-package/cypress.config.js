const { defineConfig } = require('cypress')
const path = require("path");
const coverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
	component: {
		setupNodeEvents(on, config) {
			coverageTask(on, config)
			return config
		},
		supportFile: path.join(__dirname, "cypress/support/component.js"),
		indexHtmlFile: path.join(__dirname, "cypress/support/component-index.html"),
		specPattern: ["**/specs/*.cy.{js,ts}", "**/specs/**/*.cy.{js,ts}"],
		devServer: {
			framework: 'cypress-ct-lit',
			bundler: 'vite',
		}
	},
	video: false,
	screenshotOnRunFailure: false,
	scrollBehavior: false,
	viewportHeight: 1080,
	viewportWidth: 1440,
})