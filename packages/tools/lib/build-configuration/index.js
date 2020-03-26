const fs = require("fs");
const path = require("path");

let buildConfiguration;

const ROOT = path.join(__dirname, `../../`);

try {
	buildConfiguration = JSON.parse(fs.readFileSync(path.join(ROOT, `build-configuration.json`)));
} catch (err) {
	console.log("No build-configuration.json found");
	process.exit(1);
}

module.exports = buildConfiguration;
