const result = require("@ui5/webcomponents-tools/components-package/wdio.js");
result.config.capabilities[0]["goog:chromeOptions"].args = ['--disable-gpu']; // From: ['--disable-gpu', '--headless']
module.exports = result;