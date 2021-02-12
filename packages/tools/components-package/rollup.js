const process = require("process");
const fs = require("fs");
const os = require("os");
const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const url = require("@rollup/plugin-url");
const { terser } = require("rollup-plugin-terser");
const json = require("@rollup/plugin-json");
const notify = require('rollup-plugin-notify');
const filesize = require('rollup-plugin-filesize');
const livereload = require('rollup-plugin-livereload');

const packageName = JSON.parse(fs.readFileSync("./package.json")).name;
const DEPLOY_PUBLIC_PATH = process.env.DEPLOY_PUBLIC_PATH || "";

function ui5DevImportCheckerPlugin() {
	return {
		name: "ui5-dev-import-checker-plugin",
		transform(code, file) {
			const re = new RegExp(`^import.*"${packageName}/`);
			if (re.test(code)) {
				throw new Error(`illegal import in ${file}`);
			}
		}
	};
}

const getPlugins = ({ transpile }) => {
	const plugins = [];
	let publicPath = DEPLOY_PUBLIC_PATH;

	if (!process.env.DEV) {
		plugins.push(filesize({
			render : function (options, bundle, { minSize, gzipSize, brotliSize, bundleSize }){
				return gzipSize;
			}
		}));
	}

	plugins.push(ui5DevImportCheckerPlugin());

	// comment out json plugin when testing static imports
	plugins.push(json({
		include: [
			/.*assets\/.*\.json/,
		],
		namedExports: false,
	}));

	// uncomment when testing static resources
	// plugins.push(url({
	// 	limit: 0,
	// 	include: [
	// 		/.*assets\/.*\.json/,
	// 	],
	// 	emitFiles: true,
	// 	fileName: "[name].[hash][extname]",
	// 	publicPath,
	// }));

	if (transpile) {
		plugins.push(babel({
			presets: ["@babel/preset-env"],
			exclude: /node_modules\/(?!(lit-html|@ui5\/webcomponents))/, //exclude all node_modules/ except lit-html and all starting with @ui5/webcomponents
			sourcemap: true,
		}));
	}

	plugins.push(nodeResolve());

	if (!process.env.DEV) {
		plugins.push(terser({
			numWorkers: 1,	// temp workaround for `Error: kill EPERM` error on MacOS 11
		}));
	}

	if (process.env.DEV) {
		plugins.push(notify());
	}

	const es6DevMain = process.env.DEV && !transpile && packageName === "@ui5/webcomponents";
	if (es6DevMain && os.platform() !== "win32") {
		plugins.push(livereload({
			watch: [
				"dist/resources/bundle.esm.js",
				"dist/**/*.html",
				"dist/**/*.json",
			]
		}));
	}

	return plugins;
};

const getES6Config = (input = "bundle.esm.js") => {
	return [{
		input,
		output: {
			dir: "dist/resources",
			format: "esm",
			sourcemap: true
		},
		moduleContext: (id) => {
			if (typeof id === "string" && id.includes("url-search-params-polyfill")) {
				// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
				return "window";
			}
		},
		watch: {
			clearScreen: false
		},
		plugins: getPlugins({transpile: false}),
	}];
};

const getES5Config = (input = "bundle.es5.js") => {
	return [ {
		input,
		output: {
			dir: "dist/resources",
			format: "iife",
			inlineDynamicImports: true,
			name: "sap-ui-webcomponents-bundle",
			extend: "true",	// Whether or not to extend the global variable defined by the name option in umd or iife formats.
			sourcemap: true
		},
		moduleContext: (id) => {
			if (id.includes("url-search-params-polyfill")) {
				// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
				return "window";
			}
		},
		watch: {
			clearScreen: false
		},
		plugins: getPlugins({transpile: true}),
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
