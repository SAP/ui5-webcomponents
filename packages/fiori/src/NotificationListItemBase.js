import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";

// Icons
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/message-success.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/message-warning.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

// Templates
import NotifactionOverflowActionsPopoverTemplate from "./generated/templates/NotifactionOverflowActionsPopoverTemplate.lit.js";

// Styles
import NotifactionOverflowActionsPopoverCss from "./generated/themes/NotifactionOverflowActionsPopover.css.js";

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
	},
	slots: /** @lends sap.ui.webcomponents.fiori.NotificationListItemBase.prototype */ {

		/**
		 * Defines the actions, displayed in the top-right area.
		 * <br><br>
		 * <b>Note:</b> use the <code>ui5-notification-action</code> component.
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
 * @appenddocs NotificationAction
 * @public
 */
class NotificationListItemBase extends ListItemBase {
	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
	}

	static get metadata() {
		return metadata;
	}

	static get staticAreaTemplate() {
		return NotifactionOverflowActionsPopoverTemplate;
	}

	static get staticAreaStyles() {
		return NotifactionOverflowActionsPopoverCss;
	}

	static priorityIconsMappings() {
		return {
			"High": "message-error",
			"Medium": "message-warning",
			"Low": "message-success",
		};
	}

	get hasHeading() {
		return !!this.heading.length;
	}

	get hasPriority() {
		return this.priority !== Priority.None;
	}

	get priorityIcon() {
		return NotificationListItemBase.priorityIconsMappings()[this.priority];
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

		if (event.isMarked === "button") {
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
