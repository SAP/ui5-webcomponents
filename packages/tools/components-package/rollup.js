const process = require("process");
const fs = require("fs");
const os = require("os");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const json = require("@rollup/plugin-json");
const replace = require("@rollup/plugin-replace");
const colors = require("cli-color");
const livereload = require("rollup-plugin-livereload");
const emptyModulePlugin = require("./rollup-plugins/empty-module.js");

const packageFile = JSON.parse(fs.readFileSync("./package.json"));
const packageName = packageFile.name;

const warningsToSkip = [{
	warningCode: "THIS_IS_UNDEFINED",
	filePath: /.+zxing.+/,
}];

function ui5DevImportCheckerPlugin() {
	return {
		name: "ui5-dev-import-checker-plugin",
		transform(code, file) {
			const re = new RegExp(`^import.*"${packageName}/`);
			if (re.test(code)) {
				throw new Error(`illegal import in ${file}`);
			}
		},
	};
}

function onwarn(warning, warn) {
	// Skip warning for known false positives that will otherwise polute the log
	let skip = warningsToSkip.find(warningToSkip => {
		let loc, file;
		return warning.code === warningToSkip.warningCode
			&& (loc = warning.loc)
			&& (file = loc.file)
			&& file.match(warningToSkip.filePath);
	});
	if (skip) {
		return;
	}

	// warn everything else
	warn( warning );
}

const reportedForPackages = new Set(); // sometimes writeBundle is called more than once per bundle -> suppress extra messages
function ui5DevReadyMessagePlugin() {
	return {
		name: "ui5-dev-message-ready-plugin",
		writeBundle: (assets, bundle) => {
			if (reportedForPackages.has(packageName)) {
				return;
			}
			console.log(colors.blue(`${colors.bold(packageName)} successfully built!`));

			if (fs.existsSync(".port")) {
				const port = `${fs.readFileSync(".port")}`;
				if (port) {
					console.log(colors.blue(`Navigate to: ${colors.bold(`http://localhost:${port}/test-resources/pages/`)}`));
				}
			}
			reportedForPackages.add(packageName);
		},
	};
}

const getPlugins = () => {
	const plugins = [];

	if (process.env.DEV) {
		plugins.push(replace({
			values: {
				'const DEV_MODE = false': 'const DEV_MODE = true',
			},
			preventAssignment: false,
		}));
	}

	if (process.env.DEV && !process.env.ENABLE_CLDR) {
		// Empty the CLDR assets file for better performance during development
		plugins.push(emptyModulePlugin({
			emptyModules: [
				"localization/dist/Assets.js",
			],
		}));
	}

	plugins.push(ui5DevImportCheckerPlugin());

	plugins.push(json({
		include: [
			/.*assets\/.*\.json/,
		],
		namedExports: false,
	}));

	plugins.push(nodeResolve());

	if (!process.env.DEV) {
		plugins.push(terser({
			numWorkers: 1,
		}));
	}

	const es6DevMain = process.env.DEV && packageName === "@ui5/webcomponents";
	if (es6DevMain && os.platform() !== "win32") {
		plugins.push(livereload({
			watch: [
				"dist/resources/bundle.esm.js",
				"dist/**/*.html",
				"dist/**/*.json",
			],
		}));
	}

	if (process.env.DEV) {
		plugins.push(ui5DevReadyMessagePlugin());
	}

	return plugins;
};

const getES6Config = (input = "bundle.esm.js") => {
	return [{
		input,
		output: {
			dir: "dist/resources",
			format: "esm",
			sourcemap: true,
		},
		watch: {
			clearScreen: false,
		},
		plugins: getPlugins(),
		onwarn: onwarn,
	}];
};

let config = getES6Config();

if (process.env.SCOPE) {
	if (fs.existsSync("bundle.scoped.esm.js")) {
		config = config.concat(getES6Config("bundle.scoped.esm.js"));
	}
}

module.exports = config;
