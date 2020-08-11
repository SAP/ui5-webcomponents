const path = require("path");
const fs = require("fs");

const LIB = path.join(__dirname, `../lib/`);
const serveConfig = path.join(__dirname, `serve.json`);
const polyfillDir = path.dirname(require.resolve("@webcomponents/webcomponentsjs"));
const polyfillPath = path.join(polyfillDir, "/**/*.*");
const version = JSON.parse(fs.readFileSync("package.json")).version;

const getScripts = (options) => {

	const port = options.port;

	const scripts = {
		clean: "rimraf dist",
		lint: "eslint . --config config/.eslintrc.js",
		prepare: "nps clean build.templates build.styles build.i18n build.jsonImports copy build.samples scope",
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
		scope: {
			default: "nps scope.clean scope.copy scope.replace",
			clean: "rimraf dist/scoped",
			copy: `node "${LIB}/copy-and-watch/index.js" "dist/**/*" dist/scoped`,
			replace: `node "${LIB}/scoping/index.js" dist/scoped ${version}`,
		},
		copy: {
			default: "nps copy.src copy.test copy.webcomponents-polyfill",
			src: `node "${LIB}/copy-and-watch/index.js" "src/**/*.js" dist/`,
			test: `node "${LIB}/copy-and-watch/index.js" "test/**/*.*" dist/test-resources`,
			"webcomponents-polyfill": `node "${LIB}/copy-and-watch/index.js" "${polyfillPath}" dist/webcomponentsjs/`,
		},
		watch: {
			default: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles"',
			src: 'nps "copy.src --watch --safe --skip-initial-copy"',
			test: 'nps "copy.test --watch --safe --skip-initial-copy"',
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
			prepare: `node "${LIB}/copy-and-watch/index.js" "${serveConfig}" dist/`,
			run: `serve --no-clipboard -l ${port} dist`,
		},
		test: {
			// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
			default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
			run: "cross-env WDIO_LOG_LEVEL=error FORCE_COLOR=0 wdio config/wdio.conf.js",
			spec: "wdio run config/wdio.conf.js",
		},
	};

	return scripts;
};

module.exports = getScripts;
