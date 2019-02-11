import { fetchResourceBundle, registerMessageBundles, getResourceBundle } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/ResourceBundle";

import ar from "./i18n/messagebundle_ar.properties";
import bg from "./i18n/messagebundle_bg.properties";
import ca from "./i18n/messagebundle_ca.properties";
import cs from "./i18n/messagebundle_cs.properties";
import da from "./i18n/messagebundle_da.properties";
import de from "./i18n/messagebundle_de.properties";
import el from "./i18n/messagebundle_el.properties";
import enUSSappsd from "./i18n/messagebundle_en_US_sappsd.properties";
import enUSSaptrc from "./i18n/messagebundle_en_US_saptrc.properties";
import en from "./i18n/messagebundle_en.properties";
import es from "./i18n/messagebundle_es.properties";
import et from "./i18n/messagebundle_et.properties";
import fi from "./i18n/messagebundle_fi.properties";
import fr from "./i18n/messagebundle_fr.properties";
import hi from "./i18n/messagebundle_hi.properties";
import hr from "./i18n/messagebundle_hr.properties";
import hu from "./i18n/messagebundle_hu.properties";
import it from "./i18n/messagebundle_it.properties";
import iw from "./i18n/messagebundle_iw.properties";
import ja from "./i18n/messagebundle_ja.properties";
import kk from "./i18n/messagebundle_kk.properties";
import ko from "./i18n/messagebundle_ko.properties";
import lt from "./i18n/messagebundle_lt.properties";
import lv from "./i18n/messagebundle_lv.properties";
import ms from "./i18n/messagebundle_ms.properties";
import nl from "./i18n/messagebundle_nl.properties";
import no from "./i18n/messagebundle_no.properties";
import pl from "./i18n/messagebundle_pl.properties";
import pt from "./i18n/messagebundle_pt.properties";
import ro from "./i18n/messagebundle_ro.properties";
import ru from "./i18n/messagebundle_ru.properties";
import sh from "./i18n/messagebundle_sh.properties";
import sk from "./i18n/messagebundle_sk.properties";
import sl from "./i18n/messagebundle_sl.properties";
import sv from "./i18n/messagebundle_sv.properties";
import th from "./i18n/messagebundle_th.properties";
import tr from "./i18n/messagebundle_tr.properties";
import uk from "./i18n/messagebundle_uk.properties";
import vi from "./i18n/messagebundle_vi.properties";
import zhCN from "./i18n/messagebundle_zh_CN.properties";
import zhTW from "./i18n/messagebundle_zh_TW.properties";

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

registerMessageBundles("@ui5/webcomponents", bundleMap);

export { fetchResourceBundle, getResourceBundle };
