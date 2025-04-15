import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type DynamicDateRangeValue from "./DynamicDateRangeValue.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @interface
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */

export interface IDynamicDateRangeOption extends UI5Element {
	icon: string;
    key: string;
    text: string;
    format: (value: DynamicDateRangeValue) => string;
    parse: (value: string) => DynamicDateRangeValue | undefined;
    toDates: () => Date[];
    handleSelectionChange?: (event: CustomEvent) => DynamicDateRangeValue | undefined;
    template?: JsxTemplate;
}
