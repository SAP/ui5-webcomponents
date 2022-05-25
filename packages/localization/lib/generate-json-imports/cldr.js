const fs = require("fs").promises;
const assets = require("@ui5/webcomponents-tools/assets-meta.js");

const allLocales = assets.locales.all;

const imports = allLocales.map(locale => `import ${locale} from "../assets/cldr/${locale}.json";`).join("\n");
const caseImports = allLocales.map(locale => `\t\tcase "${locale}": return (await import("../assets/cldr/${locale}.json")).default;`).join("\n");
const localesKeys = allLocales.join(",");
const localesKeysStrArray = allLocales.map(_ => `"${_}"`).join(",");

const contentStatic = `import { registerLocaleDataLoader } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

${imports}

const cldrData = {
	${localesKeys}
};

const fetchCldrJson = async (localeId) => {
	if (typeof cldrData[localeId] === "object") {
		// inlined from build
		throw new Error("[LocaleData] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs")
	}
	return (await fetch(cldrData[localeId])).json();
}

Object.keys(cldrData).forEach(localeId => registerLocaleDataLoader(localeId, fetchCldrJson));
`;

const contentDynamic = `import { registerLocaleDataLoader } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

const availableLocales = [${localesKeysStrArray}];

const importCldrJson = async (localeId) => {
	switch (localeId) {
${caseImports}
		default: throw "unknown locale"
	}
}

const importAndCheck = async (localeId) => {
	const data = await importCldrJson(localeId);
	if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error(\`[LocaleData] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the \"Assets\" documentation for more information.\`);
	}
	return data;
}

availableLocales.forEach(localeId => registerLocaleDataLoader(localeId, importAndCheck));
`;

const generate = async () => {
	await fs.mkdir("dist/generated/json-imports/", { recursive: true });
	return Promise.all([
		fs.writeFile("dist/generated/json-imports/LocaleData-static.js", contentStatic),
		fs.writeFile("dist/generated/json-imports/LocaleData.js", contentDynamic)
	]);
}

generate().then(() => {
	console.log("CLDR files generated.");
});
