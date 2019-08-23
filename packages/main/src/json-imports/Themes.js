import { registerThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import fiori3 from "../themes/sap_fiori_3/parameters-bundle.css.json";
import belize from "../themes/sap_belize/parameters-bundle.css.json";
import belizeHcb from "../themes/sap_belize_hcb/parameters-bundle.css.json";

registerThemeProperties("@ui5/webcomponents", "sap_fiori_3", fiori3);
registerThemeProperties("@ui5/webcomponents", "sap_belize", belize);
registerThemeProperties("@ui5/webcomponents", "sap_belize_hcb", belizeHcb);
