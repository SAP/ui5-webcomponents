// vite.config.js
const virtualIndex = require('../lib/dev-server/virtual-index-html-plugin.js');

module.exports = {
	build: {
		emptyOutDir: false,
	},
	plugins: [virtualIndex()],
};