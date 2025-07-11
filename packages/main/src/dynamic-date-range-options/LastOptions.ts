import LastNextTemplate from "./LastNextTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	formatLastNext, handleSelectionChangeLastNext, isValidStringLastNext, toDatesLastNext, parseLastNext,
} from "./LastNextUtils.js";
import DynamicDateRange from "../DynamicDateRange.js";
import {
	DYNAMIC_DATE_RANGE_LAST_DAYS_TEXT,
	DYNAMIC_DATE_RANGE_LAST_WEEKS_TEXT,
	DYNAMIC_DATE_RANGE_LAST_MONTHS_TEXT,
	DYNAMIC_DATE_RANGE_LAST_QUARTERS_TEXT,
	DYNAMIC_DATE_RANGE_LAST_YEARS_TEXT,
} from "../generated/i18n/i18n-defaults.js";

class LastOptions implements IDynamicDateRangeOption {
	template: JsxTemplate = LastNextTemplate;
	operator: string;
	i18nKey: I18nText;

	constructor(operator: string, i18nKey: I18nText) {
		this.operator = operator;
		this.i18nKey = i18nKey;
	}

	parse(value: string): DynamicDateRangeValue | undefined {
		const matchingOption = this.availableOptions.find(optionInfo => {
			const tempOption = { operator: optionInfo.operator, text: optionInfo.text };
			return isValidStringLastNext(value, tempOption as IDynamicDateRangeOption);
		});

		if (matchingOption) {
			const tempOption = { operator: matchingOption.operator, text: matchingOption.text };
			return parseLastNext(value, tempOption as IDynamicDateRangeOption);
		}

		return undefined;
	}

	format(value: DynamicDateRangeValue): string {
		const optionInfo = this.availableOptions.find(info => info.operator === value.operator);
		if (optionInfo) {
			const numberValue = this._getNumberFromValue(value);
			const tempValue = { operator: value.operator, values: [numberValue] };
			return formatLastNext(tempValue, { text: optionInfo.text } as IDynamicDateRangeOption);
		}
		return "";
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		return toDatesLastNext(value, { operator: value.operator } as IDynamicDateRangeOption);
	}

	isValidString(value: string): boolean {
		return this.availableOptions.some(optionInfo => {
			const tempOption = { operator: optionInfo.operator, text: optionInfo.text };
			return isValidStringLastNext(value, tempOption as IDynamicDateRangeOption);
		});
	}

	handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined {
		return handleSelectionChangeLastNext(e, this);
	}

	get text(): string {
		const currentOptions = DynamicDateRange.getCurrentOptions();
		if (currentOptions) {
			const lastOptions = currentOptions.split(",")
				.map(s => s.trim())
				.filter(s => s.startsWith("LAST"));

			if (lastOptions.length > 1) {
				const units = this.availableOptions
					.filter(info => lastOptions.includes(info.operator))
					.map(info => info.unitText);
				return `Last X ${units.join(" / ")} (included)`;
			}
		}

		return `${DynamicDateRange.i18nBundle.getText(this.i18nKey)} (included)`;
	}

	get icon(): string {
		return "";
	}

	// Simple getter that provides all available Last options based on current component options
	get availableOptions() {
		const allOptions = [
			{ operator: "LASTDAYS", i18nKey: DYNAMIC_DATE_RANGE_LAST_DAYS_TEXT, unitText: "Days" },
			{ operator: "LASTWEEKS", i18nKey: DYNAMIC_DATE_RANGE_LAST_WEEKS_TEXT, unitText: "Weeks" },
			{ operator: "LASTMONTHS", i18nKey: DYNAMIC_DATE_RANGE_LAST_MONTHS_TEXT, unitText: "Months" },
			{ operator: "LASTQUARTERS", i18nKey: DYNAMIC_DATE_RANGE_LAST_QUARTERS_TEXT, unitText: "Quarters" },
			{ operator: "LASTYEARS", i18nKey: DYNAMIC_DATE_RANGE_LAST_YEARS_TEXT, unitText: "Years" },
		];

		// Always include all Last options - this ensures validation works for grouped options
		// and individual validation during fallback. The component handles the actual filtering.
		return allOptions.map(info => ({
			operator: info.operator,
			unitText: info.unitText,
			text: DynamicDateRange.i18nBundle.getText(info.i18nKey),
		}));
	}

	private _getNumberFromValue(value: DynamicDateRangeValue): number {
		if (value.values && typeof value.values[0] === "number") {
			return value.values[0];
		}

		if (value.values?.length === 2 && value.values[0] instanceof Date && value.values[1] instanceof Date) {
			const startDate = value.values[0];
			const endDate = value.values[1];

			if (value.operator.includes("DAYS")) {
				const normalizedStart = new Date(startDate);
				const normalizedEnd = new Date(endDate);
				normalizedStart.setHours(0, 0, 0, 0);
				normalizedEnd.setHours(0, 0, 0, 0);

				const diffInDays = Math.round((normalizedEnd.getTime() - normalizedStart.getTime()) / (1000 * 60 * 60 * 24));
				return diffInDays + 1;
			}

			if (value.operator.includes("WEEKS")) {
				const diffInDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
				return Math.round((diffInDays + 1) / 7);
			}

			if (value.operator.includes("MONTHS")) {
				const startYear = startDate.getFullYear();
				const startMonth = startDate.getMonth();
				const endYear = endDate.getFullYear();
				const endMonth = endDate.getMonth();

				const monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
				return Math.abs(monthDiff) + 1;
			}

			if (value.operator.includes("QUARTERS")) {
				const startQuarter = Math.floor(startDate.getMonth() / 3);
				const endQuarter = Math.floor(endDate.getMonth() / 3);
				const startYear = startDate.getFullYear();
				const endYear = endDate.getFullYear();

				const quarterDiff = (endYear - startYear) * 4 + (endQuarter - startQuarter);
				return Math.abs(quarterDiff) + 1;
			}

			if (value.operator.includes("YEARS")) {
				const yearDiff = Math.abs(endDate.getFullYear() - startDate.getFullYear());
				return yearDiff + 1;
			}
		}

		return 1;
	}

	static get Days() { return LastOptions.bind(null, "LASTDAYS", DYNAMIC_DATE_RANGE_LAST_DAYS_TEXT); }
	static get Weeks() { return LastOptions.bind(null, "LASTWEEKS", DYNAMIC_DATE_RANGE_LAST_WEEKS_TEXT); }
	static get Months() { return LastOptions.bind(null, "LASTMONTHS", DYNAMIC_DATE_RANGE_LAST_MONTHS_TEXT); }
	static get Quarters() { return LastOptions.bind(null, "LASTQUARTERS", DYNAMIC_DATE_RANGE_LAST_QUARTERS_TEXT); }
	static get Years() { return LastOptions.bind(null, "LASTYEARS", DYNAMIC_DATE_RANGE_LAST_YEARS_TEXT); }
}

DynamicDateRange.register("LASTDAYS", LastOptions.Days);
DynamicDateRange.register("LASTWEEKS", LastOptions.Weeks);
DynamicDateRange.register("LASTMONTHS", LastOptions.Months);
DynamicDateRange.register("LASTQUARTERS", LastOptions.Quarters);
DynamicDateRange.register("LASTYEARS", LastOptions.Years);

export default LastOptions;
