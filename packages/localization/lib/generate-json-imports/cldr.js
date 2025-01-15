import fs from "fs/promises";
import assets from "@ui5/webcomponents-tools/assets-meta.js";

const allLocales = assets.locales.all;

const imports = allLocales.map(locale => `import ${locale} from "../assets/cldr/${locale}.json";`).join("\n");
const caseDynamicImports = allLocales.map(locale => `\t\tcase "${locale}": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-${locale}" */ "../assets/cldr/${locale}.json")).default;`).join("\n");
const caseFetchMetaResolve = allLocales.map(locale => `\t\tcase "${locale}": return (await fetch(new URL("../assets/cldr/${locale}.json", import.meta.url))).json();`).join("\n");
const localesKeysStrArray = allLocales.map(_ => `"${_}"`).join(",");

const contentDynamic = function (caseImports) {
	return `// @ts-nocheck
import { registerLocaleDataLoader } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

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
		throw new Error(\`[LocaleData] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the \"Assets\" documentation for more information.\`);
	}
	return data;
}

availableLocales.forEach(localeId => registerLocaleDataLoader(localeId, importAndCheck));
`;
}

const generate = async () => {
	await fs.mkdir("src/generated/json-imports/", { recursive: true });
	return Promise.all([
		fs.writeFile("src/generated/json-imports/LocaleData.ts", contentDynamic(caseDynamicImports)),
		fs.writeFile("src/generated/json-imports/LocaleData-fetch.ts", contentDynamic(caseFetchMetaResolve)),
	]);
}

generate().then(() => {
	console.log("CLDR files generated.");
});
