module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.src build.themes build.postcss",
			src: `copy-and-watch "src/**/*.js" dist/`,
			themes: {
				default: "nps build.themes.prepare build.themes.belize build.themes.belize_hcb build.themes.belize_hcw build.themes.fiori_3 build.themes.fiori_3_dark",
				prepare: "rimraf dist/themes/ && mkdir dist/themes/ && mkdir dist/themes/sap_belize && mkdir dist/themes/sap_belize_hcb && mkdir dist/themes/sap_belize_hcw && mkdir dist/themes/sap_fiori_3 && mkdir dist/themes/sap_fiori_3_dark",
				belize: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize/css_variables.css" dist/themes/sap_belize/`,
				belize_hcb: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize_hcb/css_variables.css" dist/themes/sap_belize_hcb/`,
				belize_hcw: `lessc src/themes/sap_belize_hcw/parameters-bundle.less dist/themes/sap_belize_hcw/parameters-bundle.css`,
				fiori_3: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css" dist/themes/sap_fiori_3`,
				fiori_3_dark: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3_dark/css_variables.css" dist/themes/sap_fiori_3_dark`,
			},
			postcss: "postcss dist/themes/**/*.css --config config/postcss.themes --base dist/ --dir dist/css/",
		},
		start: "nps build watch",
		watch: {
			default: 'concurrently "nps watch.src" "nps watch.less" "nps watch.postcss"',
			src: `copy-and-watch --watch "src/**/*.js" dist/`,
			less: 'chokidar "src/themes/**/*.less" -c "nps build.themes"',
			postcss: 'nps "build.postcss -w"',
		},
	},
};
