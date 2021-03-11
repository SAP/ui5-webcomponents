const fs = require("fs");
const packageFile = JSON.parse(fs.readFileSync(require.resolve("@ui5/webcomponents-fiori/package.json")));
const port = packageFile.ui5.port;

module.exports = port;