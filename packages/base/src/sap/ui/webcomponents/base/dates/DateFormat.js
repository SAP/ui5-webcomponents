import CoreDateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat";
import { fetchCldrData } from "../CLDR";
import { getLocale } from "../LocaleProvider";

async function getFormatterInstance(oFormatOptions, oLocale) {
	if (!oLocale) {
		oLocale = getLocale();
	}

	await fetchCldrData(oLocale.getLanguage(), oLocale.getRegion(), oLocale.getScript());
	return CoreDateFormat.getInstance.call(CoreDateFormat, oFormatOptions, oLocale);
}

/* eslint-disable import/prefer-default-export */
export { getFormatterInstance };
/* eslint-enable import/prefer-default-export */
