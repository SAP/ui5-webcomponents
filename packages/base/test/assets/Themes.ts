import { registerThemePropertiesLoader } from "../../src/asset-registries/Themes.js";

const defaultTheme = `:root{ --var1: grey; }`;
const fiori3 = `:root{ --var1: red; }`;
const fiori3Dark = `:root{ --var1: green; }`;
const fiori3Hcb = `:root{ --var1: yellow; }`;
const fiori3Hcw = `:root{ --var1: yellow; }`;

registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_horizon", async () => Promise.resolve(defaultTheme));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3", async () => Promise.resolve(fiori3));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_dark", async () => Promise.resolve(fiori3Dark));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcb", async () => Promise.resolve(fiori3Hcb));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcw", async () => Promise.resolve(fiori3Hcw));
