const fs = require("fs");
const path = require('path');
const mkdirp = require("mkdirp");

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

const inputFolder = path.normalize(process.argv[2]);
const outputFile = path.normalize(`${process.argv[3]}/i18n-dynamic.js`);

// All languages present in the file system
const files = fs.readdirSync(inputFolder);
const languages = files.map(file => {
	const matches = file.match(/messagebundle_(.+?).json$/);
	return matches ? matches[1] : undefined;
}).filter(key => !!key);

let content;

// No i18n - just import dependencies, if any
if (languages.length === 0) {
  content = ``;
// There is i18n - generate the full file
} else {

// Keys for the array
const languagesKeysString = languages.map(key => `"${key}"`).join(",");

// Actual imports for json assets
const assetsImportsString = languages.map(key => `		case "${key}": return (await import("../assets/i18n/messagebundle_${key}.json")).default;`).join("\n");

// Resulting file content
content = `import { registerLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

const fetchMessageBundle = async (localeId) => {
	switch (localeId) {
${assetsImportsString}
		default: throw "unknown locale"
	}
}

const localeIds = [${languagesKeysString}];

registerLoader("${packageName}", fetchMessageBundle, localeIds);
`;
}

mkdirp.sync(path.dirname(outputFile));
fs.writeFileSync(outputFile, content);
