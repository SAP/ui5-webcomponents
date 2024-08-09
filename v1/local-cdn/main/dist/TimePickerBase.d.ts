/// <reference types="openui5" />
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import "@ui5/webcomponents-icons/dist/time-entry-request.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Input from "./Input.js";
import type { TimeSelectionChangeEventDetail } from "./TimePickerInternals.js";
type TimePickerBaseChangeInputEventDetail = {
    value: string;
    valid: boolean;
};
type TimePickerBaseChangeEventDetail = TimePickerBaseChangeInputEventDetail;
type TimePickerBaseInputEventDetail = TimePickerBaseChangeInputEventDetail;
/**
 * @class
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 */
declare class TimePickerBase extends UI5Element {
    /**
     * Defines a formatted time value.
     * @default undefined
     * @formEvents change input
     * @formProperty
     * @public
     */
    value?: string;
    /**
     * Defines the value state of the `ui5-time-picker`.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Determines whether the `ui5-time-picker` is displayed as disabled.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines whether the `ui5-time-picker` is displayed as readonly.
     * @default false
     * @public
     */
    readonly: boolean;
    _isPickerOpen: boolean;
    _isInputsPopoverOpen: boolean;
    /**
     * Defines the value state message that will be displayed as pop up under the `ui5-time-picker`.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the `ui5-time-picker` is in `Information`, `Warning` or `Error` value state.
     * @since 1.0.0-rc.8
     * @public
     */
    valueStateMessage: Array<HTMLElement>;
    tempValue?: string;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    /**
     * @protected
     */
    get _placeholder(): string | undefined;
    /**
     * @protected
     */
    get _formatPattern(): string | undefined;
    get _effectiveValue(): string | undefined;
    get _timeSelectionValue(): string | undefined;
    get _isPhone(): boolean;
    onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>): void;
    /**
     * Opens the picker.
     * @public
     * @returns Resolves when the picker is open
     */
    openPicker(): Promise<void>;
    /**
     * Closes the picker
     * @public
     * @returns Resolves when the picker is closed
     */
    closePicker(): Promise<void>;
    togglePicker(): void;
    /**
     * Checks if the picker is open
     * @public
     */
    isOpen(): boolean;
    submitPickers(): void;
    onResponsivePopoverAfterClose(): void;
    onResponsivePopoverAfterOpen(): Promise<void>;
    /**
     * Opens the Inputs popover.
     * @private
     * @returns Resolves when the Inputs popover is open
     */
    openInputsPopover(): Promise<void>;
    /**
     * Closes the Inputs popover
     * @private
     * @returns Resolves when the Inputs popover is closed
     */
    closeInputsPopover(): Promise<void>;
    toggleInputsPopover(): void;
    /**
     * Checks if the inputs popover is open
     * @private
     */
    isInputsPopoverOpen(): boolean;
    submitInputsPopover(): void;
    onInputsPopoverAfterOpen(): Promise<void>;
    onInputsPopoverAfterClose(): void;
    _handleInputClick(evt: MouseEvent): Promise<void>;
    _updateValueAndFireEvents(value: string, normalizeValue: boolean, eventsNames: Array<string>): void;
    _updateValueState(): void;
    _handleInputChange(e: CustomEvent): void;
    _handleInputLiveChange(e: CustomEvent): void;
    _canOpenPicker(): boolean;
    _canOpenInputsPopover(): boolean;
    _getPopover(): Promise<ResponsivePopover>;
    _getInputsPopover(): Promise<Popover>;
    _getInput(): Input;
    _getInputField(): Promise<HTMLInputElement | Input | null>;
    _onkeydown(e: KeyboardEvent): void;
    get _isPattern(): boolean;
    getFormat(): import("sap/ui/core/format/DateFormat").default;
    /**
     * Formats a Java Script date object into a string representing a locale date and time
     * according to the `formatPattern` property of the TimePicker instance
     * @param date A Java Script date object to be formatted as string
     * @public
     * @returns formatted value
     */
    formatValue(date: Date): string;
    /**
     * Checks if a value is valid against the current `formatPattern` value.
     *
     * **Note:** an empty string is considered as valid value.
     * @param value The value to be tested against the current date format
     * @public
     */
    isValid(value: string | undefined): boolean;
    normalizeValue(value: string): string;
    _modifyValueBy(amount: number, unit: string): void;
    /**
     * The listener for this event can't be passive as it calls preventDefault()
     * @param e Wheel Event
     * @private
     */
    _handleWheel(e: WheelEvent): void;
    /**
     * Hides mobile device keyboard by temporary setting the input to readonly state.
     */
    _hideMobileKeyboard(): void;
    _onfocusin(evt: FocusEvent): Promise<void>;
    _oninput(evt: CustomEvent): void;
    get submitButtonLabel(): string;
    get cancelButtonLabel(): string;
    /**
     * @protected
     */
    get openIconName(): string;
}
export default TimePickerBase;
export type { TimeSelectionChangeEventDetail, TimePickerBaseChangeEventDetail, TimePickerBaseInputEventDetail, };
