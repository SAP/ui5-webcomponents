var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationListItem_1;
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
// Icons
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";
// Texts
import { NOTIFICATION_LIST_ITEM_TXT, NOTIFICATION_LIST_ITEM_READ, NOTIFICATION_LIST_ITEM_UNREAD, NOTIFICATION_LIST_ITEM_SHOW_MORE, NOTIFICATION_LIST_ITEM_SHOW_LESS, NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT, NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT, NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT, NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE, NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE, } from "./generated/i18n/i18n-defaults.js";
// Templates
import NotificationListItemTemplate from "./generated/templates/NotificationListItemTemplate.lit.js";
// Styles
import NotificationListItemCss from "./generated/themes/NotificationListItem.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification` is a type of list item, meant to display notifications.
 *
 * The component has a rich set of various properties that allows the user to set `avatar`, `titleText`, descriptive `content`
 * and `footnotes` to fully describe a notification.
 *
 * The user can:
 *
 * - display a `Close` button
 * - can control whether the `titleText` and `description` should wrap or truncate
 * and display a `ShowMore` button to switch between less and more information
 * - add custom actions by using the `ui5-notification-action` component
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NotificationListItem.js";`
 *
 * `import "@ui5/webcomponents/dist/NotificationAction.js";` (optional)
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 * @csspart title-text - Used to style the titleText of the notification list item
 */
let NotificationListItem = NotificationListItem_1 = class NotificationListItem extends NotificationListItemBase {
    constructor() {
        super();
        // the titleText overflow height
        this._titleTextOverflowHeight = 0;
        // the description overflow height
        this._descOverflowHeight = 0;
        // the resize handler
        this._onResizeBound = this.onResize.bind(this);
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._onResizeBound);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._onResizeBound);
    }
    get hasDesc() {
        return !!this.description.length;
    }
    get hasFootNotes() {
        return !!this.footnotes.length;
    }
    get showMoreText() {
        if (this._showMorePressed) {
            return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_SHOW_LESS);
        }
        return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_SHOW_MORE);
    }
    get overflowBtnAccessibleName() {
        return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
    }
    get closeBtnAccessibleName() {
        return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE);
    }
    get hideShowMore() {
        if (this.wrappingType === WrappingType.None && this._showMore) {
            return undefined;
        }
        return true;
    }
    get descriptionDOM() {
        return this.shadowRoot.querySelector(".ui5-nli-description");
    }
    get titleTextDOM() {
        return this.shadowRoot.querySelector(".ui5-nli-title-text");
    }
    get titleTextHeight() {
        return this.titleTextDOM.offsetHeight;
    }
    get descriptionHeight() {
        return this.descriptionDOM.offsetHeight;
    }
    get titleTextOverflows() {
        const titleText = this.titleTextDOM;
        if (!titleText) {
            return false;
        }
        return titleText.offsetHeight < titleText.scrollHeight;
    }
    get descriptionOverflows() {
        const description = this.descriptionDOM;
        if (!description) {
            return false;
        }
        return description.offsetHeight < description.scrollHeight;
    }
    get footerItems() {
        return this.footnotes.map((el, idx, arr) => {
            return {
                slotName: el._individualSlot,
                showDivider: idx !== arr.length - 1,
            };
        });
    }
    get ariaLabelledBy() {
        const id = this._id;
        const ids = [];
        if (this.hasTitleText) {
            ids.push(`${id}-title-text`);
        }
        if (this.hasDesc) {
            ids.push(`${id}-description`);
        }
        if (this.hasFootNotes) {
            ids.push(`${id}-footer`);
        }
        ids.push(`${id}-invisibleText`);
        return ids.join(" ");
    }
    get priorityText() {
        if (this.priority === Priority.High) {
            return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT);
        }
        if (this.priority === Priority.Medium) {
            return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT);
        }
        if (this.priority === Priority.Low) {
            return NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT);
        }
        return "";
    }
    get accInvisibleText() {
        const notificationText = NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_TXT);
        const readText = this.read ? NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_READ) : NotificationListItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_UNREAD);
        const priorityText = this.priorityText;
        return `${notificationText} ${readText} ${priorityText}`;
    }
    /**
     * Event handlers
     */
    _onclick(e) {
        this.fireItemPress(e);
    }
    _onShowMoreClick(e) {
        e.preventDefault();
        this._showMorePressed = !this._showMorePressed;
    }
    _onkeydown(e) {
        super._onkeydown(e);
        if (isEnter(e)) {
            this.fireItemPress(e);
        }
    }
    _onkeyup(e) {
        super._onkeyup(e);
        const space = isSpace(e);
        if (space && getEventMark(e) === "link") {
            this._onShowMoreClick(e);
            return;
        }
        if (space) {
            this.fireItemPress(e);
        }
    }
    /**
     * Private
     */
    fireItemPress(e) {
        if (getEventMark(e) === "button" || getEventMark(e) === "link") {
            return;
        }
        this.fireEvent("_press", { item: this });
    }
    onResize() {
        if (this.wrappingType === WrappingType.Normal) {
            this._showMore = false;
            return;
        }
        const titleTextWouldOverflow = this.titleTextHeight > this._titleTextOverflowHeight;
        const descWouldOverflow = this.hasDesc && this.descriptionHeight > this._descOverflowHeight;
        const overflows = titleTextWouldOverflow || descWouldOverflow;
        if (this._showMorePressed && overflows) {
            this._showMore = true;
            return;
        }
        if (this.titleTextOverflows || this.descriptionOverflows) {
            this._titleTextOverflowHeight = this.titleTextHeight;
            this._descOverflowHeight = this.hasDesc ? this.descriptionHeight : 0;
            this._showMore = true;
            return;
        }
        this._showMore = false;
    }
};
__decorate([
    property({ type: WrappingType, defaultValue: WrappingType.None })
], NotificationListItem.prototype, "wrappingType", void 0);
__decorate([
    property({ type: Boolean })
], NotificationListItem.prototype, "_showMorePressed", void 0);
__decorate([
    property({ type: Boolean })
], NotificationListItem.prototype, "_showMore", void 0);
__decorate([
    slot()
], NotificationListItem.prototype, "avatar", void 0);
__decorate([
    slot({ type: HTMLElement, individualSlots: true })
], NotificationListItem.prototype, "footnotes", void 0);
__decorate([
    slot({ type: Node, "default": true })
], NotificationListItem.prototype, "description", void 0);
NotificationListItem = NotificationListItem_1 = __decorate([
    customElement({
        tag: "ui5-li-notification",
        languageAware: true,
        styles: NotificationListItemCss,
        template: NotificationListItemTemplate,
        dependencies: [
            Button,
            Icon,
            BusyIndicator,
            Link,
            Popover,
        ],
    }),
    event("_press")
], NotificationListItem);
NotificationListItem.define();
export default NotificationListItem;
//# sourceMappingURL=NotificationListItem.js.map