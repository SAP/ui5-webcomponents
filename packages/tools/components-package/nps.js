const path = require("path");

const LIB = path.join(__dirname, `../lib/`);
const NODE_MODULES_PATH = path.join(__dirname, `../../../node_modules/`);
const serveConfig = path.join(__dirname, `serve.json`);
const polyfillPath = path.join(NODE_MODULES_PATH, `/@webcomponents/webcomponentsjs/**/*.*`);

const getScripts = (options) => {

	const port = options.port;

	const scripts = {
		clean: "rimraf dist",
		lint: "eslint . --config config/.eslintrc.js",
		prepare: "nps clean build.templates build.styles build.i18n build.jsonImports copy build.samples",
		build: {
			default: "nps lint prepare build.bundle",
			templates: `mkdirp dist/generated/templates && node "${LIB}/hbs2ui5/index.js" -d src/ -o dist/generated/templates`,
			styles: {
				default: "nps build.styles.themes build.styles.components",
				themes: "postcss src/**/parameters-bundle.css --config config/postcss.themes --base src --dir dist/css/",
				components: "postcss src/themes/*.css --config config/postcss.components --base src --dir dist/css/",
			},
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `mkdirp dist/generated/i18n && node "${LIB}/i18n/defaults.js" src/i18n dist/generated/i18n`,
				json: `mkdirp dist/generated/assets/i18n && node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp dist/generated/json-imports && nps build.jsonImports.themes build.jsonImports.i18n",
				themes: `node "${LIB}/generate-json-imports/themes.js"`,
				i18n: `node "${LIB}/generate-json-imports/i18n.js"`,
			},
			bundle: "rollup --config config/rollup.config.js --environment ES5_BUILD",
			samples: {
				default: "nps build.samples.api build.samples.docs",
				api: `jsdoc -c "${LIB}/jsdoc/config.json"`,
				docs: `node "${LIB}/documentation/index.js" dist/api.json`,
			}
		},
		copy: {
			default: "nps copy.src copy.test copy.webcomponents-polyfill",
			src: "copy-and-watch \"src/**/*.js\" dist/",
			test: "copy-and-watch \"test/**/*.*\" dist/test-resources",
			"webcomponents-polyfill": `copy-and-watch "${polyfillPath}" dist/webcomponentsjs/`,
		},
		watch: {
			default: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles"',
			src: 'nps "copy.src --watch --skip-initial-copy"',
			test: 'nps "copy.test --watch --skip-initial-copy"',
			bundle: "rollup --config config/rollup.config.js -w --environment ES5_BUILD,DEV",
			styles: {
				default: 'concurrently "nps watch.styles.themes" "nps watch.styles.components"',
				themes: 'nps "build.styles.themes -w"',
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
			// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
			default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
			run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
		},
	};

	return scripts;
};

module.exports = getScripts;
