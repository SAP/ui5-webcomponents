import type { DynamicDateRangeValue } from "../DynamicDateRange.js";
declare const dateOptionToDates: (value: DynamicDateRangeValue) => Date[];
declare const dateRangeOptionToDates: (value: DynamicDateRangeValue) => Date[];
declare const todayToDates: () => Date[];
declare const tomorrowToDates: () => Date[];
declare const yesterdayToDates: () => Date[];
export { dateOptionToDates, dateRangeOptionToDates, todayToDates, tomorrowToDates, yesterdayToDates, };
