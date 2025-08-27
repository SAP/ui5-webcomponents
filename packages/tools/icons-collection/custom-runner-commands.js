const path = require("path");
const BuildRunner = require('../task-runner/build-runner');
const LIB = path.join(__dirname, `../lib/`);

const createIconImportsCommand = (options, runner) => {
	if (!options.versions) {
		runner.addTask("build:icons", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
			dependencies: [
				`node "${LIB}/create-icons/index.js" "${options.collectionName}"`,
			],
		})
		return;
	}

	const dependencies = []

	options.versions.forEach((v) => {
		dependencies.push(`build:icons:create${v}`);

		runner.addTask(`build:icons:create${v}`, BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
			dependencies: [
				`node "${LIB}/create-icons/index.js" "${options.collectionName}" "${v}"`,
			]
		})
	});

	runner.addTask("build:icons", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies,
		parallel: true,
	})
}

const copyIconAssetsCommand = (options, runner) => {
	if (!options.versions) {
		runner.addTask("copy", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
			dependencies: [
				"copy:json-imports",
				"copy:icon-collection"
			],
			parallel: true,
		})

		runner.addTask("copy:json-imports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
			dependencies: [
				`node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`
			]
		});
		runner.addTask("copy:icon-collection", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
			dependencies: [
				`node "${LIB}/copy-and-watch/index.js" --silent "src/*.json" src/generated/assets/`,
			]
		});

		return;
	}

	const dependencies = ["copy:json-imports"]


	options.versions.forEach((v) => {
		dependencies.push(`copy:icon-collection${v}`);

		runner.addTask(`copy:icon-collection${v}`, BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
			dependencies: [
				`node "${LIB}/copy-and-watch/index.js" --silent "src/${v}/*.json" src/generated/assets/${v}/`,
			],
		})
	});

	runner.addTask(`copy:json-imports`, BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.js" dist/`
		]
	});

	runner.addTask("copy", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies,
		parallel: true,
	})
}

const getScripts = (options) => {
	const runner = new BuildRunner();

	createIconImportsCommand(options, runner);
	copyIconAssetsCommand(options, runner);

	const tsCommand = !options.legacy ? "tsc --build" : "";
	const tsCrossEnv = !options.legacy ? true : false;

	runner.addTask("clean", "rimraf dist && rimraf src/generated");

	runner.addTask("generate", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"clean",
			"copy",
			"build:i18n",
			"build:icons",
			"build:jsonImports",
			"copyjson"
		],
		crossEnv: {
			UI5_TS: tsCrossEnv
		}
	})

	runner.addTask("copyjson", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/copy-and-watch/index.js" --silent "src/generated/**/*.json" dist/generated/`
		]
	});

	runner.addTask("build", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"clean",
			"copy",
			"build:i18n",
			"typescript",
			"build:icons",
			"build:jsonImports",
		],
		crossEnv: {
			UI5_TS: tsCrossEnv
		}
	})

	runner.addTask("build:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:i18n:defaultsjs",
			"build:i18n:json"
		],
		parallel: true,
	});

	runner.addTask("build:i18n:defaultsjs", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`mkdir -p dist/generated/i18n`,
			`node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`
		]
	});

	runner.addTask("build:i18n:json", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`mkdir -p src/generated/assets/i18n`,
			`node "${LIB}/i18n/toJSON.js" src/i18n src/generated/assets/i18n`
		]
	});

	runner.addTask("build:jsonImports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:jsonImports:i18n"
		]
	})


	runner.addTask("build:jsonImports:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`mkdir -p src/generated/json-imports`,
			`node "${LIB}/generate-json-imports/i18n.js" src/generated/assets/i18n src/generated/json-imports`
		]
	});

	runner.addTask("typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			tsCommand,
		]
	});

	return runner;
};

module.exports = getScripts;
