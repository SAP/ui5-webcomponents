const resolve = require("resolve");
const path = require("path");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");

const LIB = path.join(__dirname, `../tools/lib/`);

const viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;

const scripts = {
	clean: "rimraf jsdoc-dist && rimraf src/generated && rimraf dist && rimraf .port",
	lint: `eslint .`,
	generate: "cross-env UI5_TS=true nps clean integrate copy generateAssetParameters generateVersionInfo generateStyles generateTemplates",
	prepare: "cross-env UI5_TS=true nps clean integrate copy generateAssetParameters generateVersionInfo generateStyles generateTemplates typescript integrate.no-remaining-require",
	typescript: "tsc -b",
	integrate: {
		default: "nps integrate.copy-used-modules integrate.amd-to-es6 integrate.third-party",
		"copy-used-modules": `node "${copyUsedModules}" ./used-modules.txt dist/`,
		"amd-to-es6": `node "${amdToES6}" dist/`,
		"no-remaining-require": `node "${noRequire}" dist/`,
		"third-party": {
			default: "nps integrate.third-party.copy integrate.third-party.fix",
			copy: "mkdirp dist/sap/ui/thirdparty/ && copy-and-watch ../../node_modules/@openui5/sap.ui.core/src/sap/ui/thirdparty/caja-html-sanitizer.js dist/sap/ui/thirdparty/",
			fix: "replace-in-file 240 xA0 dist/sap/ui/thirdparty/caja-html-sanitizer.js"
		},
	},
	build: {
		default: `nps prepare`,
		bundle: `vite build ${viteConfig}`,
	},
	copy: {
		default: "nps copy.src",
		src: `copy-and-watch "src/**/*.{js,css,d.ts}" dist/`,
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	generateVersionInfo: `node "${versionScript}"`,
	generateStyles: `node "${stylesScript}"`,
	generateTemplates: `mkdirp src/generated/templates && cross-env UI5_BASE=true UI5_TS=true node "${LIB}/hbs2ui5/index.js" -d test/elements -o src/generated/templates`,
	generateAPI: {
		default: "nps generateAPI.generateCEM generateAPI.validateCEM",
		generateCEM: `cem analyze --config  "${LIB}/cem/custom-elements-manifest.config.mjs" --dev`,
		validateCEM: `node "${LIB}/cem/validate.js" --dev`,
	},
	watch: {
		default: 'concurrently "nps watch.src" "nps watch.styles"',
		withBundle: 'concurrently "nps watch.src" "nps watch.bundle" "nps watch.styles"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		bundle: `node ${LIB}/dev-server/dev-server.js ${viteConfig}`,
		styles: 'chokidar "src/css/*.css" -c "nps generateStyles"'
	},
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
