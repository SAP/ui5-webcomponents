const path = require('path');
const BuildRunner = require('@ui5/webcomponents-tools/task-runner/build-runner');
const buildJsonImportsThemes = require("@ui5/webcomponents-tools/lib/generate-json-imports/themes");
const generateReport = require("./lib/generate-css-vars-usage-report/index.cjs");
const cssProcessorThemes = require("@ui5/webcomponents-tools/lib/css-processors/css-processor-themes.mjs").default;
const copyAndWatch = require("@ui5/webcomponents-tools/lib/copy-and-watch/index.js").copyAndWatch;

const runner = new BuildRunner();

runner.addTask("clean", {
	dependencies: [
		"rimraf dist",
		"rimraf src/generated",
	]
});

runner.addTask("generate", {
	dependencies: [
		"build:postcss",
		"build:jsonImports",
	],
	crossEnv: {
		UI5_TS: true,
	},
});

runner.addTask("build", {
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

runner.addTask("build:src", {
	callback: async () => {
		await copyAndWatch("src/**/*.{json}", "dist/", { silent: true });
		return "Source files copied.";
	}
});

runner.addTask("build:typescript", {
	dependencies: [
		"tsc"
	]
});

runner.addTask("build:postcss", {
	callback: async () => {
		await cssProcessorThemes({ tsMode: true });
		return ""
	}
});

runner.addTask("build:jsonImports", {
	callback: async () => {
		await buildJsonImportsThemes("dist/generated/assets/themes", "src/generated/json-imports", true);
		console.log("Generated themes JSON imports.");
		return "Generated themes JSON imports.";
	},
});

runner.addTask("generateReport", {
	callback: async () => {
		await generateReport();
		console.log("CSS Vars usage report generated.");
		return "CSS Vars usage report generated.";
	},
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