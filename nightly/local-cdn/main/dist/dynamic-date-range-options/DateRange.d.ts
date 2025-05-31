import type { DynamicDateRangeValue, IDynamicDateRangeOption } from "../DynamicDateRange.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { JsxTemplate } from "@ui5/webcomponents-base/dist/index.js";
/**
 * @class
 * @constructor
 * @public
 * @since 2.0.0
 */
declare class DateRangeRange implements IDynamicDateRangeOption {
    template: JsxTemplate;
    constructor();
    parse(value: string): DynamicDateRangeValue;
    format(value: DynamicDateRangeValue): string;
    toDates(value: DynamicDateRangeValue): Date[];
    get text(): string;
    get operator(): string;
    get icon(): string;
    isValidString(value: string): boolean;
    getFormat(): DateFormat;
    handleSelectionChange(e: CustomEvent): DynamicDateRangeValue | undefined;
}
export default DateRangeRange;
