const postcssImport = require('postcss-import');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssCSStoESM = require('../../lib/postcss-css-to-esm/index.js');
const postcssDerivedColors = require('../../lib/postcss-process-derived-colors/index');
const cssnano = require('cssnano');
const postcssAddFallback = require('../../lib/postcss-add-fallback/index.js');

module.exports = {
    plugins: [
        postcssImport(),
        combineSelectors({
            removeDuplicatedProperties: true
        }),
        postcssDerivedColors(),
        postcssAddFallback(),
        cssnano({preset: [
            'default', {
                mergeLonghand: false, // https://github.com/cssnano/cssnano/issues/675
            },
        ]}, ),
        postcssCSStoESM(),
    ]
};
