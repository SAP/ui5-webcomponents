import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
// import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import DynamicDateRangeTemplate from "./DynamicDateRangeTemplate.js";

// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Styles
import dynamicDateRangeCss from "./generated/themes/DynamicDateRange.css.js";
import dynamicDateRangePopoverCss from "./generated/themes/DynamicDateRangePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import IconMode from "./types/IconMode.js";
import "./DynamicDateOption.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionToday.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionYesterday.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionTomorrow.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionDate.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionDateRange.js";
import type Input from "./Input.js";
import type DynamicDateRangeValue from "./DynamicDateRangeValue.js";
import type { IDynamicDateRangeOption } from "./DynamicDateOption.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	DYNAMIC_DATE_RANGE_SELECTED_TEXT,
	DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";

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
	value!: DynamicDateRangeValue;

	/**
	 * Defines the open or closed state of the popover.
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	open = false;

    @property({ type: Object })
    _currentOption?: IDynamicDateRangeOption;

	@property({ type: Object })
    currentValue?: DynamicDateRangeValue;

	@slot({ type: HTMLElement, "default": true })
	options!: Array<IDynamicDateRangeOption>;

	@query("[ui5-input]")
	_input?: Input;

	get _optionsTitles(): Array<string> {
		return this.options.map(option => option.text);
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
		this._currentOption = this.options.find(option => option.text === e.detail.item.textContent);
		if (!this._currentOption?.template) {
			this._submitValue();
		}

		if (this._currentOption?.key === this.value?.operator) {
			this.currentValue = this.value;
		}
	}

	getOption(key: string) {
		return this.options.find(option => option.key === key);
	}

	onInputChange(e: any) {
		const value = e.target.value as string;
		this.value = this.getOption(this.value.operator)?.parse(value) as DynamicDateRangeValue;
	}

	onButtonBackClick() {
		this._currentOption = undefined;
	}

	get _hasCurrentOptionTemplate(): boolean {
		return !!this._currentOption && !!this._currentOption.template;
	}

	_submitValue() {
		if (this._input) {
			this._input.value = this._currentOption?.format(this.currentValue!) as string;
		}

		this._currentOption = undefined;
		this.open = false;
		this.value = this.currentValue as DynamicDateRangeValue;
	}

	_close() {
		this._currentOption = undefined;
		this.open = false;
	}

	// _getInput(): Input {
	// 	return this.shadowRoot!.querySelector<Input>("[ui5-input]")!;
	// }

	get currentValueText() {
		if (this.currentValue && this.currentValue.operator === this._currentOption?.key) {
			return `${DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT)}: ${this._currentOption?.format(this.currentValue)}`;
		}

		return DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
	}

	calendarSelectionChange(e: CustomEvent) {
		this.currentValue = this._currentOption?.handleSelectionChange && this._currentOption?.handleSelectionChange(e) as DynamicDateRangeValue;
	}
}

DynamicDateRange.define();

export default DynamicDateRange;
