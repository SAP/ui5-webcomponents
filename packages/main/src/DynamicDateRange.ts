import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import type { JsxTemplate } from "@ui5/webcomponents-base";
import { isF4, isShow } from "@ui5/webcomponents-base/dist/Keys.js";
import DynamicDateRangeTemplate from "./DynamicDateRangeTemplate.js";
import IconMode from "./types/IconMode.js";
import type Input from "./Input.js";
import type List from "./List.js";
import type ListItem from "./ListItem.js";
import {
	DYNAMIC_DATE_RANGE_SELECTED_TEXT,
	DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT,
	DYNAMIC_DATE_RANGE_NAVIGATION_ICON_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";
import {
	isGroupedOption,
	getGroupKeyFromOperator,
	mergeOptions,
	createValueWithDates,
	createValueWithNumber,
	getStoredSelectionForPattern,
	restoreNumberFromDates,
	formatDateRange,
	processLastNextOption,
} from "./DynamicDateRangeUtils.js";
import type { GroupedOption } from "./DynamicDateRangeUtils.js";
import type DynamicDateRangeTimeUnit from "./types/DynamicDateRangeTimeUnit.js";
import type DynamicDateRangeDirection from "./types/DynamicDateRangeDirection.js";

// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Styles
import dynamicDateRangeCss from "./generated/themes/DynamicDateRange.css.js";
import dynamicDateRangePopoverCss from "./generated/themes/DynamicDateRangePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

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
	values?: Array<Date> | Array<number>;
}

type DynamicDateRangeChangeEventDetail = {
	value: DynamicDateRangeValue | undefined,
}

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
 * - `timeUnit` (optional): The time unit for Last/Next options (e.g., "days", "months").
 * - `direction` (optional): The direction for Last/Next options ("last" or "next").
 *
 * Methods:
 * - `format(value: DynamicDateRangeValue): string`: Formats the given dynamic date range value into a string representation.
 * - `parse(value: string): DynamicDateRangeValue | undefined`: Parses a string into a dynamic date range value.
 * - `toDates(value: DynamicDateRangeValue): Array<Date>`: Converts a dynamic date range value into an array of `Date` objects.
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
	toDates: (value: DynamicDateRangeValue) => Array<Date>;
	handleSelectionChange?: (event: CustomEvent) => DynamicDateRangeValue | undefined;
	template?: JsxTemplate;
	isValidString: (value: string) => boolean;
	timeUnit?: `${DynamicDateRangeTimeUnit}`;
	direction?: `${DynamicDateRangeDirection}`;
}

/**
 * Fired when the input operation has finished by pressing Enter or on focusout or a value is selected in the popover.
 * @public
 */
