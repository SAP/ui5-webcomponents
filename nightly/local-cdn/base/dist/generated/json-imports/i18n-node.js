// @ts-nocheck
import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
const importMessageBundle = async (localeId) => {
    switch (localeId) {
        case "en": return (await import(/* webpackChunkName: "ui5-webcomponents-base-messagebundle-en" */ "../assets/i18n/messagebundle_en.json", { with: { type: 'json' } })).default;
        case "en_US_sappsd": return (await import(/* webpackChunkName: "ui5-webcomponents-base-messagebundle-en_US_sappsd" */ "../assets/i18n/messagebundle_en_US_sappsd.json", { with: { type: 'json' } })).default;
        case "en_US_saprigi": return (await import(/* webpackChunkName: "ui5-webcomponents-base-messagebundle-en_US_saprigi" */ "../assets/i18n/messagebundle_en_US_saprigi.json", { with: { type: 'json' } })).default;
        case "en_US_saptrc": return (await import(/* webpackChunkName: "ui5-webcomponents-base-messagebundle-en_US_saptrc" */ "../assets/i18n/messagebundle_en_US_saptrc.json", { with: { type: 'json' } })).default;
        default: throw "unknown locale";
    }
};
const importAndCheck = async (localeId) => {
    const data = await importMessageBundle(localeId);
    if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error(`[i18n] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the "Assets" documentation for more information.`);
    }
    return data;
};
const localeIds = ["en",
    "en_US_sappsd",
    "en_US_saprigi",
    "en_US_saptrc",];
localeIds.forEach(localeId => {
    registerI18nLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "b" + "a" + "s" + "e", localeId, importAndCheck);
});
//# sourceMappingURL=i18n-node.js.map