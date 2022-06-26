import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";

const getDayInMonth = date => {
	const tempCalendarDate = new CalendarDate(date);
	tempCalendarDate.setDate(1);
	tempCalendarDate.setMonth(tempCalendarDate.getMonth() + 1);
	tempCalendarDate.setDate(0);
	return tempCalendarDate.getDate();
};

export default getDayInMonth;
