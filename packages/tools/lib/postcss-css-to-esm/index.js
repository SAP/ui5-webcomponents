const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const assets = require("../../assets-meta.js");

const DEFAULT_THEME = assets.themes.default;

const getDefaultThemeCode = packageName => {
	return `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theme-base/generated/themes/${DEFAULT_THEME}/parameters-bundle.css.js";
import defaultTheme from "./${DEFAULT_THEME}/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theme-base", "${DEFAULT_THEME}", () => defaultThemeBase);
registerThemePropertiesLoader("${packageName}", "${DEFAULT_THEME}", () => defaultTheme);
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

			const from = root.source.input.from;
			// convert source file to posix path
			const src = from.split(path.sep).join(path.posix.sep);

			//toReplace old
			// /${opts.toReplace}/, "/dist/generated/"
			const targetFile = path.normalize(src.replace(opts.srcPattern, opts.dstPattern));
			console.log({targetFile});
			mkdirp.sync(path.dirname(targetFile));

			const filePath = `${targetFile}.js`;
			const defaultTheme = opts.includeDefaultTheme ? getDefaultThemeCode(opts.packageName) : ``;
			fs.writeFileSync(filePath, `${defaultTheme}export default ${css};`);
		}
	};
};
module.exports.postcss = true;