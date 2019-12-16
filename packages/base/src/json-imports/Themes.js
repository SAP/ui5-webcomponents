import fiori3Dark from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belize from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcb from "@ui5/webcomponents-theme-base/dist/assets/themes/sap_belize_hcb/parameters-bundle.css.json";

import { registerThemeProperties } from "../asset-registries/Themes.js";

const isInlined = obj => typeof (obj) === "object";

/* eslint-disable */
if (isInlined(fiori3Dark) || isInlined(belize) || isInlined(belizeHcb)) {
	console.warn(`Inefficient bundling detected: consider bundling theme properties imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\/.*\\\.json"`);
}
/* eslint-enable */

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3_dark", fiori3Dark);
registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize", belize);
registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize_hcb", belizeHcb);
