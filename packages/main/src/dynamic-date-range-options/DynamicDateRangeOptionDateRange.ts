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
		const values = this._splitValueByDelimiter(value);
		const startDate = this.getFormat().parse(values[0]) as Date;
		const endDate = this.getFormat().parse(values[1]) as Date;
		const returnValue = new DynamicDateRangeValue();

		returnValue.operator = this.key;
		returnValue.values = [startDate, endDate];

		return returnValue;
	}

	format(value: DynamicDateRangeValue) {
		const valuesArray = value?.values as Date[];
		const startDate = valuesArray[0];
		const endDate = valuesArray[1];
		const formattedValue = `${this.getFormat().format(startDate)} - ${this.getFormat().format(endDate)}`;

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
		});
	}

	_splitValueByDelimiter(value: string) {
		const delimeter = "-";
		const valuesArray: Array<string> = [];
		const partsArray = value.split(delimeter);

		// if format successfully parse the value, the value contains only single date
		if (this.getFormat().parse(value)) {
			valuesArray[0] = partsArray.join(delimeter);
			valuesArray[1] = "";
		} else {
			valuesArray[0] = partsArray.slice(0, partsArray.length / 2).join(delimeter);
			valuesArray[1] = partsArray.slice(partsArray.length / 2).join(delimeter);
		}

		return valuesArray;
	}
}
DynamicDateRangeOptionDateRange.define();

export default DynamicDateRangeOptionDateRange;
