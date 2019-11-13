module.exports = {
    scripts: {
        clean: "rimraf dist",
        build: {
            default: "nps clean build.styles",
            styles: {
				default: "nps build.styles.less build.styles.bundles",
				less: {
					default: "nps build.styles.less.belize build.styles.less.belize_hcb build.styles.less.fiori_3 build.styles.less.fiori_3_dark",
					belize: "lessc src/themes/sap_belize/parameters-bundle.less dist/themes/sap_belize/parameters-bundle.css",
					belize_hcb: "lessc src/themes/sap_belize_hcb/parameters-bundle.less dist/themes/sap_belize_hcb/parameters-bundle.css",
					fiori_3: "lessc src/themes/sap_fiori_3/parameters-bundle.less dist/themes/sap_fiori_3/parameters-bundle.css",
					fiori_3_dark: "lessc src/themes/sap_fiori_3_dark/parameters-bundle.less dist/themes/sap_fiori_3_dark/parameters-bundle.css"
				},
				bundles: "postcss dist/**/parameters-bundle.css --config config/postcss.bundles --base dist/ --dir dist/css/",
			},
        },
		start: 'nps watch',
        watch: 'nps "build.styles -w"',
    },
};
