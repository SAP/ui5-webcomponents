var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-date` component defines a calendar date to be used inside `ui5-calendar`
 * @constructor
 * @extends UI5Element
 * @implements {ICalendarSelectedDates}
 * @abstract
 * @public
 */
let CalendarDate = class CalendarDate extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * The date formatted according to the `formatPattern` property
         * of the `ui5-calendar` that hosts the component.
         * @default ""
         * @public
         */
        this.value = "";
    }
};
__decorate([
    property()
], CalendarDate.prototype, "value", void 0);
CalendarDate = __decorate([
    customElement("ui5-date")
], CalendarDate);
CalendarDate.define();
export default CalendarDate;
//# sourceMappingURL=CalendarDate.js.map