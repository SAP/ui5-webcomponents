const wdio = require("@ui5/webcomponents-tools/components-package/wdio.js");

wdio.config.services = [
  ['chromedriver', {
    chromedriverCustomPath: "C:\\Users\\I519825\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe"
  }],
  'devtools'
];

module.exports = wdio;
