import NotificationListItemBase from "./NotificationListItemBase.js";
import type { NotificationListItemBaseCloseEventDetail as NotificationListGroupItemCloseEventDetail } from "./NotificationListItemBase.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";
type NotificationListGroupItemToggleEventDetail = {
    item: NotificationListGroupItem;
};
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
declare class NotificationListGroupItem extends NotificationListItemBase {
    /**
     * Defines if the group is collapsed or expanded.
     * @default false
     * @public
     */
    collapsed: boolean;
    /**
     * Defines if the items `counter` would be displayed.
     * @default false
     * @public
     */
    showCounter: boolean;
    /**
     * Defines the items of the `ui5-li-notification-group`,
     * usually `ui5-li-notification` items.
     * @public
     */
    items: Array<NotificationListItemBase>;
    onBeforeRendering(): void;
    /**
     * Clears child items busy state to show a single busy over the entire group,
     * instead of multiple BusyIndicator instances
     */
    clearChildBusyIndicator(): void;
    get itemsCount(): number;
    get overflowBtnAccessibleName(): string;
    get closeBtnAccessibleName(): string;
    get toggleBtnAccessibleName(): string;
    get priorityText(): string;
    get accInvisibleText(): string;
    get readText(): string;
    get groupText(): string;
    get counterText(): string;
    get ariaLabelledBy(): string;
    get _ariaExpanded(): boolean;
    get groupCollapsedIcon(): "navigation-right-arrow" | "navigation-down-arrow";
    /**
     * Event handlers
     *
     */
    _onBtnToggleClick(): void;
}
export default NotificationListGroupItem;
export type { NotificationListGroupItemToggleEventDetail, NotificationListGroupItemCloseEventDetail, };
