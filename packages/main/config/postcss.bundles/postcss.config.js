const postcssImport = require('postcss-import');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssCSStoESM = require('../../lib/postcss-css-to-esm/index.js');
const postcssDerivedColors = require('../../lib/postcss-override-base-params/process-derived-colors');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    combineSelectors({removeDuplicatedProperties: true}),
    postcssDerivedColors(),
    cssnano(),
    postcssCSStoESM(),
  ]
};
