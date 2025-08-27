const BuildRunner = require('../task-runner/build-runner');
const path = require("path");
const fs = require("fs");
const LIB = path.join(__dirname, `../lib/`);

const runner = new BuildRunner();

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
	const illustrations = illustrationsData.map(illustration => `node "${LIB}/create-illustrations/index.js" ${illustration.path} ${illustration.defaultText} ${illustration.illustrationsPrefix} ${illustration.set} ${illustration.destinationPath} ${illustration.collection}`);
	const createIllustrationsJSImportsScript = illustrations.join(" && ");

	// The script creates the "src/generated/js-imports/Illustration.js" file that registers loaders (dynamic JS imports) for each illustration
	const createIllustrationsLoadersScript = illustrationsData.map(illustrations => `node ${LIB}/generate-js-imports/illustrations.js ${illustrations.destinationPath} ${illustrations.dynamicImports.outputFile} ${illustrations.set} ${illustrations.collection} ${illustrations.dynamicImports.location} ${illustrations.dynamicImports.filterOut.join(" ")}`).join(" && ");

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


	runner.addTask("clean", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"rimraf src/generated",
			"rimraf dist",
			"scope:testPages:clean"
		],
		parallel: true,
	});

	runner.addTask("lint", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`eslint . ${eslintConfig}`
		]
	});

	runner.addTask("lintfix", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`eslint . ${eslintConfig} --fix`
		]
	});

	runner.addTask("generate", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"prepare:all"
		],
		crossEnv: {
			UI5_TS: tsCrossEnv,
		}
	})

	runner.addTask("generate:all", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:templates",
			"build:i18n",
			"prepare:styleRelated",
			"copyProps",
			"build:illustrations"
		],
		parallel: true,
	})

	runner.addTask("generate:styleRelated", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:styles",
			"build:jsonImports",
			"build:jsImports"
		],
		parallel: true,
	})

	runner.addTask("prepare", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
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

	runner.addTask("prepare:all", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:templates",
			"build:i18n",
			"prepare:styleRelated",
			"build:illustrations"
		],
		parallel: true,
	});

	runner.addTask("prepare:styleRelated", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:styles",
			"build:jsonImports",
			"build:jsImports"
		],
	})

	runner.addTask("prepare:typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			tsCommandOld
		]
	});

	runner.addTask("build", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"prepare",
			"lint",
			"build:bundle", // "build:bundle2"
		]
	})

	runner.addTask("build:templates", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/hbs2ui5/index.js" -d src/ -o src/generated/templates`
		],
		crossEnv: {
			UI5_TS: tsCrossEnv,
		}
	});

	runner.addTask("build:styles", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:styles:themes",
			"build:styles:components"
		],
		parallel: true,
	})

	runner.addTask("build:styles:themes", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/css-processors/css-processor-themes.mjs"`
		]
	});

	runner.addTask("build:styles:components", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/css-processors/css-processor-components.mjs"`
		]
	});

	runner.addTask("build:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:i18n:defaultsjs",
			"build:i18n:json"
		],
		parallel: true,
	});

	runner.addTask("build:i18n:defaultsjs", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/i18n/defaults.js" src/i18n src/generated/i18n`
		]
	});

	runner.addTask("build:i18n:json", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/i18n/toJSON.js" src/i18n dist/generated/assets/i18n`
		]
	});

	runner.addTask("build:jsonImports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"build:jsonImports:themes",
			"build:jsonImports:i18n"
		],
		parallel: true,
	});

	runner.addTask("build:jsonImports:themes", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`mkdir -p src/generated/json-imports && node "${LIB}/generate-json-imports/themes.js" dist/generated/assets/themes src/generated/json-imports`
		]
	});

	runner.addTask("build:jsonImports:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`mkdir -p src/generated/json-imports && node "${LIB}/generate-json-imports/i18n.js" dist/generated/assets/i18n src/generated/json-imports`
		]
	});

	runner.addTask("build:jsImports", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"mkdir -p src/generated/js-imports",
			"build:jsImports:illustrationsLoaders"
		],
		parallel: false, // ???
	});

	runner.addTask("build:jsImports:illustrationsLoaders", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			createIllustrationsLoadersScript
		]
	});

	runner.addTask("build:bundle", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`vite build ${viteConfig} --mode testing  --base ${websiteBaseUrl}`
		]
	});

	runner.addTask("build:bundle2", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			``
		]
	});

	runner.addTask("build:illustrations", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			createIllustrationsJSImportsScript
		]
	});

	runner.addTask("copyProps", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/`
		]
	});

	runner.addTask("copy", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"copy:src",
			"copy:props"
		],
	});

	runner.addTask("copy:src", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/copy-and-watch/index.js" --silent "src/**/*.{js,json}" dist/`
		]
	});

	runner.addTask("copy:props", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node "${LIB}/copy-and-watch/index.js" --silent "src/i18n/*.properties" dist/`
		]
	});

	runner.addTask("watch", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
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

	runner.addTask("watch:devServer", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"watch:default",
			"watch:bundle"
		],
		parallel: true,
	});

	runner.addTask("watch:src", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`copy:src --watch --safe --skip-initial-copy`
		]
	});

	runner.addTask("watch:typescript", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			tsWatchCommandStandalone
		]
	});

	runner.addTask("watch:props", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`copyProps --watch --safe --skip-initial-copy`
		]
	});

	runner.addTask("watch:bundle", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`node ${LIB}/dev-server/dev-server.mjs ${viteConfig}`
		]
	});

	runner.addTask("watch:styles", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"watch:styles:themes",
			"watch:styles:components"
		],
		parallel: true,
	});

	runner.addTask("watch:styles:themes", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`build:styles:themes -w`
		]
	});

	runner.addTask("watch:styles:components", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`build:styles:components -w` // TODO
		]
	});

	runner.addTask("watch:templates", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			'chokidar "src/**/*.hbs" -i "src/generated" -c "nps build:templates"'
		]
	});

	runner.addTask("watch:i18n", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			'chokidar "src/i18n/messagebundle.properties" -c "nps build:i18n:defaultsjs"'
		]
	});

	runner.addTask("start", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"prepare",
			"watch:devServer"
		],
	})

	runner.addTask("generateAPI", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			"generateAPI:generateCEM",
			"generateAPI:validateCEM",
		]
	});

	runner.addTask("generateAPI:generateCEM", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`${options.dev ? "cross-env UI5_CEM_MODE='dev'" : ""} cem analyze --config "${LIB}/cem/custom-elements-manifest.config.mjs"`
		]
	});

	runner.addTask("generateAPI:validateCEM", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			`${options.dev ? "cross-env UI5_CEM_MODE='dev'" : ""} node "${LIB}/cem/validate.js"`
		]
	});

	runner.addTask("scope:testPages:clean", BuildRunner.BUILD_RUNNER_CONSTANTS.PRINT, {
		dependencies: [
			""
		]
	})

	return runner;
};

module.exports = getScripts;