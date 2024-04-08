const fs = require("fs").promises;
const path = require('path');

const isTypeScript = process.env.UI5_TS;
const ext = isTypeScript ? 'ts' : 'js';

const generate = async () => {

	const packageName = JSON.parse(await fs.readFile("package.json")).name;

	const inputFolder = path.normalize(process.argv[2]);
	const outputFileDynamic = path.normalize(`${process.argv[3]}/i18n.${ext}`);

// All languages present in the file system
	const files = await fs.readdir(inputFolder);
	const languages = files.map(file => {
		const matches = file.match(/messagebundle_(.+?).json$/);
		return matches ? matches[1] : undefined;
	}).filter(key => !!key);

	let contentDynamic;

// No i18n - just import dependencies, if any
	if (languages.length === 0) {
		contentDynamic = "";
// There is i18n - generate the full file
	} else {
		// Keys for the array
		const languagesKeysString = languages.map(key => `"${key}": _${key},`).join("\n\t");
		const languagesKeysStringArray = languages.map(key => `"${key}",`).join("\n\t");

		// Actual imports for json assets
		const assetsImportsString = languages.map(key => `import _${key} from "../assets/i18n/messagebundle_${key}.json";`).join("\n");

		// Actual imports for json assets
		const dynamicImportsString = languages.map(key => `		case "${key}": return (await import(/* webpackChunkName: "${packageName.replace("@", "").replace("/", "-")}-messagebundle-${key}" */ "../assets/i18n/messagebundle_${key}.json")).default;`).join("\n");

		// Resulting file content
		contentDynamic = `// @ts-nocheck
import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

	const importMessageBundle = async (localeId) => {
		switch (localeId) {
	${dynamicImportsString}
			default: throw "unknown locale"
		}
	}

	const importAndCheck = async (localeId) => {
		const data = await importMessageBundle(localeId);
		if (typeof data === "string" && data.endsWith(".json")) {
			throw new Error(\`[i18n] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.\`);
		}
		return data;
	}

	const localeIds = [${languagesKeysStringArray}];

	localeIds.forEach(localeId => {
		registerI18nLoader("${packageName}", localeId, importAndCheck);
	});
	`;


	}

	await fs.mkdir(path.dirname(outputFileDynamic), { recursive: true });
	return Promise.all([
		fs.writeFile(outputFileDynamic, contentDynamic),
	]);
}

generate().then(() => {
	console.log("Generated i18n JSON imports.");
});
