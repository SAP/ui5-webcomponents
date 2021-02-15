const path = require("path");

const LIB = path.join(__dirname, `../lib/`);
const serveConfig = path.join(__dirname, `serve.json`);
const polyfillDir = path.dirname(require.resolve("@webcomponents/webcomponentsjs"));
const polyfillPath = path.join(polyfillDir, "/**/*.*");

const getScripts = (options) => {

	const port = options.port;

	const scripts = {
		clean: "rimraf dist",
		lint: "",
		lintfix: "eslint . --config config/.eslintrc.js --fix",
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
				defaultsjs: `node "${LIB}/i18n/defaults.js" src/i18n dist/generated/i18n`,
				json: `node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp dist/generated/json-imports && nps build.jsonImports.themes build.jsonImports.i18n",
				themes: `node "${LIB}/generate-json-imports/themes.js" dist/generated/assets/themes dist/generated/json-imports`,
				i18n: `node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n dist/generated/json-imports`,
			},
			bundle: "rollup --config config/rollup.config.js --environment ES5_BUILD",
			samples: {
				default: "nps build.samples.api build.samples.docs",
				api: `jsdoc -c "${LIB}/jsdoc/config.json"`,
				docs: `node "${LIB}/documentation/index.js" dist/api.json`,
			}
		},
		copy: {
			default: "nps copy.src copy.props copy.test copy.webcomponents-polyfill",
			src: `node "${LIB}/copy-and-watch/index.js" "src/**/*.js" dist/`,
			props: `node "${LIB}/copy-and-watch/index.js" "src/**/*.properties" dist/`,
			test: `node "${LIB}/copy-and-watch/index.js" "test/**/*.*" dist/test-resources`,
			"webcomponents-polyfill": `node "${LIB}/copy-and-watch/index.js" "${polyfillPath}" dist/webcomponentsjs/`,
		},
		watch: {
			default: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles"',
			src: 'nps "copy.src --watch --safe --skip-initial-copy"',
			props: 'nps "copy.props --watch --safe --skip-initial-copy"',
			test: 'nps "copy.test --watch --safe --skip-initial-copy"',
			bundle: "rollup --config config/rollup.config.js -w --environment ES5_BUILD,DEV,DEPLOY_PUBLIC_PATH:/resources/",
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
			prepare: `node "${LIB}/copy-and-watch/index.js" "${serveConfig}" dist/`,
			run: `serve --no-clipboard -l ${port} dist`,
		},
		test: {
			// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
			default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
			run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
			spec: "wdio run config/wdio.conf.js",
		},
		startWithScope: "nps scope.prepare scope.dev",
		scope: {
			prepare: "nps scope.lint prepare scope.testPages",
			lint: `node "${LIB}/scoping/lint-src.js"`,
			testPages: {
				default: "nps scope.testPages.clean scope.testPages.copy scope.testPages.replace",
				clean: "rimraf dist/test-resources/pages/scoped",
				copy: `node "${LIB}/copy-and-watch/index.js" "dist/test-resources/pages/**/*" dist/test-resources/scoped`,
				replace: `node "${LIB}/scoping/scope-test-pages.js" dist/test-resources/scoped demo`,
			},
			dev: 'concurrently "nps serve" "nps scope.watch"',
			watch: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.props" "nps scope.bundle" "nps watch.styles"',
			bundle: "rollup --config config/rollup.config.js -w --environment ES5_BUILD,DEV,SCOPE"
		}
	};

	return scripts;
};

module.exports = getScripts;
