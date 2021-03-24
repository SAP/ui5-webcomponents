const fs = require("fs");
const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: fs.existsSync(".port") ? `${fs.readFileSync(".port")}` : JSON.parse(fs.readFileSync("package.json")).ui5.port,
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
