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
	value!: any;

	/**
	 * Defines the open or closed state of the popover.
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	open = false;

	@slot({ type: HTMLElement })
	options!: Array<HTMLElement>;

    responsivePopover?: ResponsivePopover;

    get _optionsTitles(): Array<string> {
		// return this.options.map(option => option.title);
        return ["one", "two", "three", "four"];
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
}

DynamicDateRange.define();

export default DynamicDateRange;
