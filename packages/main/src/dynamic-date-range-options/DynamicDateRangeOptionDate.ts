import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import DynamicDateRangeOptionDateTemplate from "./DynamicDateRangeOptionDateTemplate.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import DynamicDateRangeValue from "../DynamicDateRangeValue.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { property } from "@ui5/webcomponents-base/dist/decorators.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
/**
 * @class
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-dynamic-date-range-option-date",
})

class DynamicDateRangeOptionDate extends UI5Element implements IDynamicDateRangeOption {
	template: JsxTemplate;

	constructor() {
		super();
		this.template = DynamicDateRangeOptionDateTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		const date = this.getFormat().parse(value) as Date;
		const returnValue = new DynamicDateRangeValue();
		returnValue.operator = this.key;
		returnValue.values = [date];

		return returnValue;
	}

	format(value: DynamicDateRangeValue) {
		const valuesArray = value?.values as Date[];

		if (!valuesArray || valuesArray.length !== 1) {
			return "";
		}

		const date = valuesArray[0];

		return this.getFormat().format(date);
	}

	toDates() {
		return [];
	}

	get text(): string {
		return "DATE";
	}

	get key() {
		return "DATE";
	}

	get icon() {
		return "";
	}

	handleSelectionChange(e: CustomEvent) : DynamicDateRangeValue | undefined {
		const currentValue = new DynamicDateRangeValue();
		currentValue.values = [];
		currentValue.operator = this.key;

		if (e.detail.selectedDates[0]) {
			currentValue.values[0] = new Date(e.detail.selectedDates[0] * 1000);
		}

		return currentValue;
	}

	getFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
		});
	}
}

DynamicDateRangeOptionDate.define();

export default DynamicDateRangeOptionDate;
