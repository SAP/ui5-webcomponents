import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import { terser } from "rollup-plugin-terser";
import htmlTemplate from 'rollup-plugin-generate-html-template';

const DEPLOY_PUBLIC_PATH = process.env.DEPLOY_PUBLIC_PATH || "";
const INPUT_FILES = ["button.bundle.js", "textarea.bundle.js", "datepicker.bundle.js"];

const getConfig = (inputFile) => {
	const component = inputFile.split(".")[0];
	return {
		input: inputFile,
		output: {
			file: `test/single_import/${component}/${inputFile}`,
			format: "iife",
			name: "sap-ui-webcomponents-main-bundle",
			extend: "true",
		},
		plugins: [
			resolve(),
			url({
				limit: 0,
				include: [
					/.*cldr\/.*\.json/,
					/.*i18n\/.*\.json/,
					/.*sap.ui.core.*\/SAP-icons.*/,
				],
				emitFiles: true,
				fileName: "[name].[hash][extname]",
				publicPath: DEPLOY_PUBLIC_PATH + "/resources/sap/ui/webcomponents/main/",
			}),
			htmlTemplate({
				template: `./test/sap/ui/webcomponents/main/pages/template.html`,
				target: `single_import/${component}/${component}.html`,
			}),
			babel({
				presets: ["@babel/preset-env"],
				exclude: "node_modules/**",
			}),
			terser(),
		]
	}
};

const config = INPUT_FILES.map(getConfig);

export default config