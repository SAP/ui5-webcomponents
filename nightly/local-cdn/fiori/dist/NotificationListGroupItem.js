var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationListGroupItem_1;
import { isSpace, isPlus, isMinus, isLeft, isRight, } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import NotificationListGroupList from "./NotificationListGroupList.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
// Icons
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
// Texts
import { NOTIFICATION_LIST_GROUP_ITEM_TXT, NOTIFICATION_LIST_GROUP_COLLAPSED, NOTIFICATION_LIST_GROUP_EXPANDED, NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_ICON_COLLAPSE_TITLE, } from "./generated/i18n/i18n-defaults.js";
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
 * - `TitleText` to entitle the group
 * - Items of the group
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### Keyboard Handling
 * The `ui5-li-notification-group` provides advanced keyboard handling.
 * This component provides fast navigation when the header is focused using the following keyboard shortcuts:
 *
 * - [Space] - toggles expand / collapse of the group
 * - [Plus] - expands the group
 * - [Minus] - collapses the group
 * - [Right] - expands the group
 * - [Left] - collapses the group
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NotificationListGroupItem.js";`
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
let NotificationListGroupItem = NotificationListGroupItem_1 = class NotificationListGroupItem extends NotificationListItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines if the group is collapsed or expanded.
         * @default false
         * @public
         */
        this.collapsed = false;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        if (this.loading) {
            this.clearChildBusyIndicator();
        }
        this.actionable = false;
    }
    /**
     * Clears child items loading state to show a single loading over the entire group,
     * instead of multiple BusyIndicator instances
     */
    clearChildBusyIndicator() {
        this.items.forEach(item => {
            item.loading = false;
        });
    }
    get toggleIconAccessibleName() {
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_ICON_COLLAPSE_TITLE);
    }
    get accInvisibleText() {
        return `${this.groupText} ${this.expandText}`;
    }
    get expandText() {
        if (this.collapsed) {
            return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_COLLAPSED);
        }
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_EXPANDED);
    }
    get groupText() {
        return NotificationListGroupItem_1.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TXT);
    }
    get ariaLabelledBy() {
        const id = this._id;
        const ids = [];
        if (this.isLoading) {
            ids.push(`${id}-loading`);
        }
        if (this.hasTitleText) {
            ids.push(`${id}-title-text`);
        }
        return ids.join(" ");
    }
    get _ariaExpanded() {
        return !this.collapsed;
    }
    get _pressable() {
        return false;
    }
    get groupCollapsedIcon() {
        return this.collapsed ? "navigation-right-arrow" : "navigation-down-arrow";
    }
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.fireEvent("toggle", { item: this });
    }
    /**
     * Event handlers
     *
     */
    _onHeaderToggleClick() {
        this.toggleCollapsed();
    }
    async _onkeydown(e) {
        const isFocused = this.matches(":focus");
        if (!isFocused) {
            return;
        }
        await super._onkeydown(e);
        const space = isSpace(e);
        const plus = isPlus(e);
        const minus = isMinus(e);
        const left = isLeft(e);
        const right = isRight(e);
        if (space) {
            this.toggleCollapsed();
        }
        if (plus || right) {
            // expand
            if (this.collapsed) {
                this.toggleCollapsed();
                e.stopImmediatePropagation();
            }
        }
        if (minus || left) {
            // collapse
            if (!this.collapsed) {
                this.toggleCollapsed();
                e.stopImmediatePropagation();
            }
        }
    }
    getHeaderDomRef() {
        return this.getDomRef()?.querySelector(".ui5-nli-group-header");
    }
};
__decorate([
    property({ type: Boolean })
], NotificationListGroupItem.prototype, "collapsed", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], NotificationListGroupItem.prototype, "items", void 0);
NotificationListGroupItem = NotificationListGroupItem_1 = __decorate([
    customElement({
        tag: "ui5-li-notification-group",
        languageAware: true,
        styles: [
            NotificationListGroupItemCss,
        ],
        template: NotificationListGroupItemTemplate,
        dependencies: [
            NotificationListGroupList,
            Button,
            Icon,
            BusyIndicator,
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