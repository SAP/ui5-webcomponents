import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

// Base assets
import fiori3DarkBase from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belizeBase from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcbBase from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_belize_hcb/parameters-bundle.css.json";

// Main assets
import fiori3Dark from "../assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belize from "../assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcb from "../assets/themes/sap_belize_hcb/parameters-bundle.css.json";

const isInlined = obj => typeof (obj) === "object";

/* eslint-disable */
if (isInlined(fiori3Dark) || isInlined(belize) || isInlined(belizeHcb)) {
	console.warn(`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\/.*\\\.json"`);
}
/* eslint-enable */

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3_dark", fiori3DarkBase);
registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize", belizeBase);
registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize_hcb", belizeHcbBase);

registerThemeProperties("my-ui5-web-components", "sap_fiori_3_dark", fiori3Dark);
registerThemeProperties("my-ui5-web-components", "sap_belize", belize);
registerThemeProperties("my-ui5-web-components", "sap_belize_hcb", belizeHcb);
