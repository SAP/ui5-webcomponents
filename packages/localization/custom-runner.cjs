const resolve = require("resolve");
const BuildRunner = require("@ui5/webcomponents-tools/task-runner/build-runner");

const runner = new BuildRunner();

const copyUsedModules = resolve.sync("@ui5/webcomponents-tools/lib/copy-list/index.js");
const amdToES6 = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/index.js");
const noRequire = resolve.sync("@ui5/webcomponents-tools/lib/amd-to-es6/no-remaining-require.js");

runner.addTask("clean", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"rimraf src/generated",
		"rimraf dist",
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
		"copy",
		"build:amd-to-es6",
		"build:jsonImports",
	],
});

runner.addTask("build", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"clean",
		"copy",
		"build:amd-to-es6",
		"build:jsonImports",
		"build:typescript",
		"build:no-remaining-require",
	],
});

runner.addTask("build:amd-to-es6", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${amdToES6}" dist/`,
	],
});

runner.addTask("build:no-remaining-require", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${noRequire}" dist/`,
	],
});

runner.addTask("build:typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: "tsc --build",
});

runner.addTask("build:jsonImports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"node ./lib/generate-json-imports/cldr.js",
	],
});

runner.addTask("typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"tsc --build",
	],
});

runner.addTask("copy", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"copy:used-modules",
		"copy:cldr",
		"copy:overlay",
	],
	parallel: true,
});

runner.addTask("copy:used-modules", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${copyUsedModules}" ./used-modules.txt dist/`,
	],
});

runner.addTask("copy:cldr", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`copy-and-watch "../../node_modules/@openui5/sap.ui.core/src/sap/ui/core/cldr/*" dist/generated/assets/cldr/`,
	],
});

runner.addTask("copy:overlay", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`copy-and-watch "overlay/**/*.js" dist/`,
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
