const fs = require("fs");
const process = require("process");

let cldr = false;
let dependencies = [];

// Do not generate LocaleData.js by default
try {
	const config = JSON.parse(fs.readFileSync("assets.json"));
	cldr = config.localeData !== undefined ? !!config.localeData : false;
	dependencies = Array.isArray(config.dependencies) ? config.dependencies : [];

} catch(e) {}

if (!cldr) {
	process.exit(0);
}

// Imports for assets of the packages this one depends on
const dependenciesImportsString = dependencies.map(dep => `import "${dep}/dist/json-imports/LocaleData.js"`).join("\n");

// Resulting file content
const content = `${dependenciesImportsString}

import "@ui5/webcomponents-base/dist/json-imports/LocaleData.js";`;

fs.writeFileSync("dist/json-imports/LocaleData.js", content);
