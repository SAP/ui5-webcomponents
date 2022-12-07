import type Locale from "@ui5/webcomponents-base/dist/locale/Locale.js";
import type LocaleT from "sap/ui/core/Locale";
import LocaleData from "./LocaleData.js";

const cache = new Map<Locale, LocaleData>();

const getCachedLocaleDataInstance = (locale: Locale) => {
	if (!cache.has(locale)) {
		cache.set(locale, new LocaleData(locale as unknown as LocaleT));
	}

	return cache.get(locale)!;
};

export default getCachedLocaleDataInstance;
