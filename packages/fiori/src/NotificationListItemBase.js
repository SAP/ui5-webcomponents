import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";

// Icons
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

// Templates
import NotificationOverflowActionsPopoverTemplate from "./generated/templates/NotificationOverflowActionsPopoverTemplate.lit.js";

// Styles
import NotificationOverflowActionsPopoverCss from "./generated/themes/NotificationOverflowActionsPopover.css.js";

/**
 * Defines the icons corresponding to the notification's priority.
 */
const ICON_PER_PRIORITY = {
	[Priority.High]: "message-error",
	[Priority.Medium]: "message-warning",
	[Priority.Low]: "message-success",
};

/**
 * @public
 */
const metadata = {
	managedSlots: true,
	properties: /** @lends sap.ui.webc.fiori.NotificationListItemBase.prototype */ {

		/**
		 * Defines the <code>titleText</code> of the item.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		titleText: {
			type: String,
		},

		/**
		 * Defines the <code>priority</code> of the item.
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Low</code></li>
		 * <li><code>Medium</code></li>
		 * <li><code>High</code></li>
		 * </ul>
		 * @type {sap.ui.webc.main.types.Priority}
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

		/**
		 * Defines if the <code>notification</code> is new or has been already read.
		 * <br><br>
		 * <b>Note:</b> if set to <code>false</code> the <code>titleText</code> has bold font,
		 * if set to true - it has a normal font.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		read: {
			type: Boolean,
		},

		/**
		 * Defines if a busy indicator would be displayed over the item.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		busy: {
			type: Boolean,
		},

		/**
		 * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
		 *
		 * @type {sap.ui.webc.base.types.Integer}
		 * @defaultValue 1000
		 * @public
		 */
		busyDelay: {
			type: Integer,
			defaultValue: 1000,
		},
	},
	slots: /** @lends sap.ui.webc.fiori.NotificationListItemBase.prototype */ {

		/**
		 * Defines the actions, displayed in the top-right area.
		 * <br><br>
		 * <b>Note:</b> use the <code>ui5-notification-action</code> component.
		 *
		 * @type {sap.ui.webc.fiori.INotificationAction[]}
		 * @slot
		 * @public
		 */
		actions: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webc.fiori.NotificationListItemBase.prototype */ {
		/**
		 * Fired when the <code>Close</code> button is pressed.
		 *
		 * @event sap.ui.webc.fiori.NotificationListItemBase#close
		 * @param {HTMLElement} item the closed item.
		 * @public
		 */
		close: {
			detail: {
				item: HTMLElement,
			},
		},
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
 * @alias sap.ui.webc.fiori.NotificationListItemBase
 * @extends sap.ui.webc.main.ListItemBase
 * @tagname ui5-li-notification-group
 * @since 1.0.0-rc.8
 * @appenddocs NotificationAction
 * @public
 */
class NotificationListItemBase extends ListItemBase {
	static get metadata() {
		return metadata;
	}

	static get staticAreaTemplate() {
		return NotificationOverflowActionsPopoverTemplate;
	}

	static get staticAreaStyles() {
		return NotificationOverflowActionsPopoverCss;
	}

	get hasTitleText() {
		return !!this.titleText.length;
	}

	get hasPriority() {
		return this.priority !== Priority.None;
	}

	get priorityIcon() {
		return ICON_PER_PRIORITY[this.priority];
	}

	get overflowButtonDOM() {
		return this.shadowRoot.querySelector(".ui5-nli-overflow-btn");
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
				disabled: action.disabled ? true : undefined,
				design: action.design,
			};
		});
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

		if (getEventMark(event) === "button") {
			return;
		}

		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	getActionByID(id) {
		return this.actions.find(action => action._id === id);
	}

	async openOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover.showAt(this.overflowButtonDOM);
	}

	async closeOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover.close();
	}

	async getOverflowPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(".ui5-notification-overflow-popover");
	}

	static async onDefine() {
		NotificationListItemBase.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

export default NotificationListItemBase;
