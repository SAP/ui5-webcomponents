import CalendarDate from "./CalendarDate.js";
import getDaysInMonth from "./getDaysInMonth.js";

const transformDateToSecondaryType = (primaryCalendarType, secondaryCalendarType, timeStamp, hasYearPicker) => {
	let firstDate = CalendarDate.fromLocalJSDate(new Date(timeStamp * 1000), primaryCalendarType);
	let lastDate = CalendarDate.fromLocalJSDate(new Date(timeStamp * 1000), primaryCalendarType);
	firstDate.setDate(1);

	if (hasYearPicker) {
		firstDate.setMonth(0);
		lastDate.setMonth(11);
	}

	lastDate.setDate(getDaysInMonth(lastDate));
	firstDate = new CalendarDate(firstDate, secondaryCalendarType);
	lastDate = new CalendarDate(lastDate, secondaryCalendarType);
	return { firstDate, lastDate };
};

export default transformDateToSecondaryType;
