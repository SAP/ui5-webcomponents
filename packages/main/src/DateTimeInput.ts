import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

// Styles
import Input from "./Input.js";
import { property } from "@ui5/webcomponents-base/dist/decorators.js";
import { isDesktop, isPhone, isTablet } from "@ui5/webcomponents-base/dist/Device.js";

/**
 * Extention of the UI5 Input, so we do not modify Input's private properties within the datetime components.
 * Intended to be used for the DateTime components.
 *
 * @class
 * @private
 */
@customElement({
	tag: "ui5-datetime-input",
})

class DateTimeInput extends Input {
	@property({ noAttribute: true })
	_shouldOpenValueStatePopover = false;

	/**
	 * Prevents the value state message popover from appearing when a responsive popover (like time selection) is open
	 * since the responsive popover already includes the necessary information in its header.
	 *
	 * @protected
	 * @override
	 */
	get hasValueStateMessage() {
		return this._shouldOpenValueStatePopover && super.hasValueStateMessage && !this._isMobileDevice;
	}

	get _isMobileDevice() {
		return !isDesktop() && (isPhone() || isTablet());
	}
}

DateTimeInput.define();

export default DateTimeInput;
