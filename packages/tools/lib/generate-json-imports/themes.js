const fs = require("fs");
const path = require('path');
const mkdirp = require("mkdirp");
const assets = require("../../assets-meta.js");

const inputFolder = path.normalize(process.argv[2]);
const outputFile = path.normalize(`${process.argv[3]}/Themes-static.js`);
const outputFileDynamic = path.normalize(`${process.argv[3]}/Themes.js`);

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
const themeUrlsByName = "{\n" + themesOnFileSystem.join(",\n") + "\n}";
const availableThemesArray = `[${themesOnFileSystem.map(theme => `"${theme}"`).join(", ")}]`;
const dynamicImportLines = themesOnFileSystem.map(theme => `\t\tcase "${theme}": return (await import("../assets/themes/${theme}/parameters-bundle.css.json")).default;`).join("\n");


// static imports file content
const contentStatic = `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

${importLines}

const themeUrlsByName = ${themeUrlsByName};
const isInlined = obj => typeof (obj) === "object";

if (${isInlinedCondition}) {
	console.warn(\`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}

const loadThemeProperties = async (themeName) => {
	return (await fetch(themeUrlsByName[themeName])).json();
}

${availableThemesArray}
  .forEach(themeName => registerThemePropertiesLoader("${packageName}", themeName, loadThemeProperties));
`;


// dynamic imports file content
const contentDynamic = `import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

const loadThemeProperties = async (themeName) => {
	switch (themeName) {
${dynamicImportLines}
		default: throw "unknown theme"
	}
}

${availableThemesArray}
  .forEach(themeName => registerThemePropertiesLoader("${packageName}", themeName, loadThemeProperties));
`;

mkdirp.sync(path.dirname(outputFile));
fs.writeFileSync(outputFile, contentStatic);
fs.writeFileSync(outputFileDynamic, contentDynamic);
