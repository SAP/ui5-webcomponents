import { registerThemePropertiesLoader } from "../../asset-registries/Themes.js";

const fiori3 = `:root{ --var1: red; }`;
const fiori3Dark = `:root{ --var1: green; }`;
const belize = `:root{ --var1: blue; }`;
const belizeHcb = `:root{ --var1: orange; }`;
const belizeHcw = `:root{ --var1: orange; }`;
const fiori3Hcb = `:root{ --var1: yellow; }`;
const fiori3Hcw = `:root{ --var1: yellow; }`;

registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3", () => fiori3);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_dark", () => fiori3Dark);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize", () => belize);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcb", () => belizeHcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcw", () => belizeHcw);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcb", () => fiori3Hcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcw", () => fiori3Hcw);
