const resolve = require("resolve");
const BuildRunner = require("@ui5/webcomponents-tools/task-runner/build-runner");
const amdToES6 = require("@ui5/webcomponents-tools/lib/amd-to-es6/index");
const noRequire = require("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require");
const cldr = require("./lib/generate-json-imports/cldr").default;
const copyUsedModules = require("@ui5/webcomponents-tools/lib/copy-list/index.js");
const copyAndWatch = require("@ui5/webcomponents-tools/lib/copy-and-watch/index.js").copyAndWatch;

const runner = new BuildRunner();

runner.addTask("clean", {
	dependencies: [
		"rimraf src/generated",
		"rimraf dist",
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
		"copy",
		"build:amd-to-es6",
		"build:jsonImports",
	],
});

runner.addTask("build", {
	dependencies: [
		"clean",
		"copy",
		"build:amd-to-es6",
		"build:jsonImports",
		"build:typescript",
		"build:no-remaining-require",
	],
});

runner.addTask("build:amd-to-es6", {
	callback: async () => {
		await amdToES6("dist/");
		// console.log("i18n default file generated.");
		// return "i18n default file generated."
		return "";
	},
});

runner.addTask("build:no-remaining-require", {
	callback: async () => {
		await noRequire("dist/");
		// console.log("i18n default file generated.");
		// return "i18n default file generated."
		return "";
	},
});

runner.addTask("build:typescript", {
	dependencies: "tsc --build",
});

runner.addTask("build:jsonImports", {
	callback: async () => {
		await cldr();
		// console.log("i18n default file generated.");
		// return "i18n default file generated."
		return "";
	},
});

runner.addTask("typescript", {
	dependencies: [
		"tsc --build",
	],
});

runner.addTask("copy", {
	dependencies: [
		"copy:used-modules",
		"copy:cldr",
		"copy:overlay",
	],
	parallel: true,
});

runner.addTask("copy:used-modules", {
	callback: async () => {
		const dest = "dist/";
		await copyUsedModules("./used-modules.txt", dest);
		return "Used modules copied.";
	},
});

runner.addTask("copy:cldr", {
	callback: async () => {
		await copyAndWatch("../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*", "dist/generated/assets/cldr/", { silent: true });
		return "CLDR JSON files generated.";
	}
});

runner.addTask("copy:overlay", {
	callback: async () => {
		await copyAndWatch("overlay/**/*.js", "dist/", { silent: true });
		return "Overlay files copied.";
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
