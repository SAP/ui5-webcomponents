const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const getDefaultThemeCode = packageName => {
	return `import "@ui5/webcomponents-theme-base/dist/DefaultTheme.js";
	
import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import fiori3 from "./sap_fiori_3/parameters-bundle.css.js";

registerThemeProperties("${packageName}", "sap_fiori_3", fiori3);

`;
};

module.exports = postcss.plugin('add css to esm transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		const css = JSON.stringify(root.toString());
		let targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/generated/").replace(`\\${opts.toReplace}\\`, "\\dist\\generated\\");
		targetFile = targetFile.replace("css_variables", "parameters-bundle");

		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.js`;

		const defaultTheme = opts.includeDefaultTheme ? getDefaultThemeCode(opts.packageName) : ``;

		fs.writeFileSync(filePath, `${defaultTheme}export default ${css};`);
	}
});
