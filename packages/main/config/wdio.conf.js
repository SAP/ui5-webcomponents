const wdio = require("@ui5/webcomponents-tools/components-package/wdio.js");
wdio.config.suites = {
    "suite1": [
        './test/specs/base/*.spec.js',
        './test/specs/[A-I]*.spec.js',
    ],
    "suite2": [
       './test/specs/[^A-I]*.spec.js',
    ],
};

// From: [‘--disable-gpu’, ‘--headless’]
wdio.config.capabilities[0]['goog:chromeOptions'].args = ['--disable-gpu']; 
module.exports = wdio;