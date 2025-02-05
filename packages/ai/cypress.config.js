// eslint-disable-next-line import/no-extraneous-dependencies
import { defineCypressConfig } from "@ui5/webcomponents-testing";
import viteConfig from "../../vite.config.js";

export default defineCypressConfig({
	component: {
		devServer: {
			viteConfig,
		},
	},
});
