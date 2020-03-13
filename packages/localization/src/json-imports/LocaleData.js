import { registerCldr, setCldrData } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

/* eslint-disable camelcase */
import ar from "../generated/assets/cldr/ar.json";
import ar_EG from "../generated/assets/cldr/ar_EG.json";
import ar_SA from "../generated/assets/cldr/ar_SA.json";
import bg from "../generated/assets/cldr/bg.json";
import ca from "../generated/assets/cldr/ca.json";
import cs from "../generated/assets/cldr/cs.json";
import da from "../generated/assets/cldr/da.json";
import de from "../generated/assets/cldr/de.json";
import de_AT from "../generated/assets/cldr/de_AT.json";
import de_CH from "../generated/assets/cldr/de_CH.json";
import el from "../generated/assets/cldr/el.json";
import el_CY from "../generated/assets/cldr/el_CY.json";
import en from "../generated/assets/cldr/en.json";
import en_AU from "../generated/assets/cldr/en_AU.json";
import en_GB from "../generated/assets/cldr/en_GB.json";
import en_HK from "../generated/assets/cldr/en_HK.json";
import en_IE from "../generated/assets/cldr/en_IE.json";
import en_IN from "../generated/assets/cldr/en_IN.json";
import en_NZ from "../generated/assets/cldr/en_NZ.json";
import en_PG from "../generated/assets/cldr/en_PG.json";
import en_SG from "../generated/assets/cldr/en_SG.json";
import en_ZA from "../generated/assets/cldr/en_ZA.json";
import es from "../generated/assets/cldr/es.json";
import es_AR from "../generated/assets/cldr/es_AR.json";
import es_BO from "../generated/assets/cldr/es_BO.json";
import es_CL from "../generated/assets/cldr/es_CL.json";
import es_CO from "../generated/assets/cldr/es_CO.json";
import es_MX from "../generated/assets/cldr/es_MX.json";
import es_PE from "../generated/assets/cldr/es_PE.json";
import es_UY from "../generated/assets/cldr/es_UY.json";
import es_VE from "../generated/assets/cldr/es_VE.json";
import et from "../generated/assets/cldr/et.json";
import fa from "../generated/assets/cldr/fa.json";
import fi from "../generated/assets/cldr/fi.json";
import fr from "../generated/assets/cldr/fr.json";
import fr_BE from "../generated/assets/cldr/fr_BE.json";
import fr_CA from "../generated/assets/cldr/fr_CA.json";
import fr_CH from "../generated/assets/cldr/fr_CH.json";
import fr_LU from "../generated/assets/cldr/fr_LU.json";
import he from "../generated/assets/cldr/he.json";
import hi from "../generated/assets/cldr/hi.json";
import hr from "../generated/assets/cldr/hr.json";
import hu from "../generated/assets/cldr/hu.json";
import id from "../generated/assets/cldr/id.json";
import it from "../generated/assets/cldr/it.json";
import it_CH from "../generated/assets/cldr/it_CH.json";
import ja from "../generated/assets/cldr/ja.json";
import kk from "../generated/assets/cldr/kk.json";
import ko from "../generated/assets/cldr/ko.json";
import lt from "../generated/assets/cldr/lt.json";
import lv from "../generated/assets/cldr/lv.json";
import ms from "../generated/assets/cldr/ms.json";
import nb from "../generated/assets/cldr/nb.json";
import nl from "../generated/assets/cldr/nl.json";
import nl_BE from "../generated/assets/cldr/nl_BE.json";
import pl from "../generated/assets/cldr/pl.json";
import pt from "../generated/assets/cldr/pt.json";
import pt_PT from "../generated/assets/cldr/pt_PT.json";
import ro from "../generated/assets/cldr/ro.json";
import ru from "../generated/assets/cldr/ru.json";
import ru_UA from "../generated/assets/cldr/ru_UA.json";
import sk from "../generated/assets/cldr/sk.json";
import sl from "../generated/assets/cldr/sl.json";
import sr from "../generated/assets/cldr/sr.json";
import sv from "../generated/assets/cldr/sv.json";
import th from "../generated/assets/cldr/th.json";
import tr from "../generated/assets/cldr/tr.json";
import uk from "../generated/assets/cldr/uk.json";
import vi from "../generated/assets/cldr/vi.json";
import zh_CN from "../generated/assets/cldr/zh_CN.json";
import zh_HK from "../generated/assets/cldr/zh_HK.json";
import zh_SG from "../generated/assets/cldr/zh_SG.json";
import zh_TW from "../generated/assets/cldr/zh_TW.json";

const cldrData = {
	ar,
	ar_EG,
	ar_SA,
	bg,
	ca,
	cs,
	da,
	de,
	de_AT,
	de_CH,
	el,
	el_CY,
	en,
	en_AU,
	en_GB,
	en_HK,
	en_IE,
	en_IN,
	en_NZ,
	en_PG,
	en_SG,
	en_ZA,
	es,
	es_AR,
	es_BO,
	es_CL,
	es_CO,
	es_MX,
	es_PE,
	es_UY,
	es_VE,
	et,
	fa,
	fi,
	fr,
	fr_BE,
	fr_CA,
	fr_CH,
	fr_LU,
	he,
	hi,
	hr,
	hu,
	id,
	it,
	it_CH,
	ja,
	kk,
	ko,
	lt,
	lv,
	ms,
	nb,
	nl,
	nl_BE,
	pl,
	pt,
	pt_PT,
	ro,
	ru,
	ru_UA,
	sk,
	sl,
	sr,
	sv,
	th,
	tr,
	uk,
	vi,
	zh_CN,
	zh_HK,
	zh_SG,
	zh_TW,
};

const allEntriesInlined = Object.entries(cldrData).every(([_key, value]) => typeof (value) === "object");
/* eslint-disable */
if (allEntriesInlined) {
	console.warn(`Inefficient bundling detected: consider bundling CLDR imports as URLs instead of inlining them.
See rollup-plugin-url or webpack file-loader for more information.
Suggested pattern: "assets\\\/.*\\\.json"`);
}
/* eslint-enable */

Object.entries(cldrData).forEach(([key, value]) => {
	if (typeof (value) === "object") {
		setCldrData(key, value);
	} else {
		registerCldr(key, value);
	}
});

/* eslint-enable camelcase */
