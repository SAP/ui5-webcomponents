const path = require("path");
const fs = require("fs");

const LIB = path.join(__dirname, `../lib/`);
const packageName = JSON.parse(fs.readFileSync("./package.json")).name;

const getScripts = (options) => {

	const port = options.port || 8080; // preferred port
	const portStep = options.portStep || 1; // step to check for available ports, if preferred port is already used
	let illustrations = options.illustrationsData || [];

	illustrations = illustrations.map(illustration => `node "${LIB}/create-illustrations/index.js" ${illustration.path} ${illustration.defaultText} ${illustration.illustrationsPrefix} ${illustration.set} ${illustration.destinationPath}`);

	let illustrationsScript = illustrations.join(" && ");

	const scripts = {
		clean: "rimraf dist && rimraf .port",
		lint: "eslint . --config config/.eslintrc.js",
		lintfix: "eslint . --config config/.eslintrc.js --fix",
		prepare: {
			default: "nps clean prepare.all",
			all: 'concurrently "nps build.templates" "nps build.i18n" "nps prepare.styleRelated" "nps copy" "nps build.samples" "nps build.illustrations"',
			styleRelated: "nps build.styles build.jsonImports",
		},
		build: {
			default: "nps lint prepare build.bundle",
			templates: `mkdirp dist/generated/templates && node "${LIB}/hbs2ui5/index.js" -d src/ -o dist/generated/templates`,
			styles: {
				default: "nps build.styles.themes build.styles.components",
				themes: `node "${LIB}/postcss-p/postcss-p.mjs"`,
				components: "postcss src/themes/*.css --config config/postcss.components --base src --dir dist/css/", // When updating this, also update the new files script
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
			bundle: "rollup --config config/rollup.config.js",
			samples: {
				default: "nps build.samples.api build.samples.docs",
				api: `jsdoc -c "${LIB}/jsdoc/config.json"`,
				docs: `node "${LIB}/documentation/index.js" dist/api.json`,
			},
			illustrations: illustrationsScript
		},
		copy: {
			default: "nps copy.src copy.props copy.test",
			src: `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
			props: `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.properties" dist/`,
			test: `node "${LIB}/copy-and-watch/index.js" --silent "test/**/*.*" dist/test-resources`,
		},
		watch: {
			default: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.bundle" "nps watch.styles" "nps watch.i18n"',
			src: 'nps "copy.src --watch --safe --skip-initial-copy"',
			props: 'nps "copy.props --watch --safe --skip-initial-copy"',
			test: 'nps "copy.test --watch --safe --skip-initial-copy"',
			bundle: 'rollup --config config/rollup.config.js -w --environment DEV',
			styles: {
				default: 'concurrently "nps watch.styles.themes" "nps watch.styles.components"',
				themes: 'nps "build.styles.themes -w"',
				components: {
					default: 'concurrently "nps watch.styles.components.existingFiles" "nps watch.styles.components.newFiles"',
					existingFiles: `nps "build.styles.components -w"`,
					newFiles: `node "${LIB}/postcss-new-files/index.js" --srcFiles="src/themes/*.css"`,
				},
			},
			templates: 'chokidar "src/**/*.hbs" -c "nps build.templates"',
			samples: 'chokidar "test/**/*.sample.html" -c "nps build.samples"',
			i18n: 'chokidar "src/i18n/messagebundle.properties" -c "nps build.i18n.defaultsjs"'
		},
		dev: 'concurrently "nps serve" "nps watch"',
		start: "nps prepare dev",
		serve: `node "${LIB}/serve/index.js" --dir="dist/" --port=${port} --portStep=${portStep} --packageName="${packageName}"`,
		test: {
			// --success first - report the exit code of the test run (first command to finish), as serve is always terminated and has a non-0 exit code
			default: 'concurrently "nps serve" "nps test.run" --kill-others --success first',
			run: "cross-env WDIO_LOG_LEVEL=error wdio config/wdio.conf.js",
			spec: "wdio run config/wdio.conf.js",
		},
		"test-suite-1": {
			default: 'concurrently "nps serve" "nps test-suite-1.run" --kill-others --success first',
			run: "cross-env WDIO_LOG_LEVEL=error wdio config/wdio.conf.js --suite suite1",
		},
		"test-suite-2": {
			default: 'concurrently "nps serve" "nps test-suite-2.run" --kill-others --success first',
			run: "cross-env WDIO_LOG_LEVEL=error wdio config/wdio.conf.js --suite suite2",
		},
		startWithScope: "nps scope.prepare scope.dev",
		scope: {
			prepare: "nps scope.lint prepare scope.testPages",
			lint: `node "${LIB}/scoping/lint-src.js"`,
			testPages: {
				default: "nps scope.testPages.clean scope.testPages.copy scope.testPages.replace",
				clean: "rimraf dist/test-resources/pages/scoped",
				copy: `node "${LIB}/copy-and-watch/index.js" --silent "dist/test-resources/pages/**/*" dist/test-resources/scoped`,
				replace: `node "${LIB}/scoping/scope-test-pages.js" dist/test-resources/scoped demo`,
			},
			dev: 'concurrently "nps serve" "nps scope.watch"',
			watch: 'concurrently "nps watch.templates" "nps watch.samples" "nps watch.test" "nps watch.src" "nps watch.props" "nps scope.bundle" "nps watch.styles"',
			bundle: 'rollup --config config/rollup.config.js -w --environment DEV,SCOPE'
		}
	};

	return scripts;
};

module.exports = getScripts;
