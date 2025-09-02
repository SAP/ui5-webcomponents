const path = require("path");
const fs = require("fs");
const LIB = path.join(__dirname, `../lib/`);
let websiteBaseUrl = "/";

if (process.env.DEPLOY) {
	websiteBaseUrl = "/ui5-webcomponents/";
} else if (process.env.DEPLOY_NIGHTLY) {
	websiteBaseUrl = "/ui5-webcomponents/nightly/";
}

const cypressEnvVariables = (options, predefinedVars) => {
	let variables = [];
	const { cypress_code_coverage, cypress_acc_tests } = options.internal ?? {};

	// Handle environment variables like TEST_SUITE
	if (predefinedVars) {
		variables = [...predefinedVars];
	}

	// The coverage task is always registered and requires an explicit variable whether to generate a report or not
	variables.push(`CYPRESS_COVERAGE=${!!cypress_code_coverage}`);

	if (cypress_acc_tests) {
		variables.push("CYPRESS_UI5_ACC=true");
	}

	return variables.length ? `cross-env ${variables.join(" ")}` : "";
}

const getScripts = (options) => {

	// The script creates all JS modules (dist/illustrations/{illustrationName}.js) out of the existing SVGs
	const illustrationsData = options.illustrationsData || [];
	const illustrations = illustrationsData.map(illustration => `node "${LIB}/create-illustrations/index.js" ${illustration.path} ${illustration.defaultText} ${illustration.illustrationsPrefix} ${illustration.set} ${illustration.destinationPath} ${illustration.collection}`);
	const createIllustrationsJSImportsScript = illustrations.join(" && ");

	// The script creates the "src/generated/js-imports/Illustration.js" file that registers loaders (dynamic JS imports) for each illustration
	const createIllustrationsLoadersScript = illustrationsData.map(illustrations => `node ${LIB}/generate-js-imports/illustrations.js ${illustrations.path} ${illustrations.dynamicImports.outputFile} ${illustrations.set} ${illustrations.collection} ${illustrations.dynamicImports.location} ${illustrations.dynamicImports.filterOut.join(" ")}`).join(" && ");

	const tsOption = !options.legacy || options.jsx;
	const tsCommandOld = tsOption ? "tsc" : "";
	let tsWatchCommandStandalone = tsOption ? "tsc --watch" : "";
	// this command is only used for standalone projects. monorepo projects get their watch from vite, so opt-out here
	if (options.noWatchTS) {
		tsWatchCommandStandalone = "";
	}
	const tsCrossEnv = tsOption ? "cross-env UI5_TS=true" : "";

	if (tsOption) {
		try {
			require("typescript");
		} catch (e) {
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
		clean: 'rimraf src/generated && rimraf dist && ui5nps "scope.testPages.clean"',
		lint: `eslint . ${eslintConfig}`,
		lintfix: `eslint . ${eslintConfig} --fix`,
		generate: {
			default: `${tsCrossEnv} ui5nps prepare.all`,
			all: `ui5nps  build.templates build.i18n prepare.styleRelated copyProps build.illustrations --parallel`,
			styleRelated: "ui5nps build.styles build.jsonImports build.jsImports",
		},
		prepare: {
			default: `${tsCrossEnv} ui5nps clean prepare.all copy copyProps prepare.typescript generateAPI`,
			all: `ui5nps  build.templates build.i18n prepare.styleRelated build.illustrations --parallel`,
			styleRelated: "ui5nps build.styles build.jsonImports build.jsImports",
			typescript: tsCommandOld,
		},
		build: {
			default: "ui5nps prepare lint build.bundle", // build.bundle2
			templates: options.legacy ? `mkdirp src/generated/templates && ${tsCrossEnv} node "${LIB}/hbs2ui5/index.js" -d src/ -o src/generated/templates` : "",
			styles: {
				default: `ui5nps build.styles.themes build.styles.components --parallel`,
				themes: `node "${LIB}/css-processors/css-processor-themes.mjs"`,
				components: `node "${LIB}/css-processors/css-processor-components.mjs"`,
			},
			i18n: {
				default: "ui5nps build.i18n.defaultsjs build.i18n.json",
				defaultsjs: `node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
				json: `node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
			},
			jsonImports: {
				default: "ui5nps build.jsonImports.themes build.jsonImports.i18n",
				themes: `node "${LIB}/generate-json-imports/themes.js" src/themes src/generated/json-imports`,
				i18n: `node "${LIB}/generate-json-imports/i18n.js" src/i18n src/generated/json-imports`,
			},
			jsImports: {
				default: "ui5nps build.jsImports.illustrationsLoaders",
				illustrationsLoaders: createIllustrationsLoadersScript,
			},
			bundle: `vite build ${viteConfig} --mode testing  --base ${websiteBaseUrl}`,
			bundle2: ``,
			illustrations: createIllustrationsJSImportsScript,
		},
		copyProps: `node "${LIB}/copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/`,
		copy: {
			default: options.legacy ? "ui5nps copy.src copy.props" : "",
			src: options.legacy ? `node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.{js,json}" dist/` : "",
			props: options.legacy ? `node "${LIB}/copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/` : "",
		},
		watch: {
			default: `${tsCrossEnv} ui5nps watch.templates watch.typescript watch.src watch.styles watch.i18n watch.props --parallel`,
			devServer: 'ui5nps watch.default watch.bundle --parallel',
			src: options.legacy ? 'ui5nps "copy.src --watch --safe --skip-initial-copy"' : "",
			typescript: tsWatchCommandStandalone,
			props: 'ui5nps "copyProps --watch --safe --skip-initial-copy"',
			bundle: `node ${LIB}/dev-server/dev-server.mjs ${viteConfig}`,
			styles: {
				default: 'ui5nps watch.styles.themes watch.styles.components --parallel',
				themes: 'ui5nps "build.styles.themes -w"',
				components: `ui5nps "build.styles.components -w"`,
			},
			templates: options.legacy ? 'chokidar "src/**/*.hbs" -i "src/generated" -c "ui5nps build.templates"' : "",
			i18n: 'chokidar "src/i18n/messagebundle.properties" -c "ui5nps build.i18n.defaultsjs"'
		},
		start: "ui5nps prepare watch.devServer",
		test: `node "${LIB}/test-runner/test-runner.js"`,
		"test-cy-ci": `${cypressEnvVariables(options)} yarn cypress run --component --browser chrome`,
		"test-cy-ci-suite-1": `${cypressEnvVariables(options, ["TEST_SUITE=SUITE1"])} yarn cypress run --component --browser chrome`,
		"test-cy-ci-suite-2": `${cypressEnvVariables(options, ["TEST_SUITE=SUITE2"])} yarn cypress run --component --browser chrome`,
		"test-cy-open": `${cypressEnvVariables(options)} yarn cypress open --component --browser chrome`,
		"test-suite-1": `node "${LIB}/test-runner/test-runner.js" --suite suite1`,
		"test-suite-2": `node "${LIB}/test-runner/test-runner.js" --suite suite2`,
		startWithScope: "ui5nps scope.prepare scope.watchWithBundle",
		scope: {
			prepare: "ui5nps scope.lint scope.testPages",
			lint: `node "${LIB}/scoping/lint-src.js"`,
			testPages: {
				default: "ui5nps scope.testPages.clean scope.testPages.copy scope.testPages.replace",
				clean: "rimraf test/pages/scoped",
				copy: `node "${LIB}/copy-and-watch/index.js" --silent "test/pages/**/*" test/pages/scoped`,
				replace: `node "${LIB}/scoping/scope-test-pages.js" test/pages/scoped demo`,
			},
			watchWithBundle: 'ui5nps scope.watch ui5nps scope.bundle --parallel',
			watch: 'ui5nps watch.templates watch.props watch.styles --parallel',
			bundle: `node ${LIB}/dev-server/dev-server.mjs ${viteConfig}`,
		},
		generateAPI: {
			default: tsOption ? "ui5nps generateAPI.generateCEM generateAPI.validateCEM" : "",
			generateCEM: `${options.dev ? "cross-env UI5_CEM_MODE='dev'" : ""} cem analyze --config "${LIB}/cem/custom-elements-manifest.config.mjs"`,
			validateCEM: `${options.dev ? "cross-env UI5_CEM_MODE='dev'" : ""} node "${LIB}/cem/validate.js"`,
		},
	};

	return scripts;
};

module.exports = getScripts;
