const fs = require("fs");
const process = require("process");

let cldr = true;
let dependencies = [];

// Generate LocaleData.js by default
try {
	const config = JSON.parse(fs.readFileSync("assets.json"));
	cldr = config.localeData !== undefined ? !!config.localeData : true;
	dependencies = Array.isArray(config.dependencies) ? config.dependencies : [];

} catch(e) {}

if (!cldr) {
	process.exit(0);
}

// Imports for assets of the packages this one depends on
const dependenciesImportsString = dependencies.map(dep => `import "${dep}/dist/json-imports/LocaleData.js"`).join("\n");

// Resulting file content
const content = `${dependenciesImportsString}`;

fs.writeFileSync("dist/json-imports/LocaleData.js", content);
