import LastNextTemplate from "./LastNextTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	formatLastNext, handleSelectionChangeLastNext, isValidStringLastNext, parseLastNext,
} from "./LastNextUtils.js";
import { toDatesLastNext } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";
import {
	DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_WEEKS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_MONTHS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_YEARS_TEXT,
	DYNAMIC_DATE_RANGE_DAYS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_WEEKS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_MONTHS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_QUARTERS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_YEARS_UNIT_TEXT,
	DYNAMIC_DATE_RANGE_NEXT_COMBINED_TEXT,
	DYNAMIC_DATE_RANGE_INCLUDED_TEXT,
} from "../generated/i18n/i18n-defaults.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.14.0
 */
class NextOptions implements IDynamicDateRangeOption {
	template: JsxTemplate = LastNextTemplate;
	operator: string;
	i18nKey: I18nText;
	options: Array<string> = [];

	constructor(operators?: Array<string>) {
		this.options = operators || ["NEXTDAYS", "NEXTWEEKS", "NEXTMONTHS", "NEXTQUARTERS", "NEXTYEARS"];
		this.operator = this.options[0];
		this.i18nKey = this._getI18nKeyForOperator(this.operator);
	}

	_getI18nKeyForOperator(operator: string): I18nText {
		switch (operator) {
		case "NEXTDAYS":
			return DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT;
		case "NEXTWEEKS":
			return DYNAMIC_DATE_RANGE_NEXT_WEEKS_TEXT;
		case "NEXTMONTHS":
			return DYNAMIC_DATE_RANGE_NEXT_MONTHS_TEXT;
		case "NEXTQUARTERS":
			return DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT;
		case "NEXTYEARS":
			return DYNAMIC_DATE_RANGE_NEXT_YEARS_TEXT;
		default:
			return DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT;
		}
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
		if (this.options.length > 1) {
			const units = this.availableOptions
				.filter(info => this.options.includes(info.operator))
				.map(info => info.unitText);
			const unitsText = units.join(` / `);
			return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_NEXT_COMBINED_TEXT, unitsText);
		}

		const baseText = DynamicDateRange.i18nBundle.getText(this.i18nKey);
		const includedText = DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_INCLUDED_TEXT);
		return `${baseText} ${includedText}`;
	}

	get icon(): string {
		return "";
	}

	// Simple getter that provides all available Next options based on current component options
	get availableOptions() {
		const allOptions = [
			{ operator: "NEXTDAYS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_DAYS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_DAYS_UNIT_TEXT },
			{ operator: "NEXTWEEKS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_WEEKS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_WEEKS_UNIT_TEXT },
			{ operator: "NEXTMONTHS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_MONTHS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_MONTHS_UNIT_TEXT },
			{ operator: "NEXTQUARTERS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_QUARTERS_UNIT_TEXT },
			{ operator: "NEXTYEARS", i18nKey: DYNAMIC_DATE_RANGE_NEXT_YEARS_TEXT, unitI18nKey: DYNAMIC_DATE_RANGE_YEARS_UNIT_TEXT },
		];

		// Always include all Next options - this ensures validation works for grouped options
		// and individual validation during fallback. The component handles the actual filtering.
		return allOptions.map(info => ({
			operator: info.operator,
			unitText: DynamicDateRange.i18nBundle.getText(info.unitI18nKey),
			text: DynamicDateRange.i18nBundle.getText(info.i18nKey),
		}));
	}

	_getNumberFromValue(value: DynamicDateRangeValue): number {
		if (value.values && typeof value.values[0] === "number") {
			return value.values[0];
		}

		if (value.values?.length === 2 && value.values[0] instanceof Date && value.values[1] instanceof Date) {
			const startDate = value.values[0];
			const endDate = value.values[1];

			if (value.operator.includes("DAYS")) {
				const normalizedStart = new Date(startDate);
				const normalizedEnd = new Date(endDate);
				normalizedStart.setUTCHours(0, 0, 0, 0);
				normalizedEnd.setUTCHours(0, 0, 0, 0);

				const diffInDays = Math.round((normalizedEnd.getTime() - normalizedStart.getTime()) / (1000 * 60 * 60 * 24));
				return diffInDays + 1;
			}

			if (value.operator.includes("WEEKS")) {
				const diffInDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
				return Math.round((diffInDays + 1) / 7);
			}

			if (value.operator.includes("MONTHS")) {
				const startYear = startDate.getUTCFullYear();
				const startMonth = startDate.getUTCMonth();
				const endYear = endDate.getUTCFullYear();
				const endMonth = endDate.getUTCMonth();

				const monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
				return Math.abs(monthDiff) + 1;
			}

			if (value.operator.includes("QUARTERS")) {
				const startQuarter = Math.floor(startDate.getUTCMonth() / 3);
				const endQuarter = Math.floor(endDate.getUTCMonth() / 3);
				const startYear = startDate.getUTCFullYear();
				const endYear = endDate.getUTCFullYear();

				const quarterDiff = (endYear - startYear) * 4 + (endQuarter - startQuarter);
				return Math.abs(quarterDiff) + 1;
			}

			if (value.operator.includes("YEARS")) {
				const yearDiff = Math.abs(endDate.getUTCFullYear() - startDate.getUTCFullYear());
				return yearDiff + 1;
			}
		}

		return 1;
	}
}

DynamicDateRange.register("NEXTDAYS", NextOptions);
DynamicDateRange.register("NEXTWEEKS", NextOptions);
DynamicDateRange.register("NEXTMONTHS", NextOptions);
DynamicDateRange.register("NEXTQUARTERS", NextOptions);
DynamicDateRange.register("NEXTYEARS", NextOptions);

export default NextOptions;
