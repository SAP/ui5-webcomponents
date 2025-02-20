import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import jsxRendererer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import DynamicDateRangeOption from "../DynamicDateOption.js";
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

class DynamicDateRangeOptionTomorrow extends DynamicDateRangeOption {
    @property()
    template?: JsxTemplate;

    parse(value: string) {
        return new Date();
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
