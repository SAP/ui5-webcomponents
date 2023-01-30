const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const assets = require("../../assets-meta.js");

const DEFAULT_THEME = assets.themes.default;
const requiredImports = "import type { StyleData } from \"@ui5/webcomponents-base/dist/types.js\";";

const getDefaultThemeCode = packageName => {
	return `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
${requiredImports}

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "${DEFAULT_THEME}", async () => defaultThemeBase);
registerThemePropertiesLoader("${packageName}", "${DEFAULT_THEME}", async () => defaultTheme);
`;
};

const proccessCSS = css => {
	css = css.replace(/\.sapThemeMeta[\s\S]*?:root/, ":root");
	css = css.replace(/\.background-image.*{.*}/, "");
	css = css.replace(/\.sapContrast[ ]*:root[\s\S]*?}/, "");
	css = css.replace(/--sapFontUrl.*\);?/, "");
	return JSON.stringify(css);
}

module.exports = function (opts) {
	opts = opts || {};

	return {
		postcssPlugin: 'postcss-css-to-esm',
		Once (root) {
			let css = root.toString();
			css = proccessCSS(css);

			const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/src/generated/").replace(`\\${opts.toReplace}\\`, "\\src\\generated\\");
			mkdirp.sync(path.dirname(targetFile));

			const filePath = `${targetFile}.ts`;
			let defaultTheme = opts.includeDefaultTheme ? getDefaultThemeCode(opts.packageName) : requiredImports;

			// it seems slower to read the old content, but writing the same content with no real changes
			// (as in initial build and then watch mode) will cause an unnecessary dev server refresh
			let oldContent = "";
			try {
				oldContent = fs.readFileSync(filePath).toString();
			} catch (e) {
				// file not found
			}

			const content = `${defaultTheme}
const styleData: StyleData = {packageName:"${opts.packageName}",fileName:"${targetFile.substr(targetFile.lastIndexOf("themes"))}",content:${css}};
export default styleData;
`;
			if (content !== oldContent) {
				fs.writeFileSync(filePath, content);
			}
		}
	};
};
module.exports.postcss = true;
