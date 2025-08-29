const BuildRunner = require('../task-runner/build-runner');
const path = require("path");
const fs = require("fs");
const LIB = path.join(__dirname, `../lib/`);
const buildI18nJson = require("../lib/i18n/toJSON");
const buildI18nDefaultsjs = require("../lib/i18n/defaults");
const buildJsonImportsI18n = require("../lib/generate-json-imports/i18n");
const buildJsonImportsThemes = require("../lib/generate-json-imports/themes");
const cssProcessorThemes = require("../lib/css-processors/css-processor-themes.mjs").default;
const cssProcessorComponents = require("../lib/css-processors/css-processor-components.mjs").default;
const copyAndWatch = require("../lib/copy-and-watch/index.js").copyAndWatch;
const validate = require("../lib/cem/validate");
const createIllustrations = require("../lib/create-illustrations");
const generateJsImportsIllustrations = require("../lib/generate-js-imports/illustrations");

let websiteBaseUrl = "/";

if (process.env.DEPLOY) {
	websiteBaseUrl = "/ui5-webcomponents/";
} else if (process.env.DEPLOY_NIGHTLY) {
	websiteBaseUrl = "/ui5-webcomponents/nightly/";
}

const getScripts = (options) => {
	const runner = new BuildRunner();

	// The script creates all JS modules (dist/illustrations/{illustrationName}.js) out of the existing SVGs
	const illustrationsData = options.illustrationsData || [];
	const illustrations = illustrationsData.map(illustration => createIllustrations(illustration.path, illustration.defaultText, illustration.illustrationsPrefix, illustration.set, illustration.destinationPath, illustration.collection));

	// The script creates the "src/generated/js-imports/Illustration.js" file that registers loaders (dynamic JS imports) for each illustration
	const createIllustrationsLoadersScript = illustrationsData.map(illustrations =>
		generateJsImportsIllustrations(illustrations.destinationPath, illustrations.dynamicImports.outputFile, illustrations.set, illustrations.collection, illustrations.dynamicImports.location, illustrations.dynamicImports.filterOut))


	const tsOption = !options.legacy || options.jsx;
	const tsCommandOld = tsOption ? "tsc" : "";
	let tsWatchCommandStandalone = tsOption ? "tsc --watch" : "";
	// this command is only used for standalone projects. monorepo projects get their watch from vite, so opt-out here
	if (options.noWatchTS) {
		tsWatchCommandStandalone = "";
	}
	const tsCrossEnv = tsOption ? true : false;

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


	runner.addTask("clean", {
		dependencies: [
			"rimraf src/generated",
			"rimraf dist",
			"scope:testPages:clean"
		],
		parallel: true,
	});

	runner.addTask("lint", {
		dependencies: [
			`eslint . ${eslintConfig}`
		]
	});

	runner.addTask("lintfix", {
		dependencies: [
			`eslint . ${eslintConfig} --fix`
		]
	});

	runner.addTask("generate", {
		dependencies: [
			"prepare:all"
		],
		crossEnv: {
			UI5_TS: tsCrossEnv,
		}
	})

	runner.addTask("generate:all", {
		dependencies: [
			"build:templates",
			"build:i18n",
			"prepare:styleRelated",
			"copyProps",
			"build:illustrations"
		],
		parallel: true,
	})

	runner.addTask("generate:styleRelated", {
		dependencies: [
			"build:styles",
			"build:jsonImports",
			"build:jsImports"
		],
		parallel: true,
	})

	runner.addTask("prepare", {
		dependencies: [
			"clean",
			"prepare:all",
			options.legacy ? "copy" : "",
			"copyProps",
			"prepare:typescript",
			"generateAPI"
		],
		crossEnv: {
			UI5_TS: tsCrossEnv,
		}
	})

	runner.addTask("prepare:all", {
		dependencies: [
			"build:templates",
			"build:i18n",
			"prepare:styleRelated",
			"build:illustrations"
		],
		parallel: true,
	});

	runner.addTask("prepare:styleRelated", {
		dependencies: [
			"build:styles",
			"build:jsonImports",
			"build:jsImports"
		],
	})

	runner.addTask("prepare:typescript", {
		dependencies: [
			tsCommandOld
		]
	});

	runner.addTask("build", {
		dependencies: [
			"prepare",
			"lint",
			"build:bundle", // "build:bundle2"
		]
	})

	runner.addTask("build:templates", {
		dependencies: [
			!options.legacy ? "" : `node "${LIB}/hbs2ui5/index.js" -d src/ -o src/generated/templates`
		],
		crossEnv: {
			UI5_TS: tsCrossEnv,
		}
	});

	runner.addTask("build:styles", {
		dependencies: [
			"build:styles:themes",
			"build:styles:components"
		],
		parallel: true,
	})

	runner.addTask("build:styles:themes", {
		callback: async () => {
			await cssProcessorThemes({ tsMode: options.legacy });
			return ""
		}
	});

	runner.addTask("build:styles:components", {
		callback: async () => {
			await cssProcessorComponents({ tsMode: options.legacy });
			return ""
		}
	});

	runner.addTask("build:i18n", {
		dependencies: [
			"build:i18n:defaultsjs",
			"build:i18n:json"
		],
		parallel: true,
	});

	runner.addTask("build:i18n:defaultsjs", {
		callback: async () => {
			await buildI18nDefaultsjs("src/i18n", "src/generated/i18n", !options.legacy);
			console.log("i18n default file generated.");
			return "i18n default file generated."
		}
	});

	runner.addTask("build:i18n:json", {
		callback: async () => {
			await buildI18nJson("src/i18n", "dist/generated/assets/i18n");
			console.log("Message bundle JSON files generated.");
			return "Message bundle JSON files generated."
		},
	});

	runner.addTask("build:jsonImports", {
		dependencies: [
			"build:jsonImports:themes",
			"build:jsonImports:i18n"
		],
		parallel: true,
	});

	runner.addTask("build:jsonImports:themes", {
		callback: async () => {
			await buildJsonImportsThemes("dist/generated/assets/themes", "src/generated/json-imports", !options.legacy);
			console.log("Generated themes JSON imports.");
			return "Generated themes JSON imports.";
		},
	});

	runner.addTask("build:jsonImports:i18n", {
		callback: async () => {
			await buildJsonImportsI18n("dist/generated/assets/i18n", "src/generated/json-imports", !options.legacy);
			console.log("Generated i18n JSON imports.");
			return "Generated i18n JSON imports.";
		},
	});

	runner.addTask("build:jsImports", {
		dependencies: [
			"mkdir -p src/generated/js-imports",
			"build:jsImports:illustrationsLoaders"
		],
		parallel: false, // ???
	});

	runner.addTask("build:jsImports:illustrationsLoaders", {
		callback: async () => {
			await Promise.all(createIllustrationsLoadersScript);
			console.log("Generated illustrations JS imports.");
			return "Generated illustrations JS imports.";
		}
	});

	runner.addTask("build:bundle", {
		dependencies: [
			`vite build ${viteConfig} --mode testing  --base ${websiteBaseUrl}`
		]
	});

	runner.addTask("build:bundle2", {
		dependencies: [
			``
		]
	});

	runner.addTask("build:illustrations", {
		callback: async () => {
			await Promise.all(illustrations);
			console.log("Illustrations generated.");
			// just a placeholder for the dependencies to work
			return "Illustrations generated.";
		}
	});

	runner.addTask("copyProps", {
		callback: async () => {
			await copyAndWatch("src/i18n/*.properties", "dist/", { silent: true });
			return "Properties files copied.";
		}
	});

	runner.addTask("copy", {
		dependencies: [
			"copy:src",
			"copy:props"
		],
	});

	runner.addTask("copy:src", {
		callback: async () => {
			await copyAndWatch("src/**/*.{js,json}", "dist/", { silent: true });
			return "Source files copied.";
		}
	});

	runner.addTask("copy:props", {
		callback: async () => {
			await copyAndWatch("src/i18n/*.properties", "dist/", { silent: true });
			return "Properties files copied.";
		}
	});

	runner.addTask("watch", {
		dependencies: [
			"watch:templates",
			"watch:typescript",
			options.legacy ? "watch:src" : "",
			"watch:styles",
			"watch:i18n",
			"watch:props"
		],
		parallel: true,
		crossEnv: {
			UI5_TS: tsCrossEnv,
		}
	});

	runner.addTask("watch:devServer", {
		dependencies: [
			"watch:default",
			"watch:bundle"
		],
		parallel: true,
	});

	runner.addTask("watch:src", {
		dependencies: [
			`copy:src --watch --safe --skip-initial-copy`
		]
	});

	runner.addTask("watch:typescript", {
		dependencies: [
			tsWatchCommandStandalone
		]
	});

	runner.addTask("watch:props", {
		dependencies: [
			`copyProps --watch --safe --skip-initial-copy`
		]
	});

	runner.addTask("watch:bundle", {
		dependencies: [
			`node ${LIB}/dev-server/dev-server.mjs ${viteConfig}`
		]
	});

	runner.addTask("watch:styles", {
		dependencies: [
			"watch:styles:themes",
			"watch:styles:components"
		],
		parallel: true,
	});

	runner.addTask("watch:styles:themes", {
		dependencies: [
			`build:styles:themes -w`
		]
	});

	runner.addTask("watch:styles:components", {
		dependencies: [
			`build:styles:components -w` // TODO
		]
	});

	runner.addTask("watch:templates", {
		dependencies: [
			'chokidar "src/**/*.hbs" -i "src/generated" -c "nps build:templates"'
		]
	});

	runner.addTask("watch:i18n", {
		dependencies: [
			'chokidar "src/i18n/messagebundle.properties" -c "nps build:i18n:defaultsjs"'
		]
	});

	runner.addTask("start", {
		dependencies: [
			"prepare",
			"watch:devServer"
		],
	})

	runner.addTask("generateAPI", {
		dependencies: [
			"generateAPI:generateCEM",
			"generateAPI:validateCEM",
		]
	});

	runner.addTask("generateAPI:generateCEM", {
		dependencies: [
			`${options.dev ? "cross-env UI5_CEM_MODE='dev'" : ""} cem analyze --config "${LIB}/cem/custom-elements-manifest.config.mjs"`
		]
	});

	runner.addTask("generateAPI:validateCEM", {
		callback: async () => {
			await validate({ devMode: options.dev });
			return "CEM validation completed.";
		}
	});

	runner.addTask("scope:testPages:clean", {
		dependencies: [
			""
		]
	})

	return runner;
};

module.exports = getScripts;