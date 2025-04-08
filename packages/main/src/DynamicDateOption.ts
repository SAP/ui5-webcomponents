import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import jsxRendererer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type DynamicDateRangeValue from "./DynamicDateRangeValue.js";

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
	// renderer: jsxRendererer,
})

class DynamicDateRangeOption extends UI5Element {
    @property({ noAttribute: true })
    template?: JsxTemplate;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parse(value: string): DynamicDateRangeValue | undefined {
    	return undefined;
    }

    format(value?: DynamicDateRangeValue): string {
    	return String(value);
    }

    toDates() {
    	return [];
    }

    get text(): string {
    	return "";
    }

    get key() {
    	return "";
    }

    get icon() {
    	return "";
    }
}
DynamicDateRangeOption.define();

export default DynamicDateRangeOption;
