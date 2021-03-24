const fs = require("fs");
const packageFile = JSON.parse(fs.readFileSync(require.resolve("@ui5/webcomponents-fiori/package.json")));
const portFilePath = require.resolve("@ui5/webcomponents-fiori/.port");
const port = fs.existsSync(portFilePath) ? `${fs.readFileSync(portFilePath)}` : packageFile.ui5.port;

module.exports = port;