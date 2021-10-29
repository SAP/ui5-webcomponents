const resolve = require("resolve");
const path = require("path");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const esmAbsToRel = resolve.sync("@ui5/webcomponents-tools/lib/esm-abs-to-rel/index.js");

const LIB = path.join(__dirname, `../tools/lib/`);

const scripts = {
	clean: "rimraf dist && rimraf .port",
	lint: "eslint . --config config/.eslintrc.js",
	prepare: "nps clean integrate copy generateAssetParameters generateVersionInfo generateStyles",
	integrate: {
		default: "nps integrate.copy-used-modules integrate.replace-amd integrate.amd-to-es6 integrate.esm-abs-to-rel integrate.third-party",
		"copy-used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		"replace-amd": "replace-in-file sap.ui.define define dist/**/*.js",
		"amd-to-es6": "amdtoes6 --src=dist/ --replace --glob=**/*.js",
		"esm-abs-to-rel": `node "${esmAbsToRel}" dist/ dist/`,
		"third-party": {
			default: "nps integrate.third-party.copy integrate.third-party.fix",
			copy: "mkdirp dist/sap/ui/thirdparty/ && copy-and-watch ../../node_modules/@openui5/sap.ui.core/src/sap/ui/thirdparty/caja-html-sanitizer.js dist/sap/ui/thirdparty/",
			fix: "replace-in-file 240 xA0 dist/sap/ui/thirdparty/caja-html-sanitizer.js"
		},
	},
	build: {
		default: `nps lint prepare build.bundle`,
		bundle: "vite build -c config/vite.config.js",
	},
	copy: {
		default: "nps copy.src copy.test",
		src: `copy-and-watch "src/**/*.{js,css}" dist/`,
		test: `copy-and-watch "test/**/*.*" dist/test-resources`,
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	generateVersionInfo: `node "${versionScript}"`,
	generateStyles: `node "${stylesScript}"`,
	watch: {
		default: 'concurrently "nps watch.src" "nps watch.styles"',
		withBundle: 'concurrently "nps watch.src" "nps watch.bundle" "nps watch.styles"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		bundle: "vite -c config/vite.config.js --open",
		styles: 'chokidar "src/css/*.css" -c "nps generateStyles"'
	},
	start: "nps prepare watch.withBundle",
	test: `node "${LIB}/test-runner/test-runner.js"`,
};


module.exports = {
	scripts,
};
