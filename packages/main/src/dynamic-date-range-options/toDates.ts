import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";

const dateOptionToDates = (value: DynamicDateRangeValue): Array<Date> => {
	const startDate = value.values ? value.values[0] as Date : UI5Date.getInstance();
	const endDate = UI5Date.getInstance(startDate.getTime());

	startDate?.setUTCHours(0, 0, 0, 0);
	endDate?.setUTCHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const dateRangeOptionToDates = (value: DynamicDateRangeValue): Array<Date> => {
	const startDate = value.values ? value.values[0] as Date : UI5Date.getInstance();
	const endDate = value.values ? value.values[1] as Date : UI5Date.getInstance();

	startDate?.setUTCHours(0, 0, 0, 0);
	endDate?.setUTCHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const todayToDates = (): Array<Date> => {
	const startDate = UI5Date.getInstance();
	const endDate = UI5Date.getInstance();

	startDate.setUTCHours(0, 0, 0, 0);
	endDate.setUTCHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const yesterdayToDates = (): Array<Date> => {
	const startDate = UI5Date.getInstance();
	const endDate = UI5Date.getInstance();

	startDate.setUTCHours(0, 0, 0, 0);
	startDate.setUTCDate(startDate.getUTCDate() - 1);

	endDate.setUTCHours(23, 59, 59, 999);
	endDate.setUTCDate(endDate.getUTCDate() - 1);

	return [startDate, endDate];
};

const tomorrowToDates = (): Array<Date> => {
	const startDate = UI5Date.getInstance();
	const endDate = UI5Date.getInstance();

	startDate.setUTCHours(0, 0, 0, 0);
	startDate.setUTCDate(startDate.getUTCDate() + 1);

	endDate.setUTCHours(23, 59, 59, 999);
	endDate.setUTCDate(endDate.getUTCDate() + 1);

	return [startDate, endDate];
};

const lastToDates = (value: DynamicDateRangeValue, unit: string): Array<Date> => {
	const today = UI5Date.getInstance();
	const startDate = UI5Date.getInstance(today.getTime());
	const endDate = UI5Date.getInstance(today.getTime());
	const amount = value.values?.[0] as number || 1;

	switch (unit) {
	case "days":
		// For "Last X Days": start X days before today (inclusive), end today
		// "Last 1 Day" = today only, "Last 2 Days" = yesterday + today, etc.
		startDate.setTime(today.getTime() - (amount - 1) * 24 * 60 * 60 * 1000);
		break;
	case "weeks": {
		const currentDayOfWeek = today.getUTCDay();
		const daysToStartOfWeek = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
		startDate.setUTCDate(today.getUTCDate() - daysToStartOfWeek - ((amount - 1) * 7));
		break;
	}
	case "months":
		startDate.setUTCMonth(today.getUTCMonth() - (amount - 1));
		startDate.setUTCDate(1); // Start of the month
		break;
	case "quarters": {
		const currentQuarter = Math.floor(today.getUTCMonth() / 3);
		const quarterStartMonth = currentQuarter * 3 - ((amount - 1) * 3);
		startDate.setUTCMonth(quarterStartMonth);
		startDate.setUTCDate(1); // Start of the quarter
		break;
	}
	case "years":
		startDate.setUTCFullYear(today.getUTCFullYear() - (amount - 1));
		startDate.setUTCMonth(0); // January
		startDate.setUTCDate(1); // Start of the year
		break;
	}

	return [startDate, endDate];
};

const nextToDates = (value: DynamicDateRangeValue, unit: string): Array<Date> => {
	const today = UI5Date.getInstance();
	const startDate = UI5Date.getInstance(today.getTime());
	const endDate = UI5Date.getInstance(today.getTime());
	const amount = value.values?.[0] as number || 1;

	switch (unit) {
	case "days":
		// For "Next X Days": start today, end X days from today (inclusive)
		// "Next 1 Day" = today only, "Next 2 Days" = today + tomorrow, etc.
		endDate.setTime(today.getTime() + (amount - 1) * 24 * 60 * 60 * 1000);
		break;
	case "weeks": {
		const currentDayOfWeek = today.getUTCDay();
		const daysToEndOfWeek = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
		endDate.setUTCDate(today.getUTCDate() + daysToEndOfWeek + ((amount - 1) * 7));
		break;
	}
	case "months":
		endDate.setUTCMonth(today.getUTCMonth() + amount);
		endDate.setUTCDate(0); // Last day of the previous month (the target month)
		break;
	case "quarters": {
		const currentQuarter = Math.floor(today.getUTCMonth() / 3);
		const quarterEndMonth = (currentQuarter + 1) * 3 - 1 + ((amount - 1) * 3);
		endDate.setUTCMonth(quarterEndMonth + 1);
		endDate.setUTCDate(0); // Last day of the quarter
		break;
	}
	case "years":
		endDate.setUTCFullYear(today.getUTCFullYear() + amount);
		endDate.setUTCMonth(0); // January of the next year
		endDate.setUTCDate(0); // Last day of December of the target year
		break;
	}

	return [startDate, endDate];
};

const lastNextToDates = (value: DynamicDateRangeValue, unit: string, direction: "last" | "next"): Array<Date> => {
	return direction === "last" ? lastToDates(value, unit) : nextToDates(value, unit);
};

/**
 * Converts DynamicDateRangeValue to dates for Last/Next options.
 * Uses operator name to determine time unit and direction.
 */
const toDatesLastNext = (value: DynamicDateRangeValue, option: IDynamicDateRangeOption): Array<Date> => {
	const operator = option.operator;

	// Extract direction from operator name
	let direction: "last" | "next";
	if (operator.startsWith("LAST")) {
		direction = "last";
	} else if (operator.startsWith("NEXT")) {
		direction = "next";
	} else {
		// Not a LastNext option, return today's date range
		return todayToDates();
	}

	// Extract time unit from operator name
	let unit: string;
	if (operator.includes("DAYS")) {
		unit = "days";
	} else if (operator.includes("WEEKS")) {
		unit = "weeks";
	} else if (operator.includes("MONTHS")) {
		unit = "months";
	} else if (operator.includes("QUARTERS")) {
		unit = "quarters";
	} else if (operator.includes("YEARS")) {
		unit = "years";
	} else {
		// Unknown time unit, return today's date range as fallback
		return todayToDates();
	}

	return lastNextToDates(value, unit, direction);
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
