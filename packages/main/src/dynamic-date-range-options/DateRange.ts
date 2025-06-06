import DateRangeRangeTemplate from "./DateRangeTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import {
	DYNAMIC_DATE_RANGE_DATERANGE_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import { dateRangeOptionToDates } from "./toDates.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.11.0
 */

class DateRangeRange implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		this.template = DateRangeRangeTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const returnValue = { operator: "", values: [] } as DynamicDateRangeValue;

		returnValue.operator = this.operator;
		returnValue.values = this.getFormat().parse(value) as Date[];

		return returnValue;
	}

	format(value: DynamicDateRangeValue) {
		const valuesArray = value?.values as Date[];

		if (!valuesArray || valuesArray.length !== 2) {
			return "";
		}

		const formattedValue = this.getFormat().format(valuesArray);

		return formattedValue;
	}

	toDates(value: DynamicDateRangeValue): Date[] {
		return dateRangeOptionToDates(value);
	}

	get text(): string {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_DATERANGE_TEXT);
	}

	get operator() {
		return "DATERANGE";
	}

	get icon() {
		return "appointment-2";
	}

	isValidString(value: string): boolean {
		const dates = this.getFormat().parse(value) as Date[];

		if (!dates[0] || !dates[1] || Number.isNaN(dates[0].getTime()) || Number.isNaN(dates[1].getTime())) {
			return false;
		}

		return true;
	}

	getFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
			interval: true,
			intervalDelimiter: " - ",
		});
	}

	handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined {
		const currentValue = { operator: "", values: [] } as DynamicDateRangeValue;
		currentValue.values = [];
		currentValue.operator = this.operator;

		if (e.detail.selectedDates[0]) {
			currentValue.values[0] = new Date(e.detail.selectedDates[0] * 1000);
		}

		if (e.detail.selectedDates[1]) {
			currentValue.values[1] = new Date(e.detail.selectedDates[1] * 1000);
		}

		return currentValue;
	}
}

DynamicDateRange.register("DATERANGE", DateRangeRange);

export default DateRangeRange;
