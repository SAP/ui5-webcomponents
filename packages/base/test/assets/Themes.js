import { registerThemePropertiesLoader } from "../../dist/asset-registries/Themes.js";

const fiori3 = {
	content: `:host { --var1: red; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "",
};

const fiori3Dark = {
	content: `:host { --var1: green; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "",
};

const belize = {
	content: `:host { --var1: blue; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "",
};

const belizeHcb = {
	content: `:host { --var1: orange; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "@ui5/webcomponents-base-test",
};

const belizeHcw = {
	content: `:host { --var1: orange; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "",
};

const fiori3Hcb = {
	content: `:host { --var1: yellow; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "",
};

const fiori3Hcw = {
	content: `:host { --var1: yellow; }`,
	packageName: "@ui5/webcomponents-base-test",
	fileName: "",
};

registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3", () => fiori3);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_dark", () => fiori3Dark);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize", () => belize);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcb", () => belizeHcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_belize_hcw", () => belizeHcw);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcb", () => fiori3Hcb);
registerThemePropertiesLoader("@ui5/webcomponents-base-test", "sap_fiori_3_hcw", () => fiori3Hcw);
