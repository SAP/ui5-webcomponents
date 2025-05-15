import type { IDynamicDateRangeOption } from "../DynamicDateOption.js";
import type { DynamicDateRangeValue } from "../DynamicDateRange.js";
import { yesterdayToDates } from "./toDates.js";
import {
	DYNAMIC_DATE_RANGE_YESTERDAY_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import DynamicDateRange from "../DynamicDateRange.js";

/**
 * @class
 * @constructor
 * @public
 * @since 2.0.0
 */

class Yesterday implements IDynamicDateRangeOption {
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
	    return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_YESTERDAY_TEXT);
	}

	get key() {
	    return "YESTERDAY";
	}

	get icon() {
	    return "";
	}
}

DynamicDateRange.register("YESTERDAY", Yesterday);

export default Yesterday;
