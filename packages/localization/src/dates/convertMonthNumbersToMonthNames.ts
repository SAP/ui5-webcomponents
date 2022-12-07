import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getCachedLocaleDataInstance from "../getCachedLocaleDataInstance.js";

/**
 * Convert month number to month name (text).
 * If the numbers of the two months are the same you will get the name of the month,
 * otherwise you will get the two names separated by a dash
 *
 * @param firstMonth CalendarDate Month
 * @param lastMonth CalendarDate Month
 * @param calendarType calendar type
 * @returns {String}
 */
const convertMonthNumbersToMonthNames = (firstMonth: number, lastMonth: number, calendarType: CalendarType) => {
	const localeData = getCachedLocaleDataInstance(getLocale());
	const pattern = localeData.getIntervalPattern("");
	const secondaryMonthsNames = localeData.getMonthsStandAlone("abbreviated", calendarType) as Array<string>;
	const secondaryMonthsNamesWide = localeData.getMonthsStandAlone("wide", calendarType) as Array<string>;

	if (firstMonth === lastMonth) {
		return {
			text: localeData.getMonths("abbreviated", calendarType)[firstMonth],
			textInfo: localeData.getMonths("wide", calendarType)[firstMonth],
		};
	}

	return {
		text: pattern.replace(/\{0\}/, secondaryMonthsNames[firstMonth]).replace(/\{1\}/, secondaryMonthsNames[lastMonth]),
		textInfo: pattern.replace(/\{0\}/, secondaryMonthsNamesWide[firstMonth]).replace(/\{1\}/, secondaryMonthsNamesWide[lastMonth]),
	};
};

export default convertMonthNumbersToMonthNames;
