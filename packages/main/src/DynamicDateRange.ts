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
import type ResponsivePopover from "./ResponsivePopover.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import IconMode from "./types/IconMode.js";
import type DynamicDateRangeOption from "./DynamicDateOption.js";
import "./DynamicDateOption.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionToday.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionYesterday.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionTomorrow.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionDate.js";
import "./dynamic-date-range-options/DynamicDateRangeOptionDateRange.js";
import type Input from "./Input.js";
import DynamicDateRangeValue from "./DynamicDateRangeValue.js";

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
	/**
	 * Defines a formatted date value.
     * // to do a type
	 * @default undefined
	 * @public
	 */
	@property()
	value!: DynamicDateRangeValue;

	/**
	 * Defines the open or closed state of the popover.
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	open = false;

    @property({ type: Object })
    _currentOption?: DynamicDateRangeOption;

	@slot({ type: HTMLElement, "default": true })
	options!: Array<DynamicDateRangeOption>;

    responsivePopover?: ResponsivePopover;
    private _currentValue?: DynamicDateRangeValue;

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
    }

	getOption(key: string) {
		return this.options.find(option => option.text === key);
	}

	onInputChange(e: any) {
		const value = e.target.value as string;
		this.value = this.getOption(this.value.operator)?.parse(value) as DynamicDateRangeValue;
	}

    get _hasCurrentOptionTemplate(): boolean {
    	return !!this._currentOption && !!this._currentOption.template;
    }

    _submitValue() {
    	this._getInput().value = this._currentOption?.format(this._currentValue) as string;
    	this._currentOption = undefined;
    	this.open = false;
		this.value = this._currentValue as DynamicDateRangeValue;
    }

    _close() {
    	this._currentOption = undefined;
    	this.open = false;
    }

    _getInput(): Input {
    	return this.shadowRoot!.querySelector<Input>("[ui5-input]")!;
    }

    calendarSelectionChange(e: any) {
    	const currentValue = new DynamicDateRangeValue();

		if (e.srcElement.selectionMode === "Single") {
			currentValue.operator = this._currentOption?.text as string;
			currentValue.values = [new Date(e.detail.timestamp * 1000)];
			this._currentValue = currentValue;
		} else if (e.srcElement.selectionMode === "Range") {
			currentValue.operator = this._currentOption?.text as string;
			currentValue.values = [new Date(e.detail.selectedDates[0] * 1000), new Date(e.detail.selectedDates[1] * 1000)];
			this._currentValue = currentValue;
		}
    }
}

DynamicDateRange.define();

export default DynamicDateRange;
