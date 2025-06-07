var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicDateRange_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isF4, isShow } from "@ui5/webcomponents-base/dist/Keys.js";
import DynamicDateRangeTemplate from "./DynamicDateRangeTemplate.js";
import IconMode from "./types/IconMode.js";
import { DYNAMIC_DATE_RANGE_SELECTED_TEXT, DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT, DYNAMIC_DATE_RANGE_NAVIGATION_ICON_TOOLTIP, } from "./generated/i18n/i18n-defaults.js";
// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
// Styles
import dynamicDateRangeCss from "./generated/themes/DynamicDateRange.css.js";
import dynamicDateRangePopoverCss from "./generated/themes/DynamicDateRangePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
/**
 * Fired when the input operation has finished by pressing Enter or on focusout or a value is selected in the popover.
 * @public
 */
let DynamicDateRange = DynamicDateRange_1 = class DynamicDateRange extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the options listed as a string, separated by commas and using capital case.
         * Example: "TODAY, YESTERDAY, DATERANGE"
         * @public
         * @default ""
         */
        this.options = "";
        /**
         * Defines the open or closed state of the popover.
         * @private
         * @default false
         */
        this.open = false;
        this.optionsObjects = [];
    }
    onBeforeRendering() {
        const optionKeys = this.options.split(",").map(option => option.trim());
        this.optionsObjects = optionKeys.map(option => {
            const OptionClass = DynamicDateRange_1.getOptionClass(option);
            let optionObject;
            if (OptionClass) {
                optionObject = new OptionClass();
            }
            return optionObject;
        }).filter(optionObject => optionObject !== undefined);
        if (this.value) {
            const selectedItem = this._list?.items.find(item => {
                const option = this.optionsObjects.find(x => x.operator === this.value?.operator);
                return option && item.textContent === option.text;
            });
            this._list?.focusItem(selectedItem);
        }
    }
    get _optionsTitles() {
        return this.optionsObjects.map(option => option.text);
    }
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _iconMode() {
        return isDesktop() ? IconMode.Decorative : IconMode.Interactive;
    }
    get tooltipNavigationIcon() {
        return DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_NAVIGATION_ICON_TOOLTIP);
    }
    _togglePicker() {
        if (this.open) {
            this.open = false;
        }
        else {
            this.open = true;
        }
    }
    _selectOption(e) {
        this._currentOption = this.optionsObjects.find(option => option.text === e.detail.item.textContent);
        if (!this._currentOption?.template) {
            this.currentValue = this._currentOption?.parse(this._currentOption.text);
            this._submitValue();
        }
        if (this._currentOption?.operator === this.value?.operator) {
            this.currentValue = this.value;
        }
    }
    getOption(operator) {
        const resultOption = this.optionsObjects.find(option => option.operator === operator);
        if (!resultOption) {
            const OptionClass = DynamicDateRange_1.getOptionClass(operator);
            if (OptionClass) {
                const optionObject = new OptionClass();
                this.optionsObjects.push(optionObject);
                return optionObject;
            }
        }
        return resultOption;
    }
    onInputChange(e) {
        const value = e.target?.value;
        if (!value) {
            this.value = undefined;
            this.fireDecoratorEvent("change", { value: undefined });
            return;
        }
        const currentOption = this.optionsObjects.find(option => option.isValidString(value));
        this.value = currentOption ? this.getOption(currentOption.operator)?.parse(value) : undefined;
        if (this.value) {
            this.fireDecoratorEvent("change", { value: this.value });
        }
    }
    onButtonBackClick() {
        this._currentOption = undefined;
    }
    /**
     * Converts a `value` into concrete `startDate` and `endDate` JavaScript `Date` objects.
     *
     * @returns An array of two `Date` objects representing the start and end dates.
     */
    toDates(value) {
        return this.getOption(value.operator)?.toDates(value);
    }
    get _hasCurrentOptionTemplate() {
        return !!this._currentOption?.template;
    }
    _submitValue() {
        const stringValue = this._currentOption?.format(this.currentValue);
        if (this._input) {
            this._input.value = stringValue;
        }
        if (this._currentOption?.isValidString(stringValue)) {
            this.value = this.currentValue;
            this.fireDecoratorEvent("change", { value: this.value });
        }
        else {
            this.value = undefined;
        }
        this._currentOption = undefined;
        this.open = false;
    }
    _close() {
        this._currentOption = undefined;
        this.open = false;
    }
    onPopoverOpen() {
        if (this.currentValue !== this.value) {
            this.currentValue = this.value;
        }
    }
    onPopoverClose() {
        this._close();
    }
    get currentValueText() {
        if (this.currentValue && this.currentValue.operator === this._currentOption?.operator) {
            return `${DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_SELECTED_TEXT)}: ${this._currentOption?.format(this.currentValue)}`;
        }
        return DynamicDateRange_1.i18nBundle.getText(DYNAMIC_DATE_RANGE_EMPTY_SELECTED_TEXT);
    }
    handleSelectionChange(e) {
        this.currentValue = this._currentOption?.handleSelectionChange && this._currentOption?.handleSelectionChange(e);
    }
    onInputKeyDown(e) {
        if (isShow(e)) {
            e.preventDefault();
            if (this.open) {
                if (!isF4(e)) {
                    this._toggleAndFocusInput();
                }
            }
            else {
                this._toggleAndFocusInput();
            }
        }
    }
    _toggleAndFocusInput() {
        this._togglePicker();
        if (this.open) {
            this._input?.focus();
        }
    }
    onKeyDownPopover(e) {
        if (isShow(e)) {
            e.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
            this._toggleAndFocusInput();
        }
    }
    /**
     * Registers a new dynamic date range option with a unique key.
     *
     * Example:
     * DynamicDateRange.register("LASTWEEK", LastWeek);
     */
    static register(operator, option) {
        operator = operator.toUpperCase();
        if (!this.optionsClasses.has(operator)) {
            this.optionsClasses.set(operator, option);
        }
    }
    static getOptionClass(operator) {
        return this.optionsClasses.get(operator);
    }
};
DynamicDateRange.optionsClasses = new Map();
__decorate([
    property({ noAttribute: true })
], DynamicDateRange.prototype, "value", void 0);
__decorate([
    property({ type: String })
], DynamicDateRange.prototype, "options", void 0);
__decorate([
    property({ type: Boolean })
], DynamicDateRange.prototype, "open", void 0);
__decorate([
    property({ type: Object })
], DynamicDateRange.prototype, "_currentOption", void 0);
__decorate([
    property({ type: Object })
], DynamicDateRange.prototype, "currentValue", void 0);
__decorate([
    query("[ui5-input]")
], DynamicDateRange.prototype, "_input", void 0);
__decorate([
    query("[ui5-list]")
], DynamicDateRange.prototype, "_list", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], DynamicDateRange, "i18nBundle", void 0);
DynamicDateRange = DynamicDateRange_1 = __decorate([
    event("change", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * @class
     *
     * ### Overview
     *
     * The `ui5-dynamic-date-range` component provides a flexible interface to define date ranges using a combination of absolute dates, relative intervals, and preset ranges (e.g., "Today", "Yesterday", etc.).
     * It allows users to select a date range from a predefined set of options or enter custom dates.
     *
     * ### Usage
     *
     * The component is typically used in scenarios where users need to filter data based on date ranges, such as in reports, dashboards, or data analysis tools.
     * It can be used with the predefined options or extended with custom options to suit specific requirements. You can create your own options by extending the `IDynamicDateRangeOption` interface.
     * Every option should be registered using the `DynamicDateRange.register` method.
     *
     * If needed, you can also create a range of dates based on specific option using the `toDates` method.
     *
     * ### Standard Options
     *
     * The component comes with a set of standard options, including:
     * - "TODAY" - Represents the current date. An example value is `{ operator: "TODAY"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";`
     * - "YESTERDAY" - Represents the previous date. An example value is `{ operator: "YESTERDAY"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";`
     * - "TOMORROW" - Represents the next date. An example value is `{ operator: "TOMORROW"}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";`
     * - "DATE" - Represents a single date. An example value is `{ operator: "DATE", values: [new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";`
     * - "DATERANGE" - Represents a range of dates. An example value is `{ operator: "DATERANGE", values: [new Date(), new Date()]}`. Import: `import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";`
     *
     * ### ES6 Module Import
     *
     * `import "@ui5/webcomponents/dist/DynamicDateRange.js";`
     *
     * @constructor
     * @extends UI5Element
     * @public
     */
    ,
    customElement({
        tag: "ui5-dynamic-date-range",
        languageAware: true,
        template: DynamicDateRangeTemplate,
        renderer: jsxRenderer,
        styles: [
            dynamicDateRangeCss,
            ResponsivePopoverCommonCss,
            dynamicDateRangePopoverCss,
        ],
    })
], DynamicDateRange);
DynamicDateRange.define();
export default DynamicDateRange;
//# sourceMappingURL=DynamicDateRange.js.map