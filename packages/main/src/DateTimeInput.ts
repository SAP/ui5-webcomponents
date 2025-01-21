import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
// Templates
import InputTemplate from "./InputTemplate.js";

// Styles
import inputStyles from "./generated/themes/Input.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import Input from "./Input.js";
import { property } from "@ui5/webcomponents-base/dist/decorators.js";

/**
 * Extention of the UI5 Input, so we do not modify Input's private properties within the datetime components.
 * Intended to be used for the DateTime components.
 *
 * @class
 * @private
 */
@customElement({
	tag: "ui5-datetime-input",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: InputTemplate,
	styles: [
		inputStyles,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		SuggestionsCss,
	],
})

class DateTimeInput extends Input {
	@property({ noAttribute: true })
	_shouldOpenValueStatePopover = false;

	constructor() {
		super();
	}

	/**
	 * Prevents the value state message popover from appearing when a responsive popover (like time selection) is open
	 * since the responsive popover already includes the necessary information in its header.
	 *
	 * @protected
	 * @override
	 */
	get hasValueStateMessage() {
		return this._shouldOpenValueStatePopover && super.hasValueStateMessage;
	}
}

DateTimeInput.define();

export default DateTimeInput;
