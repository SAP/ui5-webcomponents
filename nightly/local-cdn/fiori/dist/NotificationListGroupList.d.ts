import List from "@ui5/webcomponents/dist/List.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-group-list` component,
 * that is used to support keyboard navigation of the notification group internal list.
 *
 * @private
 */
declare class NotificationListGroupList extends List {
    getEnabledItems(): never[];
    _handleTabNext(): void;
    onForwardBefore(): void;
    onForwardAfter(): void;
}
export default NotificationListGroupList;
