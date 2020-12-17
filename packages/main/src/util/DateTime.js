import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";

const getMinCalendarDate = primaryCalendarType => {
	const minDate = new CalendarDate(1, 0, 1, primaryCalendarType);
	minDate.setYear(1);
	minDate.setMonth(0);
	minDate.setDate(1);
	return minDate.valueOf();
};

const getMaxCalendarDate = primaryCalendarType => {
	const maxDate = new CalendarDate(1, 0, 1, primaryCalendarType);
	maxDate.setYear(9999);
	maxDate.setMonth(11);
	const tempDate = new CalendarDate(maxDate, primaryCalendarType);
	tempDate.setDate(1);
	tempDate.setMonth(tempDate.getMonth() + 1, 0);
	maxDate.setDate(tempDate.getDate());// 31st for Gregorian Calendar
	return maxDate.valueOf();
};

export {
	getMinCalendarDate,
	getMaxCalendarDate,
};
