const getThemePostCSSConfig = require("@ui5/webcomponents-tools/components-package/postcss.themes.js").getThemePostCSSConfig; // eslint-disable-line

const options = {
	typescript: INIT_PACKAGE_VAR_TYPESCRIPT,
};

module.exports = getThemePostCSSConfig(options);
