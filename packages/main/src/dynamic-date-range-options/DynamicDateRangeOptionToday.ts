import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import type { DynamicDateRangeValue } from "../DynamicDateRange.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { todayToDates } from "./toDates.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	DYNAMIC_DATE_RANGE_TODAY_TEXT,
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
	tag: "ui5-dynamic-date-range-option-today",
})

class DynamicDateRangeOptionToday extends UI5Element implements IDynamicDateRangeOption {
    @i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

    parse(): DynamicDateRangeValue {
	    const returnValue = { operator: "", values: [] };
	    returnValue.operator = this.key;
	    returnValue.values = [];

	    return returnValue;
    }

    format() {
	    return "Today";
    }

    toDates() {
	    return todayToDates();
    }

    get text() {
	    return DynamicDateRangeOptionToday.i18nBundle.getText(DYNAMIC_DATE_RANGE_TODAY_TEXT);
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
