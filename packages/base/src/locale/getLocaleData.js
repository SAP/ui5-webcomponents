import LocaleData from "@ui5/webcomponents-utils/dist/sap/ui/core/LocaleData.js";
import getLocale from "./getLocale.js";
import { fetchCldr } from "../asset-registries/LocaleData.js";

const instances = new Map();

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
