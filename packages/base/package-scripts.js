const path = require("path");
const resolve = require("resolve");

const serveConfig = `../tools/components-package/serve.json`;
const port = `9191`;

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");

const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `node ${hashIsUpToDate} dist/ hash.txt && echo "Up to date."`;

const scripts = {
	clean: "rimraf dist",
	lint: "eslint . --config config/.eslintrc.js",
	prepare: "nps clean copy generateAssetParameters",
	build: {
		default: `${UP_TO_DATE} || nps lint prepare build.bundle hash`,
		bundle: "rollup --config config/rollup.config.js",
	},
	copy: {
		default: "nps copy.src copy.test",
		src: "copy-and-watch \"src/**/*.js\" dist/",
		test: "copy-and-watch \"test/**/*.*\" dist/test-resources",
	},
	generateAssetParameters: `node "${assetParametersScript}"`,
	watch: {
		default: 'concurrently "nps watch.test" "nps watch.src" "nps watch.bundle"',
		src: 'nps "copy.src --watch --skip-initial-copy"',
		test: 'nps "copy.test --watch --skip-initial-copy"',
		bundle: "rollup --config config/rollup.config.js -w --environment DEV",
	},
	dev: 'concurrently "nps serve" "nps watch"',
	start: "nps prepare dev",
	serve: {
		default: "nps serve.prepare serve.run",
		prepare: `copy-and-watch "${serveConfig}" dist/`,
		run: `serve --no-clipboard -l ${port} dist`,
	},
	test: {
		// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
		default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
		run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
	},
	hash: `node ${generateHash} dist/ hash.txt`,
};


module.exports = {
	scripts,
};
