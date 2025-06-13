import LastNextTemplate from "./LastNextTemplate.js";
import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
import DynamicDateRange from "../DynamicDateRange.js";
import {
	DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT,
} from "../generated/i18n/i18n-defaults.js";
import DynamicDateRangeTimeUnit from "../types/DynamicDateRangeTimeUnit.js";
import DynamicDateRangeDirection from "../types/DynamicDateRangeDirection.js";
import {
	parseLastNext,
	formatLastNext,
	toDatesLastNext,
	isValidStringLastNext,
	handleSelectionChangeLastNext,
} from "./LastNextUtils.js";

/**
 * Next X Quarters option for Dynamic Date Range
 * @public
 * @since 2.12.0
 */
class NextQuarters implements IDynamicDateRangeOption {
	template: JsxTemplate;
	timeUnit = DynamicDateRangeTimeUnit.Quarters;
	direction = DynamicDateRangeDirection.Next;

	constructor() {
		this.template = LastNextTemplate;
	}

	parse(value: string): DynamicDateRangeValue {
		return parseLastNext(value, this);
	}

	format(value: DynamicDateRangeValue): string {
		return formatLastNext(value, this);
	}

	toDates(value: DynamicDateRangeValue): Array<Date> {
		return toDatesLastNext(value, this);
	}

	isValidString(value: string): boolean {
		return isValidStringLastNext(value, this);
	}

	get text(): string {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_NEXT_QUARTERS_TEXT);
	}

	get operator(): string {
		return "NEXTQUARTERS";
	}

	get icon(): string {
		return "";
	}

	handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined {
		return handleSelectionChangeLastNext(e, this);
	}
}

DynamicDateRange.register("NEXTQUARTERS", NextQuarters);

export default NextQuarters;
