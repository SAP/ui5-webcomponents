const os = require("os");
const { defineConfig } = require('vite');
const virtualIndex = require("@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js");

module.exports = defineConfig(async () => {
	return {
		build: {
			emptyOutDir: false,
		},
		server: {
			watch: {
				usePolling: os.platform === "darwin",
			},
		},
		plugins: [await virtualIndex()],
	}
});
