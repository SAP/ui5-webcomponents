module.exports = {
    scripts: {
        clean: "rimraf dist",
        build: {
            default: "nps clean build.styles",
            styles: {
                default: "nps build.styles.bundles",
                bundles: "lessc src/**/parameters-bundle.less dist/",
            },
        },
		start: 'nps watch',
        watch: 'nps "build.styles.bundles -w"',
    },
};
