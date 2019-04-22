import { fetchResourceBundle, registerMessageBundles, getResourceBundle } from "@ui5/webcomponents-base/src/ResourceBundle.js";

import ar from "./i18n/messagebundle_ar.json";
import bg from "./i18n/messagebundle_bg.json";
import ca from "./i18n/messagebundle_ca.json";
import cs from "./i18n/messagebundle_cs.json";
import da from "./i18n/messagebundle_da.json";
import de from "./i18n/messagebundle_de.json";
import el from "./i18n/messagebundle_el.json";
import enUSSappsd from "./i18n/messagebundle_en_US_sappsd.json";
import enUSSaptrc from "./i18n/messagebundle_en_US_saptrc.json";
import en from "./i18n/messagebundle_en.json";
import es from "./i18n/messagebundle_es.json";
import et from "./i18n/messagebundle_et.json";
import fi from "./i18n/messagebundle_fi.json";
import fr from "./i18n/messagebundle_fr.json";
import hi from "./i18n/messagebundle_hi.json";
import hr from "./i18n/messagebundle_hr.json";
import hu from "./i18n/messagebundle_hu.json";
import it from "./i18n/messagebundle_it.json";
import iw from "./i18n/messagebundle_iw.json";
import ja from "./i18n/messagebundle_ja.json";
import kk from "./i18n/messagebundle_kk.json";
import ko from "./i18n/messagebundle_ko.json";
import lt from "./i18n/messagebundle_lt.json";
import lv from "./i18n/messagebundle_lv.json";
import ms from "./i18n/messagebundle_ms.json";
import nl from "./i18n/messagebundle_nl.json";
import no from "./i18n/messagebundle_no.json";
import pl from "./i18n/messagebundle_pl.json";
import pt from "./i18n/messagebundle_pt.json";
import ro from "./i18n/messagebundle_ro.json";
import ru from "./i18n/messagebundle_ru.json";
import sh from "./i18n/messagebundle_sh.json";
import sk from "./i18n/messagebundle_sk.json";
import sl from "./i18n/messagebundle_sl.json";
import sv from "./i18n/messagebundle_sv.json";
import th from "./i18n/messagebundle_th.json";
import tr from "./i18n/messagebundle_tr.json";
import uk from "./i18n/messagebundle_uk.json";
import vi from "./i18n/messagebundle_vi.json";
import zhCN from "./i18n/messagebundle_zh_CN.json";
import zhTW from "./i18n/messagebundle_zh_TW.json";

const bundleMap = {
	ar,
	bg,
	ca,
	cs,
	da,
	de,
	el,
	en_US_sappsd: enUSSappsd,
	en_US_saptrc: enUSSaptrc,
	en,
	es,
	et,
	fi,
	fr,
	hi,
	hr,
	hu,
	it,
	iw,
	ja,
	kk,
	ko,
	lt,
	lv,
	ms,
	nl,
	no,
	pl,
	pt,
	ro,
	ru,
	sh,
	sk,
	sl,
	sv,
	th,
	tr,
	uk,
	vi,
	zh_CN: zhCN,
	zh_TW: zhTW,
};

const allEntriesInlined = Object.entries(bundleMap).every(([_key, value]) => typeof (value) === "object");

/* eslint-disable */
if (allEntriesInlined) {
	console.warn(`Inefficient bundling detected: consider bundling i18n imports as URLs instead of inlining them. 
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "i18n\\\/.*\\\.json"`);
}
/* eslint-enable */

registerMessageBundles("@ui5/webcomponents", bundleMap);

export { fetchResourceBundle, getResourceBundle };
