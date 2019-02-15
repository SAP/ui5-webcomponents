const postcssCustomProperties = require('postcss-custom-properties');
const postcssImport = require('postcss-import');
module.exports = {
  plugins: [
    postcssCustomProperties({importFrom: "dist/themes-next/sap_fiori_3/parameters-bundle.css"}),
  ]
}
