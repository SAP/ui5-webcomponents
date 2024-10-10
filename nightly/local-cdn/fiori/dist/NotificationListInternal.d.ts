import List from "@ui5/webcomponents/dist/List.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-list-list` component,
 * that is used to support keyboard navigation of the notification list internal list.
 *
 * @private
 */
declare class NotificationListInternal extends List {
    constructor();
    getEnabledItems(): Array<ListItemBase>;
}
export default NotificationListInternal;
