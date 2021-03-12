import CalendarDate from "./CalendarDate.js";

/**
 * Adds or subtracts a given amount of days/months/years from a date.
 * If minDate or maxDate are given, the result will be enforced within these limits
 *
 * @param date CalendarDate instance
 * @param amount how many days/months/years to add (can be a negative number)
 * @param unit what to modify: "day", "month" or "year"
 * @param minDate minimum date to enforce
 * @param maxDate maximum date to enforce
 */
const modifyDateBy = (date, amount, unit, minDate = null, maxDate = null) => {
	const newDate = new CalendarDate(date);
	if (unit === "day") {
		newDate.setDate(date.getDate() + amount);
	} else if (unit === "month") {
		newDate.setMonth(date.getMonth() + amount);
		const stillSameMonth = amount === -1 && newDate.getMonth() === date.getMonth(); // f.e. PageUp remained in the same month
		const monthSkipped = amount === 1 && newDate.getMonth() - date.getMonth() > 1; // f.e. PageDown skipped a whole month
		if (stillSameMonth || monthSkipped) { // Select the last day of the month in any of these 2 scenarios
			newDate.setDate(0);
		}
	} else {
		newDate.setYear(date.getYear() + amount);
		if (newDate.getMonth() !== date.getMonth()) { // f.e. 29th Feb to next/prev year
			newDate.setDate(0); // Select the last day of the month
		}
	}

	if (minDate && newDate.valueOf() < minDate.valueOf()) {
		return new CalendarDate(minDate);
	}

	if (maxDate && newDate.valueOf() > maxDate.valueOf()) {
		return new CalendarDate(maxDate);
	}

	return newDate;
};

export default modifyDateBy;
