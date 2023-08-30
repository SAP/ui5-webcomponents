const { defineConfig } = require('vite');
const virtualIndex = require("@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js");

module.exports = defineConfig(async () => {
	return {
		build: {
			emptyOutDir: false,
		},
		server: {
			hmr: false,
		},
		plugins: [await virtualIndex()],
	}
});
