import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import DynamicDateRangeOption from "../DynamicDateOption.js";
import DynamicDateRangeOptionDateTemplate from "./DynamicDateRangeOptionDateTemplate.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import DynamicDateRangeValue from "../DynamicDateRangeValue.js";
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
	// renderer: jsxRendererer,
})

class DynamicDateRangeOptionDate extends DynamicDateRangeOption {
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

	getFormat(): DateFormat {
		return DateFormat.getDateInstance({
			strictParsing: true,
		});
	}
}

DynamicDateRangeOptionDate.define();

export default DynamicDateRangeOptionDate;
