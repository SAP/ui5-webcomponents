const fs = require("fs");
const mkdirp = require("mkdirp");
const buildConfiguration = require("../build-configuration/index.js");

const optionalThemes = buildConfiguration.theming.optionalThemes;

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

const importLines = optionalThemes.map(theme => `import ${theme} from "../assets/themes/${theme}/parameters-bundle.css.json";`).join("\n");
const isInlinedCondition = optionalThemes.map(theme => `isInlined(${theme})`).join(" || ");
const registerLines = optionalThemes.map(theme => `registerThemeProperties("${packageName}", "${theme}", ${theme});`).join("\n");

// Resulting file content
const content = `import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

${importLines}

const isInlined = obj => typeof (obj) === "object";

if (${isInlinedCondition}) {
	console.warn(\`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}

${registerLines};
`;

mkdirp("dist/generated/json-imports/");
fs.writeFileSync("dist/generated/json-imports/Themes.js", content);
