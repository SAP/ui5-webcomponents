const fs = require("fs");
const portFilePath = require.resolve("@ui5/webcomponents-fiori/.port");
const port = `${fs.readFileSync(portFilePath)}`;

module.exports = port;