var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalendarHeader_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Icon from "./Icon.js";
import CalendarHeaderTemplate from "./generated/templates/CalendarHeaderTemplate.lit.js";
import { CALENDAR_HEADER_NEXT_BUTTON, CALENDAR_HEADER_PREVIOUS_BUTTON, } from "./generated/i18n/i18n-defaults.js";
// Styles
import calendarHeaderStyles from "./generated/themes/CalendarHeader.css.js";
let CalendarHeader = CalendarHeader_1 = class CalendarHeader extends UI5Element {
    static async onDefine() {
        CalendarHeader_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
    }
    onBeforeRendering() {
        this._prevButtonText = CalendarHeader_1.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
        this._nextButtonText = CalendarHeader_1.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON);
        if (this.hasSecondaryCalendarType) {
            this._secondMonthButtonText = this.buttonTextForSecondaryCalendarType.monthButtonText;
            this._secondYearButtonText = this.buttonTextForSecondaryCalendarType.yearButtonText;
        }
    }
    onPrevButtonClick(e) {
        if (this.isPrevButtonDisabled) {
            e.preventDefault();
            return;
        }
        this.fireEvent("previous-press", e);
        e.preventDefault();
    }
    onNextButtonClick(e) {
        if (this.isNextButtonDisabled) {
            e.preventDefault();
            return;
        }
        this.fireEvent("next-press", e);
        e.preventDefault();
    }
    onMonthButtonClick(e) {
        this.fireEvent("show-month-view", e);
    }
    onMonthButtonKeyDown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this.fireEvent("show-month-view", e);
        }
    }
    onMonthButtonKeyUp(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.fireEvent("show-month-view", e);
        }
    }
    onYearButtonClick(e) {
        this.fireEvent("show-year-view", e);
    }
    onYearButtonKeyDown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this.fireEvent("show-year-view", e);
        }
    }
    onYearButtonKeyUp(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.fireEvent("show-year-view", e);
        }
    }
    get hasSecondaryCalendarType() {
        return !!this.secondaryCalendarType && this.secondaryCalendarType !== this.primaryCalendarType;
    }
    get classes() {
        return {
            prevButton: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this.isPrevButtonDisabled,
            },
            nextButton: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this.isNextButtonDisabled,
            },
        };
    }
    get accInfo() {
        return {
            ariaLabelMonthButton: this.hasSecondaryCalendarType
                ? `${this._monthButtonText}, ${this.buttonTextForSecondaryCalendarType.monthButtonInfo}` : `${this._monthButtonText}`,
        };
    }
};
__decorate([
    property({ validator: Integer })
], CalendarHeader.prototype, "timestamp", void 0);
__decorate([
    property({ type: CalendarType })
], CalendarHeader.prototype, "primaryCalendarType", void 0);
__decorate([
    property({ type: CalendarType })
], CalendarHeader.prototype, "secondaryCalendarType", void 0);
__decorate([
    property({ type: Object })
], CalendarHeader.prototype, "buttonTextForSecondaryCalendarType", void 0);
__decorate([
    property({ type: Boolean })
], CalendarHeader.prototype, "isNextButtonDisabled", void 0);
__decorate([
    property({ type: Boolean })
], CalendarHeader.prototype, "isPrevButtonDisabled", void 0);
__decorate([
    property({ type: Boolean })
], CalendarHeader.prototype, "isMonthButtonHidden", void 0);
__decorate([
    property()
], CalendarHeader.prototype, "_monthButtonText", void 0);
__decorate([
    property()
], CalendarHeader.prototype, "_yearButtonText", void 0);
__decorate([
    property()
], CalendarHeader.prototype, "_yearButtonTextSecType", void 0);
__decorate([
    property({ type: Boolean })
], CalendarHeader.prototype, "isYearButtonHidden", void 0);
CalendarHeader = CalendarHeader_1 = __decorate([
    customElement({
        tag: "ui5-calendar-header",
        languageAware: true,
        renderer: litRender,
        template: CalendarHeaderTemplate,
        styles: calendarHeaderStyles,
        dependencies: [Icon],
    }),
    event("next-press"),
    event("previous-press"),
    event("show-month-view"),
    event("show-year-view")
], CalendarHeader);
CalendarHeader.define();
export default CalendarHeader;
//# sourceMappingURL=CalendarHeader.js.map