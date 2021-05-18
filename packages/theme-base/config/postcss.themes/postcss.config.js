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
		// packages/theme-base/dist/themes/
		postcssCSStoJSON({toReplace: `dist`, srcPattern: "/packages/theme-base/themes/", dstPattern: "/packages/theme-base/generated/assets/themes/"}),
		postcssCSStoESM({toReplace: `dist`, srcPattern: "/packages/theme-base/themes/", dstPattern: "/packages/theme-base/generated/themes/"}),
	]
};
