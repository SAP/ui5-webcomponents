module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.src build.themes build.postcss",
			src: `copy-and-watch "src/**/*.js" dist/`,
			themes: {
				default: "nps build.themes.prepare build.themes.belize build.themes.hcb build.themes.hcw build.themes.fiori_3 build.themes.fiori_3_dark ",
				prepare: "rimraf dist/themes && mkdirp dist/themes/sap_belize && mkdirp dist/themes/sap_belize_hcb && mkdirp dist/themes/sap_belize_hcw && mkdirp dist/themes/sap_fiori_3 &&  mkdirp dist/themes/sap_fiori_3_dark",
				belize: `nps build.themes.copy_belize_vars build.themes.copy_belize_bundle`,
				copy_belize_vars: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize/css_variables.css" dist/themes/sap_belize/`,
				copy_belize_bundle: `copy-and-watch "src/themes/sap_belize/parameters-bundle.css" dist/themes/sap_belize/`,
				hcb: `nps build.themes.copy_hcb_vars build.themes.copy_hcb_bundle`,
				copy_hcb_vars: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize_hcb/css_variables.css" dist/themes/sap_belize_hcb/`,
				copy_hcb_bundle: `copy-and-watch "src/themes/sap_belize_hcb/parameters-bundle.css" dist/themes/sap_belize_hcb/`,
				hcw: `nps build.themes.copy_hcw_vars build.themes.copy_hcw_bundle`,
				copy_hcw_vars: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_belize_hcw/css_variables.css" dist/themes/sap_belize_hcw/`,
				copy_hcw_bundle: `copy-and-watch "src/themes/sap_belize_hcw/parameters-bundle.css" dist/themes/sap_belize_hcw/`,
				fiori_3: `nps build.themes.copy_fiori_3_vars build.themes.copy_fiori_3_bundle`,
				copy_fiori_3_vars: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css" dist/themes/sap_fiori_3/`,
				copy_fiori_3_bundle: `copy-and-watch "src/themes/sap_fiori_3/parameters-bundle.css" dist/themes/sap_fiori_3/`,
				fiori_3_dark: `nps build.themes.copy_fiori_3_dark_vars build.themes.copy_fiori_3_dark_bundle`,
				copy_fiori_3_dark_vars: `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3_dark/css_variables.css" dist/themes/sap_fiori_3_dark/`,
				copy_fiori_3_dark_bundle: `copy-and-watch "src/themes/sap_fiori_3_dark/parameters-bundle.css" dist/themes/sap_fiori_3_dark/`,
			},
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
		},
		start: "nps build"
	},
};
