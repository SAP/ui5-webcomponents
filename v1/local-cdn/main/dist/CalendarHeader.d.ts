import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
type SecondaryCalendarButtonTexts = {
    monthButtonText: string;
    monthButtonInfo: string;
    yearButtonText: string;
};
declare class CalendarHeader extends UI5Element {
    /**
     * Defines component's timestamp.
     *
     * **Note:** set by the Calendar component
     * @public
     * @default undefined
     */
    timestamp?: number;
    /**
     * Defines component's primary calendar type.
     *
     * **Note:** set by the Calendar component
     * @public
     * @default undefined
     */
    primaryCalendarType?: `${CalendarType}`;
    /**
     * Defines component's secondary calendar type.
     *
     * **Note:** set by the Calendar component
     * @since 1.0.0-rc.16
     * @default undefined
     * @public
     */
    secondaryCalendarType?: `${CalendarType}`;
    /**
     * Stores information for month button for secondary calendar type
     * @private
    */
    buttonTextForSecondaryCalendarType: SecondaryCalendarButtonTexts;
    isNextButtonDisabled: boolean;
    isPrevButtonDisabled: boolean;
    isMonthButtonHidden: boolean;
    _monthButtonText: string;
    _yearButtonText: string;
    _yearButtonTextSecType: string;
    isYearButtonHidden: boolean;
    _prevButtonText?: string;
    _nextButtonText?: string;
    _secondMonthButtonText?: string;
    _secondYearButtonText?: string;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    onBeforeRendering(): void;
    onPrevButtonClick(e: MouseEvent): void;
    onNextButtonClick(e: MouseEvent): void;
    onMonthButtonClick(e: MouseEvent): void;
    onMonthButtonKeyDown(e: KeyboardEvent): void;
    onMonthButtonKeyUp(e: KeyboardEvent): void;
    onYearButtonClick(e: MouseEvent): void;
    onYearButtonKeyDown(e: KeyboardEvent): void;
    onYearButtonKeyUp(e: KeyboardEvent): void;
    get hasSecondaryCalendarType(): boolean;
    get classes(): {
        prevButton: {
            "ui5-calheader-arrowbtn": boolean;
            "ui5-calheader-arrowbtn-disabled": boolean;
        };
        nextButton: {
            "ui5-calheader-arrowbtn": boolean;
            "ui5-calheader-arrowbtn-disabled": boolean;
        };
    };
    get accInfo(): {
        ariaLabelMonthButton: string;
    };
}
export default CalendarHeader;
