const postcssImport = require('postcss-import');
const postcssAddFallback = require('../../lib/postcss-add-fallback/index.js');

module.exports = {
  plugins: [
    postcssImport(),
	postcssAddFallback(),
  ]
};

