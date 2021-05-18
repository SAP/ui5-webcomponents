const resolve = require("resolve");

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const serve = resolve.sync("@ui5/webcomponents-tools/lib/serve/index.js");
const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `false`;
const UP_TO_DATE2 = `node "${hashIsUpToDate}" dist/ hash.txt && echo "Up to date."`;

const scripts = {
	clean: "find . -type f -print0 | grep -v node_modules | git check-ignore -z --stdin | xargs -0 rm",
	lint: "eslint . --config config/.eslintrc.js",
	prepare: "nps clean copy generateAssetParameters",
	build: {
		default: `${UP_TO_DATE} || nps lint prepare build.bundle hash`,
		bundle: "rollup --config config/rollup.config.js",
	},
	copy: {
		default: "nps copy.src copy.test",
		src: `copy-and-watch "src/**/*.js" ./`,
		test: `copy-and-watch "test/**/*.*" ./test-resources`,
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
	serve: `node "${serve}" --dir="./" --port=9191 --packageName="@ui5/webcomponents-base"`,
	test: {
		// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
		default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
		run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
	},
	hash: `find . -type f -print0 | git check-ignore -z --stdin | xargs -0 md5 | sort | md5`,
	hash2: `node "${generateHash}" dist/ hash.txt`,
};


module.exports = {
	scripts,
};
