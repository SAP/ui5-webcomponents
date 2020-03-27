const fs = require('fs');
const path = require('path');
const buildConfiguration = require('@ui5/webcomponents-tools/lib/build-configuration/index.js');

const ROOT = path.join(__dirname, `../../`);

const filePath = path.join(ROOT, "dist/GeneratedConstants.js");
let fileContent;

try {
	fileContent = fs.readFileSync(filePath);
} catch (err) {
	console.log("GeneratedConstants.js not found in dist/, copy src/ first");
	process.exit(1);
}

fileContent = `${fileContent}`.replace("%DEFAULT_THEME%", buildConfiguration.themes.default);

fs.writeFileSync(filePath, fileContent);

