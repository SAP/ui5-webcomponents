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
import DynamicDateRangeTemplate from "./DynamicDateRangeTemplate.js";
import IconMode from "./types/IconMode.js";
import type Input from "./Input.js";
import {
	DYNAMIC_DATE_RANGE_SELECTED_TEXT,
	DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT,
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
    values?: Date[] | number[];
}

type DynamicDateRangeChangeEventDetail = {
	value: DynamicDateRangeValue,
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

	optionsObjects: IDynamicDateRangeOption[] = [];

	static optionsClasses: Map<string, new () => IDynamicDateRangeOption> = new Map();

	@query("[ui5-input]")
	_input?: Input;

	onBeforeRendering() {
		const optionKeys = this.options.split(",").map(option => option.trim());

		this.optionsObjects = optionKeys.map(option => {
			const OptionClass = DynamicDateRange.getOptionClass(option);
			let optionObject;

			if (OptionClass) {
				optionObject = new OptionClass();
			}

			return optionObject;
		}).filter(optionObject => optionObject !== undefined);
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

	_togglePicker(): void {
		this.open = !this.open;
	}

	_selectOption(e: CustomEvent): void {
		this._currentOption = this.optionsObjects.find(option => option.text === e.detail.item.textContent);
		if (!this._currentOption?.template) {
			this.currentValue = this._currentOption?.parse(this._currentOption.text);
			this._submitValue();
		}

		if (this._currentOption?.operator === this.value?.operator) {
			this.currentValue = this.value;
		}
	}

	getOption(operator: string) {
		const resultOption = this.optionsObjects.find(option => option.operator === operator);

		if (!resultOption) {
			const OptionClass = DynamicDateRange.getOptionClass(operator);

			if (OptionClass) {
				const optionObject = new OptionClass();
				this.optionsObjects.push(optionObject);

				return optionObject;
			}
		}

		return resultOption;
	}

	onInputChange(e: Event): void {
		const value = (e.target as Input)?.value;

		if (!value) {
			this.value = undefined;
			return;
		}

		const currentOption = this.optionsObjects.find(option => option.isValidString(value));

		this.value = currentOption ? this.getOption(currentOption.operator)?.parse(value) : undefined;

		if (this.value) {
			this.fireDecoratorEvent("change", {	value: this.value });
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
	toDates(value: DynamicDateRangeValue): Date[] {
		return this.getOption(value.operator)?.toDates(value) as Date[];
	}

	get _hasCurrentOptionTemplate(): boolean {
		return !!this._currentOption?.template;
	}

	_submitValue() {
		const stringValue = this._currentOption?.format(this.currentValue!) as string;

		if (this._input) {
			this._input.value = stringValue;
		}

		if (this._currentOption?.isValidString(stringValue)) {
			this.value = this.currentValue as DynamicDateRangeValue;
			this.fireDecoratorEvent("change", { value: this.value });
		} else {
			this.value = undefined;
		}

		this._currentOption = undefined;
		this.open = false;
	}

	_close() {
		this._currentOption = undefined;
		this.open = false;
	}

	get currentValueText() {
		if (this.currentValue && this.currentValue.operator === this._currentOption?.operator) {
			return `${DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT)}: ${this._currentOption?.format(this.currentValue)}`;
		}

		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
	}

	handleSelectionChange(e: CustomEvent) {
		this.currentValue = this._currentOption?.handleSelectionChange && this._currentOption?.handleSelectionChange(e) as DynamicDateRangeValue;
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
}

DynamicDateRange.define();

export default DynamicDateRange;

export type {
	DynamicDateRangeValue,
	IDynamicDateRangeOption,
	DynamicDateRangeChangeEventDetail,
};
