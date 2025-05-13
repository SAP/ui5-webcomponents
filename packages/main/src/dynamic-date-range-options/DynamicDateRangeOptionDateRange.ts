import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import DynamicDateRangeOptionDateRangeTemplate from "./DynamicDateRangeOptionDateRangeTemplate.js";
import type { DynamicDateRangeValue } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	DYNAMIC_DATE_RANGE_DATERANGE_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import { dateRangeOptionToDates } from "./toDates.js";

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
    @i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	template: JsxTemplate;

	constructor() {
		super();
		this.template = DynamicDateRangeOptionDateRangeTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
	    const returnValue = { operator: "", values: [] } as DynamicDateRangeValue;

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

	toDates(value: DynamicDateRangeValue) {
		return dateRangeOptionToDates(value);
	}

	get text(): string {
		return DynamicDateRangeOptionDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_DATERANGE_TEXT);
	}

	get key() {
		return "DATERANGE";
	}

	get icon() {
		return "appointment-2";
	}

	getFormat(): DateFormat {
	    return DateFormat.getDateInstance({
			strictParsing: true,
			interval: true,
			intervalDelimiter: " - ",
		});
	}

	handleSelectionChange(e: CustomEvent) : DynamicDateRangeValue | undefined {
		const currentValue = { operator: "", values: [] } as DynamicDateRangeValue;
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
