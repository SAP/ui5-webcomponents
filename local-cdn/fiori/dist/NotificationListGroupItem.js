var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationListGroupItem_1;
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import List from "@ui5/webcomponents/dist/List.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
// Icons
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";
// Texts
import { NOTIFICATION_LIST_GROUP_ITEM_TXT, NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT, NOTIFICATION_LIST_ITEM_READ, NOTIFICATION_LIST_ITEM_UNREAD, NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT, NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT, NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT, NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE, NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE, NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE, NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE, } from "./generated/i18n/i18n-defaults.js";
// Templates
import NotificationListGroupItemTemplate from "./generated/templates/NotificationListGroupItemTemplate.lit.js";
// Styles
import NotificationListGroupItemCss from "./generated/themes/NotificationListGroupItem.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification-group` is a special type of list item,
 * that unlike others can group items within self, usually `ui5-li-notification` items.
 *
 * The component consists of:
 *
 * - `Toggle` button to expand and collapse the group
 * - `Priority` icon to display the priority of the group
 * - `TitleText` to entitle the group
 * - Custom actions - with the use of `ui5-notification-action`
 * - Items of the group
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NotificationListGroupItem.js";`
 *
 * `import "@ui5/webcomponents/dist/NotificationAction.js";` (optional)
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
let NotificationListGroupItem = NotificationListGroupItem_1 = class NotificationListGroupItem extends NotificationListItemBase {
    onBeforeRendering() {
        if (this.busy) {
            this.clearChildBusyIndicator();
        }
    }
    /**
     * Clears child items busy state to show a single busy over the entire group,
     * instead of multiple BusyIndicator instances
     */
    clearChildBusyIndicator() {
        this.items.forEach(item => {
            item.busy = false;
        });
    }
    get itemsCount() {
        return this.items.length;
    }
    get overflowBtnAccessibleName() {
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
    }
    get closeBtnAccessibleName() {
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE);
    }
    get toggleBtnAccessibleName() {
        if (this.collapsed) {
            return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE);
        }
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE);
    }
    get priorityText() {
        if (this.priority === Priority.High) {
            return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT);
        }
        if (this.priority === Priority.Medium) {
            return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT);
        }
        if (this.priority === Priority.Low) {
            return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT);
        }
        return "";
    }
    get accInvisibleText() {
        return `${this.groupText} ${this.readText} ${this.priorityText} ${this.counterText}`;
    }
    get readText() {
        if (this.read) {
            return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_READ);
        }
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_UNREAD);
    }
    get groupText() {
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TXT);
    }
    get counterText() {
        const text = NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT);
        return this.showCounter ? `${text} ${this.itemsCount}` : "";
    }
    get ariaLabelledBy() {
        const id = this._id;
        const ids = [];
        if (this.hasTitleText) {
            ids.push(`${id}-title-text`);
        }
        ids.push(`${id}-invisibleText`);
        return ids.join(" ");
    }
    get _ariaExpanded() {
        return !this.collapsed;
    }
    get groupCollapsedIcon() {
        return this.collapsed ? "navigation-right-arrow" : "navigation-down-arrow";
    }
    /**
     * Event handlers
     *
     */
    _onBtnToggleClick() {
        this.collapsed = !this.collapsed;
        this.fireEvent("toggle", { item: this });
    }
};
__decorate([
    property({ type: Boolean })
], NotificationListGroupItem.prototype, "collapsed", void 0);
__decorate([
    property({ type: Boolean })
], NotificationListGroupItem.prototype, "showCounter", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], NotificationListGroupItem.prototype, "items", void 0);
NotificationListGroupItem = NotificationListGroupItem_1 = __decorate([
    customElement({
        tag: "ui5-li-notification-group",
        languageAware: true,
        styles: NotificationListGroupItemCss,
        template: NotificationListGroupItemTemplate,
        dependencies: [
            List,
            Button,
            Icon,
            BusyIndicator,
            Popover,
        ],
    })
    /**
     * Fired when the `ui5-li-notification-group` is expanded/collapsed by user interaction.
     * @public
     */
    ,
    event("toggle")
], NotificationListGroupItem);
NotificationListGroupItem.define();
export default NotificationListGroupItem;
//# sourceMappingURL=NotificationListGroupItem.js.map