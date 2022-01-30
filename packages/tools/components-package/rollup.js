const process = require("process");
const fs = require("fs");
const os = require("os");
const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const url = require("@rollup/plugin-url");
const { terser } = require("rollup-plugin-terser");
const json = require("@rollup/plugin-json");
const replace = require("@rollup/plugin-replace");
const commonjs = require("@rollup/plugin-commonjs");
const colors = require("cli-color");
const filesize = require("rollup-plugin-filesize");
const livereload = require("rollup-plugin-livereload");
const emptyModulePlugin = require("./rollup-plugins/empty-module.js");

const packageFile = JSON.parse(fs.readFileSync("./package.json"));
const packageName = packageFile.name;
const DEPLOY_PUBLIC_PATH = process.env.DEPLOY_PUBLIC_PATH || "";

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

const getPlugins = ({ transpile }) => {
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

	if (!process.env.DEV) {
		plugins.push(filesize(
			{
				reporter(options, bundle, {
					minSize, gzipSize, brotliSize, bundleSize,
					fileName,
					// "showBeforeSizes: release"
					lastVersion,
					// "showBeforeSizes: "release" or "showBeforeSizes": "build"
					bundleSizeBefore, brotliSizeBefore, minSizeBefore, gzipSizeBefore,
				}) {
				// If a promise is returned, it will be awaited before rendering.
					return `${fileName.padEnd(35)} ${minSize} / gzipped: ${gzipSize}`;
				},
			},

		));
	}

	const publicPath = DEPLOY_PUBLIC_PATH;

	plugins.push(ui5DevImportCheckerPlugin());

	if (!transpile) {
		plugins.push(json({
			include: [
				/.*assets\/.*\.json/,
			],
			namedExports: false,
		}));
	}

	if (transpile) {
		plugins.push(url({
			limit: 0,
			include: [
				/.*assets\/.*\.json/,
			],
			emitFiles: true,
			fileName: "[name].[hash][extname]",
			publicPath,
		}));
	}

	if (transpile) {
		plugins.push(commonjs());
		plugins.push(babel({
			presets: ["@babel/preset-env"],
			exclude: /node_modules\/(?!(lit-html|@ui5\/webcomponents))/, // exclude all node_modules/ except lit-html and all starting with @ui5/webcomponents
			sourcemap: false,
			babelHelpers: "bundled",
		}));
	}

	plugins.push(nodeResolve());

	if (!process.env.DEV) {
		plugins.push(terser({
			numWorkers: 1,
		}));
	}

	const es6DevMain = process.env.DEV && !transpile && packageName === "@ui5/webcomponents";
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
		moduleContext: id => {
			if (typeof id === "string" && id.includes("url-search-params-polyfill")) {
				// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
				return "window";
			}
		},
		watch: {
			clearScreen: false,
		},
		plugins: getPlugins({ transpile: false }),
		onwarn: onwarn,
	}];
};

const getES5Config = (input = "bundle.es5.js") => {
	return [{
		input,
		output: {
			dir: "dist/resources",
			format: "iife",
			inlineDynamicImports: true,
			name: "sap-ui-webcomponents-bundle",
			extend: "true",	// Whether or not to extend the global variable defined by the name option in umd or iife formats.
			sourcemap: true,
		},
		moduleContext: id => {
			if (id.includes("url-search-params-polyfill")) {
				// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
				return "window";
			}
		},
		watch: {
			clearScreen: false,
		},
		plugins: getPlugins({ transpile: true }),
		onwarn: onwarn,
	}];
};

let config = getES6Config();

if (process.env.ES5_BUILD && fs.existsSync("bundle.es5.js")) {
	config = config.concat(getES5Config());
}

if (process.env.SCOPE) {
	if (fs.existsSync("bundle.scoped.esm.js")) {
		config = config.concat(getES6Config("bundle.scoped.esm.js"));

		if (fs.existsSync("bundle.scoped.es5.js") && process.env.ES5_BUILD) {
			config = config.concat(getES5Config("bundle.scoped.es5.js"));
		}
	}
}

module.exports = config;
