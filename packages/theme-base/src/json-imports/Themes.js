import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import fiori3Dark from "../generated/assets/themes/sap_fiori_3_dark/parameters-bundle.css.json";
import belize from "../generated/assets/themes/sap_belize/parameters-bundle.css.json";
import belizeHcb from "../generated/assets/themes/sap_belize_hcb/parameters-bundle.css.json";
import belizeHcw from "../generated/assets/themes/sap_belize_hcw/parameters-bundle.css.json";

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
registerThemeProperties("@ui5/webcomponents-theme-base", "sap_belize_hcw", belizeHcw);
