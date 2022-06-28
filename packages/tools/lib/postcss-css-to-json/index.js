const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const proccessCSS = css => {
	css = css.replace(/\.sapThemeMeta[\s\S]*?:root/, ":root");
	css = css.replace(/\.background-image.*{.*}/, "");
	css = css.replace(/\.sapContrast[ ]*:root[\s\S]*?}/, "");
	css = css.replace(/--sapFontUrl.*\);?/, "");
	return css;
}

module.exports = function (opts) {
	opts = opts || {};

	return {
		postcssPlugin: 'postcss-css-to-json',
		Once (root) {
			let css = root.toString();
			css = proccessCSS(css);

			const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/generated/assets/").replace(`\\${opts.toReplace}\\`, "\\dist\\generated\\assets\\");
			mkdirp.sync(path.dirname(targetFile));

			const filePath = `${targetFile}.json`;
			const data = {
				packageName: opts.packageName,
				fileName: targetFile.substr(targetFile.lastIndexOf("themes")),
				content: css
			};
			// it seems slower to read the old content, but writing the same content with no real changes
			// (as in initial build and then watch mode) will cause an unnecessary dev server refresh
			let oldContent = "";
			try {
				oldContent = fs.readFileSync(filePath).toString();
			} catch (e) {
				// file not found
			}
			const content = JSON.stringify({_: data});
			if (content !== oldContent) {
				fs.writeFileSync(filePath, content);
			}
		}
	};
};

module.exports.postcss = true;
