import { registerThemeProperties } from "@ui5/webcomponents-base/src/theming/ThemeProperties.js";

import belizeThemeProperties from "./themes/sap_belize/parameters-bundle.css.js";
import belizeHcbThemeProperties from "./themes/sap_belize_hcb/parameters-bundle.css.js";

registerThemeProperties("@ui5/webcomponents", "sap_belize", belizeThemeProperties);
registerThemeProperties("@ui5/webcomponents", "sap_belize_hcb", belizeHcbThemeProperties);
