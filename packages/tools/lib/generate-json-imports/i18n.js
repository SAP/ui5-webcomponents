const fs = require("fs");
const path = require('path');
const mkdirp = require("mkdirp");

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

const inputFolder = path.normalize(process.argv[2]);
const outputFile = path.normalize(`${process.argv[3]}/i18n-static.js`);
const outputFileDynamic = path.normalize(`${process.argv[3]}/i18n.js`);

// All languages present in the file system
const files = fs.readdirSync(inputFolder);
const languages = files.map(file => {
	const matches = file.match(/messagebundle_(.+?).json$/);
	return matches ? matches[1] : undefined;
}).filter(key => !!key);

let contentStatic, contentDynamic;

// No i18n - just import dependencies, if any
if (languages.length === 0) {
  contentStatic = "";
  contentDynamic = "";
// There is i18n - generate the full file
} else {
	// Keys for the array
	const languagesKeysString = languages.map(key => `"${key}": _${key},`).join("\n\t");
	const languagesKeysStringArray = languages.map(key => `"${key}",`).join("\n\t");

	// Actual imports for json assets
	const assetsImportsString = languages.map(key => `import _${key} from "../assets/i18n/messagebundle_${key}.json";`).join("\n");

	// static imports
	contentStatic = `import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

${assetsImportsString}

const bundleMap = {
	${languagesKeysString}
};

const fetchMessageBundle = async (localeId) => {
	if (typeof bundleMap[localeId] === "object") {
		// inlined from build
		throw new Error("[i18n] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs")
	}
	return (await fetch(bundleMap[localeId])).json()
}

const localeIds = [${languagesKeysStringArray}];

localeIds.forEach(localeId => {
	registerI18nLoader("${packageName}", localeId, fetchMessageBundle);
});
`;

	// Actual imports for json assets
	const dynamicImportsString = languages.map(key => `		case "${key}": return (await import("../assets/i18n/messagebundle_${key}.json")).default;`).join("\n");

	// Resulting file content
	contentDynamic = `import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

	const importMessageBundle = async (localeId) => {
		switch (localeId) {
	${dynamicImportsString}
			default: throw "unknown locale"
		}
	}

	const importAndCheck = async (localeId) => {
		const data = await importMessageBundle(localeId);
		if (typeof data === "string" && data.endsWith(".json")) {
			throw new Error(\`[i18n] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the \"Assets\" documentation for more information.\`);
		}
		return data;
	}

	const localeIds = [${languagesKeysStringArray}];

	localeIds.forEach(localeId => {
		registerI18nLoader("${packageName}", localeId, importAndCheck);
	});
	`;


}


mkdirp.sync(path.dirname(outputFile));
fs.writeFileSync(outputFile, contentStatic);
fs.writeFileSync(outputFileDynamic, contentDynamic);
