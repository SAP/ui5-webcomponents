import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import { tomorrowToDates } from "./toDates.js";
import {
	DYNAMIC_DATE_RANGE_TOMORROW_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.0.0
 */
class Tomorrow implements IDynamicDateRangeOption {
	parse(): DynamicDateRangeValue {
	    const returnValue = { operator: "" };
	    returnValue.operator = this.operator;

	    return returnValue;
	}

	format(): string {
	    return "Tomorrow";
	}

	toDates() : Date[] {
	    return tomorrowToDates();
	}

	isValidString(value: string): boolean {
	    return value === this.text;
	}

	get text() {
	    return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_TOMORROW_TEXT);
	}

	get operator() {
	    return "TOMORROW";
	}

	get icon() {
	    return "";
	}
}

DynamicDateRange.register("TOMORROW", Tomorrow);

export default Tomorrow;