@event("change", {
	bubbles: true,
	cancelable: true,
})

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-dynamic-date-range` component provides a flexible interface to define date ranges using a combination of absolute dates, relative intervals, and preset ranges (e.g., "Today", "Yesterday", etc.).
 * It allows users to select a date range from a predefined set of options or enter custom dates.
 *
 * ### Usage
 *
 * The component is typically used in scenarios where users need to filter data based on date ranges, such as in reports, dashboards, or data analysis tools.
 * It can be used with the predefined options or extended with custom options to suit specific requirements. You can create your own options by extending the `IDynamicDateRangeOption` interface.
 * Every option should be registered using the `DynamicDateRange.register` method.
 *
 * If needed, you can also create a range of dates based on specific option using the `toDates` method.
 *
 * ### Standard Options
 *
 * The component comes with a set of standard options, including:
 * - "TODAY" - Represents the current date. An example value is `{ operator: "TODAY"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";`
 * - "YESTERDAY" - Represents the previous date. An example value is `{ operator: "YESTERDAY"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";`
 * - "TOMORROW" - Represents the next date. An example value is `{ operator: "TOMORROW"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";`
 * - "DATE" - Represents a single date. An example value is `{ operator: "DATE", values: [new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";`
 * - "DATERANGE" - Represents a range of dates. An example value is `{ operator: "DATERANGE", values: [new Date(), new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";`
 * - "LASTDAYS" - Represents last X days from today. An example value is `{ operator: "LASTDAYS", values: [new Date("2025-06-02"), new Date("2025-06-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastDays.js";`
 * - "NEXTDAYS" - Represents next X days from today. An example value is `{ operator: "NEXTDAYS", values: [new Date("2025-06-05"), new Date("2025-06-12")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextDays.js";`
 * - "LASTWEEKS" - Represents last X weeks from today. An example value is `{ operator: "LASTWEEKS", values: [new Date("2025-05-22"), new Date("2025-06-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastWeeks.js";`
 * - "NEXTWEEKS" - Represents next X weeks from today. An example value is `{ operator: "NEXTWEEKS", values: [new Date("2025-06-05"), new Date("2025-06-19")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextWeeks.js";`
 * - "LASTMONTHS" - Represents last X months from today. An example value is `{ operator: "LASTMONTHS", values: [new Date("2025-03-05"), new Date("2025-06-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastMonths.js";`
 * - "NEXTMONTHS" - Represents next X months from today. An example value is `{ operator: "NEXTMONTHS", values: [new Date("2025-06-05"), new Date("2025-09-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextMonths.js";`
 * - "LASTQUARTERS" - Represents last X quarters from today. An example value is `{ operator: "LASTQUARTERS", values: [new Date("2025-01-01"), new Date("2025-06-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastQuarters.js";`
 * - "NEXTQUARTERS" - Represents next X quarters from today. An example value is `{ operator: "NEXTQUARTERS", values: [new Date("2025-06-05"), new Date("2025-09-30")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextQuarters.js";`
 * - "LASTYEARS" - Represents last X years from today. An example value is `{ operator: "LASTYEARS", values: [new Date("2024-06-05"), new Date("2025-06-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/LastYears.js";`
 * - "NEXTYEARS" - Represents next X years from today. An example value is `{ operator: "NEXTYEARS", values: [new Date("2025-06-05"), new Date("2026-06-05")]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/NextYears.js";`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DynamicDateRange.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 */

@customElement({
	tag: "ui5-dynamic-date-range",
	languageAware: true,
	template: DynamicDateRangeTemplate,
	renderer: jsxRenderer,
	styles: [
		dynamicDateRangeCss,
		ResponsivePopoverCommonCss,
		dynamicDateRangePopoverCss,
	],
})

class DynamicDateRange extends UI5Element {
	eventDetails!: {
		change: DynamicDateRangeChangeEventDetail,
	}

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * Defines the value object.
	 * @default undefined
	 * @public
	 */
	@property({ noAttribute: true })
	value?: DynamicDateRangeValue;

	/**
	 * Defines the options listed as a string, separated by commas and using capital case.
	 * Example: "TODAY, YESTERDAY, DATERANGE"
	 * @public
	 * @default ""
	 */
	@property({ type: String })
	options = "";

	/**
	 * Defines the open or closed state of the popover.
	 * @private
	 * @default false
	 */
	@property({ type: Boolean })
	open = false;

	@property({ type: Object })
	_currentOption?: IDynamicDateRangeOption;

	@property({ type: Object })
	currentValue?: DynamicDateRangeValue;

	// Store last selections for grouped options
	@property({ type: Object, noAttribute: true })
	_lastGroupedSelections: Record<string, DynamicDateRangeValue> = {};

	optionsObjects: Array<IDynamicDateRangeOption> = [];

	static optionsClasses: Map<string, new () => IDynamicDateRangeOption> = new Map();

	@query("[ui5-input]")
	_input?: Input;

	@query("[ui5-list]")
	_list?: List;

	onBeforeRendering() {
		this.optionsObjects = this._buildNormalizedOptions();
		this._focusSelectedItem();
	}

	/**
	 * Builds the normalized options array by parsing, creating, and merging raw options.
	 *
	 * @returns Array of normalized options ready for display
	 */
	_buildNormalizedOptions() {
		const optionKeys = this.options.split(",").map(option => option.trim());
		const rawOptions = this._createRawOptions(optionKeys);
		return mergeOptions(rawOptions);
	}

	/**
	 * Creates raw option instances from option keys by instantiating their classes.
	 * Filters out any invalid or unregistered options.
	 *
	 * @param optionKeys - Array of option key strings from the options property
	 * @returns Array of instantiated option objects, filtered for valid ones only
	 */
	_createRawOptions(optionKeys: Array<string>) {
		return optionKeys
			.map(option => {
				const OptionClass = DynamicDateRange.getOptionClass(option);
				return OptionClass ? new OptionClass() : null;
			})
			.filter((option): option is IDynamicDateRangeOption => option !== null);
	}

	_focusSelectedItem() {
		if (!this.value) {
			return;
		}

		const selectedItem = this._findSelectedListItem();
		if (selectedItem) {
			this._list?.focusItem(selectedItem as ListItem);
		}
	}

	/**
	 * Finds the list item element that corresponds to the current value.
	 * Handles both regular options and grouped options.
	 */
	_findSelectedListItem() {
		const mergedOption = this.optionsObjects.find(option => {
			if (isGroupedOption(option)) {
				return option._availableOptions.some(availableOption => availableOption.operator === this.value?.operator);
			}
			return false;
		});

		if (mergedOption) {
			return this._list?.items.find(item => item.textContent === mergedOption.text);
		}

		const option = this.optionsObjects.find(x => x.operator === this.value?.operator);
		return option ? this._list?.items.find(item => item.textContent === option.text) : undefined;
	}

	get _optionsTitles(): Array<string> {
		return this.optionsObjects.map(option => option.text);
	}

	/**
	 * Defines whether the value help icon is hidden
	 * @private
	 */
	get _iconMode() {
		return isDesktop() ? IconMode.Decorative : IconMode.Interactive;
	}

	get tooltipNavigationIcon() {
		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_NAVIGATION_ICON_TOOLTIP);
	}

	_togglePicker(): void {
		this.open = !this.open;
	}

	_selectOption(e: CustomEvent): void {
		const itemText = e.detail.item.textContent;
		const selectedOption = this.optionsObjects.find(option => option.text === itemText);

		if (!selectedOption) {
			return;
		}

		this._currentOption = selectedOption;

		// grouped options get unified template, single temporal options get their template, simple options submit immediately
		if (isGroupedOption(selectedOption)) {
			this._handleGroupedOptionSelection(selectedOption);
		} else if (selectedOption.template) {
			this._handleTemporalOptionSelection(selectedOption);
		} else {
			this._handleSimpleOptionSelection(selectedOption);
		}
	}

	/**
	 * Handles grouped option selection (multiple Last or Next options merged).
	 * Uses unified template with dropdown for unit selection.
	 */
	_handleGroupedOptionSelection(selectedOption: GroupedOption) {
		const availableOptions = selectedOption._availableOptions;
		const groupKey = selectedOption.operator.replace("_GROUPED", "");

		const storedSelection = this._lastGroupedSelections[groupKey];
		if (storedSelection && availableOptions.some(option => option.operator === storedSelection.operator)) {
			this.currentValue = storedSelection;
		} else if (availableOptions.length > 0) {
			const firstOption = availableOptions[0];
			this.currentValue = createValueWithNumber(firstOption.operator, 1);
		}
	}

	/**
	 * Handles single temporal option selection (e.g., single "Last X Days").
	 * Uses the option's own template (LastNextTemplate).
	 */
	_handleTemporalOptionSelection(selectedOption: IDynamicDateRangeOption) {
		if (selectedOption.operator === this.value?.operator) {
			this.currentValue = this._restoreCurrentValue(selectedOption);
		} else {
			this.currentValue = createValueWithNumber(selectedOption.operator, 1);
		}
	}

	/**
	 * Handles simple option selection (e.g., "Today", "Yesterday").
	 * Submits immediately without template.
	 */
	_handleSimpleOptionSelection(selectedOption: IDynamicDateRangeOption) {
		this.currentValue = selectedOption.parse(selectedOption.text);
		this._submitValue();
	}

	/**
	 * Restores the current value when reopening the same option.
	 *
	 * @param selectedOption - The option being reopened
	 * @returns The restored value with original number or estimated from dates
	 */
	_restoreCurrentValue(selectedOption: IDynamicDateRangeOption): DynamicDateRangeValue {
		// Delegate to option for any restoration logic, don't check specific properties
		const storedSelection = getStoredSelectionForPattern(this.value!, this._lastGroupedSelections);
		if (storedSelection) {
			return storedSelection;
		}

		const restored = restoreNumberFromDates(this.value!);
		return restored || createValueWithNumber(selectedOption.operator, 1);
	}

	getOption(operator: string) {
		const resultOption = this.optionsObjects.find(option => option.operator === operator);
		if (resultOption) {
			return resultOption;
		}

		const groupedOption = this.optionsObjects.find(option => {
			if (isGroupedOption(option)) {
				return option._availableOptions.some(availableOption => availableOption.operator === operator);
			}
			return false;
		});

		if (groupedOption && isGroupedOption(groupedOption)) {
			return groupedOption._availableOptions.find(availableOption => availableOption.operator === operator);
		}

		const OptionClass = DynamicDateRange.getOptionClass(operator);
		return OptionClass ? new OptionClass() : undefined;
	}

	onInputChange(e: Event): void {
		const value = (e.target as Input)?.value;

		if (!value) {
			this.value = undefined;
			this.fireDecoratorEvent("change", { value: undefined });
			return;
		}

		const currentOption = this.optionsObjects.find(option => option.isValidString(value));
		const parsedValue = currentOption ? this.getOption(currentOption.operator)?.parse(value) : undefined;

		if (parsedValue && currentOption) {
			this._handleParsedValue(parsedValue);
		} else {
			this.value = parsedValue;
		}

		if (this.value) {
			this.fireDecoratorEvent("change", { value: this.value });
		}
	}

	/**
	 * Handles parsed values from manual text input.
	 *
	 * @param parsedValue - The value parsed from user input text
	 */
	_handleParsedValue(parsedValue: DynamicDateRangeValue) {
		const groupKey = getGroupKeyFromOperator(parsedValue.operator);

		// Get the actual option to delegate behavior
		const actualOption = this.getOption(parsedValue.operator);
		if (actualOption) {
			const calculatedDates = actualOption.toDates(parsedValue);
			this.value = createValueWithDates(parsedValue.operator, calculatedDates);
			this._lastGroupedSelections[groupKey] = { ...parsedValue };
		} else {
			this.value = parsedValue;
		}
	}

	onButtonBackClick() {
		this._currentOption = undefined;
	}

	/**
	 * Converts a `value` into concrete `startDate` and `endDate` JavaScript `Date` objects.
	 *
	 * @returns An array of two `Date` objects representing the start and end dates.
	 */
	toDates(value: DynamicDateRangeValue): Array<Date> {
		return this.getOption(value.operator)?.toDates(value) as Array<Date>;
	}

	get _hasCurrentOptionTemplate(): boolean {
		return !!this._currentOption && (isGroupedOption(this._currentOption) || !!this._currentOption.template);
	}

	_submitValue() {
		if (!this._currentOption || !this.currentValue) {
			return;
		}

		const result = this._processOptionSubmission();

		if (this._input && result) {
			this._input.value = result.stringValue;
		}

		this._currentOption = undefined;
		this.open = false;
	}

	_processOptionSubmission() {
		if (!this._currentOption || !this.currentValue) {
			return null;
		}

		if (isGroupedOption(this._currentOption)) {
			return this._processGroupedOptionSubmission();
		}

		if (this._currentOption.template) {
			return this._processSingleTemporalOption();
		}

		// Handle simple options (Today, Yesterday, Tomorrow, etc.)
		const stringValue = this._currentOption.format(this.currentValue);
		const isValid = this._currentOption.isValidString(stringValue);

		if (isValid) {
			this.value = this.currentValue;
			this.fireDecoratorEvent("change", { value: this.value });
		} else {
			this.value = undefined;
		}

		return { stringValue };
	}

	/**
	 * Processes submission of GROUPED options by finding the actual option and processing it.
	 * Handles the unified template submission for merged options.
	 *
	 * @returns Object with stringValue for display, or null if processing failed
	 */
	_processGroupedOptionSubmission() {
		if (!this._currentOption || !this.currentValue || !isGroupedOption(this._currentOption)) {
			return null;
		}

		const availableOptions = this._currentOption._availableOptions;
		const actualOption = availableOptions?.find(option => option.operator === this.currentValue?.operator);

		if (actualOption) {
			const result = processLastNextOption(this.currentValue, this._lastGroupedSelections, actualOption);

			if (result.isValid) {
				this.value = result.finalValue;
				this.fireDecoratorEvent("change", { value: this.value });
			} else {
				this.value = undefined;
			}

			return { stringValue: result.stringValue };
		}

		this.value = undefined;
		return { stringValue: "" };
	}

	/**
	 * Processes submission of SINGLE temporal options with templates.
	 * Handles individual temporal options that have their own templates (not grouped).
	 *
	 * @returns Object with stringValue for display, or null if processing failed
	 */
	_processSingleTemporalOption() {
		if (!this._currentOption || !this.currentValue) {
			return null;
		}

		const result = processLastNextOption(this.currentValue, this._lastGroupedSelections, this._currentOption);

		if (result.isValid) {
			this.value = result.finalValue;
			this.fireDecoratorEvent("change", { value: this.value });
		} else {
			this.value = undefined;
		}

		return { stringValue: result.stringValue };
	}

	_close() {
		this._currentOption = undefined;
		this.open = false;
	}

	onPopoverOpen() {
		if (this.currentValue !== this.value && this.value) {
			this.currentValue = this._restoreValueForReopen();
		}
	}

	/**
	 * Restores the appropriate currentValue when reopening the popover.
	 *
	 * @returns The restored value suitable for UI display
	 */
	_restoreValueForReopen() {
		if (!this.value) {
			return this.value;
		}

		// Use generic restoration logic without checking specific properties
		const storedSelection = getStoredSelectionForPattern(this.value, this._lastGroupedSelections);
		if (storedSelection) {
			return storedSelection;
		}

		const restored = restoreNumberFromDates(this.value);
		return restored || this.value;
	}

	onPopoverClose() {
		this._close();
	}

	get currentValueText() {
		if (!this.currentValue || !this._currentOption) {
			return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
		}

		const selectedText = DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT);

		if (isGroupedOption(this._currentOption)) {
			return this._getGroupedOptionText(selectedText);
		}

		if (this._currentOption.template) {
			return this._getTemporalOptionText(selectedText);
		}

		return `${selectedText}: ${this._currentOption.format(this.currentValue)}`;
	}

	/**
	 * Gets formatted text for grouped options showing the calculated date range.
	 * Used in the currentValueText getter for grouped option display.
	 *
	 * @param selectedText - The i18n text for "Selected" prefix
	 * @returns Formatted text like "Selected: Jan 1, 2025 – Jan 7, 2025"
	 */
	_getGroupedOptionText(selectedText: string): string {
		if (!this._currentOption || !isGroupedOption(this._currentOption) || !this.currentValue) {
			return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
		}

		const availableOptions = this._currentOption._availableOptions;
		const actualOption = availableOptions?.find(option => option.operator === this.currentValue?.operator);

		if (actualOption) {
			const dates = actualOption.toDates(this.currentValue);
			const formattedRange = formatDateRange(dates, selectedText);
			return formattedRange || `${selectedText}: ${actualOption.format(this.currentValue)}`;
		}

		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
	}

	/**
	 * Gets formatted text for any option with template showing the calculated date range.
	 *
	 * @param selectedText - The i18n text for "Selected" prefix
	 * @returns Formatted text like "Selected: Jan 1, 2025 – Jan 7, 2025"
	 */
	_getTemporalOptionText(selectedText: string): string {
		if (!this._currentOption || !this.currentValue) {
			return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
		}

		try {
			const dates = this._currentOption.toDates(this.currentValue);
			const formattedRange = formatDateRange(dates, selectedText);
			return formattedRange || `${selectedText}: ${this._currentOption.format(this.currentValue)}`;
		} catch (error) {
			return `${selectedText}: ${this._currentOption.format(this.currentValue)}`;
		}
	}

	/**
	 * Generic method to update current value - used by decoupled handlers.
	 */
	updateCurrentValue(newValue: DynamicDateRangeValue): void {
		this.currentValue = newValue;
	}

	handleSelectionChange(e: CustomEvent) {
		const newValue = this._currentOption?.handleSelectionChange?.(e) as DynamicDateRangeValue;

		if (newValue) {
			this.currentValue = newValue;

			// Store selection generically using group key
			const groupKey = getGroupKeyFromOperator(newValue.operator);
			this._lastGroupedSelections[groupKey] = { ...newValue };
		}
	}

	onInputKeyDown(e: KeyboardEvent) {
		if (isShow(e)) {
			e.preventDefault();
			if (this.open) {
				if (!isF4(e)) {
					this._toggleAndFocusInput();
				}
			} else {
				this._toggleAndFocusInput();
			}
		}
	}

	_toggleAndFocusInput() {
		this._togglePicker();
		if (this.open) {
			this._input?.focus();
		}
	}

	onKeyDownPopover(e: KeyboardEvent) {
		if (isShow(e)) {
			e.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
			this._toggleAndFocusInput();
		}
	}

	/**
	 * Registers a new dynamic date range option with a unique key.
	 *
	 * Example:
	 * DynamicDateRange.register("LASTWEEK", LastWeek);
	 */
	static register(operator: string, option: new () => IDynamicDateRangeOption): void {
		operator = operator.toUpperCase();

		if (!this.optionsClasses.has(operator)) {
			this.optionsClasses.set(operator, option);
		}
	}

	static getOptionClass(operator: string): (new () => IDynamicDateRangeOption) | undefined {
		return this.optionsClasses.get(operator);
	}

	get displayValue(): string {
		if (!this.value) {
			return "";
		}

		const option = this.getOption(this.value.operator);
		if (!option) {
			return "";
		}

		const storedSelection = getStoredSelectionForPattern(this.value, this._lastGroupedSelections);
		if (storedSelection) {
			return option.format(storedSelection);
		}

		const restored = restoreNumberFromDates(this.value);
		if (restored) {
			return option.format(restored);
		}

		return option.format(this.value);
	}
}

DynamicDateRange.define();

export default DynamicDateRange;

export type {
	DynamicDateRangeValue,
	IDynamicDateRangeOption,
	DynamicDateRangeChangeEventDetail,
};
