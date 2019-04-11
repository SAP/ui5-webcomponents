const postcssImport = require('postcss-import');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssCSStoESM = require('../../lib/postcss-css-to-esm/index.js');
const postcssDerivedColors = require('../../lib/postcss-override-base-params/process-derived-colors');
const cssnano = require('cssnano');
const postcssAddFallback = require('../../lib/postcss-add-fallback/index.js');

module.exports = {
  plugins: [
    postcssImport(),
    postcssAddFallback(),
    combineSelectors({removeDuplicatedProperties: true}),
    postcssDerivedColors(),
    cssnano(),
    postcssCSStoESM(),
  ]
};
