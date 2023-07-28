import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
	isEnter,
	isKeyA,
	isKeyP,
	isNumber,
	isColon,
} from "@ui5/webcomponents-base/dist/Keys.js";
import TimePickerInternals from "./TimePickerInternals.js";
import TimePickerClock from "./TimePickerClock.js";
import ToggleSpinButton from "./ToggleSpinButton.js";
import SegmentedButton from "./SegmentedButton.js";

import type { TimePickerClockChangeEventDetail } from "./TimePickerClock.js";

// Template
import TimeSelectionClocksTemplate from "./generated/templates/TimeSelectionClocksTemplate.lit.js";

// Styles
import TimeSelectionClocksCss from "./generated/themes/TimeSelectionClocks.css.js";

type TimePickerClockProperties = {
	id: string,
	label: string,
	clock: string,
	itemMin: number,
	itemMax: number,
	selectedValue: number,
	displayStep: number,
	valueStep: number,
	lastItemReplacement: number,
	showInnerCircle: boolean,
	prependZero: boolean,
	min: number,
	max: number,
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
	separator: string,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-time-selection-clocks</code> is component that contains all the <code>ui5-time-picker-clock</code> components
 * necessary for the <code>ui5-time-picker</code> as well as all necessary <code>ui5-toggle-spin-button</code> components
 * used for switching between different clocks.
 * <code>ui5-time-picker-clock</code> components and <code>ui5-toggle-spin-button</code> depend on the time format set to
 * <code>ui5-time-picker</code> component.
 *
 * This component should not be used separately.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimeSelectionClocks
 * @extends sap.ui.webc.main.TimePickerInternals
 * @abstract
 * @tagname ui5-time-selection-clocks
 * @since 1.15.0
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
	 */
	@property({ type: Object, multiple: true })
	_clocks!: Array<TimePickerClockProperties>;

	/**
	 * Contains currently available Button components depending on time format.
	 *
	 * @type {Array}
	 */
	@property({ type: Object, multiple: true })
	_buttons!: Array<ToggleSpinButtonProperties>;

	/**
	 * Flag for pressed Space key
	 */
	@property({ type: Boolean, noAttribute: true })
	_spacePressed!: boolean;

	onBeforeRendering() {
		this._createComponents();
	}

	/**
	 * Returns ToggleSpinButton component by index or name.
	 *
	 * @param {number | string} indexOrName the index or name of the component
	 * @returns { ToggleSpinButton | undefined} component (if exists) or undefined
	 */
	_buttonComponent(indexOrName: number | string) {
		if (typeof indexOrName === "string") {
			const key = this._componentKey(indexOrName);
			const index = this._componentMap[key];
			return index !== undefined ? this.shadowRoot?.querySelector<ToggleSpinButton>(`#${this._buttons[index].id}`) : undefined;
		}
		return this.shadowRoot?.querySelector<ToggleSpinButton>(`#${this._buttons[indexOrName].id}`);
	}

	/**
	 * Returns TimePickerClock component by index or name.
	 *
	 * @param {number | string} indexOrName the index or name of the component
	 * @returns { TimePickerClock | undefined} component (if exists) or undefined
	 */
	_clockComponent(indexOrName: number | string) {
		if (typeof indexOrName === "string") {
			const key = this._componentKey(indexOrName);
			const index = this._componentMap[key];
			return index !== undefined ? this.shadowRoot?.querySelector<TimePickerClock>(`#${this._clocks[index].id}`) : undefined;
		}
		return this.shadowRoot?.querySelector<TimePickerClock>(`#${this._clocks[indexOrName].id}`);
	}

	/**
	 * Returns name of the clock or button from the id of the event target.
	 *
	 * @returns {string | undefined} name of the clock/button
	 */
	_getNameFromId(id: string) {
		const parts = id.split("_");
		return parts.length > 0 ? parts[parts.length - 1] : undefined;
	}

	/**
	 * Returns index of the clock or button from the id of the event target.
	 *
	 * @returns {number} index of the clock/button
	 */
	_getIndexFromId(id: string) {
		const name = this._getNameFromId(id);
		if (name) {
			const key = this._componentKey(name);
			return this._componentMap[key];
		}
		return 0;
	}

	/**
	 * TimePickerClocks focusin event handler. Focuses the active button and switches to active clock.
	 *
	 * @param {event} evt Event object
	 */
	_clocksFocusIn(evt: Event) {
		const target = evt.target as HTMLElement;
		if (target.id === this._id) {
			this._switchClock(this._activeIndex);
		}
	}

	/**
	 * ToggleSpinButton focusin event handler.Switches to clock which button is being focused.
	 *
	 * @param {event} evt Event object
	 */
	_buttonFocusIn(evt: Event) {
		const target = evt.target as HTMLElement;
		const name = this._getNameFromId(target.id);
		name && this._switchTo(name);
	}

	/**
	 * keyup event handler.
	 *
	 * @param {event} evt Event object
	 */
	_onkeyup(evt: KeyboardEvent) {
		if (isSpace(evt)) {
			this._spacePressed = false;
		}
	}

	/**
	 * keydown event handler.
	 *
	 * @param {event} evt Event object
	 */
	_onkeydown(evt: KeyboardEvent) {
		let clock;
		const toggleSpinButtonTarget = evt.target && (evt.target as HTMLElement).tagName.toLowerCase().indexOf("segmented") === -1;

		if (isEnter(evt)) {
			// Accept the time and close the popover
			this.fireEvent("close-picker");
		} else if (isSpace(evt) && toggleSpinButtonTarget && !this._spacePressed) {
			evt.preventDefault();
			this._spacePressed = true;
			this._kbdBuffer = "";
			this._resetCooldown(true);
			this._switchNextClock(true);
		} else if ((isUp(evt) || isDown(evt)) && !isUpAlt(evt) && !isDownAlt(evt)) {
			// Arrows up/down increase/decrease currently active clock
			clock = this._clockComponent(this._activeIndex);
			clock && !clock.disabled && clock._modifyValue(isUp(evt));
			evt.preventDefault();
		} else if (isPageUp(evt) || isPageDown(evt)) {
			// PageUp/PageDown increase/decrease hours clock
			clock = this._clockComponent("hours");
			if (clock && !clock.disabled) {
				this._switchTo("hours");
				clock._modifyValue(isPageUp(evt));
			}
			evt.preventDefault();
		} else if (isPageUpShift(evt) || isPageDownShift(evt)) {
			// Shift+PageUp/Shift+PageDown increase/decrease minutes clock
			clock = this._clockComponent("minutes");
			if (clock && !clock.disabled) {
				this._switchTo("minutes");
				clock._modifyValue(isPageUpShift(evt));
			}
			evt.preventDefault();
		} else if (isPageUpShiftCtrl(evt) || isPageDownShiftCtrl(evt)) {
			// Ctrl+Shift+PageUp/Ctrl+Shift+PageDown increase/decrease seconds clock
			clock = this._clockComponent("seconds");
			if (clock && !clock.disabled) {
				this._switchTo("seconds");
				clock._modifyValue(isPageUpShiftCtrl(evt));
			}
			evt.preventDefault();
		} else if (isKeyA(evt) || isKeyP(evt)) {
			// A/P selects AM/PM segmented button item
			const buttonAmPm = this._buttonAmPm();
			if (buttonAmPm) {
				buttonAmPm.items[0].pressed = isKeyA(evt);
				buttonAmPm.items[1].pressed = isKeyP(evt);
				const period = isKeyA(evt) ? buttonAmPm.items[0].textContent : buttonAmPm.items[1].textContent;
				period && this._calculatePeriodChange(period);
			}
			evt.preventDefault();
		} else if (isColon(evt)) {
			// Colon (:) - Switch to next clock
			this._kbdBuffer = "";
			this._exactMatch = undefined;
			this._resetCooldown(true);
			this._switchNextClock(true);
		} else if (isNumber(evt) && this._clocks[this._activeIndex]) {
			// Direct number entry
			this._exactMatch = undefined;
			this._resetCooldown(true);
			this._numbersInput(evt);
		}
	}

	/**
	 * Handles direct numbers entry.
	 *
	 * @param {event} evt Event object
	 */
	_numbersInput(evt: KeyboardEvent) {
		const char = evt.key;
		const bufferStr = this._kbdBuffer + char;
		const bufferNum = parseInt(bufferStr);
		let indexStr = "";
		let indexNum = 0;
		let matching = 0;
		let valueMatching = -1;
		let activeClock = this._clockComponent(this._activeIndex);

		if (this._clocks[this._activeIndex].valueStep === 1) {
			// when the step=1, there is "direct" approach - while typing, the exact value is selected
			if (bufferNum > this._clocks[this._activeIndex].max) {
				// value accumulated in the buffer (old entry + new entry) is greater than the clock maximum value,
				// so assign old entry to the current clock and then switch to the next clock, and add new entry as an old value
				activeClock && activeClock._setSelectedValue(parseInt(this._kbdBuffer));
				this._switchNextClock();
				this._kbdBuffer = char;
				activeClock = this._clockComponent(this._activeIndex);
				activeClock && activeClock._setSelectedValue(parseInt(char));
				this._resetCooldown(true);
			} else {
				// value is less than clock's max value, so add new entry to the buffer
				this._kbdBuffer = bufferStr;
				activeClock && activeClock._setSelectedValue(parseInt(this._kbdBuffer));
				if (this._kbdBuffer.length === 2 || parseInt(`${this._kbdBuffer}0`) > this._clocks[this._activeIndex].max) {
					// if buffer length is 2, or buffer value + one more (any) number is greater than clock's max value
					// there is no place for more entry - just set buffer as a value, and switch to the next clock
					this._resetCooldown(this._kbdBuffer.length !== 2);
					this._kbdBuffer = "";
					this._switchNextClock();
				}
			}
		} else {
			// when the step is > 1, while typing, the exact match is searched, otherwise the first value that starts with entered value, is being selected
			// find matches
			for (indexNum = this._clocks[this._activeIndex].min; indexNum <= this._clocks[this._activeIndex].max; indexNum++) {
				if (indexNum % this._clocks[this._activeIndex].valueStep === 0) {
					indexStr = indexNum.toString();
					if (bufferStr === indexStr.substr(0, bufferStr.length) || bufferNum === indexNum) {
						matching++;
						valueMatching = matching === 1 ? indexNum : -1;
						if (bufferNum === indexNum) {
							this._exactMatch = indexNum;
						}
					}
				}
			}
			if (matching === 1) {
				// only one item is matching
				activeClock && activeClock._setSelectedValue(valueMatching);
				this._exactMatch = undefined;
				this._kbdBuffer = "";
				this._resetCooldown(true);
				this._switchNextClock();
			} else if (bufferStr.length === 2) {
				// no matches, but 2 numbers are entered, start again
				this._exactMatch = undefined;
				this._kbdBuffer = "";
				this._resetCooldown(true);
			} else {
				// no match, add last number to buffer
				this._kbdBuffer = bufferStr;
			}
		}
	}

	/**
	 * Sets the exact match value. Must be overriden.
	 */
	_setExactMatch() {
		const clock = this._clockComponent(this._activeIndex);
		clock && this._exactMatch !== undefined && clock._setSelectedValue(this._exactMatch);
	}

	/**
	 * Creates clock and button components according to the display format pattern.
	 */
	_createComponents() {
		const time = {
			hours: parseInt(this._hours),
			minutes: parseInt(this._minutes),
			seconds: parseInt(this._seconds),
		};

		this._getSeparators();

		this._clocks = [];
		this._buttons = [];
		this._periods = [];

		this._componentMap = {
			hours: -1,
			minutes: -1,
			seconds: -1,
		};

		if (this._hasHoursComponent) {
			// add Hours clock
			this._componentMap.hours = this._clocks.length;
			this._clocks.push({
				"id": `${this._id}_clock_hours`,
				"label": this.hoursLabel,
				"clock": "hours",
				"itemMin": 1,
				"itemMax": 12,
				"selectedValue": time.hours,
				"displayStep": 1,
				"valueStep": 1,
				"lastItemReplacement": this._hoursConfiguration.isTwelveHoursFormat ? -1 : 0,
				"showInnerCircle": !this._hoursConfiguration.isTwelveHoursFormat,
				"prependZero": this._zeroPaddedHours,
				"min": this._hoursConfiguration.minHour,
				"max": this._hoursConfiguration.maxHour,
				"active": false,
			});
			// add Hours button
			this._buttons.push({
				"id": `${this._id}_button_hours`,
				"valueMin": this._hoursConfiguration.minHour,
				"valueMax": this._hoursConfiguration.maxHour,
				"valueNow": time.hours,
				"valueString": this._hours,
				"valueText": `${time.hours} ${this.hoursLabel}`,
				"accessibleName": this.hoursLabel,
				"pressed": false,
				"separator": this._nextSeparator,
			});
		}

		if (this._hasMinutesComponent) {
			// add Minutes clock
			this._componentMap.minutes = this._clocks.length;
			this._clocks.push({
				"id": `${this._id}_clock_minutes`,
				"label": this.minutesLabel,
				"clock": "minutes",
				"itemMin": 1,
				"itemMax": 60,
				"selectedValue": time.minutes,
				"displayStep": 5,
				"valueStep": this.minutesStep,
				"lastItemReplacement": 0,
				"showInnerCircle": false,
				"prependZero": false,
				"min": 0,
				"max": 59,
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
				"separator": this._nextSeparator,
			});
		}

		if (this._hasSecondsComponent) {
			// add Seconds clock
			this._componentMap.seconds = this._clocks.length;
			this._clocks.push({
				"id": `${this._id}_clock_seconds`,
				"label": this.secondsLabel,
				"clock": "seconds",
				"itemMin": 1,
				"itemMax": 60,
				"selectedValue": time.seconds,
				"displayStep": 5,
				"valueStep": this.secondsStep,
				"lastItemReplacement": 0,
				"showInnerCircle": false,
				"prependZero": false,
				"min": 0,
				"max": 59,
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
				"separator": this._nextSeparator,
			});
		}

		this._createPeriodComponent();

		this._lastSeparator = this._nextSeparator;

		this._clocks[this._activeIndex].active = true;
		this._buttons[this._activeIndex].pressed = true;
	}

	/**
	 * Switches to the specific clock by name.
	 *
	 * @param {string} clockName the name of the clock
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
	 * @param {number} clockIndex the index of the clock
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

	/**
	 * Switches to the next available clock.
	 *
	 * @param {boolean} wrapAround whether to switch to the first clock if there are no next clock
	 */
	_switchNextClock(wrapAround = false) {
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
	 * Clock 'change' event handler.
	 *
	 * @param {event} evt Event object
	 */
	_clockChange(evt: CustomEvent<TimePickerClockChangeEventDetail>) {
		const index = this._getIndexFromId((evt.target as HTMLElement).id);
		const stringValue = evt.detail.stringValue;
		const value = evt.detail.value;
		const button = this._buttonComponent(index);

		if (!button) {
			return;
		}

		this._buttons[index].valueString = stringValue;
		this._buttons[index].valueNow = value;
		this._buttons[index].valueText = `${value} ${this._buttons[index].accessibleName}`;
		this._buttons = JSON.parse(JSON.stringify(this._buttons));

		switch (index) {
		case this._componentMap.hours:
			this._hoursChange(value);
			break;
		case this._componentMap.minutes:
			this._minutesChange(value);
			break;
		case this._componentMap.seconds:
			this._secondsChange(value);
			break;
		}

		if (evt.detail.finalChange) {
			if (this._activeIndex < this._clocks.length - 1) {
				this._switchNextClock();
			} else {
				button.focus();
			}
		}
	}
}

TimeSelectionClocks.define();

export default TimeSelectionClocks;
