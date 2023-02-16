const resolve = require("resolve");
const assets = require('@ui5/webcomponents-tools/assets-meta.js');

const jsonImportsScript = resolve.sync("@ui5/webcomponents-tools/lib/generate-json-imports/themes.js");
const generateReportScript = resolve.sync("@ui5/webcomponents-theming/lib/generate-css-vars-usage-report/index.js");

const allThemes = assets.themes.all;
const buildThemesCommands = {};
const buildThemesCommandsNames = allThemes.map(theme => `build.themes.${theme}`).join(" ");

buildThemesCommands["prepare"] = allThemes.map(theme => `mkdirp dist/themes/${theme}`).join(" && ");
allThemes.forEach(theme => {
	buildThemesCommands[theme] = `nps build.themes.copy_${theme}_vars build.themes.copy_${theme}_bundle`;
	buildThemesCommands[`copy_${theme}_vars`] = `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/${theme.replace("sap_horizon_exp", "sap_horizon")}/css_variables.css" dist/themes/${theme}/`;
	buildThemesCommands[`copy_${theme}_bundle`] = `copy-and-watch "src/themes/${theme}/parameters-bundle.css" dist/themes/${theme}/`;
});

module.exports = {
	scripts: {
		clean: "rimraf dist && rimraf src/generated",
		build: {
			default: `cross-env UI5_TS=true nps clean build.src build.themes build.postcss build.jsonImports build.typescript generateReport`,
			src: `copy-and-watch "src/**/*.js" dist/`,
			typescript: "tsc",
			themes: {
				default: `nps build.themes.prepare ${buildThemesCommandsNames}`,
				...buildThemesCommands
			},
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
			jsonImports: `node "${jsonImportsScript}" dist/generated/assets/themes dist/generated/json-imports`,
		},
		generateReport: `node "${generateReportScript}"`,
	},
};
