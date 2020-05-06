import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle, fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";

import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";

// Icons
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import "@ui5/webcomponents-icons/dist/icons/message-success.js";
import "@ui5/webcomponents-icons/dist/icons/message-error.js";
import "@ui5/webcomponents-icons/dist/icons/message-warning.js";
import "@ui5/webcomponents-icons/dist/icons/overflow.js";

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
import NotificationListItemPopoverTemplate from "./generated/templates/NotificationListItemPopoverTemplate.lit.js";

// Styles
import NotificationListGroupItemCss from "./generated/themes/NotificationListGroupItem.css.js";
import NotifactionListItemPopoverCss from "./generated/themes/NotifactionListItemPopover.css.js";

const PRIORITY_ICONS_MAP = {
	"High": "message-error",
	"Medium": "message-warning",
	"Low": "message-success",
};

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-notification-group",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationListGroupItem.prototype */ {
		/**
		 * Defines the <code>heading</code> of the group.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the <code>priority</code> of the group.
		 * @type {Priority}
		 * @defaultvalue "None"
		 * @public
		 */
		priority: {
			type: Priority,
			defaultValue: Priority.None,
		},

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
		 * Defines if the <code>close</code> button would be displayed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showClose: {
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
		 * Defines the actions, displayed in the <code>ui5-li-notification-group</code>.
		 * <br><br>
		 * <b>Note:</b> use the <code>ui5-notification-overflow-action</code> component.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		actions: {
			type: HTMLElement,
		},

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
		_close: {},

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
 * @extends ListItemBase
 * @tagname ui5-li-notification-group
 * @since 1.0.0-rc.8
 * @appenddocs NotificationOverflowAction
 * @public
 */
class NotificationListGroupItem extends ListItemBase {
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

	static get staticAreaTemplate() {
		return NotificationListItemPopoverTemplate;
	}

	static get staticAreaStyles() {
		return NotifactionListItemPopoverCss;
	}

	static async onDefine() {
		await Promise.all([
			Button.define(),
			Icon.define(),
			fetchI18nBundle("@ui5/webcomponents-fiori"),
		]);
	}

	get hasPriority() {
		return this.priority !== Priority.None;
	}

	get priorityIcon() {
		return PRIORITY_ICONS_MAP[this.priority];
	}

	get overflowBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATIONLISTITEM_OVERLOW_BTN_TITLE);
	}

	get closeBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATIONLISTITEM_CLOSE_BTN_TITLE);
	}

	get overflowButtonDOM() {
		return this.shadowRoot.querySelector(".ui5-ng-overflow-btn");
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
			};
		});
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	get itemsCount() {
		return this.items.length;
	}

	get counter() {
		return `(${this.itemsCount})`;
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

	_onBtnCloseClick() {
		this.fireEvent("_close", { item: this });
	}

	_onBtnOverflowClick() {
		this.openOverflow();
	}

	_onBtnToggleClick() {
		this.collapsed = !this.collapsed;
		this.fireEvent("toggle", { item: this });
	}

	_onCustomActionClick(event) {
		const refItemId = event.target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			this.getActionByID(refItemId).fireEvent("click", {
				targetRef: event.target,
			}, true);

			this.closeOverflow();
		}
	}

	_onkeydown(event) {
		super._onkeydown(event);

		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	/**
	 * Private
	 */
	getActionByID(id) {
		return this.actions.find(action => action._id === id);
	}

	async openOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover.openBy(this.overflowButtonDOM);
	}

	async closeOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover.close();
	}

	async getOverflowPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(".ui5-notification-overflow-popover");
	}
}

NotificationListGroupItem.define();

export default NotificationListGroupItem;
