import UniversalDate from "@ui5/webcomponents-core/dist/sap/ui/core/date/UniversalDate.js";
import Locale from "@ui5/webcomponents-core/dist/sap/ui/core/Locale.js";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData.js";

const calculateWeekNumber = (oDate, iYear, oLocale, oLocaleData) => {
	let iWeekNum = 0;
	let iWeekDay = 0;
	const iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek();

	// search Locale for containing "en-US", since sometimes
	// when any user settings have been defined, subtag "sapufmt" is added to the locale name
	// this is described inside sap.ui.core.Configuration file
	if (oLocale && (oLocale.getLanguage() === "en" && oLocale.getRegion() === "US")) {
		/*
			* in US the week starts with Sunday
			* The first week of the year starts with January 1st. But Dec. 31 is still in the last year
			* So the week beginning in December and ending in January has 2 week numbers
			*/
		const oJanFirst = new UniversalDate(oDate.getTime());
		oJanFirst.setUTCFullYear(iYear, 0, 1);
		iWeekDay = oJanFirst.getUTCDay();

		// get the date for the same weekday like jan 1.
		const oCheckDate = new UniversalDate(oDate.getTime());
		oCheckDate.setUTCDate(oCheckDate.getUTCDate() - oCheckDate.getUTCDay() + iWeekDay);

		iWeekNum = Math.round((oCheckDate.getTime() - oJanFirst.getTime()) / 86400000 / 7) + 1;
	} else {
		// normally the first week of the year is the one where the first Thursday of the year is
		// find Thursday of this week
		// if the checked day is before the 1. day of the week use a day of the previous week to check
		const oThursday = new UniversalDate(oDate.getTime());
		oThursday.setUTCDate(oThursday.getUTCDate() - iFirstDayOfWeek);
		iWeekDay = oThursday.getUTCDay();
		oThursday.setUTCDate(oThursday.getUTCDate() - iWeekDay + 4);

		const oFirstDayOfYear = new UniversalDate(oThursday.getTime());
		oFirstDayOfYear.setUTCMonth(0, 1);
		iWeekDay = oFirstDayOfYear.getUTCDay();
		let iAddDays = 0;
		if (iWeekDay > 4) {
			iAddDays = 7; // first day of year is after Thursday, so first Thursday is in the next week
		}
		const oFirstThursday = new UniversalDate(oFirstDayOfYear.getTime());
		oFirstThursday.setUTCDate(1 - iWeekDay + 4 + iAddDays);

		iWeekNum = Math.round((oThursday.getTime() - oFirstThursday.getTime()) / 86400000 / 7) + 1;
	}

	return iWeekNum;
};

const getFirstDateOfWeek = oDate => {
	const oUniversalDate = new UniversalDate(oDate.getTime()),
		oLocaleData = LocaleData.getInstance(new Locale("en")),
		iCLDRFirstWeekDay = oLocaleData.getFirstDayOfWeek();


	const oWeek = UniversalDate.getWeekByDate(oUniversalDate.getCalendarType(), oUniversalDate.getUTCFullYear(),
		oUniversalDate.getUTCMonth(), oUniversalDate.getUTCDate());

	const oFirstDateOfWeek = UniversalDate.getFirstDateOfWeek(oUniversalDate.getCalendarType(), oWeek.year, oWeek.week);
	const oFirstUniversalDateOfWeek = new UniversalDate(Date.UTC(oFirstDateOfWeek.year, oFirstDateOfWeek.month, oFirstDateOfWeek.day));

	// In case the day of the computed weekFirstDate is not as in CLDR(e.g. en_US locales), make sure we align it
	while (oFirstUniversalDateOfWeek.getUTCDay() !== iCLDRFirstWeekDay) {
		oFirstUniversalDateOfWeek.setUTCDate(oFirstUniversalDateOfWeek.getUTCDate() - 1);
	}

	return new UniversalDate(Date.UTC(oFirstUniversalDateOfWeek.getUTCFullYear(), oFirstUniversalDateOfWeek.getUTCMonth(),
		oFirstUniversalDateOfWeek.getUTCDate(), oDate.getUTCHours(), oDate.getUTCMinutes(), oDate.getUTCSeconds())).getJSDate();
};

const getFirstDateOfMonth = oDate => {
	const oNewDate = new UniversalDate(oDate.getTime());
	oNewDate.setUTCDate(1);

	return oNewDate;
};

const monthsDiffer = (oDate1, oDate2) => {
	return (oDate1.getMonth() !== oDate2.getMonth() || oDate1.getFullYear() !== oDate2.getFullYear());
};

const isDateLastInMonth = oDate => {
	const oNextDay = new Date(oDate.getTime() + 24 * 60 * 60 * 1000);
	return oNextDay.getUTCDate() < oDate.getUTCDate();
};

export {
	calculateWeekNumber,
	getFirstDateOfWeek,
	getFirstDateOfMonth,
	monthsDiffer,
	isDateLastInMonth,
};
