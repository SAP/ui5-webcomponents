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
import type { TimePickerComponentIndexMap } from "./TimePickerInternals.js";
import TimePickerClock from "./TimePickerClock.js";
import ToggleSpinButton from "./ToggleSpinButton.js";
import SegmentedButton from "./SegmentedButton.js";


import {
	isDown,
	isUp,
	isDownAlt,
	isUpAlt,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
	isSpace,
	isKeyA,
	isKeyP,
} from "@ui5/webcomponents-base/dist/Keys.js";

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
		ToggleSpinButton,
		SegmentedButton,
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

	constructor() {
		super();

		this._createComponents();
	}

	onAfterRendering() {
	}

	/**
	 * Returns ToggleSpinButton component by index or name.
	 *
	 * @param {number | string} indexOrName the index or name of the component
	 * @returns { ToggleSpinButton | undefined} component (if exists) or undefined
	 * @private
	 */
	_buttonComponent(indexOrName: number | string) {
		if (typeof indexOrName === 'string') {
			const key = this._componentKey(indexOrName);
			const index = this._componentMap[key];
			return index !== undefined ? this.shadowRoot?.querySelector<ToggleSpinButton>("#" + this._buttons[index].id) : undefined;
		} else {
			return this.shadowRoot?.querySelector<ToggleSpinButton>("#" + this._buttons[indexOrName].id);
		}
	}

	/**
	 * Returns TimePickerClock component by index or name.
	 *
	 * @param {number | string} indexOrName the index or name of the component
	 * @returns { TimePickerClock | undefined} component (if exists) or undefined
	 * @private
	 */
	_clockComponent(indexOrName: number | string) {
		if (typeof indexOrName === 'string') {
			const key = this._componentKey(indexOrName);
			const index = this._componentMap[key];
			return index !== undefined ? this.shadowRoot?.querySelector<TimePickerClock>("#" + this._clocks[index].id) : undefined;
		} else {
			return this.shadowRoot?.querySelector<TimePickerClock>("#" + this._clocks[indexOrName].id);
		}
	}

	/**
	 * Returns name of the clock or button from the id of the event target.
	 *
	 * @returns {string | undefined} name of the clock/button
	 * @private
	 */
	_getNameFromId(id: string) {
		const parts = id.split("_");
		return parts.length > 0 ? parts[parts.length - 1] : undefined;
	}

	/**
	 * Returns index of the clock or button from the id of the event target.
	 *
	 * @returns {number} index of the clock/button
	 * @private
	 */
	_getIndexFromId(id: string) {
		const name = this._getNameFromId(id);
		if (name) {
			const key = this._componentKey(name);
			return this._componentMap[key];
		} else {
			return 0;
		}
	}

	_buttonFocusIn(evt: Event) {
		const target = evt.target as HTMLElement;
		const name = this._getNameFromId(target.id);
		name && this._switchTo(name);
		// const index = this._getIndexFromId(target.id);
		// this._switchClock(index);
	}

	_onkeyup(evt: KeyboardEvent) {
	}

	_onkeydown(evt: KeyboardEvent) {
		let clock;

		if (isSpace(evt)) {
			this._switchNextClock(true);
		} else if ((isUp(evt) || isDown(evt)) && !isUpAlt(evt) && !isDownAlt(evt)) {
			// Arrows up/down increase/decrease currently active clock
			clock = this._clockComponent(this._activeIndex);
			clock && !clock.disabled && clock._modifyValue(isUp(evt));
			evt.preventDefault();
		} else if (isPageUp(evt) || isPageDown(evt)) {
			// PageUp/PageDown increase/decrease hours clock
			clock = this._clockComponent('hours');
			if (clock && !clock.disabled) {
				this._switchTo('hours');
				clock._modifyValue(isPageUp(evt));
			}
			evt.preventDefault();
		} else if (isPageUpShift(evt) || isPageDownShift(evt)) {
			// Shift+PageUp/Shift+PageDown increase/decrease minutes clock
			clock = this._clockComponent('minutes');
			if (clock && !clock.disabled) {
				this._switchTo('minutes');
				clock._modifyValue(isPageUpShift(evt));
			}
			evt.preventDefault();
		} else if (isPageUpShiftCtrl(evt) || isPageDownShiftCtrl(evt)) {
			// Ctrl+Shift+PageUp/Ctrl+Shift+PageDown increase/decrease seconds clock
			clock = this._clockComponent('seconds');
			if (clock && !clock.disabled) {
				this._switchTo('seconds');
				clock._modifyValue(isPageUpShiftCtrl(evt));
			}
			evt.preventDefault();
		} else if (isKeyA(evt) || isKeyP(evt)) {
			// A/P selects AM/PM segmented button item
			const buttonAmPm = this._buttonAmPm();
			if (buttonAmPm) {
				buttonAmPm.items[0].pressed = isKeyA(evt);
				buttonAmPm.items[1].pressed = isKeyP(evt);
			}
			evt.preventDefault();
		}
	}

	/**
	 * Createss clock and button components according to the display format pattern
	 *
	 * @private
	 */
	_createComponents() {

		// REPLACE WITH REAL DATA
		const time = {
			hours: parseInt(this._hours),
			minutes: parseInt(this._minutes),
			seconds: parseInt(this._seconds),
		};

		console.warn(this.periodsArray);

		this._clocks = [];
		this._buttons = [];
		this._periods = [];

		if (this._hasHoursComponent) {
			// add Hours clock
			this._componentMap.hours = this._clocks.length;
			this._clocks.push({
				"id": `${this._id}_clock_hours`,
				"label": this.hoursLabel,
				"itemMin": 1,
				"itemMax": 12,
				"selectedValue": time.hours,
				"displayStep": 1,
				"valueStep": 1,
				"lastItemReplacement": 0,
				"innerItems": true,
				"prependZero": true,
				"active": true,
			});
			// add Hours button
			this._buttons.push({
				"id": `${this._id}_button_hours`,
				"valueMin": 0,
				"valueMax": 23,
				"valueNow": time.hours,
				"valueString": this._hours,
				"valueText": `${time.hours} ${this.hoursLabel}`,
				"accessibleName": this.hoursLabel,
				"pressed": true,
			});
		}

		if (this._hasMinutesComponent) {
			// add Minutes clock
			this._componentMap.minutes = this._clocks.length;
			this._clocks.push({
				"id": `${this._id}_clock_minutes`,
				"label": this.minutesLabel,
				"itemMin": 1,
				"itemMax": 60,
				"selectedValue": time.minutes,
				"displayStep": 5,
				"valueStep": 1,
				"lastItemReplacement": 0,
				"innerItems": false,
				"prependZero": false,
				"active": false,
			});

			// add Minutes button
			this._buttons.push({
				"id": `${this._id}_button_minutes`,
				"valueMin": 0,
				"valueMax": 59,
				"valueNow": time.minutes,
				"valueString": this._minutes,
				"valueText": `${time.minutes} ${this.minutesLabel}`,
				"accessibleName": this.minutesLabel,
				"pressed": false,
			});
		}

		if (this._hasSecondsComponent) {
			// add Seconds clock
			this._componentMap.seconds = this._clocks.length;
			this._clocks.push({
				"id": `${this._id}_clock_seconds`,
				"label": this.secondsLabel,
				"itemMin": 1,
				"itemMax": 60,
				"selectedValue": time.seconds,
				"displayStep": 5,
				"valueStep": 1,
				"lastItemReplacement": 0,
				"innerItems": false,
				"prependZero": false,
				"active": false,
			});

			// add Seconds button
			this._buttons.push({
				"id": `${this._id}_button_seconds`,
				"valueMin": 0,
				"valueMax": 59,
				"valueNow": time.seconds,
				"valueString": this._seconds,
				"valueText": `${time.seconds} ${this.secondsLabel}`,
				"accessibleName": this.secondsLabel,
				"pressed": false,
			});
		}

		if (this._hasPeriodsComponent) {
			// add period item
			this.periodsArray.forEach((item) => {
				this._periods.push({
					"label": item,
					"pressed": this._period === item,
				});
			})
		}
	}

	/**
	 * Switches to the specific clock by name.
	 *
	 * @param {string} clockName the name of the clock
	 * @private
	 */
	_switchTo(clockName: string) {
		const key = this._componentKey(clockName);
		if (this._componentMap[key] !== undefined) {
			this._switchClock(this._componentMap[key]);
		}
	}

	/**
	 * Switches to the specific clock by its index in _clocks property.
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
		const stringValue = (evt as CustomEvent<ChangeEventDetail>).detail.stringValue;
		const value =  (evt as CustomEvent<ChangeEventDetail>).detail.value;
		const button = this._buttonComponent(index);

		if (!button) {
			return;
		}

		this._buttons[index].valueString = stringValue;
		this._buttons[index].valueNow = value;
		this._buttons[index].valueText = `${value} ${this._buttons[index].accessibleName}`;
		this._buttons = JSON.parse(JSON.stringify(this._buttons));

		if (evt.detail.finalChange) {
			if (this._activeIndex < this._clocks.length - 1) {
				this._switchNextClock(false);
				const newButton = this._buttonComponent(this._activeIndex);
			} else {
				button.focus();
			}
		}
	}

}

TimeSelectionClocks.define();

export default TimeSelectionClocks;
