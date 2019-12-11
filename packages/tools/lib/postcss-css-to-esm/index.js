const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = postcss.plugin('add css to esm transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		const css = JSON.stringify(root.toString());
		const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/generated/").replace(`\\${opts.toReplace}\\`, "\\dist\\generated\\");

		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.js`;

		const defaultTheme = opts.includeDefaultTheme ? `import "../../DefaultTheme.js";
		` : ``;

		fs.writeFileSync(filePath, `${defaultTheme}export default ${css}`);
	}
});
