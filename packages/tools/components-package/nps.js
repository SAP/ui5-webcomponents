const path = require("path");

const LIB = path.join(__dirname, `../lib/`);
const serveConfig = path.join(__dirname, `serve.json`);

const getScripts = (options) => {

	const jestTask = options.hasJest ? `test.jest` : ``;
	const port = options.port;

	const scripts = {
		clean: "rimraf dist",
		lint: "eslint . --config config/.eslintrc.js",
		prepare: "nps clean build.templates build.samples build.styles build.i18n copy.src copy.webcomponents-polyfill",
		build: {
			default: "nps lint prepare build.bundle",
			templates: `mkdirp dist/generated/templates && node ${LIB}/hbs2ui5/index.js -d src/ -o dist/generated/templates`,
			styles: {
				default: "nps build.styles.bundles build.styles.components",
				bundles: "postcss src/**/parameters-bundle.css --config config/postcss.bundles --base src --dir dist/css/",
				components: "postcss src/themes/*.css --config config/postcss.components --base src --dir dist/css/",
			},
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node ${LIB}/i18n/defaults.js src/i18n dist/generated/i18n`,
				json: `mkdirp dist/assets/i18n && node ${LIB}/i18n/toJSON.js src/i18n dist/assets/i18n`,
			},
			bundle: "rollup --config config/rollup.config.js --environment ES5_BUILD",
			samples: {
				default: "nps copy.test build.samples.api build.samples.docs",
				api: `jsdoc -c  ${LIB}/jsdoc/config.json`,
				docs: `node ${LIB}/documentation/index.js dist/api.json`,
			}
		},
		copy: {
			src: "copy-and-watch \"src/**/*.js\" dist/",
			test: "copy-and-watch \"test/**/*.*\" dist/test-resources",
			"webcomponents-polyfill": "copy-and-watch \"../../node_modules/@webcomponents/webcomponentsjs/**/*.*\" dist/webcomponentsjs/",
		},
		watch: {
			default: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles"',
			src: 'nps "copy.src --watch --skip-initial-copy"',
			test: 'nps "copy.test --watch --skip-initial-copy"',
			bundle: "rollup --config config/rollup.config.js -w --environment ES5_BUILD,DEV",
			styles: {
				default: 'concurrently "nps watch.styles.bundles" "nps watch.styles.components"',
				bundles: 'nps "build.styles.bundles -w"',
				components: 'nps "build.styles.components -w"',
			},
			templates: "chokidar \"src/**/*.hbs\" -c \"nps build.templates\"",
			samples: "chokidar \"test/**/*.sample.html\" -c \"nps build.samples\"",
		},
		dev: 'concurrently "nps serve" "nps watch"',
		start: "nps prepare dev",
		serve: {
			default: "nps serve.prepare serve.run",
			prepare: `copy-and-watch "${serveConfig}" dist/`,
			run: `serve --no-clipboard -l ${port} dist`,
		},
		test: {
			default: `nps ${jestTask} test.wdio`,
			jest: "jest",
			wdio: {
				// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
				default: 'concurrently "nps serve" "nps test.wdio.run" --kill-others --success first',
				run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
			},
		},
	};

	return scripts;
};

module.exports = getScripts;
