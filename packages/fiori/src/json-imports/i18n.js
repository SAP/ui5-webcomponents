import "@ui5/webcomponents/dist/json-imports/i18n.js";
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";

import ar from "../assets/i18n/messagebundle_ar.json";
import bg from "../assets/i18n/messagebundle_bg.json";
import ca from "../assets/i18n/messagebundle_ca.json";
import cs from "../assets/i18n/messagebundle_cs.json";
import da from "../assets/i18n/messagebundle_da.json";
import de from "../assets/i18n/messagebundle_de.json";
import el from "../assets/i18n/messagebundle_el.json";
import en from "../assets/i18n/messagebundle_en.json";
import es from "../assets/i18n/messagebundle_es.json";
import et from "../assets/i18n/messagebundle_et.json";
import fi from "../assets/i18n/messagebundle_fi.json";
import fr from "../assets/i18n/messagebundle_fr.json";
import hi from "../assets/i18n/messagebundle_hi.json";
import hr from "../assets/i18n/messagebundle_hr.json";
import hu from "../assets/i18n/messagebundle_hu.json";
import it from "../assets/i18n/messagebundle_it.json";
import iw from "../assets/i18n/messagebundle_iw.json";
import ja from "../assets/i18n/messagebundle_ja.json";
import kk from "../assets/i18n/messagebundle_kk.json";
import ko from "../assets/i18n/messagebundle_ko.json";
import lt from "../assets/i18n/messagebundle_lt.json";
import lv from "../assets/i18n/messagebundle_lv.json";
import ms from "../assets/i18n/messagebundle_ms.json";
import nl from "../assets/i18n/messagebundle_nl.json";
import no from "../assets/i18n/messagebundle_no.json";
import pl from "../assets/i18n/messagebundle_pl.json";
import pt from "../assets/i18n/messagebundle_pt.json";
import ro from "../assets/i18n/messagebundle_ro.json";
import ru from "../assets/i18n/messagebundle_ru.json";
import sh from "../assets/i18n/messagebundle_sh.json";
import sk from "../assets/i18n/messagebundle_sk.json";
import sl from "../assets/i18n/messagebundle_sl.json";
import sv from "../assets/i18n/messagebundle_sv.json";
import th from "../assets/i18n/messagebundle_th.json";
import tr from "../assets/i18n/messagebundle_tr.json";
import uk from "../assets/i18n/messagebundle_uk.json";
import vi from "../assets/i18n/messagebundle_vi.json";
import zhCN from "../assets/i18n/messagebundle_zh_CN.json";
import zhTW from "../assets/i18n/messagebundle_zh_TW.json";

const bundleMap = {
	ar,
	bg,
	ca,
	cs,
	da,
	de,
	el,
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
Suggested pattern: "assets\\\/.*\\\.json"`);
}
/* eslint-enable */

registerI18nBundle("@ui5/webcomponents-fiori", bundleMap);
