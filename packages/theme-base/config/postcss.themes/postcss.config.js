const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const postcssCSStoJSON = require('@ui5/webcomponents-tools/lib/postcss-css-to-json/index.js');
const postcssCSStoESM = require('@ui5/webcomponents-tools/lib/postcss-css-to-esm/index.js');

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
			},
		),
		postcssCSStoJSON({toReplace: `dist`}),
		postcssCSStoESM({toReplace: `dist`}),
	]
};
