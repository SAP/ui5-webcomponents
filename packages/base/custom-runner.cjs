const resolve = require("resolve");
const path = require("path");
const BuildRunner = require("@ui5/webcomponents-tools/task-runner/build-runner");
const buildI18nJson = require("@ui5/webcomponents-tools/lib/i18n/toJSON");
const buildI18nDefaultsjs = require("@ui5/webcomponents-tools/lib/i18n/defaults");
const buildJsonImportsI18n = require("@ui5/webcomponents-tools/lib/generate-json-imports/i18n");
const amdToES6 = require("@ui5/webcomponents-tools/lib/amd-to-es6/index");
const noRequire = require("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require");
const versionScript = require("./lib/generate-version-info/index.cjs");
const assetParametersScript = require("./lib/generate-asset-parameters/index.cjs");
const copyAndWatch = require("@ui5/webcomponents-tools/lib/copy-and-watch/index.js").copyAndWatch;
const validate = require("@ui5/webcomponents-tools/lib/cem/validate");
const copyUsedModules = require("@ui5/webcomponents-tools/lib/copy-list/index.js");
const removeDevMode = require("@ui5/webcomponents-tools/lib/remove-dev-mode/remove-dev-mode.mjs").default;
const stylesScript = require("./lib/generate-styles/index.js").default; //
const fontFaceScript = require("./lib/css-processors/css-processor-font-face.mjs").default; //

const runner = new BuildRunner();

const LIB = path.join(__dirname, `../tools/lib/`);

const viteConfig = `-c "${require.resolve("@ui5/webcomponents-tools/components-package/vite.config.js")}"`;

runner.addTask("clean", {
	dependencies: [
		"rimraf src/generated",
		"rimraf dist",
		"rimraf .port",
	],
});

runner.addTask("lint", {
	dependencies: [
		"eslint .",
	],
});

runner.addTask("generate", {
	dependencies: [
		"clean",
		"build:i18n",
		"integrate",
		"copy",
		"generateAssetParameters",
		"generateVersionInfo",
		"generateStyles",
		"generateFontFace",
		"build:jsonImports",
	],
	crossEnv: {
		UI5_TS: true,
	},
});

runner.addTask("prepare", {
	dependencies: [
		"clean",
		"build:i18n",
		"integrate",
		"copy",
		"generateAssetParameters",
		"generateVersionInfo",
		"generateStyles",
		"generateFontFace",
		"typescript",
		"integrate:no-remaining-require",
		"build:jsonImports",
	],
	crossEnv: {
		UI5_TS: true,
	},
});

runner.addTask("typescript", {
	dependencies: [
		"tsc -b",
	],
});

runner.addTask("integrate", {
	dependencies: [
		"integrate:copy-used-modules",
		"integrate:amd-to-es6",
		"integrate:no-remaining-require",
		"integrate:third-party",
	],
	parallel: false, // ???
});

runner.addTask("integrate:copy-used-modules", {
	callback: async () => {
		await copyUsedModules("./used-modules.txt", "dist/");
		return "Used modules copied.";
	},
});

runner.addTask("integrate:amd-to-es6", {
	callback: async () => {
		await amdToES6("dist/");
		return "";
	},
});

runner.addTask("integrate:no-remaining-require", {
	callback: async () => {
		await noRequire("dist/");
		return "";
	},
});

runner.addTask("integrate:third-party", {
	dependencies: [
		"integrate:third-party:copy",
		"integrate:third-party:fix",
	],
	parallel: false, // ???
});

runner.addTask("integrate:third-party:copy", {
	callback: async () => {
		await copyAndWatch("../../node_modules/@openui5/sap.ui.core/src/sap/ui/thirdparty/caja-html-sanitizer.js", "dist/sap/ui/thirdparty/", { silent: true });
		return "Third party files copied.";
	},
});

runner.addTask("integrate:third-party:fix", {
	dependencies: [
		"replace-in-file 240 xA0 dist/sap/ui/thirdparty/caja-html-sanitizer.js",
	],
});

runner.addTask("build", {
	dependencies: [
		"prepare",
	],
});

runner.addTask("build:bundle", {
	dependencies: [
		`vite build ${viteConfig}`,
	],
});

runner.addTask("build:i18n", {
	dependencies: [
		"build:i18n:defaultsjs",
		"build:i18n:json",
	],
	parallel: true,
});

runner.addTask("build:i18n:defaultsjs", {
	callback: async () => {
		await buildI18nDefaultsjs("src/i18n", "src/generated/i18n", true);
		return "i18n default file generated.";
	},
});

runner.addTask("build:i18n:json", {
	callback: async () => {
		await buildI18nJson("src/i18n", "dist/generated/assets/i18n");
		return "Message bundle JSON files generated.";
	},
});

runner.addTask("build:jsonImports", {
	dependencies: [
		"build:jsonImports:i18n",
	],
});

runner.addTask("build:jsonImports:i18n", {
	callback: async () => {
		await buildJsonImportsI18n("dist/generated/assets/i18n", "src/generated/json-imports", true);
		return "Generated i18n JSON imports.";
	},
});

runner.addTask("copy", {
	dependencies: [
		"copy:src",
	],
});

runner.addTask("copy:src", {
	callback: async () => {
		await copyAndWatch("src/**/*.{js,css,d.ts}", "dist/", { silent: true });
		return "Source files copied.";
	},
});

runner.addTask("generateAssetParameters", {
	callback: async () => {
		await assetParametersScript();
		return "Assets parameters generated.";
	},
});

runner.addTask("generateVersionInfo", {
	callback: async () => {
		await versionScript();
		return "Version info file generated.";
	},
});

runner.addTask("generateStyles", {
	callback: async () => {
		await stylesScript();
		return "Styles files generated.";
	},
});

runner.addTask("generateFontFace", {
	callback: async () => {
		await fontFaceScript();
		return "FontFace CSS generated.";
	},
});

runner.addTask("generateProd", {
	dependencies: [
		"generateProd:remove-dev-mode",
		"generateProd:copy-prod",
	],
	parallel: false, // ???
});

runner.addTask("generateProd:remove-dev-mode", {
	callback: async () => {
		await removeDevMode();
		return "Dev mode removed.";
	},
});

runner.addTask("generateProd:copy-prod", {
	callback: async () => {
		Promise.all([
			copyAndWatch("dist/sap/**/*", "dist/prod/sap/", { silent: true }),
			copyAndWatch("dist/thirdparty/preact/**/*.js", "dist/prod/thirdparty/preact/", { silent: true }),
			copyAndWatch("dist/generated/assets/**/*.json", "dist/prod/generated/assets/", { silent: true }),
		]);
		return "Production files copied.";
	},
});

runner.addTask("generateAPI", {
	dependencies: [
		"generateAPI:generateCEM",
		"generateAPI:validateCEM",
	],
});

runner.addTask("generateAPI:generateCEM", {
	dependencies: [
		`cem analyze --config  "${LIB}/cem/custom-elements-manifest.config.mjs"`,
	],
	crossEnv: {
		UI5_CEM_MODE: "dev",
	},
});

runner.addTask("generateAPI:validateCEM", {
	callback: async () => {
		await validate({ devMode: "dev" });
		return "CEM validation completed.";
	}
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