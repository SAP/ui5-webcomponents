const fs = require("fs");
const portFilePath = require.resolve("@ui5/webcomponents/.port");
const port = `${fs.readFileSync(portFilePath)}`;

module.exports = port;