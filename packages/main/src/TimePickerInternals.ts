import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
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
import {
	getHoursConfigByFormat,
	getTimeControlsByFormat,
	HourType,
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

type TimeSelectionPeriodProperties = {
	label: string,
	pressed: boolean,
}

type TimeSelectionChangeEventDetail = {
	value: string | undefined,
	valid: boolean,
}

type TimePickerEntityAttributes = {
	min: number,
	max: number,
	step: number,
}

type TimePickerEntityProperties = {
	label: string,
	entity?: string,
	itemMin?: number,
	itemMax?: number,
	value: number,
	stringValue?: string,
	textValue?: string,
	displayStep?: number,
	lastItemReplacement?: number,
	showInnerCircle?: boolean,
	prependZero: boolean,
	active?: boolean,
	hasSeparator?: boolean,
	attributes?: TimePickerEntityAttributes,
}

const TYPE_COOLDOWN_DELAY = 1000; // Cooldown delay; 0 = disabled cooldown

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-time-picker-internals</code> is helper component that contains shared methods used in <code>ui5-time-selection-clocks</code>
 * and <ui5-time-selection-inputs> components and should not be used separately.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimePickerInternals
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-time-picker-internals
 * @since 1.15.0
 * @private
 */
@customElement({
	tag: "ui5-time-picker-internals",
})

/**
 * Fired when the value changes due to user interaction with the sliders.
 */
@event("change", {
	detail: {
		value: { type: String },
		valid: { type: Boolean },
	},
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

	 * @type {string}
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.formatPattern
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	formatPattern!: string;

	/**
	 * The index of the active Clock/TogleSpinButton.
	 *
	 * @type {integer}
	 * @defaultvalue 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0, noAttribute: true })
	_activeIndex!: number;

	/**
	 * Contains calendar type.
	 *
	 * @type {CalendarType}
	 * @private
	 */
	@property({ type: CalendarType })
	_calendarType!: CalendarType;

	/**
	 * Contains currently available Time Picker components depending on time format.
	 *
	 * @type {Array}
	 */
	@property({ type: Object, multiple: true })
	_entities!: Array<TimePickerEntityProperties>;

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

	/**
	 * Id of the cooldown interval
	 *
	 * @type {ReturnType}
	 */
	@property({ validator: Integer, noAttribute: true })
	_typeCooldownId?: ReturnType<typeof setTimeout>;

	/**
	 * Exact match number buffer
	 *
	 * @type {integer}
	 */
	@property({ validator: Integer, noAttribute: true })
	_exactMatch?: number;

	/**
	 * Buffer for entered by keyboard numbers
	 *
	 * @type {string}
	 */
	@property({ defaultValue: "", noAttribute: true })
	_keyboardBuffer!: string;

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

	get _zeroPaddedHours() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray as Array<{ type: HourType }>;
		const hourFormat = formatArray.find(item => item.type.startsWith("hour")); // try to find an entry for the hours
		// @ts-ignore digits is a private API of aFormatArray
		return !(hourFormat.digits && (hourFormat.digits as Integer) === 1);
	}

	get _neededComponents() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray as Array<{ type: HourType }>;
		return getTimeControlsByFormat(formatArray, this._hoursConfiguration);
	}

	get _hasHoursComponent() {
		return this._neededComponents[0];
	}

	get _hasMinutesComponent() {
		return this._neededComponents[1];
	}

	get _hasSecondsComponent() {
		return this._neededComponents[2];
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
		if (hours.toString().length === 1 && this._zeroPaddedHours) {
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
		let period;
		const dateValue = this.validDateValue;

		if (!this._hoursConfiguration.isTwelveHoursFormat) {
			return undefined;
		}
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

	get clockDialAriaLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_CLOCK_DIAL_LABEL);
	}

	setValue(date: Date) {
		const value = this.formatValue(date);

		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
			this.fireEvent<TimeSelectionChangeEventDetail>("change", { value: this.value, valid: true });
		}
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

	_componentKey(name: string) {
		type ComponentKey = keyof typeof this._componentMap;
		return name as ComponentKey;
	}

	_indexFromName(name: string) {
		return this._componentMap[this._componentKey(name)];
	}

	/**
	 * Returns name of the clock or button from the id of the event target.
	 *
	 * @returns {string | undefined} name of the clock/button
	 */
	_getNameFromId(id: string) {
		const parts = id.split("_");

		return parts.length ? parts[parts.length - 1] : undefined;
	}

	/**
	 * Returns index of the clock or button from the id of the event target.
	 *
	 * @returns {number} index of the clock/button
	 */
	_getIndexFromId(id: string) {
		const name = this._getNameFromId(id);

		return name ? this._indexFromName(name) : 0;
	}

	/**
	 * Changes hours value.
	 *
	 * @param {hours} number new hours value
	 */
	_hoursChange(hours: number) {
		if (this._hoursConfiguration.isTwelveHoursFormat) {
			hours = this._shiftHours(hours);
		}

		const date = this.validDateValue;

		date.setHours(hours);
		this.setValue(date);
	}

	/**
	 * Changes minutes value.
	 *
	 * @param {minutes} number new minutes value
	 */
	_minutesChange(minutes: number) {
		const date = this.validDateValue;

		date.setMinutes(minutes);
		this.setValue(date);
	}

	/**
	 * Changes seconds value.
	 *
	 * @param {seconds} number new seconds value
	 */
	_secondsChange(seconds: number) {
		const date = this.validDateValue;

		date.setSeconds(seconds);
		this.setValue(date);
	}

	_buttonAmPm() {
		return this._hasPeriodsComponent ? this.shadowRoot?.querySelector<SegmentedButton>(`#${this._id}_AmPm`) : undefined;
	}

	_createPeriodComponent() {
		if (this._hasPeriodsComponent) {
			// add period item
			this.periodsArray.forEach(item => {
				this._periods.push({
					"label": item,
					"pressed": this._period === item,
				});
			});
		}
	}

	_periodChange(evt: PointerEvent) {
		const periodItem = evt.target;

		if (periodItem) {
			const period = (periodItem as HTMLElement).textContent;
			this._calculatePeriodChange(period as string);
		}
	}

	_calculatePeriodChange(period: string) {
		const date = this.validDateValue;

		if (period === this._periods[0].label && date.getHours() >= 12) {
			date.setHours(date.getHours() - 12);
		} if (period === this._periods[1].label && date.getHours() < 12) {
			date.setHours(date.getHours() + 12);
		}
		this.setValue(date);
	}

	/**
	 * Shifts hours value with +/- 12 depending on hour value and day period.
	 *
	 * @param {number} hours current hours
	 * @returns {number} shifted hours
	 */
	_shiftHours(hours: number) {
		if (this._period === this.periodsArray[0]) { // AM
			hours = hours === 12 ? 0 : hours;
		} else if (this._period === this.periodsArray[1]) { // PM
			hours = hours === 12 ? hours : hours + 12;
		}
		return hours;
	}

	/**
	 * Clears the currently existing cooldown period and starts new one if requested.
	 *
	 * @param {boolean} startNewCooldown whether to start new cooldown period after clearing previous one
	 */
	_resetCooldown(startNewCooldown: boolean) {
		if (!TYPE_COOLDOWN_DELAY) {
			return; // if delay is 0, cooldown is disabled
		}
		if (this._typeCooldownId) {
			clearTimeout(this._typeCooldownId);
		}
		if (startNewCooldown) {
			this._startCooldown();
		}
	}

	/**
	 * Starts new cooldown period.
	 */
	_startCooldown() {
		if (!TYPE_COOLDOWN_DELAY) {
			return; // if delay is 0, cooldown is disabled
		}
		this._typeCooldownId = setTimeout(() => {
			this._keyboardBuffer = "";
			this._typeCooldownId = undefined;
			if (this._exactMatch) {
				this._setExactMatch();
				this._exactMatch = undefined;
			}
		}, TYPE_COOLDOWN_DELAY);
	}

	/**
	 * Sets the exact match value. Override if necessary.
	 */
	_setExactMatch() {}
}

TimePickerInternals.define();

export default TimePickerInternals;
export type {
	TimePickerComponentIndexMap,
	TimeSelectionChangeEventDetail,
};
