const resolve = require("resolve");
const path = require("path");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const esmAbsToRel = resolve.sync("@ui5/webcomponents-tools/lib/esm-abs-to-rel/index.js");

const LIB = path.join(__dirname, `../tools/lib/`);

const viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;
const eslintConfig = `--config ${require.resolve("@ui5/webcomponents-tools/components-package/eslint.js")}`;

const scripts = {
	clean: "rimraf dist && rimraf .port",
	lint: `eslint . ${eslintConfig}`,
	prepare: "nps clean integrate copy generateAssetParameters generateVersionInfo generateStyles generateTemplates generateAPI",
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
		bundle: `vite build ${viteConfig}`,
	},
	copy: {
		default: "nps copy.src",
		src: `copy-and-watch "src/**/*.{js,css}" dist/`,
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	generateVersionInfo: `node "${versionScript}"`,
	generateStyles: `node "${stylesScript}"`,
	generateTemplates: `mkdirp dist/generated/templates && node "${LIB}/hbs2ui5/index.js" -d test/elements -o dist/generated/templates`,
	generateAPI: `jsdoc -c "${LIB}/jsdoc/config.json"`,
	watch: {
		default: 'concurrently "nps watch.src" "nps watch.styles"',
		withBundle: 'concurrently "nps watch.src" "nps watch.bundle" "nps watch.styles"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		bundle: `node ${LIB}/dev-server/dev-server.js ${viteConfig}`,
		styles: 'chokidar "src/css/*.css" -c "nps generateStyles"'
	},
	start: "nps prepare watch.withBundle",
	test: `node "${LIB}/test-runner/test-runner.js"`,
};


module.exports = {
	scripts,
};
