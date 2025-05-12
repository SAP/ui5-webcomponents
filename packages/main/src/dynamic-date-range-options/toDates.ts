import type DynamicDateRangeValue from "../DynamicDateRangeValue.js";

const dateOptionToDates = (value: DynamicDateRangeValue): Date[] => {
	const startDate = value.values ? value.values[0] : new Date();
	const endDate = new Date(startDate);

	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const dateRangeOptionToDates = (value: DynamicDateRangeValue): Date[] => {
	const startDate = value.values ? value.values[0] : new Date();
	const endDate = value.values ? value.values[1] : new Date();

	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const todayToDates = (): Date[] => {
	const startDate = new Date();
	const endDate = new Date();

	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const tomorrowToDates = (): Date[] => {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(startDate.getDate() + 1);
	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

const yesterdayToDates = (): Date[] => {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(startDate.getDate() - 1);
	startDate?.setHours(0, 0, 0, 0);
	endDate?.setHours(23, 59, 59, 999);

	return [startDate, endDate];
};

export {
	dateOptionToDates,
	dateRangeOptionToDates,
	todayToDates,
	tomorrowToDates,
	yesterdayToDates,
};
