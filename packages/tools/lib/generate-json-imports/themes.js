const fs = require("fs");

const packageName = JSON.parse(fs.readFileSync("package.json")).name;

// Resulting file content
const content = `import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import fiori3Dark from "../assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belize from "../assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcb from "../assets/themes/sap_belize_hcb/parameters-bundle.css.json";
import belizeHcw from "../assets/themes/sap_belize_hcw/parameters-bundle.css.json";

const isInlined = obj => typeof (obj) === "object";

if (isInlined(fiori3Dark) || isInlined(belize) || isInlined(belizeHcb)) {
	console.warn(\`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\\\\/.*\\\\\\.json"\`);
}

registerThemeProperties("${packageName}", "sap_fiori_3_dark", fiori3Dark);
registerThemeProperties("${packageName}", "sap_belize", belize);
registerThemeProperties("${packageName}", "sap_belize_hcb", belizeHcb);
registerThemeProperties("${packageName}", "sap_belize_hcw", belizeHcw);
`;

fs.writeFileSync("dist/generated/json-imports/Themes.js", content);
