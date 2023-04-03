const combineSelectors = require('@ui5/webcomponents-tools/lib/postcss-combine-duplicated-selectors/index.js');
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
		postcssCSStoJSON({ toReplace: `dist`, packageName: "@ui5/webcomponents-theming" }),
		postcssCSStoESM({ toReplace: `dist`, packageName: "@ui5/webcomponents-theming" }),
	]
};
