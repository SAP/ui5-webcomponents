const path = require("path");
const resolve = require("resolve");
const assets = require('@ui5/webcomponents-tools/assets-meta.js');

const jsonImportsScript = resolve.sync("@ui5/webcomponents-tools/lib/generate-json-imports/themes.js");
const generateReportScript = resolve.sync("@ui5/webcomponents-theme-base/lib/generate-css-vars-usage-report/index.js");

const allThemes = assets.themes.all;
const buildThemesCommands = {};
const buildThemesCommandsNames = allThemes.map(theme => `build.themes.${theme}`).join(" ");

buildThemesCommands["prepare"] = allThemes.map(theme => `mkdirp ./themes/${theme}`).join(" && ");
allThemes.forEach(theme => {
	buildThemesCommands[theme] = `nps build.themes.copy_${theme}_vars build.themes.copy_${theme}_bundle`;
	buildThemesCommands[`copy_${theme}_vars`] = `copy-and-watch "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/${theme}/css_variables.css" ./themes/${theme}/`;
	buildThemesCommands[`copy_${theme}_bundle`] = `copy-and-watch "src/themes/${theme}/parameters-bundle.css" ./themes/${theme}/`;
});

const generateHash = resolve.sync("@ui5/webcomponents-tools/lib/hash/generate.js");
const hashIsUpToDate = resolve.sync("@ui5/webcomponents-tools/lib/hash/upToDate.js");
const UP_TO_DATE = `false`;
const UP_TO_DATE2 = `node ${hashIsUpToDate} dist/ hash.txt && echo "Up to date."`;

module.exports = {
	scripts: {
		clean: "find . -type f -print0 | grep -v node_modules | git check-ignore -z --stdin | xargs -0 rm",
		build: {
			default: `${UP_TO_DATE} || nps clean build.src build.themes build.postcss build.jsonImports generateReport hash`,
			src: `copy-and-watch "src/**/*.js" ./`,
			themes: {
				default: `nps build.themes.prepare ${buildThemesCommandsNames}`,
				...buildThemesCommands
			},
			postcss: "postcss themes/**/parameters-bundle.css --config config/postcss.themes --base themes/ --dir themes/css/",
			jsonImports: `node "${jsonImportsScript}" ./generated/assets/themes ./generated/json-imports`,
		},
		generateReport: `node "${generateReportScript}"`,
		hash: `echo hash`,
		hash2: `node ${generateHash} dist/ hash.txt`,
	},
};
