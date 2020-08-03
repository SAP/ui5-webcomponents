import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isShow, isF4 } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/icons/appointment-2.js";
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import { DATEPICKER_OPEN_ICON_TITLE, DATEPICKER_DATE_ACC_TEXT, INPUT_SUGGESTIONS_TITLE } from "./generated/i18n/i18n-defaults.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Calendar from "./Calendar.js";
import Input from "./Input.js";
import InputType from "./types/InputType.js";
import DatePickerTemplate from "./generated/templates/DatePickerTemplate.lit.js";
import DatePickerPopoverTemplate from "./generated/templates/DatePickerPopoverTemplate.lit.js";

// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Styles
import datePickerCss from "./generated/themes/DatePicker.css.js";
import datePickerPopoverCss from "./generated/themes/DatePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-date-picker",
	altTag: "ui5-datepicker",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {
		/**
		 * Defines a formatted date value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
		},

		/**
		 * Defines the value state of the <code>ui5-date-picker</code>.
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
		 * Determines the format, displayed in the input field.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},

		/**
		 * Determines the minimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		/**
		 * Determines the calendar type.
		 * The input value is formated according to the calendar type
		 * and the picker shows the months and years from the specified calendar.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Gregorian</code></li>
		 * <li><code>Islamic</code></li>
		 * <li><code>Japanese</code></li>
		 * <li><code>Buddhist</code></li>
		 * <li><code>Persian</code></li>
		 * </ul>
		 *
		 * @type {CalendarType}
		 * @defaultvalue "Gregorian"
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines whether the <code>ui5-date-picker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-date-picker</code> is displayed as read-only.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines a short hint, intended to aid the user with data entry when the
		 * <code>ui5-date-picker</code> has no value.
		 *
		 * <br><br>
		 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
		 * Passing an empty string as the value of this property will make the <code>ui5-date-picker</code> appear empty - without placeholder or format pattern.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		placeholder: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Determines the name with which the <code>ui5-date-picker</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-date-picker</code> so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Defines the visibility of the week numbers column.
		 * <br><br>
		 *
		 * <b>Note:<b> For calendars other than Gregorian,
		 * the week numbers are not displayed regardless of what is set.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideWeekNumbers: {
			type: Boolean,
		},

		_isPickerOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_respPopoverConfig: {
			type: Object,
		},

		_calendar: {
			type: Object,
		},
	},

	slots: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {
		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-date-picker</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-date-picker</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.7
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},

	events: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {

		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		*/
		change: {},

		/**
		 * Fired when the value of the <code>ui5-date-picker</code> is changed at each key stroke.
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
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date-picker</code> component provides an input field with assigned calendar which opens on user action.
 * The <code>ui5-date-picker</code> allows users to select a localized date using touch,
 * mouse, or keyboard input. It consists of two parts: the date input field and the
 * date picker.
 *
 * <h3>Usage</h3>
 *
 * The user can enter a date by:
 * <ul>
 * <li>Using the calendar that opens in a popup</li>
 * <li>Typing it in directly in the input field</li>
 * </ul>
 * <br><br>
 * When the user makes an entry and chooses the enter key, the calendar shows the corresponding date.
 * When the user directly triggers the calendar display, the actual date is displayed.
 *
 * <h3>Formatting</h3>
 *
 * If a date is entered by typing it into
 * the input field, it must fit to the used date format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="http://unicode.org/reports/tr35/#Date_Field_Symbol_Table" class="api-table-content-cell-link">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
 * <br><br>
 * For example, if the <code>format-pattern</code> is "yyyy-MM-dd",
 * a valid value string is "2015-07-30" and the same is displayed in the input.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-date-picker</code> provides advanced keyboard handling.
 * If the <code>ui5-date-picker</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * Once the drop-down is opened, you can use the <code>UP</code>, <code>DOWN</code>, <code>LEFT</code>, <code>RIGHT</code> arrow keys
 * to navigate through the dates and select one by pressing the <code>Space</code> or <code>Enter</code> keys. Moreover you can
 * use TAB to reach the buttons for changing month and year.
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DatePicker";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DatePicker
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-date-picker
 * @public
 */
class DatePicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return DatePickerTemplate;
	}

	static get staticAreaTemplate() {
		return DatePickerPopoverTemplate;
	}

	static get styles() {
		return datePickerCss;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, datePickerPopoverCss];
	}

	constructor() {
		super();

		this._respPopoverConfig = {
			allowTargetOverlap: true,
			stayOpenOnScroll: true,
			afterClose: () => {
				this._isPickerOpen = false;

				if (isPhone()) {
					// close device's keyboard and prevent further typing
					this.blur();
				} else if (this._focusInputAfterClose) {
					this._getInput().focus();
					this._focusInputAfterClose = false;
				}

				const calendar = this.calendar;
				if (calendar) {
					calendar._hideMonthPicker();
					calendar._hideYearPicker();
				}
			},
			afterOpen: () => {
				const calendar = this.calendar;

				if (!calendar) {
					return;
				}

				const dayPicker = calendar.shadowRoot.querySelector(`#${calendar._id}-daypicker`);
				const selectedDay = dayPicker.shadowRoot.querySelector(".ui5-dp-item--selected");
				const today = dayPicker.shadowRoot.querySelector(".ui5-dp-item--now");
				let focusableDay = selectedDay || today;
				if (!selectedDay && (this.minDate || this.maxDate) && !this.isInValidRange((new Date().getTime()))) {
					focusableDay = this.findFirstFocusableDay(dayPicker);
				}

				if (this._focusInputAfterOpen) {
					this._focusInputAfterOpen = false;
					this._getInput().focus();
				} else if (focusableDay) {
					focusableDay.focus();

					let focusableDayIdx = parseInt(focusableDay.getAttribute("data-sap-index"));
					const focusableItem = dayPicker.focusableDays.find(item => parseInt(item._index) === focusableDayIdx);
					focusableDayIdx = focusableItem ? dayPicker.focusableDays.indexOf(focusableItem) : focusableDayIdx;

					dayPicker._itemNav.current = focusableDayIdx;
					dayPicker._itemNav.update();
				}
			},
		};

		this._calendar = {
			onSelectedDatesChange: this._handleCalendarChange.bind(this),
			selectedDates: [],
		};

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	findFirstFocusableDay(daypicker) {
		const today = new Date();
		if (!this.isInValidRange(today.getTime())) {
			const focusableItems = Array.from(daypicker.shadowRoot.querySelectorAll(".ui5-dp-item"));
			return focusableItems.filter(x => !x.classList.contains("ui5-dp-item--disabled"))[0];
		}
	}

	onBeforeRendering() {
		this._calendar.primaryCalendarType = this._primaryCalendarType;
		this._calendar.formatPattern = this._formatPattern;

		if (this.minDate && !this.isValid(this.minDate)) {
			this.minDate = null;
			console.warn(`In order for the "minDate" property to have effect, you should enter valid date format`); // eslint-disable-line
		}

		if (this.maxDate && !this.isValid(this.maxDate)) {
			this.maxDate = null;
			console.warn(`In order for the "maxDate" property to have effect, you should enter valid date format`); // eslint-disable-line
		}
		if (this._checkValueValidity(this.value)) {
			this._changeCalendarSelection();
		} else {
			this._calendar.selectedDates = [];
		}

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		if (this.minDate) {
			this._calendar.minDate = this.minDate;
		}

		if (this.maxDate) {
			this._calendar.maxDate = this.maxDate;
		}
	}

	_getTimeStampFromString(value) {
		const jsDate = this.getFormat().parse(value);
		if (jsDate) {
			const jsDateTimeNow = new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDateTimeNow.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return undefined;
	}

	_onkeydown(event) {
		if (isShow(event)) {
			event.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
			if (this.isOpen()) {
				if (isF4(event)) {
					if (this.calendar._monthPicker._hidden) {
						this.calendar._showYearPicker();
					}
				} else {
					this._toggleAndFocusInput();
				}
			} else {
				this._toggleAndFocusInput();
			}
		}
	}

	_toggleAndFocusInput() {
		this.togglePicker();
		this._getInput().focus();
	}

	_getInput() {
		return this.shadowRoot.querySelector("ui5-input");
	}

	_handleInputChange() {
		let nextValue = this._getInput().getInputValue();
		const emptyValue = nextValue === "";
		const isValid = emptyValue || this._checkValueValidity(nextValue);

		if (isValid) {
			nextValue = this.normalizeValue(nextValue);
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}


		this.value = nextValue;
		this.fireEvent("change", { value: nextValue, valid: isValid });
		// Angular two way data binding
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue();
		const emptyValue = nextValue === "";
		const isValid = emptyValue || this._checkValueValidity(nextValue);

		this.value = nextValue;
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	_checkValueValidity(value) {
		return this.isValid(value) && this.isInValidRange(this._getTimeStampFromString(value));
	}

	_click(event) {
		if (isPhone()) {
			this.responsivePopover.open(this);
			event.preventDefault(); // prevent immediate selection of any item
		}
	}

	/**
	 * Checks if a value is valid against the current date format of the DatePicker.
	 * @param {string} value A value to be tested against the current date format
	 * @public
	 */
	isValid(value = "") {
		return !!(value && this.getFormat().parse(value));
	}

	/**
	 * Checks if a date is in range between minimum and maximum date.
	 * @param {object} value
	 * @public
	 */
	isInValidRange(value = "") {
		if (value === "") {
			return true;
		}

		const pickedDate = new Date(value),
			minDate = this._minDate && new Date(this._minDate),
			maxDate = this._maxDate && new Date(this._maxDate);

		if (minDate && maxDate) {
			if (minDate <= pickedDate && maxDate >= pickedDate) {
				return true;
			}
		} else if (minDate && !maxDate) {
			if (minDate <= pickedDate) {
				return true;
			}
		} else if (maxDate && !minDate) {
			if (maxDate >= pickedDate) {
				return true;
			}
		} else if (!maxDate && !minDate) {
			return true;
		}

		return false;
	}

	// because the parser understands more than one format
	// but we need values in one format
	normalizeValue(value) {
		if (value === "") {
			return value;
		}

		return this.getFormat().format(this.getFormat().parse(value));
	}

	get validValue() {
		if (this.isValid(this.value)) {
			return this.value;
		}
		return this.getFormat().format(new Date());
	}

	get calendar() {
		return this.responsivePopover.querySelector(`#${this._id}-calendar`);
	}

	get _calendarDate() {
		const millisecondsUTC = this.getFormat().parse(this.validValue, true).getTime();
		const oCalDate = CalendarDate.fromTimestamp(
			millisecondsUTC - (millisecondsUTC % (24 * 60 * 60 * 1000)),
			this._primaryCalendarType
		);
		return oCalDate;
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _displayFormat() {
		return this.getFormat().oFormatOptions.pattern;
	}

	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get phone() {
		return isPhone();
	}

	get showHeader() {
		return this.phone;
	}

	get showFooter() {
		return this.phone;
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get accInfo() {
		return {
			"ariaDescribedBy": `${this._id}-date`,
			"ariaHasPopup": "true",
			"ariaAutoComplete": "none",
			"role": "combobox",
			"ariaOwns": `${this._id}-responsive-popover`,
			"ariaExpanded": this.isOpen(),
			"ariaDescription": this.dateAriaDescription,
		};
	}

	get _maxDate() {
		if (this.maxDate) {
			return this._getTimeStampFromString(this.maxDate);
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			return this._getTimeStampFromString(this.minDate);
		}
		return this.minDate;
	}

	get openIconTitle() {
		return this.i18nBundle.getText(DATEPICKER_OPEN_ICON_TITLE);
	}

	get openIconName() {
		return "appointment-2";
	}

	get dateAriaDescription() {
		return this.i18nBundle.getText(DATEPICKER_DATE_ACC_TEXT);
	}

	/**
	 * Defines whether the dialog on mobile should have header
	 * @private
	 */
	get _shouldHideHeader() {
		return false;
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("ui5-responsive-popover");
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_handleCalendarChange(event) {
		const iNewValue = event.detail.dates && event.detail.dates[0];

		if (this._calendar.selectedDates.indexOf(iNewValue) !== -1) {
			this.closePicker();
			return false;
		}

		const fireChange = this._handleCalendarSelectedDatesChange(event, iNewValue);

		if (fireChange) {
			this.fireEvent("change", { value: this.value, valid: true });
			// Angular two way data binding
			this.fireEvent("value-changed", { value: this.value, valid: true });
		}

		this.closePicker();
	}

	_handleCalendarSelectedDatesChange(event, newValue) {
		this._updateValueCalendarSelectedDatesChange(newValue);

		this._calendar.timestamp = newValue;
		this._calendar.selectedDates = event.detail.dates;
		this._focusInputAfterClose = true;

		if (this.isInValidRange(this._getTimeStampFromString(this.value))) {
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}

		return true;
	}

	_updateValueCalendarSelectedDatesChange(newValue) {
		this.value = this.getFormat().format(
			new Date(CalendarDate.fromTimestamp(
				newValue * 1000,
				this._primaryCalendarType
			).valueOf()),
			true
		);
	}

	/**
	 * Formats a Java Script date object into a string representing a locale date
	 * according to the <code>formatPattern</code> property of the DatePicker instance
	 * @param {object} oDate A Java Script date object to be formatted as string
	 * @public
	 */
	formatValue(oDate) {
		return this.getFormat().format(oDate);
	}

	/**
	 * Closes the picker.
	 * @public
	 */
	closePicker() {
		this.responsivePopover.close();
	}

	/**
	 * Opens the picker.
	 * @param {object} options A JSON object with additional configuration.<br>
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	async openPicker(options) {
		this._isPickerOpen = true;
		this.responsivePopover = await this._respPopover();
		this._changeCalendarSelection();

		if (options && options.focusInput) {
			this._focusInputAfterOpen = true;
		}

		this.responsivePopover.open(this);
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.updateStaticAreaItemContentDensity();
			this.openPicker();
		}
	}

	_changeCalendarSelection(focusTimestamp) {
		if (this._calendarDate.getYear() < 1) {
			// 0 is a valid year, but we cannot display it
			return;
		}

		const oCalDate = this._calendarDate;
		const timestamp = focusTimestamp || oCalDate.valueOf() / 1000;

		this._calendar = Object.assign({}, this._calendar);
		this._calendar.timestamp = timestamp;
		if (this.value) {
			this._calendar.selectedDates = [timestamp];
		}
	}

	/**
	 * Checks if the picker is open.
	 * @returns {Boolean} true if the picker is open, false otherwise
	 * @public
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	/**
	 * Gets some semantic details about an event originated in the control.
	 * @param {*} event An event object
	 * @returns {Object} Semantic details
	 */
	getSemanticTargetInfo(event) {
		const oDomTarget = getDomTarget(event);
		let isInput = false;

		if (oDomTarget && oDomTarget.className.indexOf("ui5-input-inner") > -1) {
			isInput = true;
		}

		return { isInput };
	}

	/**
	 * Currently selected date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get dateValue() {
		return this.getFormat().parse(this.value);
	}

	get styles() {
		return {
			main: {
				width: "100%",
			},
		};
	}

	get type() {
		return InputType.Text;
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			Icon.define(),
			ResponsivePopover.define(),
			Calendar.define(),
			Input.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

const getDomTarget = event => {
	let target,
		composedPath;

	if (typeof event.composedPath === "function") {
		composedPath = event.composedPath();
	}

	if (Array.isArray(composedPath) && composedPath.length) {
		target = composedPath[0];
	}

	return target;
};

DatePicker.define();

export default DatePicker;
