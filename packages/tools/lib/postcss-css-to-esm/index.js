const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const buildConfiguration = require("../build-configuration/index.js");

const DEFAULT_THEME = buildConfiguration.theming.defaultTheme;

const getDefaultThemeCode = packageName => {
	return `import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theme-base/dist/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemeProperties("@ui5/webcomponents-theme-base", "${DEFAULT_THEME}", defaultThemeBase);
registerThemeProperties("${packageName}", "${DEFAULT_THEME}", defaultTheme);
`;
};

module.exports = postcss.plugin('add css to esm transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		const css = JSON.stringify(root.toString());
		const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/generated/").replace(`\\${opts.toReplace}\\`, "\\dist\\generated\\");

		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.js`;

		const defaultTheme = opts.includeDefaultTheme ? getDefaultThemeCode(opts.packageName) : ``;

		fs.writeFileSync(filePath, `${defaultTheme}export default ${css};`);
	}
});
