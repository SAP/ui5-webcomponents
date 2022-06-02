import { registerLocaleDataLoader } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

const availableLocales = ["ar","ar_EG","ar_SA","bg","ca","cs","da","de","de_AT","de_CH","el","el_CY","en","en_AU","en_GB","en_HK","en_IE","en_IN","en_NZ","en_PG","en_SG","en_ZA","es","es_AR","es_BO","es_CL","es_CO","es_MX","es_PE","es_UY","es_VE","et","fa","fi","fr","fr_BE","fr_CA","fr_CH","fr_LU","he","hi","hr","hu","id","it","it_CH","ja","kk","ko","lt","lv","ms","nb","nl","nl_BE","pl","pt","pt_PT","ro","ru","ru_UA","sk","sl","sr","sr_Latn","sv","th","tr","uk","vi","zh_CN","zh_HK","zh_SG","zh_TW"];

const importCldrJson = async (localeId) => {
	switch (localeId) {
		case "ar": return (await import("../assets/cldr/ar.json")).default;
		case "ar_EG": return (await import("../assets/cldr/ar_EG.json")).default;
		case "ar_SA": return (await import("../assets/cldr/ar_SA.json")).default;
		case "bg": return (await import("../assets/cldr/bg.json")).default;
		case "ca": return (await import("../assets/cldr/ca.json")).default;
		case "cs": return (await import("../assets/cldr/cs.json")).default;
		case "da": return (await import("../assets/cldr/da.json")).default;
		case "de": return (await import("../assets/cldr/de.json")).default;
		case "de_AT": return (await import("../assets/cldr/de_AT.json")).default;
		case "de_CH": return (await import("../assets/cldr/de_CH.json")).default;
		case "el": return (await import("../assets/cldr/el.json")).default;
		case "el_CY": return (await import("../assets/cldr/el_CY.json")).default;
		case "en": return (await import("../assets/cldr/en.json")).default;
		case "en_AU": return (await import("../assets/cldr/en_AU.json")).default;
		case "en_GB": return (await import("../assets/cldr/en_GB.json")).default;
		case "en_HK": return (await import("../assets/cldr/en_HK.json")).default;
		case "en_IE": return (await import("../assets/cldr/en_IE.json")).default;
		case "en_IN": return (await import("../assets/cldr/en_IN.json")).default;
		case "en_NZ": return (await import("../assets/cldr/en_NZ.json")).default;
		case "en_PG": return (await import("../assets/cldr/en_PG.json")).default;
		case "en_SG": return (await import("../assets/cldr/en_SG.json")).default;
		case "en_ZA": return (await import("../assets/cldr/en_ZA.json")).default;
		case "es": return (await import("../assets/cldr/es.json")).default;
		case "es_AR": return (await import("../assets/cldr/es_AR.json")).default;
		case "es_BO": return (await import("../assets/cldr/es_BO.json")).default;
		case "es_CL": return (await import("../assets/cldr/es_CL.json")).default;
		case "es_CO": return (await import("../assets/cldr/es_CO.json")).default;
		case "es_MX": return (await import("../assets/cldr/es_MX.json")).default;
		case "es_PE": return (await import("../assets/cldr/es_PE.json")).default;
		case "es_UY": return (await import("../assets/cldr/es_UY.json")).default;
		case "es_VE": return (await import("../assets/cldr/es_VE.json")).default;
		case "et": return (await import("../assets/cldr/et.json")).default;
		case "fa": return (await import("../assets/cldr/fa.json")).default;
		case "fi": return (await import("../assets/cldr/fi.json")).default;
		case "fr": return (await import("../assets/cldr/fr.json")).default;
		case "fr_BE": return (await import("../assets/cldr/fr_BE.json")).default;
		case "fr_CA": return (await import("../assets/cldr/fr_CA.json")).default;
		case "fr_CH": return (await import("../assets/cldr/fr_CH.json")).default;
		case "fr_LU": return (await import("../assets/cldr/fr_LU.json")).default;
		case "he": return (await import("../assets/cldr/he.json")).default;
		case "hi": return (await import("../assets/cldr/hi.json")).default;
		case "hr": return (await import("../assets/cldr/hr.json")).default;
		case "hu": return (await import("../assets/cldr/hu.json")).default;
		case "id": return (await import("../assets/cldr/id.json")).default;
		case "it": return (await import("../assets/cldr/it.json")).default;
		case "it_CH": return (await import("../assets/cldr/it_CH.json")).default;
		case "ja": return (await import("../assets/cldr/ja.json")).default;
		case "kk": return (await import("../assets/cldr/kk.json")).default;
		case "ko": return (await import("../assets/cldr/ko.json")).default;
		case "lt": return (await import("../assets/cldr/lt.json")).default;
		case "lv": return (await import("../assets/cldr/lv.json")).default;
		case "ms": return (await import("../assets/cldr/ms.json")).default;
		case "nb": return (await import("../assets/cldr/nb.json")).default;
		case "nl": return (await import("../assets/cldr/nl.json")).default;
		case "nl_BE": return (await import("../assets/cldr/nl_BE.json")).default;
		case "pl": return (await import("../assets/cldr/pl.json")).default;
		case "pt": return (await import("../assets/cldr/pt.json")).default;
		case "pt_PT": return (await import("../assets/cldr/pt_PT.json")).default;
		case "ro": return (await import("../assets/cldr/ro.json")).default;
		case "ru": return (await import("../assets/cldr/ru.json")).default;
		case "ru_UA": return (await import("../assets/cldr/ru_UA.json")).default;
		case "sk": return (await import("../assets/cldr/sk.json")).default;
		case "sl": return (await import("../assets/cldr/sl.json")).default;
		case "sr": return (await import("../assets/cldr/sr.json")).default;
		case "sr_Latn": return (await import("../assets/cldr/sr_Latn.json")).default;
		case "sv": return (await import("../assets/cldr/sv.json")).default;
		case "th": return (await import("../assets/cldr/th.json")).default;
		case "tr": return (await import("../assets/cldr/tr.json")).default;
		case "uk": return (await import("../assets/cldr/uk.json")).default;
		case "vi": return (await import("../assets/cldr/vi.json")).default;
		case "zh_CN": return (await import("../assets/cldr/zh_CN.json")).default;
		case "zh_HK": return (await import("../assets/cldr/zh_HK.json")).default;
		case "zh_SG": return (await import("../assets/cldr/zh_SG.json")).default;
		case "zh_TW": return (await import("../assets/cldr/zh_TW.json")).default;
		default: throw "unknown locale"
	}
}

const importAndCheck = async (localeId) => {
	const data = await importCldrJson(localeId);
	if (typeof data === "string" && data.endsWith(".json")) {
        throw new Error(`[LocaleData] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the "Assets" documentation for more information.`);
	}
	return data;
}

availableLocales.forEach(localeId => registerLocaleDataLoader(localeId, importAndCheck));
