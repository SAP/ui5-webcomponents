import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
} from "./generated/i18n/i18n-defaults.js";

// Styles
import timeSelectionCss from "./generated/themes/TimeSelection.css.js";

const capitalizeFirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

/**
 * @public
 */
const metadata = {
	tag: "ui5-time-selection",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.TimeSelection.prototype */ {
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
		 * Determines the format, displayed in the input field.
		 *
		 * Example:
		 * HH:mm:ss -> 11:42:35
		 * hh:mm:ss a -> 2:23:15 PM
		 * mm:ss -> 12:04 (only minutes and seconds)
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},

		/**
		 * Hides the hours slider regardless of formatPattern
		 * This property is only needed for the duration picker use case which requires non-standard slider combinations
		 * @public
		 */
		hideHours: {
			type: Boolean,
		},

		/**
		 * Hides the minutes slider regardless of formatPattern
		 * This property is only needed for the duration picker use case which requires non-standard slider combinations
		 * @public
		 */
		hideMinutes: {
			type: Boolean,
		},

		/**
		 * Hides the seconds slider regardless of formatPattern
		 * This property is only needed for the duration picker use case which requires non-standard slider combinations
		 * @public
		 */
		hideSeconds: {
			type: Boolean,
		},

		/**
		 * The maximum number of hours to be displayed for the hours slider (only needed for the duration picker use case)
		 * @public
		 */
		maxHours: {
			type: Integer,
		},

		/**
		 * The maximum number of minutes to be displayed for the minutes slider (only needed for the duration picker use case)
		 * @public
		 */
		maxMinutes: {
			type: Integer,
		},

		/**
		 * The maximum number of seconds to be displayed for the seconds slider (only needed for the duration picker use case)
		 * @public
		 */
		maxSeconds: {
			type: Integer,
		},

		secondsStep: {
			type: Integer,
			defaultValue: 1,
		},

		minutesStep: {
			type: Integer,
			defaultValue: 1,
		},

		_currentSlider: {
			type: String,
			defaultValue: "hours",
		},

		_calendarType: {
			type: CalendarType,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TimeSelection.prototype */ {
		/**
		 * Fired when the value changes due to user interaction with the sliders
		 */
		change: {},

		/**
		 * Fired when the expanded/collapsed slider changes (a new slider is expanded or the expanded slider is collapsed)
		 */
		sliderChange: {},
	},
};

/**
 * @class
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimeSelection
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-time-selection
 * @private
 * @since 1.0.0-rc.12
 */
class TimeSelection extends UI5Element {
	static get metadata() {
		return metadata;
	}

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
		const hourFormat = this.getFormat().aFormatArray.find(item => item.type.startsWith("hour")); // try to find an entry for the hours
		return getHoursConfigByFormat(hourFormat ? hourFormat.type : "hour0_23");
	}

	get _neededSliders() {
		const formatArray = this.getFormat().aFormatArray;
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
		return this.getFormat().aDayPeriods.map(x => x.toUpperCase());
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

	setValue(date) {
		const value = this.formatValue(date);
		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
			this.fireEvent("change", { value: this.value, valid: true });
		}
	}

	onHoursChange(event) {
		let hours = event.detail.value;
		const isTwelveHoursFormat = this._hoursConfiguration.isTwelveHoursFormat;

		if (isTwelveHoursFormat) {
			if (this._period === this.periodsArray[0]) { // AM
				hours = hours === "12" ? 0 : hours;
			}

			if (this._period === this.periodsArray[1]) { // PM
				hours = hours === "12" ? hours : hours * 1 + 12;
			}
		}

		const date = this.validDateValue;
		date.setHours(hours);
		this.setValue(date);
	}

	onMinutesChange(event) {
		const minutes = event.detail.value;
		const date = this.validDateValue;
		date.setMinutes(minutes);
		this.setValue(date);
	}

	onSecondsChange(event) {
		const seconds = event.detail.value;
		const date = this.validDateValue;
		date.setSeconds(seconds);
		this.setValue(date);
	}

	onPeriodChange(event) {
		const period = event.detail.value;
		const date = this.validDateValue;
		if (period === this.periodsArray[0] && date.getHours() >= 12) {
			date.setHours(date.getHours() - 12);
		} if (period === this.periodsArray[1] && date.getHours() < 12) {
			date.setHours(date.getHours() + 12);
		}
		this.setValue(date);
	}

	isValid(value) {
		return value === "" || this.getFormat().parse(value);
	}

	normalizeValue(value) {
		if (value === "") {
			return value;
		}

		return this.getFormat().format(this.getFormat().parse(value));
	}

	get _formatPattern() {
		const pattern = this.formatPattern;
		const hasHours = !!pattern.match(/H/i);
		const fallback = !pattern || !hasHours;

		const localeData = getCachedLocaleDataInstance(getLocale());
		return fallback ? localeData.getCombinedDateTimePattern("medium", "medium", this._primaryCalendarType) : pattern;
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	/**
	 * Event handler for the "click" and "focusin" events of the sliders
	 * @param event
	 */
	selectSlider(event) {
		this._setCurrentSlider(event.target.closest("[ui5-wheelslider]").getAttribute("data-sap-slider"));
	}

	_setCurrentSlider(slider) {
		if (this._currentSlider === slider) {
			return;
		}
		this._currentSlider = slider;
		this.fireEvent("slider-change", { slider });
	}

	get _currentSliderDOM() {
		return this.shadowRoot.querySelector(`[data-sap-slider="${this._currentSlider}"]`);
	}

	get _activeSliders() {
		return ["hours", "minutes", "seconds", "periods"].filter(slider => this[`_has${capitalizeFirst(slider)}Slider`]);
	}

	_onfocusin(event) {
		if (!this._currentSlider) {
			this._setCurrentSlider(this._activeSliders[0]);
		}

		if (event.target === event.currentTarget) {
			this._currentSliderDOM.focus();
		}
	}

	_onfocusout(event) {
		if (!this.shadowRoot.contains(event.relatedTarget)) {
			this._setCurrentSlider("");
		}
	}

	async _onkeydown(event) {
		if (!(isLeft(event) || isRight(event))) {
			return;
		}
		event.preventDefault();

		const activeSliders = this._activeSliders;
		const activeSlider = event.target.closest("[ui5-wheelslider]").getAttribute("data-sap-slider");
		let index = activeSliders.indexOf(activeSlider);
		if (isLeft(event)) {
			index = index === 0 ? activeSliders.length - 1 : index - 1;
		} else if (isRight(event)) {
			index = index === activeSliders.length - 1 ? 0 : index + 1;
		}
		this._setCurrentSlider(activeSliders[index]);
		this._currentSliderDOM.focus();
	}

	_handleWheel(e) {
		e.preventDefault();
	}

	getFormat() {
		let dateFormat;
		if (this._isPattern) {
			dateFormat = DateFormat.getInstance({
				calendarType: this._calendarType,
				pattern: this._formatPattern,
			});
		} else {
			dateFormat = DateFormat.getInstance({
				calendarType: this._calendarType,
				style: this._formatPattern,
			});
		}

		return dateFormat;
	}

	formatValue(date) {
		return this.getFormat().format(date);
	}

	get dateValue() {
		return this.value ? this.getFormat().parse(this.value) : new Date();
	}

	get validDateValue() {
		return this.isValid(this.value) ? this.dateValue : new Date();
	}

	get hoursSliderTitle() {
		return TimeSelection.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
	}

	get minutesSliderTitle() {
		return TimeSelection.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
	}

	get secondsSliderTitle() {
		return TimeSelection.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
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
