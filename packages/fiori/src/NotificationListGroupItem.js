import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle, fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import NotificationListItemBase from "./NotificationListItemBase.js";

// Texts
import {
	NOTIFICATIONGROUPITEM_TXT,
	NOTIFICATIONGROUPITEM_PRIORITY_TXT,
	NOTIFICATIONGROUPITEM_COUNTER_TXT,
	NOTIFICATIONLISTITEM_OVERLOW_BTN_TITLE,
	NOTIFICATIONLISTITEM_CLOSE_BTN_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import NotificationListGroupItemTemplate from "./generated/templates/NotificationListGroupItemTemplate.lit.js";

// Styles
import NotificationListGroupItemCss from "./generated/themes/NotificationListGroupItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-notification-group",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationListGroupItem.prototype */ {

		/**
		 * Defines if the group is collapsed or expanded.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * Defines if the items <code>counter</code> would be displayed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showCounter: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.NotificationListGroupItem.prototype */ {

		/**
		 * Defines the items of the <code>ui5-li-notification-group</code>,
		 * usually <code>ui5-li-notification</code> items.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.NotificationListGroupItem.prototype */ {

		/**
		 * Fired when the <code>ui5-li-notification-group</code> is expanded/collapsed by user interaction.
		 *
		 * @event
		 * @public
		 */
		toggle: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-li-notification-group</code> is a special type of list item,
 * that unlike others can group items within self, usually <code>ui5-li-notification</code> items.
 * <br>
 *
 * The component consists of:
 * <ul>
 * <li><code>Toggle</code> button to expand and collapse the group</li>
 * <li><code>Priority</code> icon to display the priority of the group</li>
 * <li><code>Heading</code> to entitle the group</li>
 * <li>Custom actions</li>
 * <li>Items of the group</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The component can be used in a standard <code>ui5-list</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/NotificationListGroupItem.js";</code>
 * <br>
 * <code>import @ui5/webcomponents/dist/NotificationOverflowAction.js";</code> (optional)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationListGroupItem
 * @extends NotificationListItemBase
 * @tagname ui5-li-notification-group
 * @since 1.0.0-rc.8
 * @appenddocs NotificationOverflowAction
 * @public
 */
class NotificationListGroupItem extends NotificationListItemBase {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return NotificationListGroupItemCss;
	}

	static get template() {
		return NotificationListGroupItemTemplate;
	}

	static async onDefine() {
		await Promise.all([
			Button.define(),
			Icon.define(),
			fetchI18nBundle("@ui5/webcomponents-fiori"),
		]);
	}

	get itemsCount() {
		return this.items.length;
	}

	get counter() {
		return `(${this.itemsCount})`;
	}

	get overflowBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATIONLISTITEM_OVERLOW_BTN_TITLE);
	}

	get closeBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATIONLISTITEM_CLOSE_BTN_TITLE);
	}

	get accInvisibleText() {
		const groupTxt = this.i18nBundle.getText(NOTIFICATIONGROUPITEM_TXT);
		const prioTxt = this.i18nBundle.getText(NOTIFICATIONGROUPITEM_PRIORITY_TXT);
		const counterTxt = this.i18nBundle.getText(NOTIFICATIONGROUPITEM_COUNTER_TXT);
		const counter = this.showCounter ? `${counterTxt} ${this.itemsCount}` : "";

		return `${groupTxt}. ${this.priority} ${prioTxt}. ${counter}`;
	}

	/**
	 * Event handlers
	 *
	 */
	_onBtnToggleClick() {
		this.collapsed = !this.collapsed;
		this.fireEvent("toggle", { item: this });
	}
}

NotificationListGroupItem.define();

export default NotificationListGroupItem;
