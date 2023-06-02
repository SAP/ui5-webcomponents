// vite.config.js
const config = require("@ui5/webcomponents-tools/components-package/vite.config.js"); // eslint-disable-line
config.server = { open: "/test/pages/index.html" };
module.exports = config;
