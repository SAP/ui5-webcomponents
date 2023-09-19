const postcssImport = require('postcss-import');
const postcssCSStoESM = require('../lib/postcss-css-to-esm/index.js');
const postcssScopeVars = require('../lib/postcss-scope-vars/index.js');
const cssnano = require('cssnano');
const fs = require("fs")


const packageJSON = JSON.parse(fs.readFileSync("./package.json"))

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
			postcssScopeVars({version: packageJSON.version}),
			postcssCSStoESM({ toReplace: 'src', includeDefaultTheme: true, packageName: packageJSON.name }),
		]
}
