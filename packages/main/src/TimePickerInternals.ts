import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import SegmentedButton from "./SegmentedButton.js";
import Button from "./Button.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * ### TODO
 *
 * <code>ui5-time-picker-internals</code> is component that contains all the <code>ui5-time-picker-clock</code> components
 * necessary for the <code>ui5-time-picker</code> as well as all necessary buttons used for switching between different clocks.
 * <code>ui5-time-picker-clock</code> components and buttons depend on the time format set to <code>ui5-time-picker</code>
 *
 * <h3>Usage</h3>y
 *
 * <code>ui5-time-picker-internals</code> can display hours, minutes or seconds <code>ui5-time-picker-clock</code> components
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/TimePickerInternals.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimePickerInternals
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-time-picker-internals
 * @since 1.??.??
 * @private
 */
@customElement({
	tag: "ui5-time-picker-internals",
})

class TimePickerInternals extends UI5Element {
	/**
	 * Defines a formatted time value.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.value
	 * @defaultvalue undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	value?: string;

	/**
	 * Determines the format, displayed in the input field.
	 *
	 * Example:
	 * HH:mm:ss -> 11:42:35
	 * hh:mm:ss a -> 2:23:15 PM
	 * mm:ss -> 12:04 (only minutes and seconds)
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.formatPattern
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	formatPattern!: string;

	/**
	 * Hides the hours slider regardless of formatPattern
	 * This property is only needed for the duration picker use case which requires non-standard slider combinations
	 * @public
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.hideHours
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	hideHours!: boolean;

	/**
	 * Hides the minutes slider regardless of formatPattern
	 * This property is only needed for the duration picker use case which requires non-standard slider combinations
	 * @public
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.hideMinutes
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	hideMinutes!: boolean;

	/**
	 * Hides the seconds slider regardless of formatPattern
	 * This property is only needed for the duration picker use case which requires non-standard slider combinations
	 * @public
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.hideSeconds
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	hideSeconds!: boolean;

	/**
	 * The maximum number of hours to be displayed for the hours slider (only needed for the duration picker use case)
	 * @public
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.maxHours
	 * @type {Integer}
	 */
	@property({ validator: Integer })
	maxHours?: number;

	/**
	 * The maximum number of minutes to be displayed for the minutes slider (only needed for the duration picker use case)
	 * @public
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.maxMinutes
	 * @type {Integer}
	 */
	@property({ validator: Integer })
	maxMinutes?: number;

	/**
	 * The maximum number of seconds to be displayed for the seconds slider (only needed for the duration picker use case)
	 * @public
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.maxSeconds
	 * @type {Integer}
	 */
	@property({ validator: Integer })
	maxSeconds?: number;

	@property({ validator: Integer, defaultValue: 1 })
	secondsStep!: number;

	@property({ validator: Integer, defaultValue: 1 })
	minutesStep!: number;

	@property({ defaultValue: "hours" })
	_currentSlider!: string;

	@property({ type: CalendarType })
	_calendarType!: CalendarType;

	/**
	 * Holds the inner AM/PM segmented button.
	 *
	 * @type {SegmentedButton}
	 * @private
	 */
	@property({ type: Object })
	_buttonAmPm!: SegmentedButton;

	/** OPTIONAL to implement Begin */

	/**
	 * Allows to set a value of 24:00, used to indicate the end of the day.
	 * Works only with HH or H formats. Don't use it together with am/pm.
	 *
	 * When this property is set to <code>true</code>, the clock can display either 24 or 00 as last hour.
	 * The change between 24 and 00 (and vice versa) can be done as follows:
	 *
	 * - on a desktop device: hold down the <code>Ctrl</code> key (this changes 24 to 00 and vice versa), and either
	 * click with mouse on the 00/24 number, or navigate to this value using Arrow keys/PageUp/PageDown and press
	 * <code>Space</code> key (Space key selects the highlighted value and switch to the next available clock).
	 *
	 * - on mobile/touch device: make a long touch on 24/00 value - this action toggles the value to the opposite one.
	 *
	 * - on both device types, if there is a keyboard attached: 24 or 00 can be typed directly.
	 *
	 * <b>Note:</b> Don't use it together with am/pm.
	 *
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.support2400
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	support2400!: boolean;

	/**
	 * Determines whether there is a shortcut navigation to current time.
	 *
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.showCurrentTimeButton
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showCurrentTimeButton!: boolean;

	/**
	 * Holds the inner button for shortcut navigation to current time.
	 *
	 * @type {SegmentedButton}
	 * @private
	 */
	@property({ type: Object })
	_buttonNow!: Button;

	/** OPTIONAL to implement End */
}

TimePickerInternals.define();

export default TimePickerInternals;
