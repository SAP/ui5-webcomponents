module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.src build.less build.postcss",
			src: `copy-and-watch "src/**/*.js" dist/`,
			less: {
				default: "nps build.less.create_dirs build.less.belize build.less.belize_hcb build.less.belize_hcw build.less.fiori_3 build.less.fiori_3_dark",
				create_dirs: "mkdir dist/themes/ && mkdir dist/themes/sap_belize && mkdir dist/themes/sap_belize_hcb && mkdir dist/themes/sap_belize_hcw && mkdir dist/themes/sap_fiori_3 && mkdir dist/themes/sap_fiori_3_dark",
				belize: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize/css_variables.css" dist/themes/sap_belize/`,
				belize_hcb: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize_hcb/css_variables.css" dist/themes/sap_belize_hcb/`,
				belize_hcw: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize_hcw/css_variables.css" dist/themes/sap_belize_hcw/`,
				fiori_3: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css" dist/themes/sap_fiori_3`,
				fiori_3_dark: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3_dark/css_variables.css" dist/themes/sap_fiori_3_dark`,
			},
			postcss: "postcss dist/**/css_variables.css --config config/postcss.themes --base dist/ --dir dist/css/",
		},
		start: "nps build watch",
		watch: {
			default: 'concurrently "nps watch.src" "nps watch.less" "nps watch.postcss"',
			src: `copy-and-watch --watch "src/**/*.js" dist/`,
			less: 'chokidar "src/themes/**/*.less" -c "nps build.less"',
			postcss: 'nps "build.postcss -w"',
		},
	},
};
