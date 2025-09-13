var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YearPicker_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import { isEnter, isSpace, isDown, isUp, isLeft, isRight, isHome, isEnd, isHomeCtrl, isEndCtrl, isPageUp, isPageDown, } from "@ui5/webcomponents-base/dist/Keys.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import { YEAR_PICKER_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
// Template
import YearPickerTemplate from "./YearPickerTemplate.js";
// Styles
import yearPickerStyles from "./generated/themes/YearPicker.css.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
const isBetween = (x, num1, num2) => x > Math.min(num1, num2) && x < Math.max(num1, num2);
/**
 * @class
 *
 * Displays years which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
let YearPicker = YearPicker_1 = class YearPicker extends CalendarPart {
    constructor() {
        super(...arguments);
        /**
         * An array of UTC timestamps representing the selected date
         * or dates depending on the capabilities of the picker component.
         * @default []
         */
        this.selectedDates = [];
        /**
         * Defines the type of selection used in the year picker component.
         * Accepted property values are:
         *
         * - `CalendarSelectionMode.Single` - enables election of a single year.
         * - `CalendarSelectionMode.Range` - enables selection of a year range.
         *
         * Note that 'CalendarSelectionMode.Multiple` is not supported for Year Picker!
         * @default "Single"
         * @since 2.2.0
         */
        this.selectionMode = "Single";
        this._yearsInterval = [];
        this._hidden = false;
    }
    get roleDescription() {
        return YearPicker_1.i18nBundle.getText(YEAR_PICKER_DESCRIPTION);
    }
    onBeforeRendering() {
        if (this._hidden) {
            return;
        }
        this._firstYear = this._currentYearRange?.startYear ? this._currentYearRange?.startYear : this._calendarDate.getYear();
        this._buildYears();
    }
    _getPageSize() {
        // Total years on a single page depending on using on one or two calendar type
        return this.hasSecondaryCalendarType ? 8 : 20;
    }
    _getRowSize() {
        // Years per row (5 rows of 4 years each) for one claendar type and (4 row of 2 years each) for two calendar type
        return this.hasSecondaryCalendarType ? 2 : 4;
    }
    _buildYears() {
        const pageSize = this._getPageSize();
        const locale = getLocale();
        const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, locale);
        const oYearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType }, locale);
        const calendarDate = this._calendarDate; // store the value of the expensive getter
        const minDate = this._minDate; // store the value of the expensive getter
        const maxDate = this._maxDate; // store the value of the expensive getter
        const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
        let tempDateInSecType;
        let textInSecType;
        tempDate.setYear(this._firstYear);
        const intervals = [];
        let timestamp;
        /* eslint-disable no-loop-func */
        for (let i = 0; i < pageSize; i++) {
            timestamp = tempDate.valueOf() / 1000;
            const isSelected = this.selectedDates.some(itemTimestamp => {
                const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
                return date.getYear() === tempDate.getYear();
            });
            const isFocused = tempDate.getYear() === calendarDate.getYear();
            const isDisabled = tempDate.getYear() < minDate.getYear() || tempDate.getYear() > maxDate.getYear();
            const isSelectedBetween = this._isYearInsideSelectionRange(timestamp);
            if (this.hasSecondaryCalendarType) {
                tempDateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp, true);
                textInSecType = tempDateInSecType.firstDate.getYear() === tempDateInSecType.lastDate.getYear()
                    ? `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate())}`
                    : `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate())} - ${oYearFormatInSecType.format(tempDateInSecType.lastDate.toLocalJSDate())}`;
            }
            const year = {
                timestamp: timestamp.toString(),
                _tabIndex: isFocused ? 0 : -1,
                focusRef: isFocused,
                selected: isSelected || isSelectedBetween,
                ariaSelected: isSelected || isSelectedBetween,
                year: oYearFormat.format(tempDate.toLocalJSDate()),
                yearInSecType: textInSecType,
                disabled: isDisabled,
                ariaDisabled: isDisabled,
                classes: "ui5-yp-item",
                parts: "year-cell",
            };
            if (isSelected) {
                year.classes += " ui5-yp-item--selected";
                year.parts += " year-cell-selected";
            }
            if (isSelectedBetween) {
                year.classes += " ui5-yp-item--selected-between";
                year.parts += " year-cell-selected-between";
            }
            if (isDisabled) {
                year.classes += " ui5-yp-item--disabled";
            }
            if (this.hasSecondaryCalendarType) {
                year.classes += " ui5-yp-item-secondary-type";
            }
            const intervalIndex = Math.floor(i / this._getRowSize());
            if (intervals[intervalIndex]) {
                intervals[intervalIndex].push(year);
            }
            else {
                intervals[intervalIndex] = [year];
            }
            tempDate.setYear(tempDate.getYear() + 1);
        }
        this._yearsInterval = intervals;
    }
    onAfterRendering() {
        if (!this._hidden) {
            this.focus();
        }
    }
    /**
      * Returns true if year timestamp is inside the selection range.
      * @private
      */
    _isYearInsideSelectionRange(timestamp) {
        if (this.selectionMode !== CalendarSelectionMode.Range || !this.selectedDates.length) {
            return false;
        }
        // Only one date selected - second is hovered or focused
        if (this.selectedDates.length === 1 && this._secondTimestamp) {
            return isBetween(timestamp, this.selectedDates[0], this._secondTimestamp);
        }
        return isBetween(timestamp, this.selectedDates[0], this.selectedDates[1]);
    }
    _onkeydown(e) {
        let preventDefault = true;
        const pageSize = this._getPageSize();
        const rowSize = this._getRowSize();
        if (isEnter(e)) {
            this._selectYear(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        else if (isLeft(e)) {
            this._modifyTimestampBy(-1);
        }
        else if (isRight(e)) {
            this._modifyTimestampBy(1);
        }
        else if (isUp(e)) {
            this._modifyTimestampBy(-rowSize);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(rowSize);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-pageSize);
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(pageSize);
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            this._setTimestamp(parseInt(this._yearsInterval[0][0].timestamp)); // first year of first row
        }
        else if (isEndCtrl(e)) {
            this._setTimestamp(parseInt(this._yearsInterval[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year of last row
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onHomeOrEnd(homePressed) {
        this._yearsInterval.forEach(row => {
            const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
            if (indexInRow !== -1) { // The current year is on this row
                const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
                this._setTimestamp(parseInt(row[index].timestamp));
            }
        });
    }
    /**
     * In range selection, the currently focused or hovered year is considered the "second day".
     * @private
     */
    _updateSecondTimestamp() {
        if (this.selectionMode === CalendarSelectionMode.Range && (this.selectedDates.length === 1 || this.selectedDates.length === 2)) {
            this._secondTimestamp = this.timestamp;
        }
    }
    /**
     * Set the hovered day as the "_secondTimestamp".
     *
     * @param e
     * @private
     */
    _onmouseover(e) {
        const target = e.target;
        const hoveredItem = target.closest(".ui5-yp-item");
        if (hoveredItem && this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
            this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
        }
    }
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value) {
        this._safelySetTimestamp(value);
        this.fireDecoratorEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page.
     * @param amount
     * @private
     */
    _modifyTimestampBy(amount) {
        // Modify the current timestamp
        this._safelyModifyTimestampBy(amount, "year");
        this._updateSecondTimestamp();
        // Notify the calendar to update its timestamp
        this.fireDecoratorEvent("navigate", { timestamp: this.timestamp });
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectYear(e);
        }
    }
    /**
     * User clicked with the mouser or pressed Enter/Space
     * @param e
     * @private
     */
    _selectYear(e) {
        e.preventDefault();
        const target = e.target;
        if (target.className.indexOf("ui5-yp-item") === -1) {
            return;
        }
        const timestamp = this._getTimestampFromDom(target);
        this._safelySetTimestamp(timestamp);
        this._updateSecondTimestamp();
        this._updateSelectedDates(timestamp);
        this.fireDecoratorEvent("change", {
            timestamp: this.timestamp,
            dates: this.selectedDates,
        });
    }
    _updateSelectedDates(timestamp) {
        if (this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
            this.selectedDates = [this.selectedDates[0], timestamp];
            return;
        }
        this.selectedDates = [timestamp];
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasPreviousPage() {
        return this._firstYear > this._minDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasNextPage() {
        return this._firstYear + this._getPageSize() - 1 < this._maxDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage() {
        const pageSize = this._getPageSize();
        this._modifyTimestampBy(-pageSize);
    }
    /**
     * Called by the Calendar component.
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage() {
        this._modifyTimestampBy(this._getPageSize());
    }
};
__decorate([
    property({ type: Array })
], YearPicker.prototype, "selectedDates", void 0);
__decorate([
    property()
], YearPicker.prototype, "selectionMode", void 0);
__decorate([
    property({ type: Array })
], YearPicker.prototype, "_yearsInterval", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], YearPicker.prototype, "_hidden", void 0);
__decorate([
    property({ type: Number })
], YearPicker.prototype, "_secondTimestamp", void 0);
__decorate([
    property({ noAttribute: true })
], YearPicker.prototype, "_currentYearRange", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], YearPicker, "i18nBundle", void 0);
YearPicker = YearPicker_1 = __decorate([
    customElement({
        tag: "ui5-yearpicker",
        styles: yearPickerStyles,
        template: YearPickerTemplate,
    })
    /**
     * Fired when the user selects a year via "Space", "Enter" or click.
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
     * @since 1.0.0-rc.9
     */
    ,
    event("navigate", {
        bubbles: true,
    })
], YearPicker);
YearPicker.define();
export default YearPicker;
//# sourceMappingURL=YearPicker.js.map