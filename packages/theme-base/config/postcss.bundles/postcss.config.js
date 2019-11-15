const combineSelectors = require('postcss-combine-duplicated-selectors');
const cssnano = require('cssnano');
const postcssCSStoJSON = require('../../lib/postcss-css-to-json/index.js');

module.exports = {
    plugins: [
		combineSelectors({
			removeDuplicatedProperties: true
		}),
		cssnano({preset: [
				'default', {
					mergeLonghand: false, // https://github.com/cssnano/cssnano/issues/675
				},
			]}, ),
		postcssCSStoJSON(),
    ]
};
