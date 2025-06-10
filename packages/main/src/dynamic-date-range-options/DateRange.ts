import DateRangeTemplate from "./DateRangeTemplate.js";
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

class DateRange implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		this.template = DateRangeTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const returnValue = { operator: "", values: [] } as DynamicDateRangeValue;

		returnValue.operator = this.operator;
		const parsedDates = this.getFormat().parse(value) as Array<Date>;

		// Handle backwards date ranges by automatically flipping them, e.g June 10th - June 5th => June 5th - June 10th
		if (parsedDates && parsedDates.length === 2 && parsedDates[0] && parsedDates[1]) {
			if (parsedDates[0].getTime() > parsedDates[1].getTime()) {
				returnValue.values = [parsedDates[1], parsedDates[0]];
			} else {
				returnValue.values = parsedDates;
			}
		} else {
			returnValue.values = parsedDates;
		}

		return returnValue;
	}

	format(value: DynamicDateRangeValue) {
		const valuesArray = value?.values as Array<Date>;

		if (!valuesArray || valuesArray.length !== 2) {
			return "";
		}

		const formattedValue = this.getFormat().format(valuesArray);

		return formattedValue;
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
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
		const dates = this.getFormat().parse(value) as Array<Date>;

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

		// Handle backwards date ranges by automatically flipping them
		if (currentValue.values.length === 2 && currentValue.values[0] && currentValue.values[1]) {
			const startDate = currentValue.values[0] as Date;
			const endDate = currentValue.values[1] as Date;

			// If start date is after end date, flip them
			if (startDate.getTime() > endDate.getTime()) {
				currentValue.values = [endDate, startDate];
			}
		}

		return currentValue;
	}
}

DynamicDateRange.register("DATERANGE", DateRange);

export default DateRange;
