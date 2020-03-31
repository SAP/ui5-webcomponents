const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = postcss.plugin('add css to JSON transform plugin', function (opts) {
	opts = opts || {};

	return function (root) {
		let css = root.toString();

		const r = new RegExp(/[\s\S]*(:root{[\s\S]*})/, 'g');
		const match = r.exec(css);

		if (match) {
			css = match[1];
		}

		const targetFile = root.source.input.from.replace(`/${opts.toReplace}/`, "/dist/generated/assets/").replace(`\\${opts.toReplace}\\`, "\\dist\\generated\\assets\\");
		mkdirp.sync(path.dirname(targetFile));

		const filePath = `${targetFile}.json`;
		fs.writeFileSync(filePath, JSON.stringify({_: css}));

	}
});
