import { fetchI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n";
import { registerLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n-dynamic.js";

const fetchMessageBundle = async (localeId) => {
	switch (localeId) {
		case "ar": return await import("../generated/assets/i18n/messagebundle_ar.json").default;
		case "bg": return await import("../generated/assets/i18n/messagebundle_bg.json").default;
		case "ca": return await import("../generated/assets/i18n/messagebundle_ca.json").default;
		case "cs": return await import("../generated/assets/i18n/messagebundle_cs.json").default;
		case "da": return await import("../generated/assets/i18n/messagebundle_da.json").default;
		case "de": return await import("../generated/assets/i18n/messagebundle_de.json").default;
		case "el": return await import("../generated/assets/i18n/messagebundle_el.json").default;
		case "en": return await import("../generated/assets/i18n/messagebundle_en.json").default;
		case "es": return await import("../generated/assets/i18n/messagebundle_es.json").default;
		case "et": return await import("../generated/assets/i18n/messagebundle_et.json").default;
		case "fi": return await import("../generated/assets/i18n/messagebundle_fi.json").default;
		case "fr": return await import("../generated/assets/i18n/messagebundle_fr.json").default;
		case "hi": return await import("../generated/assets/i18n/messagebundle_hi.json").default;
		case "hr": return await import("../generated/assets/i18n/messagebundle_hr.json").default;
		case "hu": return await import("../generated/assets/i18n/messagebundle_hu.json").default;
		case "it": return await import("../generated/assets/i18n/messagebundle_it.json").default;
		case "iw": return await import("../generated/assets/i18n/messagebundle_iw.json").default;
		case "ja": return await import("../generated/assets/i18n/messagebundle_ja.json").default;
		case "kk": return await import("../generated/assets/i18n/messagebundle_kk.json").default;
		case "ko": return await import("../generated/assets/i18n/messagebundle_ko.json").default;
		case "lt": return await import("../generated/assets/i18n/messagebundle_lt.json").default;
		case "lv": return await import("../generated/assets/i18n/messagebundle_lv.json").default;
		case "ms": return await import("../generated/assets/i18n/messagebundle_ms.json").default;
		case "nl": return await import("../generated/assets/i18n/messagebundle_nl.json").default;
		case "no": return await import("../generated/assets/i18n/messagebundle_no.json").default;
		case "pl": return await import("../generated/assets/i18n/messagebundle_pl.json").default;
		case "pt": return await import("../generated/assets/i18n/messagebundle_pt.json").default;
		case "ro": return await import("../generated/assets/i18n/messagebundle_ro.json").default;
		case "ru": return await import("../generated/assets/i18n/messagebundle_ru.json").default;
		case "sh": return await import("../generated/assets/i18n/messagebundle_sh.json").default;
		case "sk": return await import("../generated/assets/i18n/messagebundle_sk.json").default;
		case "sl": return await import("../generated/assets/i18n/messagebundle_sl.json").default;
		case "sv": return await import("../generated/assets/i18n/messagebundle_sv.json").default;
		case "th": return await import("../generated/assets/i18n/messagebundle_th.json").default;
		case "tr": return await import("../generated/assets/i18n/messagebundle_tr.json").default;
		case "uk": return await import("../generated/assets/i18n/messagebundle_uk.json").default;
		case "vi": return await import("../generated/assets/i18n/messagebundle_vi.json").default;
		case "zhCN": return await import("../generated/assets/i18n/messagebundle_zh_CN.json").default;
		case "zhTW": return await import("../generated/assets/i18n/messagebundle_zh_TW.json").default;
		default: throw "unknown locale"
	}
}

registerLoader("@ui5/webcomponents-icons", fetchI18nBundle);