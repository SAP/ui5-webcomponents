import List from "@ui5/webcomponents/dist/List.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-notification-list",
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationList.prototype */ {

		/**
		 * @private
		 * @override
		 * @type {String}
		 * @defaultvalue "list"
		 * @since 1.0.0-rc.15
		 */
		accRole: {
			type: String,
			defaultValue: "list",
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-notification-list</code> is a container for <code>NotificationListItem<code> and <code>NotificationListGroupItem</code> components.
 *
 * <h3>Usage</h3>
 * Use it when you want to show notifications to the user.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationList
 * @extends sap.ui.webcomponents.main.List
 * @tagname ui5-notification-list
 * @since 1.0.0-rc.15
 * @public
 */
class NotificationList extends List {
	static get metadata() {
		return metadata;
	}
}

NotificationList.define();

export default NotificationList;
