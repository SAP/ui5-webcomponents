const fs = require("fs");
const packageFile = JSON.parse(fs.readFileSync(require.resolve("@ui5/webcomponents/package.json")));
module.exports = packageFile.ui5.port;