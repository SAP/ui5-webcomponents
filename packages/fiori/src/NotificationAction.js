import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-notification-action",
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationAction.prototype */ {
		/**
		 * Defines the text of the <code>ui5-notification-action</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines if the action is disabled.
		 * <br /><br />
		 * <b>Note:</b> a disabled action can't be pressed or focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the action design.
		 *
		 * <br /><br />
		 * <b>Note:</b>
		 * <ul>
		 * <li><code>Default</code></li>
		 * <li><code>Emphasized</code></li>
		 * <li><code>Positive</code></li>
		 * <li><code>Negative</code></li>
		 * <li><code>Transparent</code></li>
		 * </ul>
		 *
		 * @type {ButtonDesign}
		 * @defaultvalue "Transparent"
		 * @public
		 */
		design: {
			type: ButtonDesign,
			defaultValue: ButtonDesign.Transparent,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * <br /><br />
		 * <b>Note:</b>
		 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.NotificationAction.prototype */ {
	},
	events: /** @lends sap.ui.webcomponents.fiori.NotificationAction.prototype */ {
		click: {},
	},
};

/**
 * @class
 * The <code>ui5-notification-action</code> represents an abstract action,
 * used in the <code>ui5-li-notification</code> and the <code>ui5-li-notification-group</code> items.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationAction
 * @extends UI5Element
 * @tagname ui5-notification-action
 * @implements sap.ui.webcomponents.fiori.INotificationAction
 * @public
 */
class NotificationAction extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

NotificationAction.define();

export default NotificationAction;
