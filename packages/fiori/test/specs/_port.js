const fs = require("fs");
const PORT = JSON.parse(fs.readFileSync("../../package.json")).ui5.port;
export default PORT;