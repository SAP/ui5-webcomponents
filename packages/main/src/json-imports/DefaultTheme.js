import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

// Base assets
import fiori3Base from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_fiori_3/parameters-bundle.css.json";

// Main assets
import fiori3 from "../assets/themes/sap_fiori_3/parameters-bundle.css.json";

const isInlined = obj => typeof (obj) === "object";

/* eslint-disable */
if (isInlined(fiori3)) {
	console.warn(`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\/.*\\\.json"`);
}
/* eslint-enable */

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", fiori3Base);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", fiori3);
