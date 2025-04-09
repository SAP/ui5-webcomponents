import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import DynamicDateRangeOptionDateRangeTemplate from "./DynamicDateRangeOptionDateRangeTemplate.js";
import DynamicDateRangeValue from "../DynamicDateRangeValue.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-dynamic-date-range-option-date-range",
})

class DynamicDateRangeOptionDateRange extends UI5Element implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		super();
		this.template = DynamicDateRangeOptionDateRangeTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const returnValue = new DynamicDateRangeValue();

		returnValue.operator = this.key;
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

	toDates() {
		return [];
	}

	get text(): string {
		return "DATERANGE";
	}

	get key() {
		return "DATERANGE";
	}

	get icon() {
		return "";
	}

	getFormat(): DateFormat {
	    return DateFormat.getDateInstance({
			strictParsing: true,
			interval: true,
			intervalDelimiter: " - ",
		});
	}

	handleSelectionChange(e: CustomEvent) : DynamicDateRangeValue | undefined {
		const currentValue = new DynamicDateRangeValue();
		currentValue.values = [];
		currentValue.operator = this.key;

		if (e.detail.selectedDates[0]) {
			currentValue.values[0] = new Date(e.detail.selectedDates[0] * 1000);
		}

		if (e.detail.selectedDates[1]) {
			currentValue.values[1] = new Date(e.detail.selectedDates[1] * 1000);
		}

		return currentValue;
	}
}
DynamicDateRangeOptionDateRange.define();

export default DynamicDateRangeOptionDateRange;
