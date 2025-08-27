const path = require('path');
const BuildRunner = require('@ui5/webcomponents-tools/task-runner/build-runner');

const runner = new BuildRunner();


const CURRENT_LIB = path.join(__dirname, `./lib/`);
const TOOLS_LIB = path.join(__dirname, `../tools/lib/`);

const jsonImportsScript = path.join(TOOLS_LIB, "./generate-json-imports/themes.js");
const generateReportScript = path.join(CURRENT_LIB, "./generate-css-vars-usage-report/index.js");

runner.addTask("clean", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"rimraf dist",
		"rimraf src/generated",
	]
});

runner.addTask("generate", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"build:postcss",
		"build:jsonImports",
	],
	crossEnv: {
		UI5_TS: true,
	},
	parallel: true,
});

runner.addTask("build", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"clean",
		"build:src",
		"build:postcss",
		"build:jsonImports",
		"build:typescript",
		"generateReport",
	],
	crossEnv: {
		UI5_TS: true,
	}
});

runner.addTask("build:src", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`copy-and-watch "src/**/*.{json}" dist/`
	]
});

runner.addTask("build:typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		"tsc"
	]
});

runner.addTask("build:postcss", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${TOOLS_LIB}/css-processors/css-processor-themes.mjs"`
	]
});

runner.addTask("build:jsonImports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${jsonImportsScript}" dist/generated/assets/themes src/generated/json-imports`
	]
});

runner.addTask("generateReport", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
	dependencies: [
		`node "${generateReportScript}"`
	]
});


// Export for CLI usage
if (require.main === module) {
	const taskName = process.argv[2];
	if (!taskName) {
		console.log('Available tasks:', Array.from(runner.tasks.keys()).join(', '));
		process.exit(1);
	}

	runner.run(taskName).catch(error => {
		console.error('Task failed:', error.message);
		process.exit(1);
	});
}