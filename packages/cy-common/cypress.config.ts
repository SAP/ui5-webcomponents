import { defineConfig } from "cypress";
// @ts-ignore
import viteConfig  from "../../vite.config.js";

export default defineConfig({
	component: {
		devServer: {
			framework: "@ui5/cypress-ct-ui5-webc" as any,
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
