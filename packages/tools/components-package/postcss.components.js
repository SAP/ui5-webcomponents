const postcssImport = require('postcss-import');
const postcssCSStoESM = require('../lib/postcss-css-to-esm/index.js');
const cssnano = require('cssnano');
const fs = require("fs");

const packageName = JSON.parse(fs.readFileSync("./package.json")).name;

module.exports = {
		plugins: [
			postcssImport(),
			cssnano({
				preset: [
					'default', {
						mergeLonghand: false, // https://github.com/cssnano/cssnano/issues/675
						mergeRules: false, // https://github.com/cssnano/cssnano/issues/730
					},
				]
			}),
			postcssCSStoESM({ toReplace: 'src', includeDefaultTheme: true, packageName }),
		]
}
