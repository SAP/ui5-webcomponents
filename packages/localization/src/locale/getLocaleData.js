import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleData from "../sap/ui/core/LocaleData.js";

const instances = new Map();

/**
 * Fetches and returns а LocaleData object for the required locale
 * For more information on this object's API, please see:
 * https://ui5.sap.com/#/api/sap.ui.core.LocaleData
 *
 * @param lang - if left empty, will use the configured/current locale
 * @returns {LocaleData}
 */
const getLocaleData = async lang => {
	const locale = getLocale(lang);
	const localeLang = locale.getLanguage();

	if (!instances.has(localeLang)) {
		await fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
		instances.set(localeLang, LocaleData.getInstance(locale));
	}

	return instances.get(localeLang);
};

export default getLocaleData;
