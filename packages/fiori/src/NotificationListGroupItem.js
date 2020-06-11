import { fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import List from "@ui5/webcomponents/dist/List.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import NotificationListItemBase from "./NotificationListItemBase.js";

// Texts
import {
	NOTIFICATION_LIST_GROUP_ITEM_TXT,
	NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT,
	NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE,
	NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE,
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
	languageAware: true,
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
 * <li>Custom actions - with the use of <code>ui5-notification-overflow-action</code></li>
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
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return NotificationListGroupItemCss;
	}

	static get template() {
		return NotificationListGroupItemTemplate;
	}

	onBeforeRendering() {
		if (this.busy) {
			this.clearChildBusyIndicator();
		}
	}

	/**
	 * Clears child items busy state to show a single busy over the entire group,
	 * instead of multiple BusyIndicator instances
	 */
	clearChildBusyIndicator() {
		this.items.forEach(item => {
			item.busy = false;
		});
	}

	static async onDefine() {
		await Promise.all([
			List.define(),
			Button.define(),
			Icon.define(),
			BusyIndicator.define(),
			Popover.define(),
			fetchI18nBundle("@ui5/webcomponents-fiori"),
		]);
	}

	get itemsCount() {
		return this.items.length;
	}

	get overflowBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
	}

	get closeBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE);
	}

	get priorityText() {
		if (this.priority === Priority.High) {
			return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT);
		}

		if (this.priority === Priority.Medium) {
			return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT);
		}

		if (this.priority === Priority.Low) {
			return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT);
		}

		return "";
	}

	get accInvisibleText() {
		const groupTxt = this.i18nBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TXT);
		const counterTxt = this.i18nBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT);
		const counter = this.showCounter ? `${counterTxt} ${this.itemsCount}` : "";
		const priorityText = this.priorityText;

		return `${groupTxt} ${priorityText} ${counter}`;
	}

	get ariaLabelledBy() {
		const id = this._id;
		const ids = [];

		if (this.hasHeading) {
			ids.push(`${id}-heading`);
		}

		ids.push(`${id}-invisibleText`);

		return ids.join(" ");
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
