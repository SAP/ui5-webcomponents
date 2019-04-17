const postcssNesting = require('postcss-nesting');
const postcssAddFallback = require('../../lib/postcss-add-fallback/index.js');
const postcssCSStoESM = require('../../lib/postcss-css-to-esm/index.js');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		postcssNesting(),
		postcssAddFallback({ importFrom: "./dist/css/themes-next/sap_fiori_3/parameters-bundle.css" }),
		cssnano({
			preset: [
				'default', {
					mergeRules: false, // https://github.com/cssnano/cssnano/issues/675
					mergeLonghand: false,
				},
			]
		}),
		postcssCSStoESM(),
	]
};
