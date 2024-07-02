var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationListItemBase_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
// Icons
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
// Templates
import NotificationOverflowActionsPopoverTemplate from "./generated/templates/NotificationOverflowActionsPopoverTemplate.lit.js";
// Styles
import NotificationOverflowActionsPopoverCss from "./generated/themes/NotificationOverflowActionsPopover.css.js";
/**
 * Defines the icons corresponding to the notification's priority.
 */
const ICON_PER_PRIORITY = {
    [Priority.High]: "message-error",
    [Priority.Medium]: "message-warning",
    [Priority.Low]: "message-success",
    [Priority.None]: "",
};
/**
 * @class
 *
 * The base class of the `NotificationListItem` and `NotificationListGroupItem`.
 * @constructor
 * @extends ListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
let NotificationListItemBase = NotificationListItemBase_1 = class NotificationListItemBase extends ListItemBase {
    get hasTitleText() {
        return !!this.titleText.length;
    }
    get hasPriority() {
        return this.priority !== Priority.None;
    }
    get priorityIcon() {
        return ICON_PER_PRIORITY[this.priority];
    }
    get overflowButtonDOM() {
        return this.shadowRoot.querySelector(".ui5-nli-overflow-btn");
    }
    get showOverflow() {
        return !!this.overflowActions.length;
    }
    get overflowActions() {
        if (this.actions.length <= 1) {
            return [];
        }
        return this.actionsInfo;
    }
    get standardActions() {
        if (this.actions.length > 1) {
            return [];
        }
        return this.actionsInfo;
    }
    get actionsInfo() {
        return this.actions.map(action => {
            return {
                icon: action.icon,
                text: action.text,
                press: this._onCustomActionClick.bind(this),
                refItemid: action._id,
                disabled: action.disabled ? true : undefined,
                design: action.design,
            };
        });
    }
    /**
     * Event handlers
     */
    _onBtnCloseClick() {
        this.fireEvent("close", { item: this });
    }
    _onBtnOverflowClick() {
        this.openOverflow();
    }
    _onCustomActionClick(e) {
        const refItemId = e.target.getAttribute("data-ui5-external-action-item-id");
        if (refItemId) {
            this.getActionByID(refItemId).fireClickEvent(e);
            this.closeOverflow();
        }
    }
    _onkeydown(e) {
        super._onkeydown(e);
        if (getEventMark(e) === "button") {
            return;
        }
        if (isSpace(e)) {
            e.preventDefault();
        }
    }
    getActionByID(id) {
        return this.actions.find(action => action._id === id);
    }
    async openOverflow() {
        const overflowPopover = await this.getOverflowPopover();
        overflowPopover.showAt(this.overflowButtonDOM);
    }
    async closeOverflow() {
        const overflowPopover = await this.getOverflowPopover();
        overflowPopover.close();
    }
    async getOverflowPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector(".ui5-notification-overflow-popover");
    }
    static async onDefine() {
        NotificationListItemBase_1.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
};
__decorate([
    property()
], NotificationListItemBase.prototype, "titleText", void 0);
__decorate([
    property({ type: Priority, defaultValue: Priority.None })
], NotificationListItemBase.prototype, "priority", void 0);
__decorate([
    property({ type: Boolean })
], NotificationListItemBase.prototype, "showClose", void 0);
__decorate([
    property({ type: Boolean })
], NotificationListItemBase.prototype, "read", void 0);
__decorate([
    property({ type: Boolean })
], NotificationListItemBase.prototype, "busy", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1000 })
], NotificationListItemBase.prototype, "busyDelay", void 0);
__decorate([
    slot()
], NotificationListItemBase.prototype, "actions", void 0);
NotificationListItemBase = NotificationListItemBase_1 = __decorate([
    customElement({
        staticAreaStyles: NotificationOverflowActionsPopoverCss,
        staticAreaTemplate: NotificationOverflowActionsPopoverTemplate,
    })
    /**
     * Fired when the `Close` button is pressed.
     * @param {HTMLElement} item the closed item.
     * @public
     */
    ,
    event("close", {
        detail: {
            /**
             * @public
             */
            item: {
                type: HTMLElement,
            },
        },
    })
], NotificationListItemBase);
export default NotificationListItemBase;
//# sourceMappingURL=NotificationListItemBase.js.map