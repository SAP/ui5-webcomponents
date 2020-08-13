// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require('path');
const mkdirp = require("mkdirp");
const assets = require("../../assets-meta.js");

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

const inputFolder = path.normalize(process.argv[2]);
const outputFile = path.normalize(`${process.argv[3]}/i18n.js`);

const defaultLanguage = assets.languages.default;

// All languages present in the file system
const files = fs.readdirSync(inputFolder);
const languages = files.map(file => {
  const matches = file.match(/messagebundle_(.+?).json$/);
  return matches ? matches[1] : undefined;
}).filter(key => !!key && key !== defaultLanguage);

let content;

// No i18n - just import dependencies, if any
if (languages.length === 0) {
  content = ``;
// There is i18n - generate the full file
} else {

  // Keys for the array
  const languagesKeysString = languages.map(key => `${key},`).join("\n\t");

  // Actual imports for json assets
  const assetsImportsString = languages.map(key => `import ${key} from "../assets/i18n/messagebundle_${key}.json";`).join("\n");

  // Resulting file content
  content = `import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

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
}

mkdirp.sync(path.dirname(outputFile));
fs.writeFileSync(outputFile, content);
