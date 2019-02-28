import babel from "rollup-plugin-babel";
import fs from "fs";
import less from "rollup-plugin-less";
import mkdirp from "mkdirp";
import path from "path";
import process from "process";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import { terser } from "rollup-plugin-terser";
import notify from 'rollup-plugin-notify';
import CleanCSS from 'clean-css';

const StyleFioriMap = {};
const StyleBelizeMap = {};
const StyleBelizeHcbMap = {};

const SAP_BELIZE = "sap_belize";
const SAP_BELIZE_HCB = "sap_belize_hcb";

const DIST = path.normalize("dist");
const DIST_PLAYGROUND = path.normalize("dist/resources/sap/ui/webcomponents/main");

const SAP_BELIZE_BUNDLE_DIST = path.normalize("dist/themes/sap_belize/theme-bundle.json");
const SAP_BELIZE_HCB_BUNDLE_DIST = path.normalize("dist/themes/sap_belize_hcb/theme-bundle.json");
const SAP_FIORI3_BUNDLE_DIST = path.normalize("dist/themes/sap_fiori_3/theme-bundle.json");

const SAP_BELIZE_BUNDLE_DIST_PLAYGROUND = path.normalize("dist/resources/sap/ui/webcomponents/main/themes/sap_belize/theme-bundle.json");
const SAP_BELIZE_HCB_BUNDLE_DIST_PLAYGROUND = path.normalize("dist/resources/sap/ui/webcomponents/main/themes/sap_belize_hcb/theme-bundle.json");
const SAP_FIORI3_BUNDLE_DIST_PLAYGROUND = path.normalize("dist/resources/sap/ui/webcomponents/main/themes/sap_fiori_3/theme-bundle.json");

const DEPLOY_PUBLIC_PATH = process.env.DEPLOY_PUBLIC_PATH || "";

function ui5DevImportCheckerPlugin() {
	return {
		name: "ui5-dev-import-checker-plugin",

		transform(code, file) {
			if (/TemplateHelper/.test(file)) {
				return;
			}
			if (/^import.*"@ui5\/webcomponents\//.test(code)) {
				throw new Error(`illegal import in ${file}`);
			}

			if (/import.*"@ui5\/webcomponents-core\/dist\/sap\/ui\/core\/IconPool/.test(code) && !/IconPoolProxy/.test(file)) {
				throw new Error(`You need to import '@ui5/webcomponents-base/src/sap/ui/webcomponents/base/IconPoolProxy' instead of IconPool ${file}`);
			}
		}
	};
}

function ui5LessPlugin() {
	const isLess = fileName => path.extname(fileName) === ".less";

	const generateThemes = () => {
		writeFile(SAP_BELIZE_BUNDLE_DIST, JSON.stringify(StyleBelizeMap));
		writeFile(SAP_BELIZE_HCB_BUNDLE_DIST, JSON.stringify(StyleBelizeHcbMap));
		writeFile(SAP_FIORI3_BUNDLE_DIST, JSON.stringify(StyleFioriMap));

		writeFile(SAP_BELIZE_BUNDLE_DIST_PLAYGROUND, JSON.stringify(StyleBelizeMap));
		writeFile(SAP_BELIZE_HCB_BUNDLE_DIST_PLAYGROUND, JSON.stringify(StyleBelizeHcbMap));
		writeFile(SAP_FIORI3_BUNDLE_DIST_PLAYGROUND, JSON.stringify(StyleFioriMap));
	};

	const writeFile = (file, content) => {
		mkdirp.sync(path.dirname(file));
		fs.writeFileSync(file, content);
	};

	return {
		name: "ui5-less-plugin",

		transform(code, file) {
			if (isLess(file)) {
				this.addWatchFile(path.join(process.cwd(), `src/themes/base/${path.basename(file)}`));
			}

			return {
				code,
				map: null,
			};
		},

		generateBundle() {
			generateThemes();
		}
	};
}

const getPlugins = ({ transpile }) => {
	const plugins = [];

	plugins.push(ui5DevImportCheckerPlugin());

	plugins.push(url({
		limit: 0,
		include: [
			/.*cldr\/.*\.json/,
			/.*i18n\/.*\.json/,
			/.*sap.ui.core.*\/SAP-icons.*/,
		],
		emitFiles: true,
		fileName: "[name].[hash][extname]",
		publicPath: DEPLOY_PUBLIC_PATH + "/resources/sap/ui/webcomponents/main/",
	}));

	// virtual theme bundles
	plugins.push(url({
		limit: 0,
		include: [
			/.*themes.*theme-bundle.json/,
		],
		emitFiles: true,
		fileName: path.sep === "\\" ? "themes/[dirname]/[name][extname]" : "themes/[dirname][name][extname]",
		publicPath: DEPLOY_PUBLIC_PATH + "/resources/sap/ui/webcomponents/main/",
	}));

	if (process.env.DEV) {
		plugins.push(notify({
			success: true
		}));
	}

	if (transpile) {
		plugins.push(babel({
			presets: ["@babel/preset-env"],
			exclude: "node_modules/**",
		}));
	}

	plugins.push(resolve());

	plugins.push(less({
		output(css, filePath) {
			// minify css
			css = new CleanCSS({}).minify(css).styles;

			const key = path.basename(filePath).replace("less", "css");
			if (filePath.includes(SAP_BELIZE) && !filePath.includes(SAP_BELIZE_HCB)) {
				StyleBelizeMap[key] = css;
			} else if (filePath.includes(SAP_BELIZE_HCB)) {
				StyleBelizeHcbMap[key] = css;
			} else {
				StyleFioriMap[key] = css;
			}

			// generate json in DIST for app consumption
			filePath = filePath.replace(path.normalize("main/src"), path.normalize("main/dist"));

			mkdirp.sync(path.dirname(filePath));
			// use JSON.stringify to escape the string content
			const data = JSON.stringify({ _: css }).replace('{"_":', '').replace(/}$/, "");
			// inline the string in a .js file with ES6 export for app consumption
			fs.writeFileSync(filePath.replace(".less", "-css.js"), `export default ${data};`);

			// CSS is for dev comparison only
			fs.writeFileSync(filePath.replace(".less", ".css"), css);

			return "";
		}
	}));

	plugins.push(ui5LessPlugin());

	if (!process.env.DEV) {
		plugins.push(terser());
	}

	return plugins;
};

const getES6Config = () => {
	return [{
		input: "bundle.esm.js",
		output: {
			dir: "dist/resources/sap/ui/webcomponents/main",
			format: "esm",
			sourcemap: true
		},
		moduleContext: (id) => {
			if (id.includes("shadydom")) {
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
			dir: "dist/resources/sap/ui/webcomponents/main",
			format: "iife",
			name: "sap-ui-webcomponents-main-bundle",
			extend: "true",	// Whether or not to extend the global variable defined by the name option in umd or iife formats.
			sourcemap: true
		},
		moduleContext: (id) => {
			if (id.includes("url-search-params-polyfill")) {
				// suppress the rollup error for this module as it uses this in the global scope correctly even without changing the context here
				return "window";
			}
			if (id.includes("shadydom")) {
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

export default config;
