import { registerThemeProperties } from "@ui5/webcomponents-base/src/theming/ThemeProperties";

import belizeThemeProperties from "./themes-next/sap_belize/parameters-bundle.css";
import belizeHcbThemeProperties from "./themes-next/sap_belize_hcb/parameters-bundle.css";
import fiori3ThemeProperties from "./themes-next/sap_fiori_3/parameters-bundle.css";

registerThemeProperties("@ui5/webcomponents", "sap_belize", belizeThemeProperties);
registerThemeProperties("@ui5/webcomponents", "sap_belize_hcb", belizeHcbThemeProperties);
registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", fiori3ThemeProperties);
