import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
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
	tag: "ui5-dynamic-date-range-option-yesterday",
	// renderer: jsxRendererer,
})

class DynamicDateRangeOptionYesterday extends UI5Element implements IDynamicDateRangeOption {
	parse(): DynamicDateRangeValue {
	    const returnValue = new DynamicDateRangeValue();
	    returnValue.operator = this.key;

	    return returnValue;
	}

	format() {
	    return "Yesterday";
	}

	toDates() {
	    return [];
	}

	get text(): string {
	    return "Yesterday";
	}

	get key() {
	    return "Yesterday";
	}

	get icon() {
	    return "";
	}
}
DynamicDateRangeOptionYesterday.define();

export default DynamicDateRangeOptionYesterday;
