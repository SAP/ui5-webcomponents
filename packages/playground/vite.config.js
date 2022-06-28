// vite.config.js
const { defineConfig } = require("vite");

module.exports = defineConfig(async () => {
	return {
		build: {
            outDir: "assets/js/ui5-webcomponents",
			lib: {
                entry: "bundle.esm.js",
                formats: ["es"],
                fileName: () => "bundle.esm.js",
              },
		},
	}
});
