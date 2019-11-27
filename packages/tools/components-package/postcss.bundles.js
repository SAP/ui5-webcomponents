const postcssImport = require('postcss-import');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssCSStoJSON = require('../lib/postcss-css-to-json/index.js');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		postcssImport(),
		combineSelectors({
			removeDuplicatedProperties: true
		}),
		cssnano({
			preset: [
				'default', {
					mergeLonghand: false, // https://github.com/cssnano/cssnano/issues/675
				},
			]
		},),
		postcssCSStoJSON({toReplace: 'src'}),
	]
};
