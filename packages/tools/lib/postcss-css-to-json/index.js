const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = postcss.plugin('add css to JSON transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		const css = root.toString();
		const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/assets/").replace(`\\${opts.toReplace}\\`, "\\dist\\assets\\");

		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.json`;

		fs.writeFileSync(filePath, JSON.stringify({_: css}));

	}
});
