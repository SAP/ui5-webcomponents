const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const assets = require("../../assets-meta.js");

const DEFAULT_THEME = assets.themes.default;

const getDefaultThemeCode = packageName => {
	return `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "${DEFAULT_THEME}", async () => defaultThemeBase);
registerThemePropertiesLoader("${packageName}", "${DEFAULT_THEME}", async () => defaultTheme);
`;
};

const getFileContent = (tsMode, targetFile, packageName, css, includeDefaultTheme) => {
	if (tsMode) {
		return getTSContent(targetFile, packageName, css, includeDefaultTheme);
	}

	return getJSContent(targetFile, packageName, css, includeDefaultTheme);
}

const getTSContent = (targetFile, packageName, css, includeDefaultTheme) => {
	const typeImport = "import type { StyleData } from \"@ui5/webcomponents-base/dist/types.js\";"
	const defaultTheme = includeDefaultTheme ? getDefaultThemeCode(packageName) : "";

	// tabs are intentionally mixed to have proper identation in the produced file
	return `${typeImport}
${defaultTheme}
const styleData: StyleData = {packageName:"${packageName}",fileName:"${targetFile.substr(targetFile.lastIndexOf("themes"))}",content:${css}};
export default styleData;
	`;
}

const getJSContent = (targetFile, packageName, css, includeDefaultTheme) => {
	const defaultTheme = includeDefaultTheme ? getDefaultThemeCode(packageName) : "";

	return `${defaultTheme}export default {packageName:"${packageName}",fileName:"${targetFile.substr(targetFile.lastIndexOf("themes"))}",content:${css}}`
}


const proccessCSS = css => {
	css = css.replace(/\.sapThemeMeta[\s\S]*?:root/, ":root");
	css = css.replace(/\.background-image.*{.*}/, "");
	css = css.replace(/\.sapContrast[ ]*:root[\s\S]*?}/, "");
	css = css.replace(/--sapFontUrl.*\);?/, "");
	return JSON.stringify(css);
}

module.exports = function (opts) {
	opts = opts || {};

	const packageName = opts.packageName;
	const includeDefaultTheme = opts.includeDefaultTheme;
	const toReplace = opts.toReplace;

	return {
		postcssPlugin: 'postcss-css-to-esm',
		Once (root) {
			const tsMode = process.env.UI5_TS === "true";

			let css = root.toString();
			css = proccessCSS(css);

			const targetFile = root.source.input.from.replace(`/${toReplace}/`, "/src/generated/").replace(`\\${toReplace}\\`, "\\src\\generated\\");
			mkdirp.sync(path.dirname(targetFile));

			const filePath = `${targetFile}.${tsMode ? "ts" : "js"}`;

			// it seems slower to read the old content, but writing the same content with no real changes
			// (as in initial build and then watch mode) will cause an unnecessary dev server refresh
			let oldContent = "";
			try {
				oldContent = fs.readFileSync(filePath).toString();
			} catch (e) {
				// file not found
			}

			const content = getFileContent(tsMode, targetFile, packageName, css, includeDefaultTheme);
			if (content !== oldContent) {
				fs.writeFileSync(filePath, content);
			}
		}
	};
};
module.exports.postcss = true;
