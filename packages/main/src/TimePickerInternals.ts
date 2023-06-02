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
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.formatPattern
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	formatPattern!: string;

	/**
	 * Determines the minutes step. The minutes clock is populated only by multiples of the step.
	 * @type {integer}
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.secondsStep
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1 })
	minutesStep!: number;

	/**
	 * Determines the seconds step. The seconds clock is populated only by multiples of the step.
	 * @type {integer}
	 * @name sap.ui.webc.main.TimePickerInternals.prototype.secondsStep
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1 })
	secondsStep!: number;

	/**
	 * The index of the active Clock/TogleSpinButton.
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
	 * Contains list of separators between the buttons.
	 *
	 * @type {Array}
	 * @private
	 */
	@property({ multiple: true })
	_separators!: Array<string>;

	/**
	 * Contains separator before AM/PM (if there is any).
	 *
	 * @type {string}
	 * @private
	 */
	@property({ defaultValue: "", noAttribute: true })
	_amPmSeparator!: string;

	/**
	 * Contains separator after all buttons (if there is any).
	 *
	 * @type {string}
	 * @private
	 */
	@property({ defaultValue: "", noAttribute: true })
	_lastSeparator!: string;

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

	get _showAmPmButton(): boolean {
		return true;
	}

	get _pmPressed(): boolean {
		return false;
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

	get clockDialAriaLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_CLOCK_DIAL_LABEL);
	}

	get _nextSeparator() {
		const sep = this._separators.shift() || "";
		return sep;
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
		const key = name as ComponentKey;
		return key;
	}

	_getSeparators() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray;
		let previousWasEntity = false;
		let index;

		this._separators = [];

		if (!formatArray.length) {
			return;
		}

		if (formatArray[0].type !== "text") {
			this._separators.push("");
		}

		for (index = 0; index < formatArray.length; index++) {
			if (formatArray[index].type !== "text") {
				if (previousWasEntity) {
					// there was previous non-separator entity, and this one is the same too, so add empty separator
					this._separators.push("");
				} else {
					// this is non-separator entity, set the entity flag
					previousWasEntity = true;
				}
			} else {
				// add separator and clear non-separator entity flag
				this._separators.push(formatArray[index].value as string);
				previousWasEntity = false;
			}
		}

		// push one more empty separator for the last entity
		if (formatArray[index - 1].type !== "text") {
			this._separators.push("");
		}
	}

	_buttonAmPm() {
		return this._hasPeriodsComponent ? this.shadowRoot?.querySelector<SegmentedButton>(`#${this._id}_AmPm`) : undefined;
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
}

TimePickerInternals.define();

export default TimePickerInternals;
export type {
	TimePickerComponentIndexMap,
	TimeSelectionChangeEventDetail,
};
