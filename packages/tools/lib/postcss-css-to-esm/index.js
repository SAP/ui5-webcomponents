// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const assets = require("../../assets-meta.js");

const DEFAULT_THEME = assets.themes.default;

const getDefaultThemeCode = packageName => {
	return `import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theme-base/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemeProperties("@ui5/webcomponents-theme-base", "${DEFAULT_THEME}", defaultThemeBase);
registerThemeProperties("${packageName}", "${DEFAULT_THEME}", defaultTheme);
`;
};

const proccessCSS = css => {
	css = css.replace(/\.sapThemeMeta[\s\S]*?:root/, ":root");
	css = css.replace(/\.background-image.*{.*}/, "");
	css = css.replace(/\.sapContrast[ ]*:root[\s\S]*?}/, "");
	css = css.replace(/--sapFontUrl.*\);?/, "");
	return JSON.stringify(css);
}

module.exports = postcss.plugin('add css to esm transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		let css = root.toString();
		css = proccessCSS(css);

		const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/generated/").replace(`\\${opts.toReplace}\\`, "\\dist\\generated\\");
		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.js`;
		const defaultTheme = opts.includeDefaultTheme ? getDefaultThemeCode(opts.packageName) : ``;
		fs.writeFileSync(filePath, `${defaultTheme}export default ${css};`);
	}
});
