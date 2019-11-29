const combineSelectors = require('postcss-combine-duplicated-selectors');
const cssnano = require('cssnano');
const postcssCSStoESM = require('@ui5/webcomponents-tools/lib/postcss-css-to-esm/index.js');

module.exports = {
	plugins: [
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
		postcssCSStoESM({toReplace: `dist`}),
	]
};
