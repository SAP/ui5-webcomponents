const babel = require("rollup-plugin-babel");
const process = require("process");
const resolve = require("rollup-plugin-node-resolve");
const url = require("rollup-plugin-url");
const { terser } = require("rollup-plugin-terser");
const glob = require("glob");
const path = require("path");

const DEPLOY_PUBLIC_PATH = process.env.DEPLOY_PUBLIC_PATH || "";

const getPlugins = ({ transpile }) => {
	const plugins = [];
	let publicPath = DEPLOY_PUBLIC_PATH || "/resources/";

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
			exclude: /node_modules\/(?!(lit-html|@ui5\/webcomponents))/, //exclude all node_modules/ except lit-html and all starting with @ui5/webcomponents
			sourcemap: true,
		}));
	}

	plugins.push(resolve());

	if (!process.env.DEV) {
		//plugins.push(terser());
	}

	return plugins;
};

const getES6Config = () => {

	const inputs = glob.sync("*.js").filter(file => !["rollup.config.js", "bundle-base.js"].includes(file));

	// TODO: do not use terser to minimize, leave to OpenUI5
	return [{
		input: inputs,
		output: [
			{
				dir: "/SAPDevelop/openui5/src/sap.ui.webcomponents/src/sap/ui/webcomponents/thirdparty/ui5-wc-bundles",
				format: "amd",
				amd: {
					define: "sap.ui.define"
				},
				sourcemap: true
			}
		],
		moduleContext: (id) => {
			if (id.includes("url-search-params-polyfill")) {
				// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
				return "window";
			}
		},
		plugins: getPlugins({transpile: true}),
	}];
};

let config = getES6Config();

module.exports = config;
