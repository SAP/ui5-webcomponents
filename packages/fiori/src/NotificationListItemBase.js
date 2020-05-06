import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";

import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";

// Icons
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import "@ui5/webcomponents-icons/dist/icons/message-success.js";
import "@ui5/webcomponents-icons/dist/icons/message-error.js";
import "@ui5/webcomponents-icons/dist/icons/message-warning.js";
import "@ui5/webcomponents-icons/dist/icons/overflow.js";

// Templates
import NotifactionOverflowActionsPopoverTemplate from "./generated/templates/NotifactionOverflowActionsPopoverTemplate.lit.js";

// Styles
import NotifactionOverflowActionsPopoverCss from "./generated/themes/NotifactionOverflowActionsPopover.css.js";

const PRIORITY_ICONS_MAP = {
	"High": "message-error",
	"Medium": "message-warning",
	"Low": "message-success",
};

/**
 * @public
 */
const metadata = {
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationListItemBase.prototype */ {

		/**
		 * Defines the <code>heading</code> of the item.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the <code>priority</code> of the item.
		 * @type {Priority}
		 * @defaultvalue "None"
		 * @public
		 */
		priority: {
			type: Priority,
			defaultValue: Priority.None,
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
	},
	slots: /** @lends sap.ui.webcomponents.fiori.NotificationListItemBase.prototype */ {

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
	},
	events: /** @lends sap.ui.webcomponents.fiori.NotificationListItemBase.prototype */ {
		/**
		 * Fired when the <code>Close</code> button is pressed.
		 *
		 * @event
		 * @public
		 */
		close: {},
	},
};

/**
 * @class
 *
 * The base class of the <code>NotificationListItem</code> and <code>NotificationListGroupItem</code>.
 *
 * @abstract
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationListItemBase
 * @extends ListItemBase
 * @tagname ui5-li-notification-group
 * @since 1.0.0-rc.8
 * @appenddocs NotificationOverflowAction
 * @public
 */
class NotificationListItemBase extends ListItemBase {

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get staticAreaTemplate() {
		return NotifactionOverflowActionsPopoverTemplate;
	}

	static get staticAreaStyles() {
		return NotifactionOverflowActionsPopoverCss;
	}

	get hasPriority() {
		return this.priority !== Priority.None;
	}

	get priorityIcon() {
		return PRIORITY_ICONS_MAP[this.priority];
	}

	get overflowButtonDOM() {
		return this.shadowRoot.querySelector("[overflow-btn]");
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

	/**
	 * Event handlers
	 */
	_onBtnCloseClick() {
		this.fireEvent("close", { item: this });
	}

	_onBtnOverflowClick() {
		this.openOverflow();
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

export default NotificationListItemBase;
