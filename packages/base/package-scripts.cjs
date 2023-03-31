const resolve = require("resolve");
const path = require("path");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const esmAbsToRel = resolve.sync("@ui5/webcomponents-tools/lib/esm-abs-to-rel/index.js");
const preprocessJSDocScript = resolve.sync("@ui5/webcomponents-tools/lib/jsdoc/preprocess.js");

const LIB = path.join(__dirname, `../tools/lib/`);

const viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;

const scripts = {
	clean: "rimraf jsdoc-dist && rimraf src/generated && rimraf dist && rimraf .port",
	lint: `eslint .`,
	prepare: "cross-env UI5_TS=true nps clean integrate copy generateAssetParameters generateVersionInfo generateStyles generateTemplates typescript generateAPI",
	typescript: "tsc",
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
		default: `nps prepare lint build.bundle`,
		bundle: `vite build ${viteConfig}`,
	},
	copy: {
		default: "nps copy.src",
		src: `copy-and-watch "src/**/*.{js,css,d.ts}" dist/`,
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	generateVersionInfo: `node "${versionScript}"`,
	generateStyles: `node "${stylesScript}"`,
	generateTemplates: `mkdirp dist/generated/templates && node "${LIB}/hbs2ui5/index.js" -d test/elements -o dist/generated/templates`,
	generateAPI: {
		default: "nps generateAPI.prepare generateAPI.preprocess generateAPI.jsdoc generateAPI.cleanup",
		prepare: `copy-and-watch "dist/**/*.js" jsdoc-dist/`,
		preprocess: `node "${preprocessJSDocScript}" jsdoc-dist/`,
		jsdoc: `jsdoc -c "${LIB}/jsdoc/configTypescript.json"`,
		cleanup: "rimraf jsdoc-dist/"
	},
	watch: {
		default: 'concurrently "nps watch.src" "nps watch.styles" "nps watch.typescript"',
		withBundle: 'concurrently "nps watch.src" "nps watch.bundle" "nps watch.styles" "nps watch.typescript"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		typescript: 'tsc --watch',
		bundle: `node ${LIB}/dev-server/dev-server.js ${viteConfig}`,
		styles: 'chokidar "src/css/*.css" -c "nps generateStyles"'
	},
	start: "nps prepare watch.withBundle",
	test: {
		default: 'concurrently "nps test.wdio" "nps test.ssr" "nps test.ssr2"',
		ssr: `mocha test/ssr`,
		ssr2: "node -e \"import('./dist/Device.js')\"",
		wdio: `node "${LIB}/test-runner/test-runner.js"`
	},
};


module.exports = {
	scripts,
};
