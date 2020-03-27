const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, `../../`);
const NODE_MODULES = path.join(__dirname, `../../../../node_modules/`)

const filePath = path.join(ROOT, "dist/AssetParameters.js");
let fileContent;

try {
	fileContent = fs.readFileSync(filePath);
} catch (err) {
	console.log("AssetParameters.js not found in dist/, copy src/ first");
	process.exit(1);
}

const JSONContent = fs.readFileSync(path.join(NODE_MODULES, `@ui5/webcomponents-tools/assets.json`));

fileContent = `${fileContent}`.replace(`const assetParameters = {};`, `const assetParameters = ${JSONContent};`);

fs.writeFileSync(filePath, fileContent);

