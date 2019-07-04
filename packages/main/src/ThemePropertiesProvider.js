import { registerThemeProperties } from "@ui5/webcomponents-base/dist/theming/ThemeProperties.js";

import belizeThemeProperties from "./generated/themes/sap_belize/parameters-bundle.css.js";
import belizeHcbThemeProperties from "./generated/themes/sap_belize_hcb/parameters-bundle.css.js";

registerThemeProperties("@ui5/webcomponents", "sap_belize", belizeThemeProperties);
registerThemeProperties("@ui5/webcomponents", "sap_belize_hcb", belizeHcbThemeProperties);
