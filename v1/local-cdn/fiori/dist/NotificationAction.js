var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
/**
 * @class
 * The `ui5-notification-action` represents an abstract action,
 * used in the `ui5-li-notification` and the `ui5-li-notification-group` items.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
let NotificationAction = class NotificationAction extends UI5Element {
    /**
     * Fires a custom event "click".
     * **Note:** Called by NotificationListItem and NotificationListGroupItem components.
     * @param e
     * @protected
     * @returns false, if the event was cancelled (preventDefault called), true otherwise
     */
    fireClickEvent(e) {
        return this.fireEvent("click", {
            targetRef: e.target,
        }, true);
    }
};
__decorate([
    property()
], NotificationAction.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], NotificationAction.prototype, "disabled", void 0);
__decorate([
    property({ type: ButtonDesign, defaultValue: ButtonDesign.Transparent })
], NotificationAction.prototype, "design", void 0);
__decorate([
    property()
], NotificationAction.prototype, "icon", void 0);
NotificationAction = __decorate([
    customElement("ui5-notification-action")
    /**
     * Fired, when the action is pressed.
     * @param {HTMLElement} targetRef DOM ref of the clicked element
     * @public
     */
    ,
    event("click", {
        detail: {
            targetRef: { type: HTMLElement },
        },
    })
], NotificationAction);
NotificationAction.define();
export default NotificationAction;
//# sourceMappingURL=NotificationAction.js.map