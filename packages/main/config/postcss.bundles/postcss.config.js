const postcssImport = require('postcss-import');
const postcssAddFallback = require('../../lib/postcss-add-fallback/index.js');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssCSStoESM = require('../../lib/postcss-css-to-esm/index.js');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    postcssAddFallback(),
    combineSelectors({removeDuplicatedProperties: true}),
    cssnano(),
    postcssCSStoESM(),
  ]
};
