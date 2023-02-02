const getComponentPostCSSConfig = require("@ui5/webcomponents-tools/components-package/postcss.components.js").getComponentPostCSSConfig; // eslint-disable-line

const options = {
	typescript: INIT_PACKAGE_VAR_TYPESCRIPT,
};

module.exports = getComponentPostCSSConfig(options);
