module.exports = {
    scripts: {
        clean: "rimraf dist",
		build: "nps clean compile",
		start: "nps build watch",
		compile: {
			default: "nps compile.less compile.postcss",
			less: {
				default: "nps compile.less.belize compile.less.belize_hcb compile.less.fiori_3 compile.less.fiori_3_dark",
				belize: "lessc src/themes/sap_belize/parameters-bundle.less dist/themes/sap_belize/parameters-bundle.css",
				belize_hcb: "lessc src/themes/sap_belize_hcb/parameters-bundle.less dist/themes/sap_belize_hcb/parameters-bundle.css",
				fiori_3: "lessc src/themes/sap_fiori_3/parameters-bundle.less dist/themes/sap_fiori_3/parameters-bundle.css",
				fiori_3_dark: "lessc src/themes/sap_fiori_3_dark/parameters-bundle.less dist/themes/sap_fiori_3_dark/parameters-bundle.css"
			},
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.bundles --base dist/ --dir dist/css/",
		},
        watch: {
        	default: 'concurrently "nps watch.less" "nps watch.postcss"',
			less: 'chokidar "src/themes/**/*.less" -c "nps compile.less"',
			postcss: 'nps "compile.postcss -w"'
		},
    },
};
