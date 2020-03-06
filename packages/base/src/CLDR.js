import LocaleData from "@ui5/webcomponents-utils/dist/sap/ui/core/LocaleData.js";
import { getLocale } from "./LocaleProvider.js";
import { fetchCldr } from "./asset-registries/LocaleData.js";

const _getLocaleDataInstance = async () => {
	const locale = getLocale();
	await fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
	return LocaleData.getInstance(locale);
};

/**
 * Get locale specific language names.
 *
 * @returns {object} map of locale specific language names
 * @public
 */
const getLanguages = async () => {
	const localeData = await _getLocaleDataInstance();
	return localeData.getLanguages();
};

/**
 * Get locale specific territory names.
 *
 * @returns {object} map of locale specific territory names
 * @public
 */
const getTerritories = async () => {
	const localeData = await _getLocaleDataInstance();
	return localeData.getTerritories();
};

/**
 * Get date pattern in format "short", "medium", "long" or "full".
 *
 * @param {string} style the required style for the date pattern
 * @param {string} calendarType the type of calendar. If it's not set, it falls back to the calendar type either set in configuration or calculated from locale.
 * @returns {string} the selected date pattern
 * @public
 */
const getDatePattern = async (style, calendarType) => {
	const localeData = await _getLocaleDataInstance();
	return localeData.getDatePattern(style, calendarType);
};

export {
	getLanguages,
	getTerritories,
	getDatePattern,
};
