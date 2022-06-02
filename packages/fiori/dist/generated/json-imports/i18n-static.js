import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

import _ar from "../assets/i18n/messagebundle_ar.json";
import _bg from "../assets/i18n/messagebundle_bg.json";
import _ca from "../assets/i18n/messagebundle_ca.json";
import _cs from "../assets/i18n/messagebundle_cs.json";
import _cy from "../assets/i18n/messagebundle_cy.json";
import _da from "../assets/i18n/messagebundle_da.json";
import _de from "../assets/i18n/messagebundle_de.json";
import _el from "../assets/i18n/messagebundle_el.json";
import _en from "../assets/i18n/messagebundle_en.json";
import _en_GB from "../assets/i18n/messagebundle_en_GB.json";
import _en_US_sappsd from "../assets/i18n/messagebundle_en_US_sappsd.json";
import _en_US_saprigi from "../assets/i18n/messagebundle_en_US_saprigi.json";
import _en_US_saptrc from "../assets/i18n/messagebundle_en_US_saptrc.json";
import _es from "../assets/i18n/messagebundle_es.json";
import _es_MX from "../assets/i18n/messagebundle_es_MX.json";
import _et from "../assets/i18n/messagebundle_et.json";
import _fi from "../assets/i18n/messagebundle_fi.json";
import _fr from "../assets/i18n/messagebundle_fr.json";
import _fr_CA from "../assets/i18n/messagebundle_fr_CA.json";
import _hi from "../assets/i18n/messagebundle_hi.json";
import _hr from "../assets/i18n/messagebundle_hr.json";
import _hu from "../assets/i18n/messagebundle_hu.json";
import _in from "../assets/i18n/messagebundle_in.json";
import _it from "../assets/i18n/messagebundle_it.json";
import _iw from "../assets/i18n/messagebundle_iw.json";
import _ja from "../assets/i18n/messagebundle_ja.json";
import _kk from "../assets/i18n/messagebundle_kk.json";
import _ko from "../assets/i18n/messagebundle_ko.json";
import _lt from "../assets/i18n/messagebundle_lt.json";
import _lv from "../assets/i18n/messagebundle_lv.json";
import _ms from "../assets/i18n/messagebundle_ms.json";
import _nl from "../assets/i18n/messagebundle_nl.json";
import _no from "../assets/i18n/messagebundle_no.json";
import _pl from "../assets/i18n/messagebundle_pl.json";
import _pt from "../assets/i18n/messagebundle_pt.json";
import _pt_PT from "../assets/i18n/messagebundle_pt_PT.json";
import _ro from "../assets/i18n/messagebundle_ro.json";
import _ru from "../assets/i18n/messagebundle_ru.json";
import _sh from "../assets/i18n/messagebundle_sh.json";
import _sk from "../assets/i18n/messagebundle_sk.json";
import _sl from "../assets/i18n/messagebundle_sl.json";
import _sv from "../assets/i18n/messagebundle_sv.json";
import _th from "../assets/i18n/messagebundle_th.json";
import _tr from "../assets/i18n/messagebundle_tr.json";
import _uk from "../assets/i18n/messagebundle_uk.json";
import _vi from "../assets/i18n/messagebundle_vi.json";
import _zh_CN from "../assets/i18n/messagebundle_zh_CN.json";
import _zh_TW from "../assets/i18n/messagebundle_zh_TW.json";

const bundleMap = {
	"ar": _ar,
	"bg": _bg,
	"ca": _ca,
	"cs": _cs,
	"cy": _cy,
	"da": _da,
	"de": _de,
	"el": _el,
	"en": _en,
	"en_GB": _en_GB,
	"en_US_sappsd": _en_US_sappsd,
	"en_US_saprigi": _en_US_saprigi,
	"en_US_saptrc": _en_US_saptrc,
	"es": _es,
	"es_MX": _es_MX,
	"et": _et,
	"fi": _fi,
	"fr": _fr,
	"fr_CA": _fr_CA,
	"hi": _hi,
	"hr": _hr,
	"hu": _hu,
	"in": _in,
	"it": _it,
	"iw": _iw,
	"ja": _ja,
	"kk": _kk,
	"ko": _ko,
	"lt": _lt,
	"lv": _lv,
	"ms": _ms,
	"nl": _nl,
	"no": _no,
	"pl": _pl,
	"pt": _pt,
	"pt_PT": _pt_PT,
	"ro": _ro,
	"ru": _ru,
	"sh": _sh,
	"sk": _sk,
	"sl": _sl,
	"sv": _sv,
	"th": _th,
	"tr": _tr,
	"uk": _uk,
	"vi": _vi,
	"zh_CN": _zh_CN,
	"zh_TW": _zh_TW,
};

const fetchMessageBundle = async (localeId) => {
	if (typeof bundleMap[localeId] === "object") {
		// inlined from build
		throw new Error("[i18n] Inlined JSON not supported with static imports of assets. Use dynamic imports of assets or configure JSON imports as URLs")
	}
	return (await fetch(bundleMap[localeId])).json()
}

const localeIds = ["ar",
	"bg",
	"ca",
	"cs",
	"cy",
	"da",
	"de",
	"el",
	"en",
	"en_GB",
	"en_US_sappsd",
	"en_US_saprigi",
	"en_US_saptrc",
	"es",
	"es_MX",
	"et",
	"fi",
	"fr",
	"fr_CA",
	"hi",
	"hr",
	"hu",
	"in",
	"it",
	"iw",
	"ja",
	"kk",
	"ko",
	"lt",
	"lv",
	"ms",
	"nl",
	"no",
	"pl",
	"pt",
	"pt_PT",
	"ro",
	"ru",
	"sh",
	"sk",
	"sl",
	"sv",
	"th",
	"tr",
	"uk",
	"vi",
	"zh_CN",
	"zh_TW",];

localeIds.forEach(localeId => {
	registerI18nLoader("@ui5/webcomponents-fiori", localeId, fetchMessageBundle);
});
