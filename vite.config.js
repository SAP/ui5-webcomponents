const os = require("os");
const { defineConfig } = require('vite');
const virtualIndex = require("@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js");

const ignored = os.platform() === "darwin" ? ["**/*.json"] : []; // do not refresh from .json on MacOS

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
