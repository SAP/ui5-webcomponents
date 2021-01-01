import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import {
	isShow,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/time-entry-request.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimePickerTemplate from "./generated/templates/TimePickerTemplate.lit.js";
import TimePickerPopoverTemplate from "./generated/templates/TimePickerPopoverTemplate.lit.js";
import Input from "./Input.js";
import Button from "./Button.js";
import TimeSelection from "./TimeSelection.js";

import {
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";
import TimePickerPopoverCss from "./generated/themes/TimePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

/**
 * @public
 */
const metadata = {
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.TimePickerBase.prototype */ {
		/**
		 * Defines a formatted time value.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		value: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the value state of the <code>ui5-time-picker</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines whether the <code>ui5-time-picker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-time-picker</code> is displayed as readonly.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		_isPickerOpen: {
			type: Boolean,
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TimePickerBase.prototype */ {
		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-time-picker</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-time-picker</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.8
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TimePickerBase.prototype */ {
		/**
		 * Fired when the input operation has finished by clicking the "OK" button or
		 * when the text in the input field has changed and the focus leaves the input field.
		 *
		 * @event
		 * @public
		*/
		change: {},
		/**
		 * Fired when the value of the <code>ui5-time-picker</code> is changed at each key stroke.
		 *
		 * @event
		 * @public
		*/
		input: {},
	},
};

/**
 * @class
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimePickerBase
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 */
class TimePickerBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return TimePickerCss;
	}

	static get staticAreaTemplate() {
		return TimePickerPopoverTemplate;
	}

	static get template() {
		return TimePickerTemplate;
	}

	static get dependencies() {
		return [
			Icon,
			ResponsivePopover,
			TimeSelection,
			Input,
			Button,
		];
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, TimePickerPopoverCss];
	}

	constructor() {
		super();
		this.tempValue = null;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onTimeSelectionChange(event) {
		this.tempValue = event.detail.value; // every time the user changes the sliders -> update tempValue
	}

	submitPickers() {
		this.setValue(this.tempValue); // set tempValue to value (no need to nullify tempValue)
		this.closePicker();
	}

	onResponsivePopoverAfterClose() {
		this._isPickerOpen = false;
	}

	async _handleInputClick() {
		if (this._isPickerOpen) {
			return;
		}

		const inputField = await this._getInputField();

		if (inputField) {
			inputField.select();
		}
	}

	/**
	 * @abstract
	 * @protected
	 */
	isValid(value) {}

	setValue(value) {
		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}
	}

	async _handleInputChange() {
		const nextValue = await this._getInput().getInputValue();
		const isValid = this.isValid(nextValue);

		this.setValue(nextValue);
		this.fireEvent("change", { value: nextValue, valid: isValid });
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	async _handleInputLiveChange() {
		const nextValue = await this._getInput().getInputValue();
		const isValid = this.isValid(nextValue);

		this.value = nextValue;
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	/**
	 * Closes the picker
	 * @public
	 */
	async closePicker() {
		const responsivePopover = await this._getPopover();
		responsivePopover.close();
		this._isPickerOpen = false;
	}

	/**
	 * Opens the picker.
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	async openPicker() {
		const responsivePopover = await this._getPopover();
		responsivePopover.open(this);
		this._isPickerOpen = true;
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.openPicker();
		}
	}

	/**
	 * Checks if a value is valid against the current date format of the TimePicker
	 * @public
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-responsive-popover]");
	}

	_getInput() {
		return this.shadowRoot.querySelector("[ui5-input]");
	}

	_getInputField() {
		const input = this._getInput();
		return input && input.getInputDOMRef();
	}

	_onkeydown(e) {
		if (isShow(e)) {
			e.preventDefault();
			this.togglePicker();
		} else if (isPageUpShiftCtrl(e)) {
			e.preventDefault();
			this._modifyValueBy(1, "second");
		} else if (isPageUpShift(e)) {
			e.preventDefault();
			this._modifyValueBy(1, "minute");
		} else if (isPageUp(e)) {
			e.preventDefault();
			this._modifyValueBy(1, "hour");
		} else if (isPageDownShiftCtrl(e)) {
			e.preventDefault();
			this._modifyValueBy(-1, "second");
		} else if (isPageDownShift(e)) {
			e.preventDefault();
			this._modifyValueBy(-1, "minute");
		} else if (isPageDown(e)) {
			e.preventDefault();
			this._modifyValueBy(-1, "hour");
		}
	}

	/**
	 * @abstract
	 * @protected
	 */
	get dateValue() {
		return undefined;
	}

	/**
	 * @abstract
	 * @protected
	 */
	formatValue(date) {}

	_modifyValueBy(amount, unit) {
		const date = this.dateValue;

		if (unit === "hour") {
			date.setHours(date.getHours() + amount);
		} else if (unit === "minute") {
			date.setMinutes(date.getMinutes() + amount);
		} else if (unit === "second") {
			date.setSeconds(date.getSeconds() + amount);
		}

		this.setValue(this.formatValue(date));
		this.fireEvent("change", { value: this.value, valid: true });
	}

	_handleWheel(e) {
		e.preventDefault();
	}

	get submitButtonLabel() {
		return this.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get cancelButtonLabel() {
		return this.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	get openIconName() {
		return "time-entry-request";
	}
}

export default TimePickerBase;
