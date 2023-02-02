const postcssImport = require('postcss-import');
const postcssCSStoESM = require('../lib/postcss-css-to-esm/index.js');
const cssnano = require('cssnano');
const fs = require("fs");

const packageName = JSON.parse(fs.readFileSync("./package.json")).name;

const options = {
	typescript: true,
};

const getComponentPostCSSConfig = options => {
	return {
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
			postcssCSStoESM({ toReplace: 'src', includeDefaultTheme: true, packageName, tsMode: options.typescript }),
		]
	}
};

module.exports = getComponentPostCSSConfig(options);
module.exports.getComponentPostCSSConfig = getComponentPostCSSConfig;