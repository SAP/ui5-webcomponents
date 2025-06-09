import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";

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

const lastNextToDates = (value: DynamicDateRangeValue, unit: string, direction: "last" | "next"): Array<Date> => {
	const today = new Date();
	const startDate = new Date(today);
	const endDate = new Date(today);
	const amount = value.values?.[0] as number || 1;

	if (direction === "last") {
		switch (unit) {
		case "days":
			startDate.setDate(today.getDate() - amount);
			break;
		case "weeks":
			startDate.setDate(today.getDate() - (amount * 7));
			break;
		case "months":
			startDate.setMonth(today.getMonth() - amount);
			break;
		case "quarters":
			startDate.setMonth(today.getMonth() - (amount * 3));
			break;
		case "years":
			startDate.setFullYear(today.getFullYear() - amount);
			break;
		}
		// For "last", end date is today
	} else {
		// For "next", start date is today
		switch (unit) {
		case "days":
			endDate.setDate(today.getDate() + amount);
			break;
		case "weeks":
			endDate.setDate(today.getDate() + (amount * 7));
			break;
		case "months":
			endDate.setMonth(today.getMonth() + amount);
			break;
		case "quarters":
			endDate.setMonth(today.getMonth() + (amount * 3));
			break;
		case "years":
			endDate.setFullYear(today.getFullYear() + amount);
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
	return lastNextToDates(value, option.timeUnit as string, option.direction as "last" | "next");
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
