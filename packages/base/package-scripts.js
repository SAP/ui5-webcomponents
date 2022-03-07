const resolve = require("resolve");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const serve = resolve.sync("@ui5/webcomponents-tools/lib/serve/index.js");
const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const esmAbsToRel = resolve.sync("@ui5/webcomponents-tools/lib/esm-abs-to-rel/index.js");
const UP_TO_DATE = `node "${hashIsUpToDate}" dist/ hash.txt && echo "Up to date."`;

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
		default: `${UP_TO_DATE} || nps lint prepare build.bundle hash`,
		bundle: "rollup --config config/rollup.config.js",
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
		default: 'concurrently "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		test: 'nps "copy.test --watch --skip-initial-copy"',
		bundle: "rollup --config config/rollup.config.js -w --environment DEV",
		styles: 'chokidar "src/css/*.css" -c "nps generateStyles"'
	},
	dev: 'concurrently "nps serve" "nps watch"',
	start: "nps prepare dev",
	serve: `node "${serve}" --dir="dist/" --port=9191 --packageName="@ui5/webcomponents-base"`,
	test: {
		// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
		default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
		run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
	},
	hash: `node "${generateHash}" dist/ hash.txt`,
};


module.exports = {
	scripts,
};
