import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import DynamicDateRangeOption from "../DynamicDateOption.js";
import DynamicDateRangeOptionDateRangeTemplate from "./DynamicDateRangeOptionDateRangeTemplate.js";
import DynamicDateRangeValue from "../DynamicDateRangeValue.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
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

class DynamicDateRangeOptionDateRange extends DynamicDateRangeOption {
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
}
DynamicDateRangeOptionDateRange.define();

export default DynamicDateRangeOptionDateRange;
