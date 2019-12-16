const fs = require("fs");
const process = require("process");

let themes = true;
let dependencies = [];

// Generate Themes.js by default
try {
	const config = JSON.parse(fs.readFileSync("assets.json"));
	themes = config.themes !== undefined ? !!config.themes : true;
	dependencies = Array.isArray(config.dependencies) ? config.dependencies : [];
} catch(e) {}

if (!themes) {
	process.exit(0);
}

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

// Imports for assets of the packages this one depends on
const dependenciesImportsString = dependencies.map(dep => `import "${dep}/dist/json-imports/Themes.js";`).join("\n");

// Resulting file content
const content = `${dependenciesImportsString}

import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import fiori3Dark from "../assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belize from "../assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcb from "../assets/themes/sap_belize_hcb/parameters-bundle.css.json";

const isInlined = obj => typeof (obj) === "object";

if (isInlined(fiori3Dark) || isInlined(belize) || isInlined(belizeHcb)) {
	console.warn(\`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}

registerThemeProperties("${packageName}", "sap_fiori_3_dark", fiori3Dark);
registerThemeProperties("${packageName}", "sap_belize", belize);
registerThemeProperties("${packageName}", "sap_belize_hcb", belizeHcb);
`;

fs.writeFileSync("dist/json-imports/Themes.js", content);
