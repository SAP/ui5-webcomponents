import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { JsxTemplate } from "@ui5/webcomponents-base";
import IconMode from "./types/IconMode.js";
import type Input from "./Input.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import type List from "./List.js";
type DynamicDateRangeValue = {
    /**
     * The key of the option.
     * @default ""
     * @public
     */
    operator: string;
    /**
     * Values of the dynamic date range.
     * @default []
     * @public
     */
    values?: Date[] | number[];
};
type DynamicDateRangeChangeEventDetail = {
    value: DynamicDateRangeValue | undefined;
};
/**
 * Represents a dynamic date range option used by the `ui5-dynamic-date-range` component.
 *
 * Represents a dynamic date range option used for handling dynamic date ranges.
 * This interface defines the structure and behavior required for implementing
 * dynamic date range options, including formatting, parsing, validation, and
 * conversion of date range values.
 *
 *  * Properties:
 * - `icon`: The icon associated with the dynamic date range option, typically used for UI representation.
 * - `operator`: A unique operator identifying the dynamic date range option.
 * - `text`: The display text for the dynamic date range option.
 * - `template` (optional): A JSX template for rendering the dynamic date range option.
 *
 * Methods:
 * - `format(value: DynamicDateRangeValue): string`: Formats the given dynamic date range value into a string representation.
 * - `parse(value: string): DynamicDateRangeValue | undefined`: Parses a string into a dynamic date range value.
 * - `toDates(value: DynamicDateRangeValue): Date[]`: Converts a dynamic date range value into an array of `Date` objects.
 * - `handleSelectionChange?(event: CustomEvent): DynamicDateRangeValue | undefined`: (Optional) Handles selection changes in the UI of the dynamic date range option.
 * - `isValidString(value: string): boolean`: Validates whether a given string is a valid representation of the dynamic date range value.
 *
 * @public
 * @since 2.10.0
 */
interface IDynamicDateRangeOption {
    icon: string;
    operator: string;
    text: string;
    format: (value: DynamicDateRangeValue) => string;
    parse: (value: string) => DynamicDateRangeValue | undefined;
    toDates: (value: DynamicDateRangeValue) => Date[];
    handleSelectionChange?: (event: CustomEvent) => DynamicDateRangeValue | undefined;
    template?: JsxTemplate;
    isValidString: (value: string) => boolean;
}
/**
 * Fired when the input operation has finished by pressing Enter or on focusout or a value is selected in the popover.
 * @public
 */
declare class DynamicDateRange extends UI5Element {
    eventDetails: {
        change: DynamicDateRangeChangeEventDetail;
    };
    static i18nBundle: I18nBundle;
    /**
     * Defines the value object.
     * @default undefined
     * @public
     */
    value?: DynamicDateRangeValue;
    /**
     * Defines the options listed as a string, separated by commas and using capital case.
     * Example: "TODAY, YESTERDAY, DATERANGE"
     * @public
     * @default ""
     */
    options: string;
    /**
     * Defines the open or closed state of the popover.
     * @private
     * @default false
     */
    open: boolean;
    _currentOption?: IDynamicDateRangeOption;
    currentValue?: DynamicDateRangeValue;
    optionsObjects: IDynamicDateRangeOption[];
    static optionsClasses: Map<string, new () => IDynamicDateRangeOption>;
    _input?: Input;
    _list?: List;
    onBeforeRendering(): void;
    get _optionsTitles(): Array<string>;
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _iconMode(): IconMode.Decorative | IconMode.Interactive;
    get tooltipNavigationIcon(): string;
    _togglePicker(): void;
    _selectOption(e: CustomEvent): void;
    getOption(operator: string): IDynamicDateRangeOption | undefined;
    onInputChange(e: Event): void;
    onButtonBackClick(): void;
    /**
     * Converts a `value` into concrete `startDate` and `endDate` JavaScript `Date` objects.
     *
     * @returns An array of two `Date` objects representing the start and end dates.
     */
    toDates(value: DynamicDateRangeValue): Date[];
    get _hasCurrentOptionTemplate(): boolean;
    _submitValue(): void;
    _close(): void;
    onPopoverOpen(): void;
    onPopoverClose(): void;
    get currentValueText(): string;
    handleSelectionChange(e: CustomEvent): void;
    onInputKeyDown(e: KeyboardEvent): void;
    _toggleAndFocusInput(): void;
    onKeyDownPopover(e: KeyboardEvent): void;
    /**
     * Registers a new dynamic date range option with a unique key.
     *
     * Example:
     * DynamicDateRange.register("LASTWEEK", LastWeek);
     */
    static register(operator: string, option: new () => IDynamicDateRangeOption): void;
    static getOptionClass(operator: string): (new () => IDynamicDateRangeOption) | undefined;
}
export default DynamicDateRange;
export type { DynamicDateRangeValue, IDynamicDateRangeOption, DynamicDateRangeChangeEventDetail, };
