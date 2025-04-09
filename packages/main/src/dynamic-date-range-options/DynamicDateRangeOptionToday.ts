import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import DynamicDateRangeValue from "../DynamicDateRangeValue.js";
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
	tag: "ui5-dynamic-date-range-option-today",
	// renderer: jsxRendererer,
})

class DynamicDateRangeOptionToday extends UI5Element implements IDynamicDateRangeOption {
	parse(): DynamicDateRangeValue {
	    const returnValue = new DynamicDateRangeValue();
	    returnValue.operator = this.key;

	    return returnValue;
	}

	format() {
	    return "Today";
	}

	toDates() {
	    return [];
	}

	get text(): string {
	    return "Today";
	}

	get key() {
	    return "Today";
	}

	get icon() {
	    return "";
	}
}
DynamicDateRangeOptionToday.define();

export default DynamicDateRangeOptionToday;
