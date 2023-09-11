const os = require("os");
const { defineConfig } = require('vite');
const virtualIndex = require("@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js");

// do not refresh from .json/.html on MacOS due to false positives
const ignored = os.platform() === "darwin" ? ["**/*.json", "**/*.html"] : [];

module.exports = defineConfig(async () => {
	return {
		build: {
			emptyOutDir: false,
		},
		server: {
			watch: {
				ignored,
			},
		},
		plugins: [await virtualIndex()],
	}
});
