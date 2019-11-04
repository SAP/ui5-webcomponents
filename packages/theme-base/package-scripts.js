module.exports = {
    scripts: {
        clean: "rimraf dist",
        build: {
            default: "nps clean build.styles",
            styles: {
                default: "nps build.styles.bundles",
                bundles: "postcss src/**/parameters-bundle.css --config config/postcss.bundles --base src --dir dist/css/",
            },
        },
		start: 'nps watch',
        watch: 'nps "build.styles.bundles -w"',
    },
};
