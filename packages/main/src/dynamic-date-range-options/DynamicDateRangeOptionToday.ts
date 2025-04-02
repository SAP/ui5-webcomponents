import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import DynamicDateRangeOption from "../DynamicDateOption.js";
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
	tag: "ui5-dynamic-date-range-option-today",
	// renderer: jsxRendererer,
})

class DynamicDateRangeOptionToday extends DynamicDateRangeOption {
    @property()
    template?: JsxTemplate;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parse(value: string): DynamicDateRangeValue {
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
