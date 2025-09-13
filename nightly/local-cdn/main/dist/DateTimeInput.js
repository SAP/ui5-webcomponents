var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
// Styles
import Input from "./Input.js";
import { property } from "@ui5/webcomponents-base/dist/decorators.js";
import { isDesktop, isPhone, isTablet } from "@ui5/webcomponents-base/dist/Device.js";
/**
 * Extention of the UI5 Input, so we do not modify Input's private properties within the datetime components.
 * Intended to be used for the DateTime components.
 *
 * @class
 * @private
 */
let DateTimeInput = class DateTimeInput extends Input {
    constructor() {
        super(...arguments);
        this._shouldOpenValueStatePopover = false;
    }
    /**
     * Prevents the value state message popover from appearing when a responsive popover (like time selection) is open
     * since the responsive popover already includes the necessary information in its header.
     *
     * @protected
     * @override
     */
    get hasValueStateMessage() {
        return this._shouldOpenValueStatePopover && super.hasValueStateMessage && !this._isMobileDevice;
    }
    get _isMobileDevice() {
        return !isDesktop() && (isPhone() || isTablet());
    }
};
__decorate([
    property({ noAttribute: true })
], DateTimeInput.prototype, "_shouldOpenValueStatePopover", void 0);
DateTimeInput = __decorate([
    customElement({
        tag: "ui5-datetime-input",
    })
], DateTimeInput);
DateTimeInput.define();
export default DateTimeInput;
//# sourceMappingURL=DateTimeInput.js.map