import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-dynamic-date-range-value` component defines a value to be used inside `ui5-dynamic-date-range`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
@customElement("ui5-dynamic-date-range-value")
class DynamicDateRangeValue extends UI5Element {
	/**
	 * The key of the option.
	 * @default ""
	 * @public
	 */
	@property()
	operator = "";

    /**
     * Values of the dynamic date range.
     * @default []
     * @public
     */
    @property()
    values?: Date[];
}

DynamicDateRangeValue.define();

export default DynamicDateRangeValue;
