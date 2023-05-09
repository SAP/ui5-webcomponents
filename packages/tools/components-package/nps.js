const path = require("path");
const fs = require("fs");
const resolve = require("resolve");
const LIB = path.join(__dirname, `../lib/`);
const preprocessJSDocScript = resolve.sync("@ui5/webcomponents-tools/lib/jsdoc/preprocess.js");

const getScripts = (options) => {

	// The script creates all JS modules (dist/illustrations/{illustrationName}.js) out of the existing SVGs
	const illustrationsData = options.illustrationsData || [];
	const illustrations = illustrationsData.map(illustration => `node "${LIB}/create-illustrations/index.js" ${illustration.path} ${illustration.defaultText} ${illustration.illustrationsPrefix} ${illustration.set} ${illustration.destinationPath}`);
	const createIllustrationsJSImportsScript = illustrations.join(" && ");

	// The script creates the "dist/generated/js-imports/Illustration.js" file that registers loaders (dynamic JS imports) for each illustration
	const illustrationDestinationPaths = illustrationsData.map(illustrations => illustrations.destinationPath);
	const createIllustrationsLoadersScript = options.fioriPackage ? `node ${LIB}/generate-js-imports/illustrations.js ${illustrationDestinationPaths[0]} ${illustrationDestinationPaths[1]} dist/generated/js-imports` : "";
	const tsOption = options.typescript;
	const tsCommand = tsOption ? "tsc" : "";
	const tsWatchCommand = tsOption ? "tsc --watch" : "";
	const tsCrossEnv = tsOption ? "cross-env UI5_TS=true" : "";
	const copySrcGenerated = tsOption ? "" : "copy.srcGenerated";

	if (tsOption) {
		try {
			require("typescript");
		} catch(e) {
			console.error(`TypeScript is not found. Try to install it by running \`npm install --save-dev typescript\` if you are using npm or by running \`yarn add --dev typescript\` if you are using yarn.`);
			process.exit(e.code);
		}
	}

	let viteConfig;
	if (fs.existsSync("config/vite.config.js")) {
		// old project setup where config file is in separate folder
		viteConfig = "-c config/vite.config.js";
	} else if (fs.existsSync("vite.config.js")) {
		// preferred way of custom configuration in root project folder
		viteConfig = "";
	} else {
		// no custom configuration - use default from tools project
		viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;
	}

	let eslintConfig;
	if (fs.existsSync(".eslintrc.js") || fs.existsSync(".eslintrc.cjs")) {
		// preferred way of custom configuration in root project folder
		eslintConfig = "";
	} else {
		// no custom configuration - use default from tools project
		eslintConfig = `--config  "${require.resolve("@ui5/webcomponents-tools/components-package/eslint.js")}"`;
	}

	const scripts = {
		clean: 'rimraf jsdoc-dist && rimraf src/generated && rimraf dist && rimraf .port && nps "scope.testPages.clean"',
		lint: `eslint . ${eslintConfig}`,
		lintfix: `eslint . ${eslintConfig} --fix`,
		prepare: {
			default: `${tsCrossEnv} nps clean prepare.all typescript generateAPI`,
			all: 'concurrently "nps build.templates" "nps build.i18n" "nps prepare.styleRelated" "nps copy" "nps build.illustrations"',
			styleRelated: "nps build.styles build.jsonImports build.jsImports",
		},
		typescript: tsCommand,
		build: {
			default: "nps prepare lint build.bundle",
			templates: `mkdirp dist/generated/templates && ${tsCrossEnv} node "${LIB}/hbs2ui5/index.js" -d src/ -o src/generated/templates`,
			styles: {
				default: `nps build.styles.themes build.styles.components ${copySrcGenerated}`,
				themes: `node "${LIB}/postcss-p/postcss-p.mjs"`,
				components: "postcss src/themes/*.css --config config/postcss.components --base src --dir dist/css/", // When updating this, also update the new files script
			},
			i18n: {
				default: "nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
				json: `node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "mkdirp dist/generated/json-imports && nps build.jsonImports.themes build.jsonImports.i18n",
				themes: `node "${LIB}/generate-json-imports/themes.js" dist/generated/assets/themes dist/generated/json-imports`,
				i18n: `node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n dist/generated/json-imports`,
			},
			jsImports: {
				default: "mkdirp dist/generated/js-imports && nps build.jsImports.illustrationsLoaders",
				illustrationsLoaders: createIllustrationsLoadersScript,
			},
			bundle: `vite build ${viteConfig}`,
			illustrations: createIllustrationsJSImportsScript,
		},
		copy: {
			default: "nps copy.src copy.props",
			src: `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`,
			srcGenerated: `node "${LIB}/copy-and-watch/index.js" --silent "src/generated/**/*.js" dist/generated/`,
			props: `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.properties" dist/`,
		},
		watch: {
			default: `${tsCrossEnv} concurrently "nps watch.templates" "nps watch.api" "nps watch.src" "nps watch.typescript" "nps watch.styles" "nps watch.i18n" "nps watch.props"`,
			devServer: 'concurrently "nps watch.default" "nps watch.bundle"',
			src: 'nps "copy.src --watch --safe --skip-initial-copy"',
			typescript: tsWatchCommand,
			props: 'nps "copy.props --watch --safe --skip-initial-copy"',
			bundle: `node ${LIB}/dev-server/dev-server.js ${viteConfig}`,
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
			api: 'chokidar "test/**/*.sample.html" -c "nps generateAPI"',
			i18n: 'chokidar "src/i18n/messagebundle.properties" -c "nps build.i18n.defaultsjs"'
		},
		start: "nps prepare watch.devServer",
		test: `node "${LIB}/test-runner/test-runner.js"`,
		"test-suite-1": `node "${LIB}/test-runner/test-runner.js" --suite suite1`,
		"test-suite-2": `node "${LIB}/test-runner/test-runner.js" --suite suite2`,
		startWithScope: "nps scope.prepare scope.watchWithBundle",
		scope: {
			prepare: "nps scope.lint prepare scope.testPages",
			lint: `node "${LIB}/scoping/lint-src.js"`,
			testPages: {
				default: "nps scope.testPages.clean scope.testPages.copy scope.testPages.replace",
				clean: "rimraf test/pages/scoped",
				copy: `node "${LIB}/copy-and-watch/index.js" --silent "test/pages/**/*" test/pages/scoped`,
				replace: `node "${LIB}/scoping/scope-test-pages.js" test/pages/scoped demo`,
			},
			watchWithBundle: 'concurrently "nps scope.watch" "nps scope.bundle" ',
			watch: 'concurrently "nps watch.templates" "nps watch.api" "nps watch.src" "nps watch.props" "nps watch.styles"',
			bundle: `node ${LIB}/dev-server/dev-server.js ${viteConfig}`,
		},
		generateAPI: {
			default: "nps generateAPI.prepare generateAPI.preprocess generateAPI.jsdoc generateAPI.cleanup generateAPI.prepareManifest",
			prepare: `node "${LIB}/copy-and-watch/index.js" --silent "dist/**/*.js" jsdoc-dist/`,
			prepareManifest: `node "${LIB}/generate-custom-elements-manifest/index.js" dist dist`,
			preprocess: `node "${preprocessJSDocScript}" jsdoc-dist/ src`,
			jsdoc: `jsdoc -c "${LIB}/jsdoc/configTypescript.json"`,
			cleanup: "rimraf jsdoc-dist/"
		},
	};

	return scripts;
};

module.exports = getScripts;
