import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import type { DynamicDateRangeValue } from "../DynamicDateRange.js";
import { yesterdayToDates } from "./toDates.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	DYNAMIC_DATE_RANGE_YESTERDAY_TEXT,
} from "../generated/i18n/i18n-defaults.js";

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
})

class DynamicDateRangeOptionYesterday extends UI5Element implements IDynamicDateRangeOption {
    @i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

    parse(): DynamicDateRangeValue {
	    const returnValue = { operator: "" };
	    returnValue.operator = this.key;

	    return returnValue;
    }

    format(): string {
	    return "Yesterday";
    }

    toDates() : Date[] {
	    return yesterdayToDates();
    }

    isValidString(value: string): boolean {
	    return value === this.text;
    }

    get text(): string {
	    return DynamicDateRangeOptionYesterday.i18nBundle.getText(DYNAMIC_DATE_RANGE_YESTERDAY_TEXT);
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
