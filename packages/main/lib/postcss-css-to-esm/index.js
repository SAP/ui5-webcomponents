const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = postcss.plugin('add css to esm transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		const css = JSON.stringify(root.toString());
		const targetFile = root.source.input.from.replace("/src/", "/dist/generated/").replace("\\src\\", "\\dist\\generated\\");

		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.js`;

		fs.writeFileSync(filePath, `export default ${css}`);
	}
});
