import { defineConfig } from 'cypress';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import merge from "deepmerge";
import coverageTask from '@cypress/code-coverage/task';

const __processDir = process.cwd();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const suites = {
	SUITE1: [
		"**/specs/base/*.cy.{jsx,tsx}",
		"**/specs/[A-I]*.cy.{js,jsx,ts,tsx}",
	],
	SUITE2: [
		"**/specs/[^A-I]*.cy.{js,jsx,ts,tsx}",
	],
};

const indexHtmlFilePath = "./cypress/support/component-index.html"; // relative to the config file

const intialConfig = () => ({
	component: {
		setupNodeEvents(on, config) {
			coverageTask(on, config)
			return config
		},
		specPattern: suites[process.env.TEST_SUITE] || ["**/specs/**/*.cy.{js,ts,jsx,tsx}"],
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

const defineCypressConfig = (externalConrfig = {}) => {
	let indexHtmlFile;
	const config = intialConfig();

	if (externalConrfig.component?.indexHtmlFile) {
		indexHtmlFile = path.join(__processDir, externalConrfig.component.indexHtmlFile)
	} else if (!existsSync(path.join(__processDir, "cypress/", indexHtmlFilePath))) {
		indexHtmlFile = path.join(__dirname, indexHtmlFilePath);
	}

	if (!existsSync(path.join(__processDir, "vite.config.js")) && !externalConrfig.component?.devServer?.viteConfig) {
		config.component.devServer.viteConfig = import.meta.resolve("@ui5/webcomponents-tools/components-package/vite.config.js");
	}

	config.component.indexHtmlFile = indexHtmlFile;

	return defineConfig(merge(config, externalConrfig));
};

export { defineCypressConfig }