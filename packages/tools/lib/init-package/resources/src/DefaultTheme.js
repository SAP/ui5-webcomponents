import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

// Base assets
import fiori3Base from "@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";

// Main assets
import fiori3 from "./generated/themes/sap_fiori_3/parameters-bundle.css.js";

registerThemeProperties("@ui5/webcomponents-theme-base", "sap_fiori_3", fiori3Base);
registerThemeProperties("INIT_PACKAGE_VAR_NAME", "sap_fiori_3", fiori3);
