const config = require("@ui5/webcomponents-tools/components-package/eslint.js");
const testEslint = require("@ui5/webcomponents-testing/src/eslint.js");

testEslint.forEach(override => {
    config.overrides?.push(override);
});

module.exports = config;
