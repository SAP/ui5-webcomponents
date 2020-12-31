import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone, isIE } from "@ui5/webcomponents-base/dist/Device.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import {
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/time-entry-request.js";
import timeSelectionTemplate from "./generated/templates/timeSelectionTemplate.lit.js";
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
	TIMEPICKER_PERIODS_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import timeSelectionCss from "./generated/themes/TimeSelection.css.js";

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

		_currentSlider: {
			type: String,
			defaultValue: "hours",
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TimeSelection.prototype */ {
		/**
		 * Fired when the value changes due to user interaction with the sliders
		 *
		 * @event
		 * @public
		 */
		change: {},
	},
};

/**
 * @class
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimeSelection
 * @extends UI5Element
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
		return [
			WheelSlider,
		];
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._slidersDomRefs = [];
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
		return this._neededSliders[0];
	}

	get _hasMinutesSlider() {
		return this._neededSliders[1];
	}

	get _hasSecondsSlider() {
		return this._neededSliders[2];
	}

	get _hasPeriodsSlider() {
		return this._neededSliders[3];
	}

	get secondsArray() {
		return getSeconds();
	}

	get minutesArray() {
		return getMinutes();
	}

	get hoursArray() {
		return getHours(this._hoursConfiguration);
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
		return this._currentSlider === "period";
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

	setValue(value) {
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

		const date = this.dateValue;
		date.setHours(hours);
		this.setValue(this.formatValue(date));
	}

	onMinutesChange(event) {
		const minutes = event.detail.value;
		const date = this.dateValue;
		date.setMinutes(minutes);
		this.setValue(this.formatValue(date));
	}

	onSecondsChange(event) {
		const seconds = event.detail.value;
		const date = this.dateValue;
		date.setSeconds(seconds);
		this.setValue(this.formatValue(date));
	}

	onPeriodChange(event) {
		const period = event.detail.value;
		const date = this.dateValue;
		if (period === this.periodsArray[0] && date.getHours() >= 12) {
			date.setHours(date.getHours() - 12);
		} if (period === this.periodsArray[1] && date.getHours() < 12) {
			date.setHours(date.getHours() + 12);
		}
		this.setValue(this.formatValue(date));
	}

	/**
	 * Checks if a value is valid against the current format patternt of the TimeSelection.
	 *
	 * <br><br>
	 * <b>Note:</b> an empty string is considered as valid value.
	 * @param {string} value The value to be tested against the current date format
	 * @public
	 */
	isValid(value) {
		if (value === "") {
			return true;
		}
		return !!(value && this.getFormat().parse(value));
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

	get _displayFormat() {
		return this.getFormat().oFormatOptions.pattern;
	}

	/**
	 * Event handler for the "click" and "focusin" events of the sliders
	 * @param event
	 */
	selectSlider(event) {
		this._currentSlider = event.target.closest("[ui5-wheelslider]").getAttribute("data-sap-slider");
	}

	get _currentSliderDOM() {
		return this.shadowRoot.querySelector(`[data-sap-slider="${this._currentSlider}"]`);
	}

	_onfocusin(event) {
		if (!this._currentSlider) {
			this._currentSlider = "hours";
		}

		if (event.target === event.currentTarget) {
			this._currentSliderDOM.focus();
		}
	}

	_onfocusout(event) {
		if (!this.shadowRoot.contains(event.relatedTarget)) {
			this._currentSlider = "";
		}
	}

	async _onkeydown(event) {
		const activeSliders = ["hours", "minutes", "seconds", "period"].filter((slider, index) => this._neededSliders[index]);
		const currentSlider = event.target.closest("[ui5-wheelslider]").getAttribute("data-sap-slider");
		let index = activeSliders.indexOf(currentSlider);
		if (isLeft(event)) {
			index = index === 0 ? activeSliders.length - 1 : index - 1;
		} else if (isRight(event)) {
			index = index === activeSliders.length - 1 ? 0 : index + 1;
		}
		this._currentSlider = activeSliders[index];
		this._currentSliderDOM.focus();
	}

	_handleWheel(e) {
		e.preventDefault();
	}

	getFormat() {
		let dateFormat;
		if (this._isPattern) {
			dateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
			});
		} else {
			dateFormat = DateFormat.getInstance({
				style: this._formatPattern,
			});
		}

		return dateFormat;
	}

	formatValue(oDate) {
		return this.getFormat().format(oDate);
	}

	get dateValue() {
		return this.value ? this.getFormat().parse(this.value) : new Date();
	}

	get validDateValue() {
		return this.isValid(this.value) ? this.dateValue : new Date();
	}

	get hoursSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
	}

	get minutesSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
	}

	get secondsSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
	}

	get periodSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_PERIODS_LABEL);
	}

	get _isCyclic() {
		return !isIE();
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
