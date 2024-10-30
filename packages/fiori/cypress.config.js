import { defineCypressConfig } from "@ui5/webcomponents-testing";
import viteConfig from "../../vite.config";

export default defineCypressConfig({
	component: {
		devServer: {
			viteConfig: viteConfig
		}
	}
});