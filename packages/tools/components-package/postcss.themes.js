const postcssImport = require('postcss-import');
const combineSelectors = require('../lib/postcss-combine-duplicated-selectors/index.js');
const postcssCSStoJSON = require('../lib/postcss-css-to-json/index.js');
const postcssCSStoESM = require('../lib/postcss-css-to-esm/index.js');
const postcssScopeVars = require('../lib/postcss-scope-vars/index.js');
const cssnano = require('cssnano');
const fs = require("fs");


const packageJSON = JSON.parse(fs.readFileSync("./package.json"))
const packageName = packageJSON.name;

module.exports = {
		plugins: [
			postcssScopeVars({version: packageJSON.version}),
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
			postcssCSStoJSON({ toReplace: 'src', packageName }),
			postcssCSStoESM({ toReplace: 'src', packageName }),
		]
};
