// vite.config.js
const { defineConfig } = require('vite');
const virtualIndex = require("../lib/dev-server/virtual-index-html-plugin.js");

module.exports = defineConfig(async () => {
	return {
		build: {
			emptyOutDir: false,
		},
		plugins: [await virtualIndex()],
	}
});
