const fs = require("fs");
const process = require("process");

let i18n = true;
let dependencies = [];

// Generate i18n.js by default
try {
	const config = JSON.parse(fs.readFileSync("assets.json"));
	i18n = config.i18n !== undefined ? !!config.i18n : true;
	dependencies = Array.isArray(config.dependencies) ? config.dependencies : [];
} catch(e) {}

if (!i18n) {
	process.exit(0);
}

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

// Imports for assets of the packages this one depends on
const dependenciesImportsString = dependencies.map(dep => `import "${dep}/dist/json-imports/i18n.js"`).join("\n");

// All languages present in the file system
const files = fs.readdirSync("dist/assets/i18n/");
const languages = files.map(file => {
	const matches = file.match(/messagebundle_(.*?).json$/);
	return matches ? matches[1] : undefined;
}).filter(key => !!key);

// Keys for the array
const languagesKeysString = languages.map(key => `${key},`).join("\n");

// Actual imports for json assets
const assetsImportsString = languages.map(key => `import ${key} from "../assets/i18n/messagebundle_${key}.json";`).join("\n");

// Resulting file content
const content = `${dependenciesImportsString}

import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

${assetsImportsString}

const bundleMap = {
	${languagesKeysString}
};

const allEntriesInlined = Object.entries(bundleMap).every(([_key, value]) => typeof (value) === "object");

if (allEntriesInlined) {
	console.warn(\`Inefficient bundling detected: consider bundling i18n imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}

registerI18nBundle("${packageName}", bundleMap);
`;

fs.writeFileSync("dist/json-imports/i18n.js", content);
