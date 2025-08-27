const resolve = require("resolve");
const path = require("path");
const BuildRunner = require("@ui5/webcomponents-tools/task-runner/build-runner");

const runner = new BuildRunner();

const assetParametersScript = resolve.sync("@ui5/webcomponents-base/lib/generate-asset-parameters/index.js");
const stylesScript = resolve.sync("@ui5/webcomponents-base/lib/generate-styles/index.js");
const fontFaceScript = resolve.sync("@ui5/webcomponents-base/lib/css-processors/css-processor-font-face.mjs");
const versionScript = resolve.sync("@ui5/webcomponents-base/lib/generate-version-info/index.js");
const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");

const LIB = path.join(__dirname, `../tools/lib/`);

const viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;

runner.addTask("clean", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"rimraf src/generated",
		"rimraf dist",
		"rimraf .port",
	],
});

runner.addTask("lint", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"eslint .",
	],
});

runner.addTask("generate", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"clean",
		"build:i18n",
		"integrate",
		"copy",
		"generateAssetParameters",
		"generateVersionInfo",
		"generateStyles",
		"generateFontFace",
		"generateTemplates",
		"build:jsonImports",
	],
	crossEnv: {
		UI5_TS: true,
	},
});

runner.addTask("prepare", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"clean",
		"build:i18n",
		"integrate",
		"copy",
		"generateAssetParameters",
		"generateVersionInfo",
		"generateStyles",
		"generateFontFace",
		"generateTemplates",
		"typescript",
		"integrate:no-remaining-require",
		"build:jsonImports",
	],
	crossEnv: {
		UI5_TS: true,
	},
});

runner.addTask("typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"tsc -b",
	],
});

runner.addTask("integrate", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"integrate:copy-used-modules",
		"integrate:amd-to-es6",
		"integrate:no-remaining-require",
		"integrate:third-party",
	],
	parallel: false, // ???
});

runner.addTask("integrate:copy-used-modules", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${copyUsedModules}" ./used-modules.txt dist/`,
	],
});

runner.addTask("integrate:amd-to-es6", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${amdToES6}" dist/`,
	],
});

runner.addTask("integrate:no-remaining-require", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT,
	{
		dependencies: [
			`node "${noRequire}" dist/`,
		],
	});

runner.addTask("integrate:third-party", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"integrate:third-party:copy",
		"integrate:third-party:fix",
	],
	parallel: false, // ???
});

runner.addTask("integrate:third-party:copy", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"mkdir -p dist/sap/ui/thirdparty/",
		"copy-and-watch ../../node_modules/@openui5/sap.ui.core/src/sap/ui/thirdparty/caja-html-sanitizer.js dist/sap/ui/thirdparty/",
	],
});

runner.addTask("integrate:third-party:fix", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"replace-in-file 240 xA0 dist/sap/ui/thirdparty/caja-html-sanitizer.js",
	],
});

runner.addTask("build", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"prepare",
	],
});

runner.addTask("build:bundle", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`vite build ${viteConfig}`,
	],
});

runner.addTask("build:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"build:i18n:defaultsjs",
		"build:i18n:json",
	],
	parallel: true,
});

runner.addTask("build:i18n:defaultsjs", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`,
	],
});

runner.addTask("build:i18n:json", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`,
	],
});

runner.addTask("build:jsonImports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"build:jsonImports:i18n",
	],
});

runner.addTask("build:jsonImports:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`mkdir -p src/generated/json-imports`,
		`node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n src/generated/json-imports`,
	],
});

runner.addTask("copy", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"copy:src",
	],
});

runner.addTask("copy:src", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.{js,json}" dist/`,
	],
});

runner.addTask("generateAssetParameters", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${assetParametersScript}"`,
	],
});

runner.addTask("generateVersionInfo", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${versionScript}"`,
	],
});

runner.addTask("generateStyles", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${stylesScript}"`,
	],
});

runner.addTask("generateFontFace", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${fontFaceScript}"`,
	],
});

runner.addTask("generateTemplates", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		``,
	],
});

runner.addTask("generateTestTemplates", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`mkdir -p test/test-elements/generated/templates`,
		`node "${LIB}/hbs2ui5/index.js" -d test/test-elements -o test/test-elements/generated/templates`,
	],
	crossEnv: {
		UI5_BASE: true,
	},
});

runner.addTask("generateProd", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"generateProd:remove-dev-mode",
		"generateProd:copy-prod",
	],
	parallel: false, // ???
});

runner.addTask("generateProd:remove-dev-mode", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${LIB}/remove-dev-mode/remove-dev-mode.mjs"`,
	],
});

runner.addTask("generateProd:copy-prod", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`copy-and-watch "dist/sap/**/*" dist/prod/sap/`,
		`copy-and-watch "dist/thirdparty/preact/**/*.js" dist/prod/thirdparty/preact/`,
		`copy-and-watch "dist/generated/assets/**/*.json" dist/prod/generated/assets/`,
	],
});

runner.addTask("generateAPI", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"generateAPI:generateCEM",
		"generateAPI:validateCEM",
	],
});

runner.addTask("generateAPI:generateCEM", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`cem analyze --config  "${LIB}/cem/custom-elements-manifest.config.mjs"`,
	],
	crossEnv: {
		UI5_CEM_MODE: "dev",
	},
});

runner.addTask("generateAPI:validateCEM", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${LIB}/cem/validate.js"`,
	],
	crossEnv: {
		UI5_CEM_MODE: "dev",
	},
});

runner.addTask("watch", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"watch:src",
		"watch:styles",
	],
	parallel: true,
});

runner.addTask("watch:src", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${LIB}/copy-and-watch/index.js" --silent --watch "src/**/*.{js,json}" dist/`,
	],
});

runner.addTask("watch:styles", {
	dependencies: [
		`chokidar "src/css/*.css" -c "nps generateStyles"`
	],
});

// Export for CLI usage
if (require.main === module) {
	const taskName = process.argv[2];
	if (!taskName) {
		console.log("Available tasks:", Array.from(runner.tasks.keys()).join(", "));
		process.exit(1);
	}

	runner.run(taskName).catch(error => {
		console.error("Task failed:", error.message);
		process.exit(1);
	});
}