const fs = require("fs");
const path = require("path");

let assets;

const ROOT = path.join(__dirname, `../../`);

try {
	assets = JSON.parse(fs.readFileSync(path.join(ROOT, `assets.json`)));
} catch (err) {
	console.log("No assets.json found");
	process.exit(1);
}

module.exports = assets;
