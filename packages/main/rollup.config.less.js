import fs from "fs";
import less from "rollup-plugin-less";
import mkdirp from "mkdirp";
import path from "path";
import CleanCSS from 'clean-css';

const StyleFioriMap = {};
const StyleBelizeMap = {};
const StyleBelizeHcbMap = {};

const SAP_BELIZE = "sap_belize";
const SAP_BELIZE_HCB = "sap_belize_hcb";

const getPlugins = () => {
	const plugins = [];

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
			const data = JSON.stringify({ _: css }).replace('{"_":', '').replace(/}$/, "");
			// inline the string in a .js file with ES6 export for app consumption
			fs.writeFileSync(filePath + ".js", `export default ${data};`);

			return "";
		}
	}));

	return plugins;
};

const getES6Config = () => {
	return [{
		input: "entries-less.esm.js",
		output: {
			dir: "dist/less-bundle",
			format: "esm",
			sourcemap: true
		},
		watch: {
			clearScreen: false
		},
		plugins: getPlugins(),
	}];
};

let config = getES6Config();

export default config;
