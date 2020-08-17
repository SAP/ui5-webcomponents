const fs = require('fs');
const path = require("path");
const glob = require("glob");
const beautify = require("json-beautify");

const vars = new Set();

const processFile = file => {
	const content = fs.readFileSync(file);
	const matches = `${content}`.match(/var\(--sap[\-_A-Za-z0-9]+\)/g);
	matches && matches.forEach(match => {
		const cssVar = match.match(/--sap[\-_A-Za-z0-9]+/)[0];
		vars.add(cssVar);
	});
};

// Main
glob.sync(path.join(__dirname, "../../../main/src/themes/**/*.css")).forEach(file => processFile(file));

// Fiori
glob.sync(path.join(__dirname, "../../../fiori/src/themes/**/*.css")).forEach(file => processFile(file));

const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
const result = Array.from(vars).sort(collator.compare); // natural sort

fs.writeFileSync(path.join(__dirname, "../../css-vars-usage.json"), beautify(result, null, 2, 100));
console.log("CSS Vars usage report generated.");
