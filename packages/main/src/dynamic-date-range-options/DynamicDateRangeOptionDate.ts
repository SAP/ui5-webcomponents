import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import DynamicDateRangeOption from "../DynamicDateOption.js";
import DynamicDateRangeOptionDateTemplate from "./DynamicDateRangeOptionDateTemplate.js";
/**
 * @class
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-dynamic-date-range-option-date",
	// renderer: jsxRendererer,
})

class DynamicDateRangeOptionDate extends DynamicDateRangeOption {
    constructor() {
        super();
        this.template = DynamicDateRangeOptionDateTemplate;
    }

    parse(value: string) {
        return { operator: "Date", values: [] };
    }

    format(values: Date[]) {
        return values[0].toString();
    }

    toDates() {
        return [];
    }

    get text(): string {
        return "Date";
    }

    get key() {
        return "Date";
    }

    get icon() {
        return "";
    }
}
DynamicDateRangeOptionDate.define();

export default DynamicDateRangeOptionDate;
