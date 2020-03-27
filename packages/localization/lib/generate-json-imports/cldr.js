const fs = require("fs");
const mkdirp = require("mkdirp");
const buildConfiguration = require("@ui5/webcomponents-tools/lib/build-configuration/index.js");

const locales = buildConfiguration.locales;

const imports = locales.map(locale => `import ${locale} from "../assets/cldr/${locale}.json";`).join("\n");
const localesKeys = locales.join(",");

const content = `import { registerCldr, setCldrData } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

${imports}

const cldrData = {
	${localesKeys}
};

const allEntriesInlined = Object.entries(cldrData).every(([_key, value]) => typeof (value) === "object");

if (allEntriesInlined) {
	console.warn(\`Inefficient bundling detected: consider bundling CLDR imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}


Object.entries(cldrData).forEach(([key, value]) => {
	if (typeof (value) === "object") {
		setCldrData(key, value);
	} else {
		registerCldr(key, value);
	}
});
`;

mkdirp("dist/generated/json-imports/");
fs.writeFileSync("dist/generated/json-imports/LocaleData.js", content);
