import { registerThemeProperties } from "../asset-registries/Themes.js";

import fiori3DarkBase from "../assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belizeBase from "../assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcbBase from "../assets/themes/sap_belize_hcb/parameters-bundle.css.json";

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
