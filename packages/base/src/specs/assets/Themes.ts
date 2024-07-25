import { registerThemePropertiesLoader } from "../../asset-registries/Themes.js";

const defaultTheme = {
	content: `:root{ --var1: grey; }`,
	packageName: "",
	fileName: "",
};

const fiori3 = {
	content: `:root{ --var1: red; }`,
	packageName: "",
	fileName: "",
};

const fiori3Dark = {
	content: `:root{ --var1: green; }`,
	packageName: "",
	fileName: "",
};

const fiori3Hcb = {
	content: `:root{ --var1: yellow; }`,
	packageName: "",
	fileName: "",
};

const fiori3Hcw = {
	content: `:root{ --var1: yellow; }`,
	packageName: "",
	fileName: "",
};

registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_horizon", async () => Promise.resolve(defaultTheme));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3", async () => Promise.resolve(fiori3));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_dark", async () => Promise.resolve(fiori3Dark));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcb", async () => Promise.resolve(fiori3Hcb));
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcw", async () => Promise.resolve(fiori3Hcw));
