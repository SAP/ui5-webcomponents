const fs = require("fs").promises;
const path = require('path');
const assets = require("../../assets-meta.js");

const generate = async () => {
	const inputFolder = path.normalize(process.argv[2]);
	const outputFileDynamic = path.normalize(`${process.argv[3]}/Themes.ts`);

// All supported optional themes
	const allThemes = assets.themes.all;

// All themes present in the file system
	const dirs = await fs.readdir(inputFolder);
	const themesOnFileSystem = dirs.map(dir => {
		const matches = dir.match(/sap_.*$/);
		return matches ? dir : undefined;
	}).filter(key => !!key && allThemes.includes(key));

	const packageName = JSON.parse(await fs.readFile("package.json")).name;

	const availableThemesArray = `[${themesOnFileSystem.map(theme => `"${theme}"`).join(", ")}]`;
	const dynamicImportLines = themesOnFileSystem.map(theme => `\t\tcase "${theme}": return (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-${theme.replace("_", "-")}-parameters-bundle" */"../assets/themes/${theme}/parameters-bundle.css.json")).default;`).join("\n");

// dynamic imports file content
	const contentDynamic = `// @ts-nocheck
import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

const loadThemeProperties = async (themeName) => {
	switch (themeName) {
${dynamicImportLines}
		default: throw "unknown theme"
	}
};

const loadAndCheck = async (themeName) => {
	const data = await loadThemeProperties(themeName);
	if (typeof data === "string" && data.endsWith(".json")) {
		throw new Error(\`[themes] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.\`);
	}
	return data;
};

${availableThemesArray}
  .forEach(themeName => registerThemePropertiesLoader("${packageName}", themeName, loadAndCheck));
`;

	await fs.mkdir(path.dirname(outputFileDynamic), { recursive: true });
	return Promise.all([
		fs.writeFile(outputFileDynamic, contentDynamic)
	]);
};

generate().then(() => {
	console.log("Generated themes JSON imports.");
});
