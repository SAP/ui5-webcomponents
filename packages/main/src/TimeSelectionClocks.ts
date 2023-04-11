import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
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
import type { ChangeEventDetail } from "./TimePickerClock.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import TimePickerInternals from "./TimePickerInternals.js";
import TimePickerClock from "./TimePickerClock.js";
import ToggleSpinButton from "./ToggleSpinButton.js";

import {
	isDown,
	isUp,
	isDownAlt,
	isUpAlt,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";


// import SegmentedButton from "./SegmentedButton.js";


import {
	TIMEPICKER_HOURS_LABEL,
	TIMEPICKER_MINUTES_LABEL,
	TIMEPICKER_SECONDS_LABEL,
	TIMEPICKER_CLOCK_DIAL_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Template
import TimeSelectionClocksTemplate from "./generated/templates/TimeSelectionClocksTemplate.lit.js";

// Styles
import TimeSelectionClocksCss from "./generated/themes/TimeSelectionClocks.css.js";

type TimeSelectionClocksChangeEventDetail = {
	value: string | undefined,
	valid: boolean,
}

type TimePickerClockProperties = {
	id: string,
	label: string,
	itemMin: number,
	itemMax: number,
	selectedValue: number,
	displayStep: number,
	valueStep: number,
	lastItemReplacement: number,
	innerItems: boolean,
	prependZero: boolean,
	active: boolean,
}

type ToggleSpinButtonProperties = {
	id: string,
	valueMin: number,
	valueMax: number,
	valueNow: number,
	valueString: string,
	valueText: string,
	accessibleName: string,
	pressed: boolean,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-time-selection-clocks</code> is component that contains all the <code>ui5-time-picker-clock</code> components
 * necessary for the <code>ui5-time-picker</code> as well as all necessary buttons used for switching between different clocks.
 * <code>ui5-time-picker-clock</code> components and buttons depend on the time format set to <code>ui5-time-picker</code>
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-time-selection-clocks</code> can display hours, minutes or seconds <code>ui5-time-picker-clock</code> components
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/TimeSelectionClocks.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimeSelectionClocks
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-time-selection-clocks
 * @since 1.??.??
 * @private
 */
@customElement({
	tag: "ui5-time-selection-clocks",
	renderer: litRender,
	styles: TimeSelectionClocksCss,
	template: TimeSelectionClocksTemplate,
	dependencies: [
		TimePickerClock,
	],
})

class TimeSelectionClocks extends TimePickerInternals {
	/**
	 * Contains currently available Time Picker Clock components depending on time format.
	 *
	 * @type {Array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_clocks!: Array<TimePickerClockProperties>;

	/**
	 * Contains currently available Button components depending on time format.
	 *
	 * @type {Array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_buttons!: Array<ToggleSpinButtonProperties>;

	/**
	 * The index of the active Clock/TogleSpinButton.
	 * @private
	 * @defaultvalue 0
	 * @type {Integer}
	 */
	@property({ validator: Integer, defaultValue: 0 })
	_activeIndex!: number;

	constructor() {
		super();

		this._createComponents();
	}

	static i18nBundle: I18nBundle;

	static async onDefine() {
		[TimeSelectionClocks.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}

	onAfterRendering() {
		// const button = this._buttonComponent(this._activeIndex);

		// set initially seleced button focused; the active button should always stay focused.
		// setTimeout(() => button && button.focus(), 1000);
		// this.focus();
	}

	get _showAmPmButton(): boolean {
		return true;
	}

	get _pmPressed(): boolean {
		return false;
	}

	_buttonFocusIn(evt: Event) {
		const target = evt.target as HTMLElement;
		const index = this._getIndexFromId(target.id);
		this._switchClock(index);
	}

	_onkeyup(evt: KeyboardEvent) {
	}

	_onkeydown(evt: KeyboardEvent) {
		const clock = this._clockComponent(this._activeIndex);

		if (isSpace(evt)) {
			this._switchNextClock(true);
		} else if ((isUp(evt) || isDown(evt)) && !isUpAlt(evt) && !isDownAlt(evt)) {
			// Arrows up/down increase/decrease currently active clock
			clock && !clock.disabled && clock._modifyValue(isUp(evt));
			evt.preventDefault();
		}
	}

	/**
	 * Createss clock and button components according to the display format pattern
	 *
	 * @private
	 */
	_createComponents() {
		const hoursLabel = TimeSelectionClocks.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
		const minutesLabel = TimeSelectionClocks.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
		const secondsLabel = TimeSelectionClocks.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);

		const timeObject = {
			hours: 15,
			minutes: 33,
			seconds: 17,
		};

		this._clocks = [];
		this._buttons = [];

		// add Hours clock
		this._clocks.push({
			"id": `${this._id}_clock_0`,
			"label": hoursLabel,
			"itemMin": 1,
			"itemMax": 12,
			"selectedValue": timeObject.hours,
			"displayStep": 1,
			"valueStep": 1,
			"lastItemReplacement": 0,
			"innerItems": true,
			"prependZero": true,
			"active": this._activeIndex === 0,
		});

		// add Minutes clock
		this._clocks.push({
			"id": `${this._id}_clock_1`,
			"label": minutesLabel,
			"itemMin": 1,
			"itemMax": 60,
			"selectedValue": timeObject.minutes,
			"displayStep": 5,
			"valueStep": 1,
			"lastItemReplacement": 0,
			"innerItems": false,
			"prependZero": false,
			"active": this._activeIndex === 1,
		});

		// add Seconds clock
		this._clocks.push({
			"id": `${this._id}_clock_2`,
			"label": secondsLabel,
			"itemMin": 1,
			"itemMax": 60,
			"selectedValue": timeObject.seconds,
			"displayStep": 5,
			"valueStep": 1,
			"lastItemReplacement": 0,
			"innerItems": false,
			"prependZero": false,
			"active": this._activeIndex === 2,
		});

		// add Hours button
		this._buttons.push({
			"id": `${this._id}_button_0`,
			"valueMin": 0,
			"valueMax": 23,
			"valueNow": timeObject.hours,
			"valueString": timeObject.hours.toString().padStart(2, "0"),
			"valueText": `${timeObject.hours} ${hoursLabel}`,
			"accessibleName": hoursLabel,
			"pressed": this._activeIndex === 0,
		});

		// add Minutes button
		this._buttons.push({
			"id": `${this._id}_button_1`,
			"valueMin": 0,
			"valueMax": 59,
			"valueNow": timeObject.minutes,
			"valueString": timeObject.minutes.toString().padStart(2, "0"),
			"valueText": `${timeObject.minutes} ${minutesLabel}`,
			"accessibleName": minutesLabel,
			"pressed": this._activeIndex === 1,
		});

		// add Seconds button
		this._buttons.push({
			"id": `${this._id}_button_2`,
			"valueMin": 0,
			"valueMax": 59,
			"valueNow": timeObject.seconds,
			"valueString": timeObject.seconds.toString().padStart(2, "0"),
			"valueText": `${timeObject.seconds} ${secondsLabel}`,
			"accessibleName": secondsLabel,
			"pressed": this._activeIndex === 2,
		});
	}

	_buttonComponent(index: number) {
		return this.shadowRoot?.querySelector<ToggleSpinButton>("#" + this._buttons[index].id);
	}

	_clockComponent(index: number) {
		return this.shadowRoot?.querySelector<TimePickerClock>("#" + this._clocks[index].id);
	}

	/**
	 * Switches to the specific clock.
	 *
	 * @param {int} clockIndex the index of the clock
	 * @private
	 */
	_switchClock(clockIndex: number) {
		const newButton = this._buttonComponent(clockIndex);

		if (this._clocks.length > 0 && clockIndex < this._clocks.length && newButton) {
			this._clocks[this._activeIndex].active = false;
			this._buttons[this._activeIndex].pressed = false;
			this._activeIndex = clockIndex;
			this._clocks[this._activeIndex].active = true;
			this._buttons[this._activeIndex].pressed = true;
			newButton.focus();
		}
	}

	_switchNextClock(wrapAround: boolean) {
		let activeIndex = this._activeIndex;
		const startActiveIndex = activeIndex;
		const clocksCount = this._clocks.length;
		const activeClock = this._clockComponent(activeIndex);

		do {
			activeIndex++;
			if (activeIndex >= clocksCount) {
				activeIndex = wrapAround ? 0 : clocksCount - 1;
			}
		// false-positive finding of no-unmodified-loop-condition rule
		// eslint-disable-next-line no-unmodified-loop-condition
		} while (activeClock && activeClock.disabled && activeIndex !== startActiveIndex && (wrapAround || activeIndex < clocksCount - 1));

		const newClock = this._clockComponent(activeIndex);
		if (activeIndex !== startActiveIndex && newClock && !newClock.disabled) {
			this._switchClock(activeIndex);
		}
	}

	/**
	 * Returns aria-label text for clock dial container.
	 *
	 * @returns {string} aria-label text
	 * @private
	 */
	_clockDialAriaLabel() {
		TimeSelectionClocks.i18nBundle.getText(TIMEPICKER_CLOCK_DIAL_LABEL)
	}

	/**
	 * Returns index of the clock or button from the id of the event target.
	 *
	 * @returns {number} index of the clock/button
	 * @private
	 */
	_getIndexFromId(id: string) {
		const parts = id.split("_");
		return parts.length > 0 ? parseInt(parts[parts.length - 1]) : 0;
	}

	/** Button 'click' event handler
	 *
	 * @param {event} evt Event object
	 * @private
	 */
	_buttonClick(evt: Event) {
//		this._switchClock(this._getIndexFromId((evt.target as HTMLElement).id));
	}

	/** Clock 'change' event handler
	 *
	 * @param {event} evt Event object
	 * @private
	 */
	_clockChange(evt: CustomEvent<ChangeEventDetail>) {
		const index = this._getIndexFromId((evt.target as HTMLElement).id);
		const value = (evt as CustomEvent<ChangeEventDetail>).detail.stringValue;
		const button = this._buttonComponent(index);

		if (!button) {
			return;
		}

		this._buttons[index].valueString = value;
		this._buttons = JSON.parse(JSON.stringify(this._buttons));

		if (evt.detail.finalChange) {
			if (this._activeIndex < this._clocks.length - 1) {
				this._switchNextClock(false);
				const newButton = this._buttonComponent(this._activeIndex);
				// newButton?.focus();
			} else {
				button.focus();
			}
		}
	}

}

TimeSelectionClocks.define();

export default TimeSelectionClocks;
export type { TimeSelectionClocksChangeEventDetail };
