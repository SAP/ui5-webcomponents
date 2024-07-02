var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-list-list` component,
 * that is used to support keyboard navigation of the notification list internal list.
 *
 * @private
 */
let NotificationListInternal = class NotificationListInternal extends List {
    constructor() {
        super();
        this._itemNavigation._navigationMode = NavigationMode.Auto;
    }
    getEnabledItems() {
        const items = new Array();
        this.getItems().forEach(item => {
            items.push(item);
            if (item instanceof NotificationListGroupItem && !item.collapsed) {
                item.items.forEach(subItem => {
                    items.push(subItem);
                });
            }
        });
        return items;
    }
};
NotificationListInternal = __decorate([
    customElement("ui5-notification-list-internal")
], NotificationListInternal);
NotificationListInternal.define();
export default NotificationListInternal;
//# sourceMappingURL=NotificationListInternal.js.map