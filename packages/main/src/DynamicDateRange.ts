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
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
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
 * - `toDates(value: DynamicDateRangeValue): Array<Date>`: Converts a dynamic date range value into an array of `Date` objects.
 * - `handleSelectionChange?(event: CustomEvent): DynamicDateRangeValue | undefined`: (Optional) Handles selection changes in the UI of the dynamic date range option.
 * - `isValidString(value: string): boolean`: Validates whether a given string is a valid representation of the dynamic date range value.
 *
 * @public
 * @since 2.11.0
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
}

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
 * @since 2.11.0
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

/**
 * Fired when the input operation has finished by pressing Enter or on focusout or a value is selected in the popover.
 * @public
 */
@event("change", {
	bubbles: true,
	cancelable: true,
})
class DynamicDateRange extends UI5Element {
	eventDetails!: {
		change: void,
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

	optionsObjects: Array<IDynamicDateRangeOption> = [];

	static optionsClasses: Map<string, new () => IDynamicDateRangeOption> = new Map();

	@query("[ui5-input]")
	_input?: Input;

	@query("[ui5-list]")
	_list?: List;

	// Store all available options for context - this allows options to detect their siblings
	_allAvailableOptions: Array<IDynamicDateRangeOption> = [];

	// Static reference to current instance for options to access context
	static _currentInstance?: DynamicDateRange;

	// Store last selected values for state restoration
	_lastSelectedValue?: DynamicDateRangeValue;

	onBeforeRendering() {
		DynamicDateRange._currentInstance = this;
		const optionKeys = this.options.split(",").map(option => option.trim());
		const rawOptions = optionKeys
			.map(option => {
				const OptionClass = DynamicDateRange.getOptionClass(option);
				return OptionClass ? new OptionClass() : null;
			})
			.filter((option): option is IDynamicDateRangeOption => option !== null);

		this.optionsObjects = this._normalizeOptions(rawOptions);
		this._focusSelectedItem();
	}

	/**
	 * Static method for options to get the current component's options string
	 */
	static getCurrentOptions(): string {
		return DynamicDateRange._currentInstance?.options || "";
	}

	/**
	 * Builds the normalized options array by parsing and creating raw options.
	 *
	 * @returns Array of normalized options ready for display
	 */
	_buildNormalizedOptions() {
		const optionKeys = this.options.split(",").map(option => option.trim());
		const rawOptions = this._createRawOptions(optionKeys);
		return this._normalizeOptions(rawOptions);
	}

	/**
	 * Creates raw option instances from option keys by instantiating their classes.
	 * Filters out any invalid or unregistered options.
	 *
	 * @param optionKeys - Array of option key strings from the options property
	 * @returns Array of instantiated option objects, filtered for valid ones only
	 */
	_createRawOptions(optionKeys: Array<string>) {
		const rawOptions = optionKeys
			.map(option => {
				const OptionClass = DynamicDateRange.getOptionClass(option);
				return OptionClass ? new OptionClass() : null;
			})
			.filter((option): option is IDynamicDateRangeOption => option !== null);

		return rawOptions;
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
	 */
	_findSelectedListItem() {
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

		const shouldRestore = this._shouldRestorePreviousState(selectedOption);

		if (shouldRestore) {
			this.currentValue = this._lastSelectedValue;
		} else if (selectedOption.template) {
			this.currentValue = { operator: selectedOption.operator, values: [1] };
		} else {
			// Simple options submit immediately
			this.currentValue = selectedOption.parse(selectedOption.text);
			this._submitValue();
		}
	}

	_shouldRestorePreviousState(selectedOption: IDynamicDateRangeOption): boolean {
		if (!this.value || !this._lastSelectedValue) {
			return false;
		}

		if (this.value.operator === selectedOption.operator) {
			return true;
		}

		const currentOptions = this.options.split(",").map(option => option.trim());
		const selectedConstructor = selectedOption.constructor;

		// Find all options with the same constructor
		const relatedOperators = currentOptions.filter(operator => {
			const OptionClass = DynamicDateRange.getOptionClass(operator);
			return OptionClass && new OptionClass().constructor === selectedConstructor;
		});

		// Check if current value's operator is in the related operators
		return relatedOperators.includes(this.value.operator);
	}

	onButtonBackClick() {
		this._currentOption = undefined;
	}

	/**
	 * Converts a `value` into concrete `startDate` and `endDate` JavaScript `Date` objects.
	 *
	 * @public
	 * @param value The option to convert into an array of date ranges
	 * @returns An array of two `Date` objects representing the start and end dates.
	 */
	toDates(value: DynamicDateRangeValue): Array<Date> {
		const option = this.getOption(value.operator);

		if (!option) {
			return [];
		}

		if (value.values && value.values.length === 2
			&& value.values[0] instanceof Date && value.values[1] instanceof Date) {
			return value.values as Array<Date>;
		}

		return option.toDates(value);
	}

	get _hasCurrentOptionTemplate(): boolean {
		return !!this._currentOption?.template;
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

		const stringValue = this._currentOption.format(this.currentValue);
		const isValid = this._currentOption.isValidString(stringValue);

		if (isValid) {
			const dates = this._currentOption.toDates(this.currentValue);
			this.value = { operator: this.currentValue.operator, values: dates };
			this._lastSelectedValue = { ...this.currentValue };
			this.fireDecoratorEvent("change");
		} else {
			this.value = undefined;
		}

		return { stringValue };
	}

	_close() {
		this._currentOption = undefined;
		this.open = false;
	}

	onPopoverOpen() {
		if (this.value && this._lastSelectedValue) {
			this.currentValue = this._lastSelectedValue;
		} else if (this.value) {
			this.currentValue = this.value;
		}
	}

	onPopoverClose() {
		this._close();
	}

	get currentValueText() {
		if (!this.currentValue || !this._currentOption) {
			return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
		}

		const selectedText = DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT);

		// For template options with numeric values, show the calculated date range
		if (this._currentOption.template && this.currentValue.values && typeof this.currentValue.values[0] === "number") {
			const dates = this._currentOption.toDates(this.currentValue);
			if (dates.length === 2) {
				const dateFormat = DateFormat.getDateInstance({
					interval: true,
					intervalDelimiter: " - ",
				});
				const formattedRange = dateFormat.format(dates);
				return `${selectedText}: ${formattedRange}`;
			}
		}

		// Default: show the option's formatted text
		const formattedValue = this._currentOption.format(this.currentValue);
		return `${selectedText}: ${formattedValue}`;
	}

	/**
	 * Generic method to update current value - used by option templates.
	 */
	updateCurrentValue(newValue: DynamicDateRangeValue): void {
		this.currentValue = newValue;
	}

	handleSelectionChange(e: CustomEvent) {
		const newValue = this._currentOption?.handleSelectionChange?.(e);
		if (newValue) {
			this.currentValue = newValue;
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

		return option.format(this.value);
	}

	getOption(operator: string): IDynamicDateRangeOption | undefined {
		const resultOption = this.optionsObjects.find(option => option.operator === operator);
		if (resultOption) {
			return resultOption;
		}

		const OptionClass = DynamicDateRange.getOptionClass(operator);
		return OptionClass ? new OptionClass() : undefined;
	}

	onInputChange(e: Event): void {
		const value = (e.target as Input)?.value;

		if (!value) {
			this.value = undefined;
			this._lastSelectedValue = undefined;
			this.fireDecoratorEvent("change");
			return;
		}

		const currentOption = this.optionsObjects.find(option => option.isValidString(value));
		const parsedValue = currentOption?.parse(value);

		if (parsedValue && currentOption) {
			this._lastSelectedValue = { ...parsedValue };

			const dates = currentOption.toDates(parsedValue);
			this.value = { operator: parsedValue.operator, values: dates };
		} else {
			this.value = undefined;
			this._lastSelectedValue = undefined;
		}

		if (this.value) {
			this.fireDecoratorEvent("change");
		}
	}

	/**
	 * Groups options by constructor and keeps only one representative per type.
	 */
	_normalizeOptions(options: Array<IDynamicDateRangeOption>): Array<IDynamicDateRangeOption> {
		this._allAvailableOptions = options;

		const normalizedOptions: Array<IDynamicDateRangeOption> = [];
		const groupedOptions: Map<new () => IDynamicDateRangeOption, Array<IDynamicDateRangeOption>> = new Map();

		// Group by constructor
		options.forEach(option => {
			const constructor = option.constructor as new () => IDynamicDateRangeOption;
			if (!groupedOptions.has(constructor)) {
				groupedOptions.set(constructor, []);
			}
			groupedOptions.get(constructor)!.push(option);
		});

		groupedOptions.forEach(groupOptions => {
			normalizedOptions.push(groupOptions[0]);
		});

		return normalizedOptions;
	}
}

DynamicDateRange.define();

export default DynamicDateRange;

export type {
	DynamicDateRangeValue,
	IDynamicDateRangeOption,
};
