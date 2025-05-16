import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import "@ui5/webcomponents-icons/dist/appointment-2.js";
import DynamicDateRangeTemplate from "./DynamicDateRangeTemplate.js";
import IconMode from "./types/IconMode.js";
import type Input from "./Input.js";
import type { IDynamicDateRangeOption } from "./DynamicDateOption.js";
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

/**
 * @class
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DynamicDateRange.js";`
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
    @i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * Defines a formatted date value.
	 * @default undefined
	 * @public
	 */
	@property({ noAttribute: true })
	value?: DynamicDateRangeValue;

	/**
	 * Defines the open or closed state of the popover.
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the options.
	 * @public
	 * @default ""
	 */
	@property({ type: String })
	options = "";

    @property({ type: Object })
    _currentOption?: IDynamicDateRangeOption;

	@property({ type: Object })
    currentValue?: DynamicDateRangeValue;

	static optionsClasses: Map<string, new () => IDynamicDateRangeOption> = new Map();

	optionsObjects: IDynamicDateRangeOption[] = [];

	@query("[ui5-input]")
	_input?: Input;

	onBeforeRendering() {
		if (!this.optionsObjects.length) {
			const optionKeys = this.options.split(",").map(option => option.trim());
			this.optionsObjects = optionKeys.map(option => {
				const OptionClass = DynamicDateRange.getOptionClass(option);

				if (OptionClass) {
					const optionObject = new OptionClass();

					return optionObject;
				}

				return undefined;
			}).filter(optionObject => optionObject !== undefined);
		}
	}

	get _optionsTitles(): Array<string> {
		return this.optionsObjects.map(option => option.text);
	}

	get openIconName() {
		return "appointment-2";
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

	_selectOption(e: any) {
		this._currentOption = this.optionsObjects.find(option => option.text === e.detail.item.textContent);
		if (!this._currentOption?.template) {
			this.currentValue = this._currentOption?.parse(this._currentOption.text) as DynamicDateRangeValue;
			this._submitValue();
		}

		if (this._currentOption?.key === this.value?.operator) {
			this.currentValue = this.value;
		}
	}

	getOption(key: string) {
		const resultOption = this.optionsObjects.find(option => option.key === key);

		if (!resultOption) {
			const OptionClass = DynamicDateRange.getOptionClass(key);

			if (OptionClass) {
				const optionObject = new OptionClass();
				this.optionsObjects.push(optionObject);

				return optionObject;
			}
		}

		return resultOption;
	}

	onInputChange(e: any) {
		const value = e.target.value as string;

		if (!value) {
			this.value = undefined;
			return;
		}

		const currentOption = this.optionsObjects.find(option => option.isValidString(value));

		this.value = currentOption ? this.getOption(currentOption.key)?.parse(value) as DynamicDateRangeValue : undefined;
	}

	onButtonBackClick() {
		this._currentOption = undefined;
	}

	toDates(value: DynamicDateRangeValue): Date[] {
		return this.getOption(value.operator)?.toDates(value) as Date[];
	}

	get _hasCurrentOptionTemplate(): boolean {
		return !!this._currentOption && !!this._currentOption.template;
	}

	_submitValue() {
		const stringValue = this._currentOption?.format(this.currentValue!) as string;

		if (this._input) {
			this._input.value = stringValue;
		}

		if (this._currentOption?.isValidString(stringValue)) {
			this.value = this.currentValue as DynamicDateRangeValue;
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
		if (this.currentValue && this.currentValue.operator === this._currentOption?.key) {
			return `${DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT)}: ${this._currentOption?.format(this.currentValue)}`;
		}

		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
	}

	handleSelectionChange(e: CustomEvent) {
		this.currentValue = this._currentOption?.handleSelectionChange && this._currentOption?.handleSelectionChange(e) as DynamicDateRangeValue;
	}

	static register(key: string, option: new () => IDynamicDateRangeOption): void {
		key = key.toUpperCase();

		if (!this.optionsClasses.has(key)) {
			this.optionsClasses.set(key, option);
		}
	}

	static getOptionClass(key: string): (new () => IDynamicDateRangeOption) | undefined {
		return this.optionsClasses.get(key);
	}
}

DynamicDateRange.define();

export default DynamicDateRange;

export type {
	DynamicDateRangeValue,
};
