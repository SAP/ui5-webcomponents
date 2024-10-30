import { defineCypressConfig } from "@ui5/webcomponents-testing/cypress/config.js";
import viteConfig from "../../vite.config";

export default defineCypressConfig({
	component: {
		devServer: {
			viteConfig: viteConfig
		}
	}
});