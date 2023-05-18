import CalendarDate from "./CalendarDate.js";

/**
 * Adds or subtracts a given amount of days/months/years from a date.
 * If minDate or maxDate are given, the result will be enforced within these limits
 *
 * @param date CalendarDate instance
 * @param amount how many days/months/years to add (can be a negative number)
 * @param unit what to modify: "day", "month" or "year"
 * @param isPageUpOrPageDown whether the method is called when the date is being modified by the PageUp/PageDown keys/logic
 * @param minDate minimum date to enforce
 * @param maxDate maximum date to enforce
 */
const modifyDateBy = (date: CalendarDate, amount: number, unit: string, isPageUpOrPageDown?:boolean, minDate?: CalendarDate, maxDate?: CalendarDate) => {
	const newDate = new CalendarDate(date);

	switch (unit) {
	case "day":
		newDate.setDate(date.getDate() + amount);
		break;
	case "month":
		if (isPageUpOrPageDown) { // In cases where the method is called when the date is being modified by the PageUp/PageDown keys/logic
			newDate.setMonth(date.getMonth() + amount);
			const stillSameMonth = amount === -1 && newDate.getMonth() === date.getMonth(); // f.e. PageUp remained in the same month
			const monthSkipped = amount === 1 && newDate.getMonth() - date.getMonth() > 1; // f.e. PageDown skipped a whole month
			if (stillSameMonth || monthSkipped) { // Select the last day of the month in any of these 2 scenarios
				newDate.setDate(0);
			}
		} else {
			if (amount === 1) {
				const currentMonth = newDate.getMonth();
				newDate.setMonth(currentMonth + amount);
				if (newDate.getMonth() === currentMonth + 2) {
					// We have skipped a month, so get back 1 month, and then set the date to the first day of the month
					newDate.setDate(0);
					newDate.setDate(1);
				} else {
					// We are still in the same month, so set the date to the first day of the month
					newDate.setDate(1);
				}
			}
			if (amount === -1) {
				newDate.setDate(0);
			}
		}
		break;
	case "year":
		newDate.setYear(date.getYear() + amount);
		if (newDate.getMonth() !== date.getMonth()) { // f.e. 29th Feb to next/prev year
			newDate.setDate(0); // Select the last day of the month
		}
		break;
	default:
		break;
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
