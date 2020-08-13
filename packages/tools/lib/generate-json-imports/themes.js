// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require('path');
const mkdirp = require("mkdirp");
const assets = require("../../assets-meta.js");

const inputFolder = path.normalize(process.argv[2]);
const outputFile = path.normalize(`${process.argv[3]}/Themes.js`);

// All supported optional themes
const optionalThemes = assets.themes.all.filter(theme => theme !== assets.themes.default);

// All themes present in the file system
const dirs = fs.readdirSync(inputFolder);
const themesOnFileSystem = dirs.map(dir => {
	const matches = dir.match(/sap_.*$/);
	return matches ? dir : undefined;
}).filter(key => !!key && optionalThemes.includes(key));

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

const importLines = themesOnFileSystem.map(theme => `import ${theme} from "../assets/themes/${theme}/parameters-bundle.css.json";`).join("\n");
const isInlinedCondition = themesOnFileSystem.map(theme => `isInlined(${theme})`).join(" || ");
const registerLines = themesOnFileSystem.map(theme => `registerThemeProperties("${packageName}", "${theme}", ${theme});`).join("\n");

// Resulting file content
const content = `import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

${importLines}

const isInlined = obj => typeof (obj) === "object";

if (${isInlinedCondition}) {
	console.warn(\`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}

${registerLines}
`;

mkdirp.sync(path.dirname(outputFile));
fs.writeFileSync(outputFile, content);
