/// <reference types="openui5" />
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import "@ui5/webcomponents-icons/dist/time-entry-request.js";
import WheelSlider from "./WheelSlider.js";
import type { WheelSliderSelectEventDetail } from "./WheelSlider.js";
type TimeSelectionChangeEventDetail = {
    value: string | undefined;
    valid: boolean;
};
type TimeSelectionSliderChangeEventDetail = {
    slider: string;
};
/**
 * @class
 * @constructor
 * @extends UI5Element
 * @private
 * @since 1.0.0-rc.12
 */
declare class TimeSelection extends UI5Element {
    /**
     * Defines a formatted time value.
     * @default undefined
     * @public
     */
    value?: string;
    /**
     * Determines the format, displayed in the input field.
     *
     * Example:
     * HH:mm:ss -> 11:42:35
     * hh:mm:ss a -> 2:23:15 PM
     * mm:ss -> 12:04 (only minutes and seconds)
     * @default ""
     * @public
     */
    formatPattern: string;
    /**
     * Hides the hours slider regardless of formatPattern
     * This property is only needed for the duration picker use case which requires non-standard slider combinations
     * @default false
     * @public
     */
    hideHours: boolean;
    /**
     * Hides the minutes slider regardless of formatPattern
     * This property is only needed for the duration picker use case which requires non-standard slider combinations
     * @default false
     * @public
     */
    hideMinutes: boolean;
    /**
     * Hides the seconds slider regardless of formatPattern
     * This property is only needed for the duration picker use case which requires non-standard slider combinations
     * @default false
     * @public
     */
    hideSeconds: boolean;
    /**
     * The maximum number of hours to be displayed for the hours slider (only needed for the duration picker use case)
     * @default undefined
     * @public
     */
    maxHours?: number;
    /**
     * The maximum number of minutes to be displayed for the minutes slider (only needed for the duration picker use case)
     * @default undefined
     * @public
     */
    maxMinutes?: number;
    /**
     * The maximum number of seconds to be displayed for the seconds slider (only needed for the duration picker use case)
     * @default undefined
     * @public
     */
    maxSeconds?: number;
    secondsStep: number;
    minutesStep: number;
    _currentSlider: string;
    _calendarType: CalendarType;
    _density: string;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    get _hoursConfiguration(): import("./timepicker-utils/TimeSlider.js").HoursConfiguration;
    get _neededSliders(): boolean[];
    get _hasHoursSlider(): boolean;
    get _hasMinutesSlider(): boolean;
    get _hasSecondsSlider(): boolean;
    get _hasPeriodsSlider(): boolean;
    get secondsArray(): string[];
    get minutesArray(): string[];
    get hoursArray(): string[];
    get periodsArray(): string[];
    get _hoursSliderFocused(): boolean;
    get _minutesSliderFocused(): boolean;
    get _secondsSliderFocused(): boolean;
    get _periodSliderFocused(): boolean;
    get _hours(): string;
    get _minutes(): string;
    get _seconds(): string;
    get _period(): string | undefined;
    setValue(date: Date): void;
    onHoursChange(e: CustomEvent<WheelSliderSelectEventDetail>): void;
    onMinutesChange(e: CustomEvent<WheelSliderSelectEventDetail>): void;
    onSecondsChange(e: CustomEvent<WheelSliderSelectEventDetail>): void;
    onPeriodChange(e: CustomEvent<WheelSliderSelectEventDetail>): void;
    isValid(value: string): true | Date | Date[] | import("sap/ui/core/date/UI5Date").default | import("sap/ui/core/date/UI5Date").default[];
    normalizeValue(value: string): string;
    get _formatPattern(): string;
    get _isPattern(): boolean;
    /**
     * Event handler for the "click" and "focusin" events of the sliders
     * @param e
     */
    selectSlider(e: MouseEvent | FocusEvent): void;
    _setCurrentSlider(slider: string): void;
    get _currentSliderDOM(): WheelSlider;
    get _activeSliders(): string[];
    _onfocusin(e: FocusEvent): void;
    _onfocusout(e: FocusEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleWheel(e: WheelEvent): void;
    getFormat(): DateFormat;
    formatValue(date: Date): string;
    get dateValue(): Date;
    get validDateValue(): Date;
    get hoursSliderTitle(): string;
    get minutesSliderTitle(): string;
    get secondsSliderTitle(): string;
    get periodSliderTitle(): string;
    get classes(): {
        root: {
            "ui5-time-selection-root": boolean;
            "ui5-phone": boolean;
        };
    };
}
export default TimeSelection;
export type { TimeSelectionChangeEventDetail, TimeSelectionSliderChangeEventDetail, };
