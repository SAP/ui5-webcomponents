import "@ui5/webcomponents-localization/dist/Assets.js"; // CLDR
import "@ui5/webcomponents-theme-base/dist/Assets.js"; // Theming

// own main package assets
import "./generated/json-imports/Themes.js";
// import "./generated/json-imports/i18n.js";
import "./generated/json-imports/i18n-dynamic.js";


import bg from "./i18n/messagebundle_bg.properties";
import { registerLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";

registerLoader("@ui5/webcomponents", async (localeId) => {
    if (localeId === "bg") {
        const props = await (await fetch(bg)).text();
        const PropertiesFormatSupport = getFeature("PropertiesFormatSupport");
        return PropertiesFormatSupport.parser(props);
    }
}, ["bg"]);