var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DateComponentBase_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getCalendarType, getSecondaryCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { getMaxCalendarDate, getMinCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";
/**
 * @class
 *
 * Abstract class that provides common functionality for date-related components (day picker, month picker, year picker, calendar, date picker, date range picker, date time picker)
 * This includes:
 *  - "languageAware: true" metadata setting, CLDR fetch and i18n initialization
 *  - common properties (primaryCalendar, minDate, maxDate and formatPattern) declaration and methods that operate on them
 *  - additional common methods
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
let DateComponentBase = DateComponentBase_1 = class DateComponentBase extends UI5Element {
    constructor() {
        super();
    }
    get _primaryCalendarType() {
        const localeData = getCachedLocaleDataInstance(getLocale());
        return this.primaryCalendarType || getCalendarType() || localeData.getPreferredCalendarType();
    }
    get _secondaryCalendarType() {
        return this.secondaryCalendarType || getSecondaryCalendarType();
    }
    get _minDate() {
        let minDate;
        if (this.minDate) {
            minDate = this._getMinMaxCalendarDateFromString(this.minDate);
        }
        return minDate || getMinCalendarDate(this._primaryCalendarType);
    }
    get _maxDate() {
        let maxDate;
        if (this.maxDate) {
            maxDate = this._getMinMaxCalendarDateFromString(this.maxDate);
        }
        return maxDate || getMaxCalendarDate(this._primaryCalendarType);
    }
    get _formatPattern() {
        return this.formatPattern || "medium"; // get from config
    }
    get _isPattern() {
        return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
    }
    get hasSecondaryCalendarType() {
        return !!this.secondaryCalendarType && this.secondaryCalendarType !== this.primaryCalendarType;
    }
    _getMinMaxCalendarDateFromString(date) {
        if (this.getFormat().parse(date)) {
            return this._getCalendarDateFromString(date);
        }
        const jsDate = this.getISOFormat().parse(date);
        if (jsDate) {
            return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
        }
    }
    _getCalendarDateFromString(value) {
        const jsDate = this.getFormat().parse(value);
        if (jsDate) {
            return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
        }
    }
    _getTimeStampFromString(value) {
        const calDate = this._getCalendarDateFromString(value);
        if (calDate) {
            return calDate.toUTCJSDate().valueOf();
        }
    }
    _getStringFromTimestamp(timestamp) {
        const localDate = new Date(timestamp);
        return this.getFormat().format(localDate, true);
    }
    getFormat() {
        return this._isPattern
            ? DateFormat.getDateInstance({
                strictParsing: true,
                pattern: this._formatPattern,
                calendarType: this._primaryCalendarType,
            })
            : DateFormat.getDateInstance({
                strictParsing: true,
                style: this._formatPattern,
                calendarType: this._primaryCalendarType,
            });
    }
    getISOFormat() {
        if (!this._isoFormatInstance) {
            this._isoFormatInstance = DateFormat.getDateInstance({
                strictParsing: true,
                pattern: "YYYY-MM-dd",
                calendarType: this._primaryCalendarType,
            });
        }
        return this._isoFormatInstance;
    }
    static async onDefine() {
        [DateComponentBase_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents"),
            fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
        ]);
    }
};
__decorate([
    property({ type: CalendarType })
], DateComponentBase.prototype, "primaryCalendarType", void 0);
__decorate([
    property({ type: CalendarType })
], DateComponentBase.prototype, "secondaryCalendarType", void 0);
__decorate([
    property()
], DateComponentBase.prototype, "formatPattern", void 0);
__decorate([
    property()
], DateComponentBase.prototype, "minDate", void 0);
__decorate([
    property()
], DateComponentBase.prototype, "maxDate", void 0);
DateComponentBase = DateComponentBase_1 = __decorate([
    customElement({
        languageAware: true,
        renderer: litRender,
    })
], DateComponentBase);
export default DateComponentBase;
//# sourceMappingURL=DateComponentBase.js.map