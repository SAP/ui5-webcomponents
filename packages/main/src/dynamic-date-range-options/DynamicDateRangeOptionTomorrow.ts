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
	tag: "ui5-dynamic-date-range-option-tomorrow",
	// renderer: jsxRendererer,
})

class DynamicDateRangeOptionTomorrow extends UI5Element implements IDynamicDateRangeOption {
	parse(): DynamicDateRangeValue {
	    const returnValue = new DynamicDateRangeValue();
	    returnValue.operator = this.key;

	    return returnValue;
	}

	format() {
	    return "Tomorrow";
	}

	toDates() {
	    return [];
	}

	get text(): string {
	    return "Tomorrow";
	}

	get key() {
	    return "Tomorrow";
	}

	get icon() {
	    return "";
	}
}
DynamicDateRangeOptionTomorrow.define();

export default DynamicDateRangeOptionTomorrow;
