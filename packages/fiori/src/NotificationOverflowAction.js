import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-notification-overflow-action",
	properties: /** @lends  sap.ui.webcomponents.fiori.NotificationOverflowAction.prototype */ {
		/**
		 * Defines the text of the <code>ui5-notification-overflow-action</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * <br><br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},
	},
	slots: {
	},
	events: {
		click: {},
	},
};

/**
 * @class
 * The <code>ui5-notification-overflow-action</code> represents an abstract action,
 * used in the <code>ui5-li-notification</code> and the <code>ui5-li-notification-group</code> items.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationOverflowAction
 * @extends UI5Element
 * @public
 */
class NotificationOverflowAction extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

NotificationOverflowAction.define();

export default NotificationOverflowAction;
