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

	// Temporary, will be removed 
	// after theme parameters are released in theming-base-content
	let _varsOfTheme = theme;
	if (theme.startsWith("sap_horizon")) {
		_varsOfTheme = "sap_horizon";
	}

	buildThemesCommands[`copy_${theme}_vars`] = `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/${_varsOfTheme}/css_variables.css" dist/themes/${theme}/`;
	buildThemesCommands[`copy_${theme}_bundle`] = `copy-and-watch "src/themes/${theme}/parameters-bundle.css" dist/themes/${theme}/`;
});

const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `node "${hashIsUpToDate}" dist/ hash.txt && echo "Up to date."`;

module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: `${UP_TO_DATE} || nps clean build.src build.themes build.postcss build.jsonImports generateReport hash`,
			src: `copy-and-watch "src/**/*.js" dist/`,
			themes: {
				default: `nps build.themes.prepare ${buildThemesCommandsNames}`,
				...buildThemesCommands
			},
			postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
			jsonImports: `node "${jsonImportsScript}" dist/generated/assets/themes dist/generated/json-imports`,
		},
		generateReport: `node "${generateReportScript}"`,
		hash: `node ${generateHash} dist/ hash.txt`,
	},
};
