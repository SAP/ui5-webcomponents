import { registerThemePropertiesLoader } from "../../dist/asset-registries/Themes.js";

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

const belize = {
	content: `:root{ --var1: blue; }`,
	packageName: "",
	fileName: "",
};

const belizeHcb = {
	content: `:root{ --var1: orange; }`,
	packageName: "",
	fileName: "",
};

const belizeHcw = {
	content: `:root{ --var1: orange; }`,
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

registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3", () => fiori3);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_dark", () => fiori3Dark);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize", () => belize);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcb", () => belizeHcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcw", () => belizeHcw);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcb", () => fiori3Hcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcw", () => fiori3Hcw);
