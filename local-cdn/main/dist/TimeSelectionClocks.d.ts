import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import TimePickerInternals from "./TimePickerInternals.js";
import TimePickerClock from "./TimePickerClock.js";
import ToggleSpinButton from "./ToggleSpinButton.js";
import type { TimePickerClockChangeEventDetail } from "./TimePickerClock.js";
/**
 * Fired when the picker is being closed.
 */
declare class TimeSelectionClocks extends TimePickerInternals {
    /**
     * Flag for pressed Space key
     */
    _spacePressed: boolean;
    /**
     * Flag for focused state of Clocks component
     */
    _focused: boolean;
    /**
     * Flag for focused state of AM/PM segmented button
     */
    _amPmFocused: boolean;
    onBeforeRendering(): void;
    /**
     * Returns ToggleSpinButton component by index or name.
     * @param indexOrName the index or name of the component
     * @returns component (if exists) or undefined
     */
    _buttonComponent(indexOrName: number | string): ToggleSpinButton | undefined | null;
    /**
     * Returns TimePickerClock component by index or name.
     * @param indexOrName the index or name of the component
     * @returns component (if exists) or undefined
     */
    _clockComponent(indexOrName: number | string): TimePickerClock | undefined | null;
    /**
     * TimePickerClocks focusin event handler. Focuses the active button and switches to active clock.
     * @param evt Event object
     */
    _clocksFocusIn(evt: Event): void;
    _clocksFocusOut(): void;
    /**
     * ToggleSpinButton focusin event handler.Switches to clock which button is being focused.
     * @param evt Event object
     */
    _buttonFocusIn(evt: Event): void;
    /**
     * AM/PM segmented button focusin event handler.
     */
    _amPmFocusIn(): void;
    /**
     * AM/PM segmented button focusout event handler.
     */
    _amPmFocusOut(): void;
    /**
     * keyup event handler.
     * @param evt Event object
     */
    _onkeyup(evt: KeyboardEvent): void;
    /**
     * keydown event handler.
     * @param evt Event object
     */
    _onkeydown(evt: KeyboardEvent): void;
    /**
     * Handles direct numbers entry.
     * @param evt Event object
     */
    _numbersInput(evt: KeyboardEvent): void;
    /**
     * Focuses the first available button.
     */
    _focusFirstButton(): void;
    /**
     * Sets the exact match value. Must be overriden.
     */
    _setExactMatch(): void;
    /**
     * Creates clock and button components according to the display format pattern.
     */
    _createComponents(): void;
    /**
     * Switches to the specific clock by name.
     * @param clockName the name of the clock
     */
    _switchTo(clockName: string): void;
    /**
     * Switches to the specific clock by its index in _clocks property.
     * @param clockIndex the index of the clock
     */
    _switchClock(clockIndex: number): void;
    /**
     * Switches to the next available clock.
     * @param wrapAround whether to switch to the first clock if there are no next clock
     */
    _switchNextClock(wrapAround?: boolean): void;
    /**
     * Clock 'change' event handler.
     * @param evt Event object
     */
    _clockChange(evt: CustomEvent<TimePickerClockChangeEventDetail>): void;
}
export default TimeSelectionClocks;
