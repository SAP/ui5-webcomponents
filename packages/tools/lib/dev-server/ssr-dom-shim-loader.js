const fs = require("fs");

/**
 * UI5Elements loads the ssr-dom.js file with a package specifier to use the export conditions
 * in the package.json so that a shim for the dom can be loaded from SSR environments
 * This however makes the TS Checker plugin used for development try to load the file from dist as input
 * This plugin loads an empty file and TS ignores the file completely
 */

const ssrDomShimLoader = async () => {
	return {
		name: 'ssr-dom-shim-loader',
		resolveId(id) {
			if (id === "@ui5/webcomponents-base/dist/ssr-dom.js") {
				return "\0shim"
			}
		},
		load(id) {
			if (id === "\0shim") {
				return "";
			}
		}
	}
};

module.exports = ssrDomShimLoader;