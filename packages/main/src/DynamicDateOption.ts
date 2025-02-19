import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import jsxRendererer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
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
	tag: "ui5-dynamic-date-range-option",
	renderer: jsxRendererer,
})

class DynamicDateRangeOption extends UI5Element {
	@property()
    title = "";

    @property()
    key = "";

    @property()
    template?: JsxTemplate;

    parse() {
        return {};
    }

    format() {
        return "";
    }

    toDates() {
        return [];
    }
}
DynamicDateRangeOption.define();

export default DynamicDateRangeOption;
