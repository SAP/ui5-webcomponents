import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import type { DynamicDateRangeValue } from "./DynamicDateRange.js";

/**
 * @interface
 * @public
 * @since 2.0.0
 */

export interface IDynamicDateRangeOption {
	icon: string;
    key: string;
    text: string;
    format: (value: DynamicDateRangeValue) => string;
    parse: (value: string) => DynamicDateRangeValue | undefined;
    toDates: (value: DynamicDateRangeValue) => Date[];
    handleSelectionChange?: (event: CustomEvent) => DynamicDateRangeValue | undefined;
    template?: JsxTemplate;
    isValidString: (value: string) => boolean;
}
