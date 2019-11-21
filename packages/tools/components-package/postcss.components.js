const postcssImport = require('postcss-import');
const postcssCSStoESM = require('../lib/postcss-css-to-esm/index.js');
const cssnano = require('cssnano');

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
		postcssCSStoESM(),
	]
};
