import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle, fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";

import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";

// icons
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import "@ui5/webcomponents-icons/dist/icons/message-success.js";
import "@ui5/webcomponents-icons/dist/icons/message-error.js";
import "@ui5/webcomponents-icons/dist/icons/message-warning.js";
import "@ui5/webcomponents-icons/dist/icons/overflow.js";

// text
import { NOTIFICATIONLISTITEM_SHOW_MORE } from "./generated/i18n/i18n-defaults.js";

// Template
import NotificationListItemTemplate from "./generated/templates/NotificationListItemTemplate.lit.js";
import NotificationListItemPopoverTemplate from "./generated/templates/NotificationListItemPopoverTemplate.lit.js";

// Styles
import NotificationListItemCss from "./generated/themes/NotificationListItem.css.js";
import NotifactionListItemPopoverCss from "./generated/themes/NotifactionListItemPopover.css.js";

const PRIORITY_ICONS_MAP = {
	"High": "message-error",
	"Medium": "message-warning",
	"Low": "message-success",
};

const MAX_WRAP_HEIGHT = 32; // px.

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-notification",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationListItem.prototype */ {
		/**
		 * Defines the <code>heading</code>.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the <code>priority</code> of the notification.
		 * @type {Priority}
		 * @defaultvalue "None"
		 * @public
		 */
		priority: {
			type: Priority,
			defaultValue: Priority.None,
		},

		/**
		 * Defines if a <code>close</code> button should be displayed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showClose: {
			type: Boolean,
		},

		/**
		 * Defines if the <code>heading</code> and <code>decription</code> should truncate,
		 * otherwise they would wrap by default.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		truncate: {
			type: Boolean,
		},

		/**
		 * Defines the state of the <code>heading</code> and <code>decription</code>,
		 * if less or more information is displayed.
		 * @private
		 */
		_showMorePressed: {
			type: Boolean,
		},

		/**
		 * Defines the visibility of the <code>showMore</code> button.
		 * @private
		 */
		_showMore: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.NotificationListItem.prototype */ {

		/**
		 * Defines the actions, displayed in the <code>ui5-li-notification</code>.
		 * <br><br>
		 * <b>Note:</b> Consider using the <code>ui5-notification-overflow-action</code>.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		actions: {
			type: HTMLElement,
		},

		/**
		 * Defines the avatar, displayed in the <code>ui5-li-notification</code>.
		 *
		 * <br><br>
		 * <b>Note:</b> Consider using the <code>ui5-avatar</code> to display icons, initials or images.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		avatar: {
			type: HTMLElement,
		},

		/**
		 * Defines the elements, dipalyed in the footer of the of the <code>ui5-li-notification</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footnotes: {
			type: HTMLElement,
			propertyName: "footnotes",
			individualSlots: true,
		},

		/**
		 * Defines the content of the <code>ui5-li-notification</code>,
		 * usually a description of the notification.
		 *
		 * <br><br>
		 * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "description",
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.NotificationListItem.prototype */ {
		_close: {},
		_press: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-li-notification</code> is a type of list item, meant to dispaly notifcatations.
 * <br>
 *
 * The component has a rich set of various properties that allows the user to set <code>avatar</code>, <code>heading</code>, descriptive <code>content</code>
 * and <code>footnotes</code> to fully describe a notifcation.
 * <br>
 *
 * The user can:
 * <ul>
 * <li>display a <code>Close</code> button</code></li>
 * <li>can control whether the <code>heading</code> and <code>description</code> should wrap or truncate
 * and display a <code>ShomeMore</code> button to switch between less and more information</code></li>
 * <li>add custom actions by using the <code>ui5-notification-overflow-action</code></code> component</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The component can be used in a standard <code>ui5-list</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/NotificationListItem.js";</code>
 * <code>import @ui5/webcomponents/dist/NotificationOverflowAction.js";</code> (optional)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationListItem
 * @extends UI5Element
 * @tagname ui5-li-notification
 * @appenddocs NotificationOverflowAction
 * @since 1.0.0-rc.8
 * @public
 */
class NotificationListItem extends ListItemBase {
	constructor() {
		super();

		// the heading overflow height
		this._headingOverflowHeight = 0;

		// the description overflow height
		this._descOverflowHeight = 0;

		// the resize handler
		this.onResizeBind = this.onResize.bind(this);

		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return NotificationListItemCss;
	}

	static get template() {
		return NotificationListItemTemplate;
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

	onEnterDOM() {
		ResizeHandler.register(this, this.onResizeBind);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this.onResizeBind);
	}

	get footerItems() {
		return this.footnotes.map((el, idx, arr) => {
			return {
				slotName: el._individualSlot,
				showDivider: idx !== arr.length - 1,
			};
		});
	}

	get hasHeading() {
		return !!this.heading.length;
	}

	get hasDesc() {
		return !!this.description.length;
	}

	get hasFootNotes() {
		return !!this.footnotes.length;
	}

	get hasPriority() {
		return this.priority !== Priority.None;
	}

	get priorityIcon() {
		return PRIORITY_ICONS_MAP[this.priority];
	}

	get showMoreText() {
		return this.i18nBundle.getText(NOTIFICATIONLISTITEM_SHOW_MORE);
	}

	get hideShowMore() {
		if (this.truncate && this._showMore) {
			return undefined;
		}

		return true;
	}

	get descriptionDOM() {
		return this.shadowRoot.querySelector(".ui5-nli-description");
	}

	get headingDOM() {
		return this.shadowRoot.querySelector(".ui5-nli-title");
	}

	get headingHeight() {
		return this.headingDOM.offsetHeight;
	}

	get descriptionHeight() {
		return this.descriptionDOM.offsetHeight;
	}

	get headingOverflows() {
		const heading = this.headingDOM;

		if (!heading) {
			return false;
		}

		if (isIE()) {
			return heading.scrollHeight > MAX_WRAP_HEIGHT;
		}

		return heading.offsetHeight < heading.scrollHeight;
	}

	get descriptionOverflows() {
		const description = this.descriptionDOM;

		if (!description) {
			return false;
		}

		if (isIE()) {
			return description.scrollHeight > MAX_WRAP_HEIGHT;
		}

		return description.offsetHeight < description.scrollHeight;
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
				press: this._onCustomActionPress.bind(this),
				refItemid: action._id,
			};
		});
	}

	get classes() {
		return {
			content: {
				"ui5-nli-content--ie": isIE(),
			},
		};
	}

	/**
	 * Event handlers
	 *
	 */

	_onclick(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.fireItemPress(event);
	}

	_onShowMoreClick() {
		this._showMorePressed = !this._showMorePressed;
	}

	_onBtnCloseClick() {
		this.fireEvent("_close", { item: this });
	}

	_onBtnOverflowClick() {
		this.openOverflow();
	}

	_onkeydown(event) {
		super._onkeydown(event);

		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this.fireItemPress(event);
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this.fireItemPress(event);
		}
	}

	/**
	 * Private
	 */
	fireItemPress() {
		this.fireEvent("_press", { item: this });
	}

	onResize() {
		if (!this.truncate) {
			this._showMore = false;
			return;
		}

		const headingWouldOverflow = this.headingHeight > this._headingOverflowHeight;
		const descWouldOverflow = this.descriptionHeight > this._descOverflowHeight;
		const overflows = headingWouldOverflow || descWouldOverflow;

		if (this._showMorePressed && overflows) {
			this._showMore = true;
			return;
		}

		if (this.headingOverflows || this.descriptionOverflows) {
			this._headingOverflowHeight = this.headingHeight;
			this._descOverflowHeight = this.descriptionHeight;
			this._showMore = true;
			return;
		}

		this._showMore = false;
	}

	_onCustomActionPress(event) {
		const refItemId = event.target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			this.getActionByID(refItemId).fireEvent("click", {
				targetRef: event.target,
			}, true);

			this.closeOverflow();
		}
	}


	getActionByID(id) {
		return this.actions.find(action => action._id === id);
	}

	async openOverflow() {
		const overflowPopover = await this.overflowPopover();
		overflowPopover.openBy(this.overflowButtonDOM);
	}

	async closeOverflow() {
		const overflowPopover = await this.overflowPopover();
		overflowPopover.close();
	}

	async overflowPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(".ui5-nli-overflow-popover");
	}
}

NotificationListItem.define();

export default NotificationListItem;
