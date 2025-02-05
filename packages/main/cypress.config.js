// eslint-disable-next-line import/no-extraneous-dependencies
import { defineCypressConfig } from "@ui5/webcomponents-testing";
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

export default defineCypressConfig({
	component: {
		specPattern: suites[process.env.TEST_SUITE] || ["**/specs/**/*.cy.{js,ts,jsx,tsx}"],
		devServer: {
			viteConfig,
		},
	},
});
