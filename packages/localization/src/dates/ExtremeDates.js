import CalendarDate from "./CalendarDate.js";

const cache = new Map();

const getMinCalendarDate = primaryCalendarType => {
	const key = `min ${primaryCalendarType}`;

	if (!cache.has(key)) {
		const minDate = new CalendarDate(1, 0, 1, primaryCalendarType);
		minDate.setYear(1);
		minDate.setMonth(0);
		minDate.setDate(1);
		cache.set(key, minDate);
	}

	return cache.get(key);
};

const getMaxCalendarDate = primaryCalendarType => {
	const key = `max ${primaryCalendarType}`;

	if (!cache.has(key)) {
		const maxDate = new CalendarDate(1, 0, 1, primaryCalendarType);
		maxDate.setYear(9999);
		maxDate.setMonth(11);
		const tempDate = new CalendarDate(maxDate, primaryCalendarType);
		tempDate.setDate(1);
		tempDate.setMonth(tempDate.getMonth() + 1, 0);
		maxDate.setDate(tempDate.getDate());// 31st for Gregorian Calendar
		cache.set(key, maxDate);
	}

	return cache.get(key);
};

const tranformDateToSecondaryType = (primaryCalendarType, secondaryCalendarType, timeStamp, hasYearPicker) => {
	const key = `${timeStamp} transformet to date in ${secondaryCalendarType}`;

	if (!cache.has(key)) {
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

		cache.set(key, { firstDate, lastDate });
	}

	return cache.get(key);
};

const getDaysInMonth = date => {
	const key = `max day in ${date.getMonth()}`;

	if (!cache.has(key)) {
		const tempCalendarDate = new CalendarDate(date);
		tempCalendarDate.setDate(1);
		tempCalendarDate.setMonth(tempCalendarDate.getMonth() + 1);
		tempCalendarDate.setDate(0);
		cache.set(key, tempCalendarDate.getDate());
	}

	return cache.get(key);
};

export {
	getMinCalendarDate,
	getMaxCalendarDate,
	tranformDateToSecondaryType,
	getDaysInMonth,
};
