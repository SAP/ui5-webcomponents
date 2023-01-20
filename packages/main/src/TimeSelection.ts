import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import {
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/time-entry-request.js";
import timeSelectionTemplate from "./generated/templates/TimeSelectionTemplate.lit.js";
import WheelSlider from "./WheelSlider.js";
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
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Styles
import timeSelectionCss from "./generated/themes/TimeSelection.css.js";
import type { WheelSliderSelectEventDetail } from "./WheelSlider.js";
import type { HourType } from "./timepicker-utils/TimeSlider.js";

type TimeSelectionChangeEventDetail = {
	value: string | undefined,
	valid: boolean,
}

type TimeSelectionSliderChangeEventDetail = {
	slider: string,
}

/**
 * @class
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimeSelection
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-time-selection
 * @private
 * @since 1.0.0-rc.12
 */
@customElement("ui5-time-selection")
@languageAware

/**
 * Fired when the value changes due to user interaction with the sliders
 */
@event("change", {
	detail: {
		value: { type: String },
		valid: { type: Boolean },
	},
})

/**
 * Fired when the expanded/collapsed slider changes (a new slider is expanded or the expanded slider is collapsed)
 */
@event("sliderChange", {
	detail: {
		slider: { type: String },
	},
})
class TimeSelection extends UI5Element {
	/**
	 * Defines a formatted time value.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.TimeSelection.prototype.value
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
	 * @name sap.ui.webc.main.TimeSelection.prototype.formatPattern
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	formatPattern!: string;

	/**
	 * Hides the hours slider regardless of formatPattern
	 * This property is only needed for the duration picker use case which requires non-standard slider combinations
	 * @public
	 * @name sap.ui.webc.main.TimeSelection.prototype.hideHours
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	hideHours!: boolean;

	/**
	 * Hides the minutes slider regardless of formatPattern
	 * This property is only needed for the duration picker use case which requires non-standard slider combinations
	 * @public
	 * @name sap.ui.webc.main.TimeSelection.prototype.hideMinutes
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	hideMinutes!: boolean;

	/**
	 * Hides the seconds slider regardless of formatPattern
	 * This property is only needed for the duration picker use case which requires non-standard slider combinations
	 * @public
	 * @name sap.ui.webc.main.TimeSelection.prototype.hideSeconds
	 * @type {boolean}
	 */
	@property({ type: Boolean })
	hideSeconds!: boolean;

	/**
	 * The maximum number of hours to be displayed for the hours slider (only needed for the duration picker use case)
	 * @public
	 * @name sap.ui.webc.main.TimeSelection.prototype.maxHours
	 * @type {Integer}
	 */
	@property({ validator: Integer })
	maxHours?: number;

	/**
	 * The maximum number of minutes to be displayed for the minutes slider (only needed for the duration picker use case)
	 * @public
	 * @name sap.ui.webc.main.TimeSelection.prototype.maxMinutes
	 * @type {Integer}
	 */
	@property({ validator: Integer })
	maxMinutes?: number;

	/**
	 * The maximum number of seconds to be displayed for the seconds slider (only needed for the duration picker use case)
	 * @public
	 * @name sap.ui.webc.main.TimeSelection.prototype.maxSeconds
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

	static i18nBundle: I18nBundle;

	static get render() {
		return litRender;
	}

	static get styles() {
		return timeSelectionCss;
	}

	static get template() {
		return timeSelectionTemplate;
	}

	static get dependencies() {
		return [WheelSlider];
	}

	static async onDefine() {
		[TimeSelection.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}

	constructor() {
		super();
	}

	get _hoursConfiguration() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray as Array<{ type: HourType }>;
		const hourFormat = formatArray.find(item => item.type.startsWith("hour")); // try to find an entry for the hours
		return getHoursConfigByFormat(hourFormat ? hourFormat.type : "hour0_23");
	}

	get _neededSliders() {
		// @ts-ignore aFormatArray is a private API of DateFormat
		const formatArray = this.getFormat().aFormatArray as Array<{ type: HourType }>;
		return getTimeControlsByFormat(formatArray, this._hoursConfiguration);
	}

	get _hasHoursSlider() {
		return this._neededSliders[0] && !this.hideHours;
	}

	get _hasMinutesSlider() {
		return this._neededSliders[1] && !this.hideMinutes;
	}

	get _hasSecondsSlider() {
		return this._neededSliders[2] && !this.hideSeconds;
	}

	get _hasPeriodsSlider() {
		return this._neededSliders[3];
	}

	get secondsArray() {
		return getSeconds(this.maxSeconds ? this.maxSeconds + 1 : undefined, this.secondsStep);
	}

	get minutesArray() {
		return getMinutes(this.maxMinutes ? this.maxMinutes + 1 : undefined, this.minutesStep);
	}

	get hoursArray() {
		return getHours(this._hoursConfiguration, this.maxHours ? this.maxHours + 1 : undefined);
	}

	get periodsArray() {
		// @ts-ignore aDayPeriodsAbbrev is a private API of DateFormat
		const dayPeriodsAbbrev = this.getFormat().aDayPeriodsAbbrev as Array<string>;
		return dayPeriodsAbbrev.map((x: string) => x.toUpperCase());
	}

	get _hoursSliderFocused() {
		return this._currentSlider === "hours";
	}

	get _minutesSliderFocused() {
		return this._currentSlider === "minutes";
	}

	get _secondsSliderFocused() {
		return this._currentSlider === "seconds";
	}

	get _periodSliderFocused() {
		return this._currentSlider === "periods";
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

	setValue(date: Date) {
		const value = this.formatValue(date);
		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
			this.fireEvent<TimeSelectionChangeEventDetail>("change", { value: this.value, valid: true });
		}
	}

	onHoursChange(e: CustomEvent<WheelSliderSelectEventDetail>) {
		let hours = parseInt(e.detail.value);
		const isTwelveHoursFormat = this._hoursConfiguration.isTwelveHoursFormat;

		if (isTwelveHoursFormat) {
			if (this._period === this.periodsArray[0]) { // AM
				hours = hours === 12 ? 0 : hours;
			}

			if (this._period === this.periodsArray[1]) { // PM
				hours = hours === 12 ? hours : hours + 12;
			}
		}

		const date = this.validDateValue;
		date.setHours(hours);
		this.setValue(date);
	}

	onMinutesChange(e: CustomEvent<WheelSliderSelectEventDetail>) {
		const minutes = parseInt(e.detail.value);
		const date = this.validDateValue;
		date.setMinutes(minutes);
		this.setValue(date);
	}

	onSecondsChange(e: CustomEvent<WheelSliderSelectEventDetail>) {
		const seconds = parseInt(e.detail.value);
		const date = this.validDateValue;
		date.setSeconds(seconds);
		this.setValue(date);
	}

	onPeriodChange(e: CustomEvent<WheelSliderSelectEventDetail>) {
		const period = e.detail.value;
		const date = this.validDateValue;
		if (period === this.periodsArray[0] && date.getHours() >= 12) {
			date.setHours(date.getHours() - 12);
		} if (period === this.periodsArray[1] && date.getHours() < 12) {
			date.setHours(date.getHours() + 12);
		}
		this.setValue(date);
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

	/**
	 * Event handler for the "click" and "focusin" events of the sliders
	 * @param event
	 */
	selectSlider(e: MouseEvent | FocusEvent) {
		const target = e.target as HTMLElement;
		this._setCurrentSlider(target.closest<WheelSlider>("[ui5-wheelslider]")!.getAttribute("data-sap-slider")!);
	}

	_setCurrentSlider(slider: string) {
		if (this._currentSlider === slider) {
			return;
		}
		this._currentSlider = slider;
		this.fireEvent<TimeSelectionSliderChangeEventDetail>("slider-change", { slider });
	}

	get _currentSliderDOM() {
		return this.shadowRoot!.querySelector<WheelSlider>(`[data-sap-slider="${this._currentSlider}"]`)!;
	}

	get _activeSliders() {
		return [
			this._hasHoursSlider ? "hours" : "",
			this._hasMinutesSlider ? "minutes" : "",
			this._hasSecondsSlider ? "seconds" : "",
			this._hasPeriodsSlider ? "periods" : "",
		].filter((x: string) => !!x);
	}

	_onfocusin(e: FocusEvent) {
		if (!this._currentSlider) {
			this._setCurrentSlider(this._activeSliders[0]);
		}

		if (e.target === e.currentTarget) {
			this._currentSliderDOM.focus();
		}
	}

	_onfocusout(e: FocusEvent) {
		if (!this.shadowRoot!.contains(e.relatedTarget as Node)) {
			this._setCurrentSlider("");
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (!(isLeft(e) || isRight(e))) {
			return;
		}
		e.preventDefault();

		const activeSliders = this._activeSliders;
		const target = e.target as HTMLElement;
		const activeSlider = target.closest<WheelSlider>("[ui5-wheelslider]")!.getAttribute("data-sap-slider")!;
		let index = activeSliders.indexOf(activeSlider);
		if (isLeft(e)) {
			index = index === 0 ? activeSliders.length - 1 : index - 1;
		} else if (isRight(e)) {
			index = index === activeSliders.length - 1 ? 0 : index + 1;
		}
		this._setCurrentSlider(activeSliders[index]);
		this._currentSliderDOM.focus();
	}

	_handleWheel(e: WheelEvent) {
		e.preventDefault();
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

	get dateValue() {
		return this.value ? this.getFormat().parse(this.value, undefined as unknown as boolean, undefined as unknown as boolean) as Date : new Date();
	}

	get validDateValue() {
		return this.value !== undefined && this.isValid(this.value) ? this.dateValue : new Date();
	}

	get hoursSliderTitle() {
		return TimeSelection.i18nBundle.getText(TIMEPICKER_HOURS_LABEL as I18nText);
	}

	get minutesSliderTitle() {
		return TimeSelection.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL as I18nText);
	}

	get secondsSliderTitle() {
		return TimeSelection.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL as I18nText);
	}

	get periodSliderTitle() {
		return "AM/PM";
	}

	get classes() {
		return {
			root: {
				"ui5-time-selection-root": true,
				"ui5-phone": isPhone(),
			},
		};
	}
}

TimeSelection.define();

export default TimeSelection;
export type {
	TimeSelectionChangeEventDetail,
	TimeSelectionSliderChangeEventDetail,
};
