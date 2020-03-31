module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.src build.themes build.postcss",
			src: `copy-and-watch "src/**/*.js" dist/`,
			themes: {
				default: "nps build.themes.belize build.themes.belize build.themes.belize_hcb build.themes.belize_hcw build.themes.fiori_3 build.themes.fiori_3_dark",
				belize: `lessc src/themes/sap_belize/base-parameters-vars.less dist/themes/sap_belize/parameters-bundle.css`,
				belize_hcb: `lessc src/themes/sap_belize_hcb/base-parameters-vars.less dist/themes/sap_belize_hcb/parameters-bundle.css`,
				belize_hcw: `lessc src/themes/sap_belize_hcw/base-parameters-vars.less dist/themes/sap_belize_hcw/parameters-bundle.css`,
				fiori_3: `lessc src/themes/sap_fiori_3/base-parameters-vars.less dist/themes/sap_fiori_3/parameters-bundle.css`,
				fiori_3_dark: `lessc src/themes/sap_fiori_3_dark/base-parameters-vars.less dist/themes/sap_fiori_3_dark/parameters-bundle.css`,
			},
			postcss: "postcss dist/themes/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
		},
		start: "nps build watch",
		watch: {
			default: 'concurrently "nps watch.src" "nps watch.less" "nps watch.postcss"',
			src: `copy-and-watch --watch "src/**/*.js" dist/`,
			less: 'chokidar "src/themes/**/*.css" -c "nps build"',
			postcss: 'nps "build.postcss -w"',
		},
	},
};
