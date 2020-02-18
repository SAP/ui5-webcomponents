import { registerThemeProperties } from "../../asset-registries/Themes.js";

const fiori3 = `:root{ --var1: red; }`;
const fiori3Dark = `:root{ --var1: green; }`;
const belize = `:root{ --var1: blue; }`;
const belizeHcb = `:root{ --var1: orange; }`;
const belizeHcw = `:root{ --var1: orange; }`;

registerThemeProperties("@ui5/webcomponents-base-test", "sap_fiori_3", fiori3);
registerThemeProperties("@ui5/webcomponents-base-test", "sap_fiori_3_dark", fiori3Dark);
registerThemeProperties("@ui5/webcomponents-base-test", "sap_belize", belize);
registerThemeProperties("@ui5/webcomponents-base-test", "sap_belize_hcb", belizeHcb);
registerThemeProperties("@ui5/webcomponents-base-test", "sap_belize_hcw", belizeHcw);
