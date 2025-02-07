// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";
import viteConfig from "../../vite.config.js";

const suites = {
	SUITE1: [
		"**/specs/base/*.cy.{jsx,tsx}",
		"**/specs/[A-I]*.cy.{js,jsx,ts,tsx}",
	],
	SUITE2: [
		"**/specs/[^A-I]*.cy.{js,jsx,ts,tsx}",
	],
};

export default defineConfig({
	component: {
		specPattern: suites[process.env.TEST_SUITE] || ["**/specs/**/*.cy.{js,ts,jsx,tsx}"],
		devServer: {
			framework: "@ui5/cypress-ct-ui5-webc",
			bundler: "vite",
			viteConfig,
		},
	},
	video: false,
	screenshotOnRunFailure: false,
	scrollBehavior: false,
	viewportHeight: 1080,
	viewportWidth: 1440,
});
