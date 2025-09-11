const path = require("path");
const BuildRunner = require('../task-runner/build-runner');
const buildI18nJson = require("../lib/i18n/toJSON");
const buildI18nDefaultsjs = require("../lib/i18n/defaults");
const buildJsonImportsI18n = require("../lib/generate-json-imports/i18n");
const buildIcons = require("../lib/create-icons/index");
const copyAndWatch = require("../lib/copy-and-watch/index.js").copyAndWatch;

const createIconImportsCommand = (options, runner) => {
	if (!options.versions) {
		runner.addTask("build:icons", {
			callback: async () => {
				await buildIcons(options.collectionName);
				return "Icons created."
			}
		})
		return;
	}

	const dependencies = []

	options.versions.forEach((v) => {
		dependencies.push(`build:icons:create${v}`);

		runner.addTask(`build:icons:create${v}`, {
			callback: async () => {
				await buildIcons(options.collectionName, v);
				return "Icons created."
			}
		})
	});

	runner.addTask("build:icons", {
		dependencies,
		parallel: true,
	})
}

const copyIconAssetsCommand = (options, runner) => {
	if (!options.versions) {
		runner.addTask("copy", {
			dependencies: [
				"copy:json-imports",
				"copy:icon-collection"
			],
			parallel: true,
		})

		runner.addTask("copy:json-imports", {
			callback: async () => {
				await copyAndWatch("src/**/*.js", "dist/", { silent: true });
				return "JSON imports copied.";
			}
		});
		runner.addTask("copy:icon-collection", {
			callback: async () => {
				await copyAndWatch("src/*.json", "src/generated/assets/", { silent: true });
				return "Icon collection JSON files copied.";
			}
		});

		return;
	}

	const dependencies = ["copy:json-imports"]


	options.versions.forEach((v) => {
		dependencies.push(`copy:icon-collection${v}`);

		runner.addTask(`copy:icon-collection${v}`, {
			callback: async () => {
				await copyAndWatch(`src/${v}/*.json`, `src/generated/assets/${v}/`, { silent: true });
				return `Icon collection ${v} JSON files copied.`;
			}
		})
	});

	runner.addTask(`copy:json-imports`, {
		callback: async () => {
			await copyAndWatch("src/**/*.js", "dist/", { silent: true });
			return "JSON imports copied.";
		}
	});

	runner.addTask("copy", {
		dependencies,
		parallel: true,
	})
}

const getScripts = (options) => {
	const runner = new BuildRunner();

	createIconImportsCommand(options, runner);
	copyIconAssetsCommand(options, runner);

	runner.addTask("clean", "rimraf dist && rimraf src/generated");

	runner.addTask("generate", {
		dependencies: [
			"clean",
			"copy",
			"build:i18n",
			"build:icons",
			"build:jsonImports",
			"copyjson"
		]
	})

	runner.addTask("copyjson", {
		callback: async () => {
			await copyAndWatch("src/**/*.json", "dist/generated/", { silent: true });
			return "JSON files copied.";
		},
	});

	runner.addTask("build", {
		dependencies: [
			"clean",
			"copy",
			"build:i18n",
			"typescript",
			"build:icons",
			"build:jsonImports",
		]
	})

	runner.addTask("build:i18n", {
		dependencies: [
			"build:i18n:defaultsjs",
			"build:i18n:json"
		],
		parallel: true,
	});

	runner.addTask("build:i18n:defaultsjs", {
		callback: async () => {
			await buildI18nDefaultsjs("src/i18n", "src/generated/i18n", true);
			return "i18n default file generated."
		}
	});

	runner.addTask("build:i18n:json", {
		callback: async () => {
			await buildI18nJson("src/i18n", "dist/generated/assets/i18n");
			return "Message bundle JSON files generated."
		},
	});

	runner.addTask("build:jsonImports", {
		dependencies: [
			"build:jsonImports:i18n"
		]
	})


	runner.addTask("build:jsonImports:i18n", {
		callback: async () => {
			await buildJsonImportsI18n("src/generated/assets/i18n", "src/generated/json-imports", true);
			return "Generated i18n JSON imports.";
		},
	});

	runner.addTask("typescript", {
		dependencies: [
			"tsc --build",
		]
	});

	return runner;
};

module.exports = getScripts;
