import { registerMessageBundles } from "@ui5/webcomponents-base/dist/ResourceBundle.js";

import ar from "./generated/i18n/messagebundle_ar.json";
import bg from "./generated/i18n/messagebundle_bg.json";
import ca from "./generated/i18n/messagebundle_ca.json";
import cs from "./generated/i18n/messagebundle_cs.json";
import da from "./generated/i18n/messagebundle_da.json";
import de from "./generated/i18n/messagebundle_de.json";
import el from "./generated/i18n/messagebundle_el.json";
import en from "./generated/i18n/messagebundle_en.json";
import es from "./generated/i18n/messagebundle_es.json";
import et from "./generated/i18n/messagebundle_et.json";
import fi from "./generated/i18n/messagebundle_fi.json";
import fr from "./generated/i18n/messagebundle_fr.json";
import hi from "./generated/i18n/messagebundle_hi.json";
import hr from "./generated/i18n/messagebundle_hr.json";
import hu from "./generated/i18n/messagebundle_hu.json";
import it from "./generated/i18n/messagebundle_it.json";
import iw from "./generated/i18n/messagebundle_iw.json";
import ja from "./generated/i18n/messagebundle_ja.json";
import kk from "./generated/i18n/messagebundle_kk.json";
import ko from "./generated/i18n/messagebundle_ko.json";
import lt from "./generated/i18n/messagebundle_lt.json";
import lv from "./generated/i18n/messagebundle_lv.json";
import ms from "./generated/i18n/messagebundle_ms.json";
import nl from "./generated/i18n/messagebundle_nl.json";
import no from "./generated/i18n/messagebundle_no.json";
import pl from "./generated/i18n/messagebundle_pl.json";
import pt from "./generated/i18n/messagebundle_pt.json";
import ro from "./generated/i18n/messagebundle_ro.json";
import ru from "./generated/i18n/messagebundle_ru.json";
import sh from "./generated/i18n/messagebundle_sh.json";
import sk from "./generated/i18n/messagebundle_sk.json";
import sl from "./generated/i18n/messagebundle_sl.json";
import sv from "./generated/i18n/messagebundle_sv.json";
import th from "./generated/i18n/messagebundle_th.json";
import tr from "./generated/i18n/messagebundle_tr.json";
import uk from "./generated/i18n/messagebundle_uk.json";
import vi from "./generated/i18n/messagebundle_vi.json";
import zhCN from "./generated/i18n/messagebundle_zh_CN.json";
import zhTW from "./generated/i18n/messagebundle_zh_TW.json";

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
Suggested pattern: "i18n\\\/.*\\\.json"`);
}
/* eslint-enable */

registerMessageBundles("@ui5/webcomponents", bundleMap);
