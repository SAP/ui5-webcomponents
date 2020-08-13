// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const mkdirp = require("mkdirp");
const assets = require("@ui5/webcomponents-tools/assets-meta.js");

const allLocales = assets.locales.all;

const imports = allLocales.map(locale => `import ${locale} from "../assets/cldr/${locale}.json";`).join("\n");
const localesKeys = allLocales.join(",");

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

mkdirp.sync("dist/generated/json-imports/");
fs.writeFileSync("dist/generated/json-imports/LocaleData.js", content);
