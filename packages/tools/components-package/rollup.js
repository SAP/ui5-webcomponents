const babel = require("rollup-plugin-babel");
const mkdirp = require("mkdirp");
const path = require("path");
const process = require("process");
const resolve = require("rollup-plugin-node-resolve");
const url = require("rollup-plugin-url");
const { terser } = require("rollup-plugin-terser");
const notify = require('rollup-plugin-notify');
const filesize = require('rollup-plugin-filesize');

const getConfig = (options) => {

	const DIST = path.normalize("dist");
	const DIST_PLAYGROUND = path.normalize("dist/resources/");


	const DEPLOY_PUBLIC_PATH = process.env.DEPLOY_PUBLIC_PATH || "";

	function ui5DevImportCheckerPlugin() {
		return {
			name: "ui5-dev-import-checker-plugin",

			transform(code, file) {
				if (/TemplateHelper/.test(file)) {
					return;
				}
				const re = new RegExp(`^import.*"${options.name}/`);
				if (re.test(code)) {
					throw new Error(`illegal import in ${file}`);
				}

				if (/import.*"@ui5\/webcomponents-core\/dist\/sap\/ui\/core\/IconPool/.test(code)) {
					throw new Error(`You need to import '@ui5/webcomponents-base/dist/IconPool' instead of IconPool ${file}`);
				}
			}
		};
	}

	const getPlugins = ({ transpile }) => {
		const plugins = [];
		let publicPath = DEPLOY_PUBLIC_PATH || "/resources/";

		plugins.push(filesize({
			render : function (options, bundle, { minSize, gzipSize, brotliSize, bundleSize }){
				return gzipSize;
			}
		}));

		plugins.push(ui5DevImportCheckerPlugin());

		plugins.push(url({
			limit: 0,
			include: [
				/.*assets\/.*\.json/
			],
			emitFiles: true,
			fileName: "[name].[hash][extname]",
			publicPath,
		}));


		if (transpile) {
			plugins.push(babel({
				presets: ["@babel/preset-env"],
				exclude: "node_modules/**",
				sourcemap: true,	// turn it on when we transition off from the less plugin
			}));
		}

		plugins.push(resolve());

		if (!process.env.DEV) {
			plugins.push(terser());
		}

		if (process.env.DEV) {
			plugins.push(notify({
				success: true
			}));
		}

		return plugins;
	};

	const getES6Config = () => {
		return [{
			input: "bundle.esm.js",
			output: {
				dir: "dist/resources",
				format: "esm",
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
			plugins: getPlugins({transpile: false}),
		}];
	};

	const getES5Config = () => {
		return [ {
			input: "bundle.es5.js",
			output: {
				dir: "dist/resources",
				format: "iife",
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

	let config = [];

	config = config.concat(getES6Config());

	if (process.env.ES5_BUILD) {
		config = config.concat(getES5Config());
	} else {
		// Create the dist folder in advance to execute watch:js and ui5 serve in parallel,
		// otherwise ui5:serve would fail with: 'Could not find source directory'.
		mkdirp.sync(DIST);
		mkdirp.sync(DIST_PLAYGROUND);
	}

	return config;
};

module.exports = getConfig;
