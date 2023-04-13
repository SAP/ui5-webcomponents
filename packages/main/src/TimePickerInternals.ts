import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import SegmentedButton from "./SegmentedButton.js";
import Button from "./Button.js";

import {
	getHours,
	getMinutes,
	getSeconds,
	getHoursConfigByFormat,
	getTimeControlsByFormat,
} from "./timepicker-utils/TimeSlider.js";

import {
	TIMEPICKER_HOURS_LABEL,
	TIMEPICKER_MINUTES_LABEL,
	TIMEPICKER_SECONDS_LABEL,
	TIMEPICKER_CLOCK_DIAL_LABEL,
} from "./generated/i18n/i18n-defaults.js";

type TimePickerComponentIndexMap = {
	hours: number,
	minutes: number,
	seconds: number,
}

type TimeSelectionChangeEventDetail = {
	value: string | undefined,
	valid: boolean,
}

type TimeSelectionPeriodProperties = {
	label: string,
	pressed: boolean,
}

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

	/**
	 * The index of the active Clock/TogleSpinButton.
	 * @private
	 * @defaultvalue 0
	 * @type {Integer}
	 */
	@property({ validator: Integer, defaultValue: 0 })
	_activeIndex!: number;

	@property({ defaultValue: "hours" })
	_currentComponent!: string;

	@property({ type: CalendarType })
	_calendarType!: CalendarType;

	/**
	 * Contains component-to-index map.
	 *
	 * @type {TimePickerComponentIndexMap}
	 * @private
	 */
	@property({ type: Object })
	_componentMap!: TimePickerComponentIndexMap;

	/**
	 * Contains currently available Button components depending on time format.
	 *
	 * @type {Array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_periods!: Array<TimeSelectionPeriodProperties>;

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

	static i18nBundle: I18nBundle;

	static async onDefine() {
		[TimePickerInternals.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}

	get _hoursConfiguration() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray as Array<{ type: HourType }>;
		const hourFormat = formatArray.find(item => item.type.startsWith("hour")); // try to find an entry for the hours
		return getHoursConfigByFormat(hourFormat ? hourFormat.type : "hour0_23");
	}

	get _neededComponents() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray as Array<{ type: HourType }>;
		return getTimeControlsByFormat(formatArray, this._hoursConfiguration);
	}

	get _hasHoursComponent() {
		return this._neededComponents[0] && !this.hideHours;
	}

	get _hasMinutesComponent() {
		return this._neededComponents[1] && !this.hideMinutes;
	}

	get _hasSecondsComponent() {
		return this._neededComponents[2] && !this.hideSeconds;
	}

	get _hasPeriodsComponent() {
		return this._neededComponents[3];
	}

	get dateValue() {
		return this.value ? this.getFormat().parse(this.value, undefined as unknown as boolean, undefined as unknown as boolean) as Date : new Date();
	}

	get validDateValue() {
		return this.value !== undefined && this.isValid(this.value) ? this.dateValue : new Date();
	}

	get periodsArray() {
		// @ts-ignore aDayPeriodsAbbrev is a private API of DateFormat
		const dayPeriodsAbbrev = this.getFormat().aDayPeriodsAbbrev as Array<string>;
		return dayPeriodsAbbrev.map((x: string) => x.toUpperCase());
	}

	get _showAmPmButton(): boolean {
		return true;
	}

	get _pmPressed(): boolean {
		return false;
	}

	get _hoursSliderFocused() {
		return this._currentComponent === "hours";
	}

	get _minutesSliderFocused() {
		return this._currentComponent === "minutes";
	}

	get _secondsSliderFocused() {
		return this._currentComponent === "seconds";
	}

	get _periodSliderFocused() {
		return this._currentComponent === "periods";
	}

	get _hours() {
		let hours;
		const dateValue = this.validDateValue;
		if (this._hoursConfiguration.isTwelveHoursFormat && dateValue.getHours() > this._hoursConfiguration.maxHour) {
			hours = dateValue.getHours() - 12;
		} else if (this._hoursConfiguration.isTwelveHoursFormat && dateValue.getHours() < this._hoursConfiguration.minHour) {
			hours = dateValue.getHours() + 12;
		} else {
			hours = dateValue.getHours();
		}
		if (hours.toString().length === 1) {
			hours = `0${hours}`;
		}
		return hours.toString();
	}

	get _minutes() {
		const minutes = this.validDateValue.getMinutes().toString();
		return minutes.length === 1 ? `0${minutes}` : minutes;
	}

	get _seconds() {
		const seconds = this.validDateValue.getSeconds().toString();
		return seconds.length === 1 ? `0${seconds}` : seconds;
	}

	get _period() {
		if (!this._hoursConfiguration.isTwelveHoursFormat) {
			return undefined;
		}

		let period;
		const dateValue = this.validDateValue;
		if (this._hoursConfiguration.minHour === 1) {
			period = dateValue.getHours() >= this._hoursConfiguration.maxHour ? this.periodsArray[1] : this.periodsArray[0];
		} else {
			period = (dateValue.getHours() > this._hoursConfiguration.maxHour || dateValue.getHours() === this._hoursConfiguration.minHour) ? this.periodsArray[1] : this.periodsArray[0];
		}
		return period;
	}

	get _formatPattern() {
		const pattern = this.formatPattern;
		const hasHours = !!pattern.match(/H/i);
		const fallback = !pattern || !hasHours;

		const localeData = getCachedLocaleDataInstance(getLocale());
		return fallback ? localeData.getCombinedDateTimePattern("medium", "medium", undefined) : pattern;
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get hoursLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
	}

	get minutesLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
	}

	get secondsLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
	}



	setValue(date: Date) {
		const value = this.formatValue(date);
		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
			this.fireEvent<TimeSelectionChangeEventDetail>("change", { value: this.value, valid: true });
		}
	}

	_componentKey(name: string) {
		type ComponentKey = keyof typeof this._componentMap;
		const key = name as ComponentKey;
		return key;
	}

	isValid(value: string) {
		return value === "" || this.getFormat().parse(value, undefined as unknown as boolean, undefined as unknown as boolean);
	}

	normalizeValue(value: string) {
		if (value === "") {
			return value;
		}

		return this.getFormat().format(this.getFormat().parse(value, undefined as unknown as boolean, undefined as unknown as boolean));
	}

	getFormat() {
		let dateFormat: DateFormat;
		if (this._isPattern) {
			dateFormat = DateFormat.getDateInstance({
				calendarType: this._calendarType,
				pattern: this._formatPattern,
			});
		} else {
			dateFormat = DateFormat.getDateInstance({
				calendarType: this._calendarType,
				style: this._formatPattern,
			});
		}

		return dateFormat;
	}

	formatValue(date: Date) {
		return this.getFormat().format(date);
	}

	_buttonAmPm() {
		return this._hasPeriodsComponent ? this.shadowRoot?.querySelector<SegmentedButton>(`#${this._id}_AmPm`) : undefined;
	}
}

TimePickerInternals.define();

export default TimePickerInternals;
export type { TimePickerComponentIndexMap };