import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import { fetchCldrData } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/CLDR";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import IconPool from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/IconPoolProxy";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat";
import CalendarType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarType";
import CalendarDate from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarDate";
import ValueState from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/ValueState";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import DatePickerTemplateContext from "./DatePickerTemplateContext";
import Icon from "./Icon";
import Popover from "./Popover";
import Calendar from "./Calendar";
import PopoverPlacementType from "./types/PopoverPlacementType";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign";
import Input from "./Input";
import InputType from "./types/InputType";
import DatePickerRenderer from "./build/compiled/DatePickerRenderer.lit";

// Styles
import belize from "./themes/sap_belize/DatePicker.less";
import belizeHcb from "./themes/sap_belize_hcb/DatePicker.less";
import fiori3 from "./themes/sap_fiori_3/DatePicker.less";

// default calendar for bundling
import "@ui5/webcomponents-core/dist/sap/ui/core/date/Gregorian";

ShadowDOM.registerStyle("sap_belize", "DatePicker.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "DatePicker.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "DatePicker.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-datepicker",
	styleUrl: [
		"DatePicker.css",
	],
	properties: /** @lends  sap.ui.webcomponents.main.DatePicker.prototype */ {
		/**
		 * Defines a formatted date value.
		 *
		 * @type {string}
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Visualizes the validation state of the Web Component, for example
		 * <code>Error</code>, <code>Warning</code> and
		 * <code>Success</code>.
		 *
		 * @type {string}
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
		 * @public
		 */
		formatPattern: {
			type: String,
		},

		/**
		 * Determines the calendar type.
		 * The input value is formated according to the calendar type and the picker shows
		 * months and years from the specified calendar.
		 *
		 * @type {string}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines whether the <code>ui5-datepicker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-datepicker</code> is displayed as readonly.
		 *
		 * @type {boolean}
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines a short hint, intended to aid the user with data entry when the
		 * <code>ui5-datepicker</code> has no value.
		 * <br><br>
		 * <b>Note:</b> The placeholder is not supported in IE. If the placeholder is provided, it won`t be displayed in IE.
		 * @type {string}
		 * @public
		 */
		placeholder: {
			defaultValue: null,
			type: String,
		},

		_isPickerOpen: {
			defaultValue: false,
			type: Boolean,
		},

		_input: {
			type: Object,
		},
		_popover: {
			type: Object,
		},
		_calendar: {
			type: Object,
			deepEqual: true,
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
		 * Fired when the value of the <code>ui5-datepicker</code> is changed,
		 * for example at each keypress.
		 *
		 * @event
		 * @public
		*/
		liveChange: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-datepicker</code> component provides an input field with assigned calendar which opens on user action.
 * The <code>ui5-datepicker</code> allows users to select a localized date using touch,
 * mouse, or keyboard input. It consists of two parts: the date input field and the
 * date picker.
 *
 * <h3>Usage</h3>
 *
 * The user can enter a date by:
 * <ul><li>Using the calendar that opens in a popup</li>
 * <li>Typing it in directly in the input field</li></ul>
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
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DatePicker";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DatePicker
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-datepicker
 * @public
 */
class DatePicker extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return DatePickerRenderer;
	}

	static get calculateTemplateContext() {
		return DatePickerTemplateContext.calculate;
	}


	constructor(state) {
		super(state);

		this._input = {};
		this._input.type = InputType.Text;
		this._input.icon = {};
		this._input.icon.src = IconPool.getIconURI("appointment-2");
		this._input.onChange = this._handleInputChange.bind(this);
		this._input.onLiveChange = this._handleInputLiveChange.bind(this);
		this.aArrows = [KeyCodes.ARROW_DOWN, KeyCodes.ARROW_UP]; // keys we need for keyboard handling

		this._popover = {
			placementType: PopoverPlacementType.Bottom,
			horizontalAlign: PopoverHorizontalAlign.Left,
			hideHeader: true,
			hideArrow: true,
			allowTargetOverlap: true,
			stayOpenOnScroll: true,
			afterClose: () => {
				const shadowRoot = this.shadowRoot;
				const popover = shadowRoot.querySelector(`#${this._id}-popover`);
				const calendar = popover.querySelector(`#${this._id}-calendar`);

				this._input = Object.assign({}, this._input);
				this._input.icon._customClasses = "sapWCDatePickerIcon";
				this._isPickerOpen = false;

				if (this._focusInputAfterClose) {
					this._getInput().focus();
					this._focusInputAfterClose = false;
				}

				calendar._hideMonthPicker();
				calendar._hideYearPicker();
			},
			afterOpen: () => {
				const shadowRoot = this.shadowRoot;
				const popover = shadowRoot.querySelector(`#${this._id}-popover`);
				const calendar = popover.querySelector(`#${this._id}-calendar`);
				const dayPicker = calendar.shadowRoot.querySelector(`#${calendar._id}-daypicker`);

				const selectedDay = dayPicker.shadowRoot.querySelector(".sapWCDayPickerItemSel");
				const today = dayPicker.shadowRoot.querySelector(".sapWCDayPickerItemNow");
				const focusableDay = selectedDay || today;

				if (this._focusInputAfterOpen) {
					this._focusInputAfterOpen = false;
					this._getInput().focus();
				} else if (focusableDay) {
					focusableDay.focus();

					dayPicker._itemNav.current = parseInt(focusableDay.getAttribute("data-sap-index"));
					dayPicker._itemNav.update();
				}
			},
		};

		this._calendar = {
			onSelectedDatesChange: this._handleCalendarSelectedDatesChange.bind(this),
			selectedDates: [],
		};
	}

	onBeforeRendering() {
		this._popover._customClasses = [];

		this._input.placeholder = this.placeholder;
		this._input._iconNonFocusable = true;

		this._calendar.primaryCalendarType = this._primaryCalendarType;
		this._calendar.formatPattern = this._formatPattern;

		if (this.isValid(this.value)) {
			this._changeCalendarSelection();
		} else {
			this._calendar.selectedDates = [];
		}
	}

	ontap(event) {
		const icon = this.shadowRoot.querySelector("ui5-icon");
		const isIconTab = (event.ui5target === icon);

		if (icon && (isIconTab || event.ui5target.contains(icon.getDomRef()))) {
			this.togglePicker();
		}
	}

	onkeydown(event) {
		if (event.which === KeyCodes.ALT) {
			return;
		}

		if (event.which === KeyCodes.F4 || (event.altKey && this.aArrows.includes(event.which))) {
			this.togglePicker();
			this._getInput().focus();
		}
	}

	_getInput() {
		return this.shadowRoot.querySelector("ui5-input");
	}

	_handleInputChange() {
		let nextValue = this._getInput().getInputValue();
		const isValid = this.isValid(nextValue);

		if (isValid) {
			nextValue = this.normalizeValue(nextValue);
		}

		this.value = nextValue;
		this.fireEvent("change", { value: nextValue, valid: isValid });
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue();
		const isValid = this.isValid(nextValue);

		this.value = nextValue;
		this.fireEvent("liveChange", { value: nextValue, valid: isValid });
	}

	/**
	 * Checks if a value is valid against the current date format of the DatePicker
	 * @param {string} value A value to be tested against the current date format
	 * @public
	 */
	isValid(value = "") {
		return !!this.getFormat().parse(value);
	}

	// because the parser understands more than one format
	// but we need values in one format
	normalizeValue(sValue) {
		return this.getFormat().format(this.getFormat().parse(sValue));
	}

	get validValue() {
		if (this.isValid(this.value)) {
			return this.value;
		}
		return this.getFormat().format(new Date());
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
		return this.primaryCalendarType || configuration.getCalendarType() || CalendarType.Gregorian;
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
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

	_getPopover() {
		return this.shadowRoot.querySelector("ui5-popover");
	}

	_iconPress() {
		this.togglePicker();
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_handleCalendarSelectedDatesChange(event) {
		const iNewValue = event.detail.dates && event.detail.dates[0];

		if (this._calendar.selectedDates.indexOf(iNewValue) !== -1) {
			this.closePicker();
			return;
		}

		this.value = this.getFormat().format(
			new Date(CalendarDate.fromTimestamp(
				iNewValue * 1000,
				this._primaryCalendarType
			).valueOf()),
			true
		);
		this._calendar.timestamp = iNewValue;
		this._calendar.selectedDates = event.detail.dates;

		this._focusInputAfterClose = true;
		this.closePicker();

		this.fireEvent("change", { value: this.value, valid: true });
	}

	/**
	 * Closes the picker.
	 * @public
	 */
	closePicker() {
		this._getPopover().close();
	}

	/**
	 * Opens the picker.
	 * @param {object} options A JSON object with additional configuration.<br>
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	openPicker(options) {
		this._changeCalendarSelection();
		this._input = Object.assign({}, this._input);
		this._input.icon._customClasses = "sapWCDatePickerIcon sapWCInputBaseIconPressed";

		if (options && options.focusInput) {
			this._focusInputAfterOpen = true;
		}

		this._getPopover().openBy(this);
		this._isPickerOpen = true;
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.openPicker();
		}
	}

	_changeCalendarSelection() {
		if (this._calendarDate.getYear() < 1) {
			// 0 is a valid year, but we cannot display it
			return;
		}

		const oCalDate = this._calendarDate;
		const timestamp = oCalDate.valueOf() / 1000;

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

		if (oDomTarget && oDomTarget.className.indexOf("sapWCInputBaseInner") > -1) {
			isInput = true;
		}

		return { isInput };
	}

	static async define(...params) {
		await Promise.all([
			fetchCldrData(configuration.getLocale().getLanguage(), configuration.getLocale().getRegion(), configuration.getLocale().getScript()),
			Icon.define(),
			Popover.define(),
			Calendar.define(),
			Input.define(),
		]);

		super.define(...params);
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

Bootstrap.boot().then(_ => {
	DatePicker.define();
});


export default DatePicker;
