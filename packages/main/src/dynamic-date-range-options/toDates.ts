import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DynamicDateRangeDirection from "../types/DynamicDateRangeDirection.js";

const dateOptionToDates = (value: DynamicDateRangeValue): Array<Date> => {
	const startDate = value.values ? value.values[0] as Date : new Date();
	const endDate = new Date(startDate);

	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const dateRangeOptionToDates = (value: DynamicDateRangeValue): Array<Date> => {
	const startDate = value.values ? value.values[0] as Date : new Date();
	const endDate = value.values ? value.values[1] as Date : new Date();

	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const todayToDates = (): Array<Date> => {
	const startDate = new Date();
	const endDate = new Date();

	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const tomorrowToDates = (): Array<Date> => {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(startDate.getDate() + 1);
	endDate.setDate(endDate.getDate() + 1);
	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const yesterdayToDates = (): Array<Date> => {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(startDate.getDate() - 1);
	endDate.setDate(endDate.getDate() - 1);
	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const lastNextToDates = (value: DynamicDateRangeValue, unit: string, direction: `${DynamicDateRangeDirection}`): Array<Date> => {
	const today = new Date();
	const startDate = new Date(today);
	const endDate = new Date(today);
	const amount = value.values?.[0] as number || 1;

	if (direction === DynamicDateRangeDirection.Last) {
		switch (unit) {
		case "days":
			startDate.setDate(today.getDate() - (amount - 1));
			break;
		case "weeks": {
			const currentDayOfWeek = today.getDay();
			const daysToStartOfWeek = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
			startDate.setDate(today.getDate() - daysToStartOfWeek - ((amount - 1) * 7));
			break;
		}
		case "months":
			startDate.setMonth(today.getMonth() - (amount - 1));
			startDate.setDate(1); // Start of the month
			break;
		case "quarters": {
			const currentQuarter = Math.floor(today.getMonth() / 3);
			const quarterStartMonth = currentQuarter * 3 - ((amount - 1) * 3);
			startDate.setMonth(quarterStartMonth);
			startDate.setDate(1); // Start of the quarter
			break;
		}
		case "years":
			startDate.setFullYear(today.getFullYear() - (amount - 1));
			startDate.setMonth(0); // January
			startDate.setDate(1); // Start of the year
			break;
		}
		// For "last", end date is today
	} else {
		// For "next", start date is today
		switch (unit) {
		case "days":
			endDate.setDate(today.getDate() + (amount - 1));
			break;
		case "weeks": {
			const currentDayOfWeek = today.getDay();
			const daysToEndOfWeek = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
			endDate.setDate(today.getDate() + daysToEndOfWeek + ((amount - 1) * 7));
			break;
		}
		case "months":
			endDate.setMonth(today.getMonth() + amount);
			endDate.setDate(0); // Last day of the previous month (the target month)
			break;
		case "quarters": {
			const currentQuarter = Math.floor(today.getMonth() / 3);
			const quarterEndMonth = (currentQuarter + 1) * 3 - 1 + ((amount - 1) * 3);
			endDate.setMonth(quarterEndMonth + 1);
			endDate.setDate(0); // Last day of the quarter
			break;
		}
		case "years":
			endDate.setFullYear(today.getFullYear() + amount);
			endDate.setMonth(0); // January of the next year
			endDate.setDate(0); // Last day of December of the target year
			break;
		}
	}

	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

/**
 * Converts DynamicDateRangeValue to dates for Last/Next options.
 * Safe function that returns today's date range if timeUnit or direction are missing.
 */
const toDatesLastNext = (value: DynamicDateRangeValue, option: IDynamicDateRangeOption): Array<Date> => {
	// Safe fallback - return today's date range if required properties are missing
	if (!option.timeUnit || !option.direction) {
		return todayToDates();
	}
	return lastNextToDates(value, option.timeUnit as string, option.direction as `${DynamicDateRangeDirection}`);
};

export {
	dateOptionToDates,
	dateRangeOptionToDates,
	todayToDates,
	tomorrowToDates,
	yesterdayToDates,
	lastNextToDates,
	toDatesLastNext,
};
