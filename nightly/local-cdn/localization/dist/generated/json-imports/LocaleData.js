// @ts-nocheck
import { registerLocaleDataLoader } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
const availableLocales = ["ar", "ar_EG", "ar_SA", "bg", "ca", "cnr", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "mk", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sr_Latn", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"];
const importCldrJson = async (localeId) => {
    switch (localeId) {
        case "ar": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ar" */ "../assets/cldr/ar.json")).default;
        case "ar_EG": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ar_EG" */ "../assets/cldr/ar_EG.json")).default;
        case "ar_SA": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ar_SA" */ "../assets/cldr/ar_SA.json")).default;
        case "bg": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-bg" */ "../assets/cldr/bg.json")).default;
        case "ca": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ca" */ "../assets/cldr/ca.json")).default;
        case "cnr": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-cnr" */ "../assets/cldr/cnr.json")).default;
        case "cs": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-cs" */ "../assets/cldr/cs.json")).default;
        case "da": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-da" */ "../assets/cldr/da.json")).default;
        case "de": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-de" */ "../assets/cldr/de.json")).default;
        case "de_AT": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-de_AT" */ "../assets/cldr/de_AT.json")).default;
        case "de_CH": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-de_CH" */ "../assets/cldr/de_CH.json")).default;
        case "el": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-el" */ "../assets/cldr/el.json")).default;
        case "el_CY": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-el_CY" */ "../assets/cldr/el_CY.json")).default;
        case "en": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en" */ "../assets/cldr/en.json")).default;
        case "en_AU": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_AU" */ "../assets/cldr/en_AU.json")).default;
        case "en_GB": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_GB" */ "../assets/cldr/en_GB.json")).default;
        case "en_HK": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_HK" */ "../assets/cldr/en_HK.json")).default;
        case "en_IE": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_IE" */ "../assets/cldr/en_IE.json")).default;
        case "en_IN": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_IN" */ "../assets/cldr/en_IN.json")).default;
        case "en_NZ": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_NZ" */ "../assets/cldr/en_NZ.json")).default;
        case "en_PG": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_PG" */ "../assets/cldr/en_PG.json")).default;
        case "en_SG": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_SG" */ "../assets/cldr/en_SG.json")).default;
        case "en_ZA": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-en_ZA" */ "../assets/cldr/en_ZA.json")).default;
        case "es": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es" */ "../assets/cldr/es.json")).default;
        case "es_AR": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_AR" */ "../assets/cldr/es_AR.json")).default;
        case "es_BO": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_BO" */ "../assets/cldr/es_BO.json")).default;
        case "es_CL": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_CL" */ "../assets/cldr/es_CL.json")).default;
        case "es_CO": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_CO" */ "../assets/cldr/es_CO.json")).default;
        case "es_MX": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_MX" */ "../assets/cldr/es_MX.json")).default;
        case "es_PE": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_PE" */ "../assets/cldr/es_PE.json")).default;
        case "es_UY": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_UY" */ "../assets/cldr/es_UY.json")).default;
        case "es_VE": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-es_VE" */ "../assets/cldr/es_VE.json")).default;
        case "et": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-et" */ "../assets/cldr/et.json")).default;
        case "fa": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fa" */ "../assets/cldr/fa.json")).default;
        case "fi": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fi" */ "../assets/cldr/fi.json")).default;
        case "fr": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fr" */ "../assets/cldr/fr.json")).default;
        case "fr_BE": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fr_BE" */ "../assets/cldr/fr_BE.json")).default;
        case "fr_CA": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fr_CA" */ "../assets/cldr/fr_CA.json")).default;
        case "fr_CH": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fr_CH" */ "../assets/cldr/fr_CH.json")).default;
        case "fr_LU": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-fr_LU" */ "../assets/cldr/fr_LU.json")).default;
        case "he": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-he" */ "../assets/cldr/he.json")).default;
        case "hi": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-hi" */ "../assets/cldr/hi.json")).default;
        case "hr": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-hr" */ "../assets/cldr/hr.json")).default;
        case "hu": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-hu" */ "../assets/cldr/hu.json")).default;
        case "id": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-id" */ "../assets/cldr/id.json")).default;
        case "it": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-it" */ "../assets/cldr/it.json")).default;
        case "it_CH": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-it_CH" */ "../assets/cldr/it_CH.json")).default;
        case "ja": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ja" */ "../assets/cldr/ja.json")).default;
        case "kk": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-kk" */ "../assets/cldr/kk.json")).default;
        case "ko": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ko" */ "../assets/cldr/ko.json")).default;
        case "lt": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-lt" */ "../assets/cldr/lt.json")).default;
        case "lv": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-lv" */ "../assets/cldr/lv.json")).default;
        case "ms": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ms" */ "../assets/cldr/ms.json")).default;
        case "mk": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-mk" */ "../assets/cldr/mk.json")).default;
        case "nb": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-nb" */ "../assets/cldr/nb.json")).default;
        case "nl": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-nl" */ "../assets/cldr/nl.json")).default;
        case "nl_BE": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-nl_BE" */ "../assets/cldr/nl_BE.json")).default;
        case "pl": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-pl" */ "../assets/cldr/pl.json")).default;
        case "pt": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-pt" */ "../assets/cldr/pt.json")).default;
        case "pt_PT": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-pt_PT" */ "../assets/cldr/pt_PT.json")).default;
        case "ro": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ro" */ "../assets/cldr/ro.json")).default;
        case "ru": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ru" */ "../assets/cldr/ru.json")).default;
        case "ru_UA": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-ru_UA" */ "../assets/cldr/ru_UA.json")).default;
        case "sk": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-sk" */ "../assets/cldr/sk.json")).default;
        case "sl": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-sl" */ "../assets/cldr/sl.json")).default;
        case "sr": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-sr" */ "../assets/cldr/sr.json")).default;
        case "sr_Latn": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-sr_Latn" */ "../assets/cldr/sr_Latn.json")).default;
        case "sv": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-sv" */ "../assets/cldr/sv.json")).default;
        case "th": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-th" */ "../assets/cldr/th.json")).default;
        case "tr": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-tr" */ "../assets/cldr/tr.json")).default;
        case "uk": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-uk" */ "../assets/cldr/uk.json")).default;
        case "vi": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-vi" */ "../assets/cldr/vi.json")).default;
        case "zh_CN": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-zh_CN" */ "../assets/cldr/zh_CN.json")).default;
        case "zh_HK": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-zh_HK" */ "../assets/cldr/zh_HK.json")).default;
        case "zh_SG": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-zh_SG" */ "../assets/cldr/zh_SG.json")).default;
        case "zh_TW": return (await import(/* webpackChunkName: "ui5-webcomponents-cldr-zh_TW" */ "../assets/cldr/zh_TW.json")).default;
        default: throw "unknown locale";
    }
};
const importAndCheck = async (localeId) => {
    const data = await importCldrJson(localeId);
    if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error(`[LocaleData] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build. Check the "Assets" documentation for more information.`);
    }
    return data;
};
availableLocales.forEach(localeId => registerLocaleDataLoader(localeId, importAndCheck));
//# sourceMappingURL=LocaleData.js.map