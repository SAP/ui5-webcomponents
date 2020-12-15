import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";

import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import NotificationListItemBase from "./NotificationListItemBase.js";

// Texts
import {
	NOTIFICATION_LIST_ITEM_TXT,
	NOTIFICATION_LIST_ITEM_READ,
	NOTIFICATION_LIST_ITEM_UNREAD,
	NOTIFICATION_LIST_ITEM_SHOW_MORE,
	NOTIFICATION_LIST_ITEM_SHOW_LESS,
	NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE,
	NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import NotificationListItemTemplate from "./generated/templates/NotificationListItemTemplate.lit.js";

// Styles
import NotificationListItemCss from "./generated/themes/NotificationListItem.css.js";

const MAX_WRAP_HEIGHT = 32; // px.

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-notification",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationListItem.prototype */ {

		/**
		 * Defines if the <code>heading</code> and <code>description</code> should wrap,
		 * they truncate by default.
		 *
		 * <br><br>
		 * <b>Note:</b> by default the <code>heading</code> and <code>decription</code>,
		 * and a <code>ShowMore/Less</code> button would be displayed.
         * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		wrap: {
			type: Boolean,
		},

		/**
		 * Defines if the <code>notification</code> is new or has been already read.
		 * <br><br>
		 * <b>Note:</b> if set to <code>false</code> the <code>heading</code> has bold font,
		 * if set to true - it has a normal font.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		read: {
			type: Boolean,
		},

		/**
		 * Defines the state of the <code>heading</code> and <code>description</code>,
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
		_press: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-li-notification</code> is a type of list item, meant to display notifications.
 * <br>
 *
 * The component has a rich set of various properties that allows the user to set <code>avatar</code>, <code>heading</code>, descriptive <code>content</code>
 * and <code>footnotes</code> to fully describe a notification.
 * <br>
 *
 * The user can:
 * <ul>
 * <li>display a <code>Close</code> button</li>
 * <li>can control whether the <code>heading</code> and <code>description</code> should wrap or truncate
 * and display a <code>ShowMore</code> button to switch between less and more information</li>
 * <li>add custom actions by using the <code>ui5-notification-action</code> component</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The component can be used in a standard <code>ui5-list</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/NotificationListItem.js";</code>
 * <br>
 * <code>import @ui5/webcomponents/dist/NotificationAction.js";</code> (optional)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationListItem
 * @extends NotificationListItemBase
 * @tagname ui5-li-notification
 * @appenddocs NotificationAction
 * @since 1.0.0-rc.8
 * @public
 */
class NotificationListItem extends NotificationListItemBase {
	constructor() {
		super();

		// the heading overflow height
		this._headingOverflowHeight = 0;

		// the description overflow height
		this._descOverflowHeight = 0;

		// the resize handler
		this.onResizeBind = this.onResize.bind(this);
	}

	static get metadata() {
		return metadata;
	}

	static get styles() {
		return NotificationListItemCss;
	}

	static get template() {
		return NotificationListItemTemplate;
	}

	static get dependencies() {
		return [
			Button,
			Icon,
			BusyIndicator,
			Link,
			Popover,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents-fiori");
	}

	onEnterDOM() {
		ResizeHandler.register(this, this.onResizeBind);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this.onResizeBind);
	}

	get hasDesc() {
		return !!this.description.length;
	}

	get hasFootNotes() {
		return !!this.footnotes.length;
	}

	get showMoreText() {
		if (this._showMorePressed) {
			return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_SHOW_LESS);
		}

		return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_SHOW_MORE);
	}

	get overflowBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
	}

	get closeBtnTitle() {
		return this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE);
	}

	get hideShowMore() {
		if (!this.wrap && this._showMore) {
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

	get footerItems() {
		return this.footnotes.map((el, idx, arr) => {
			return {
				slotName: el._individualSlot,
				showDivider: idx !== arr.length - 1,
			};
		});
	}

	get ariaLabelledBy() {
		const id = this._id;
		const ids = [];

		if (this.hasHeading) {
			ids.push(`${id}-heading`);
		}
		if (this.hasDesc) {
			ids.push(`${id}-description`);
		}

		if (this.hasFootNotes) {
			ids.push(`${id}-footer`);
		}

		ids.push(`${id}-invisibleText`);

		return ids.join(" ");
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
		const notifcationTxt = this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_TXT);
		const readTxt = this.read ? this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_READ) : this.i18nBundle.getText(NOTIFICATION_LIST_ITEM_UNREAD);
		const priorityText = this.priorityText;

		return `${notifcationTxt} ${readTxt} ${priorityText}`;
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
	 */
	_onclick(event) {
		this.fireItemPress(event);
	}

	_onShowMoreClick(event) {
		event.preventDefault();
		this._showMorePressed = !this._showMorePressed;
	}

	_onkeydown(event) {
		super._onkeydown(event);

		if (isEnter(event)) {
			this.fireItemPress(event);
		}
	}

	_onkeyup(event) {
		super._onkeyup(event);

		const space = isSpace(event);

		if (space && event.isMarked === "link") {
			this._onShowMoreClick(event);
			return;
		}

		if (space) {
			this.fireItemPress(event);
		}
	}

	/**
	 * Private
	 */
	fireItemPress(event) {
		if (event.isMarked === "button" || event.isMarked === "link") {
			return;
		}

		this.fireEvent("_press", { item: this });
	}

	onResize() {
		if (this.wrap) {
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
}

NotificationListItem.define();

export default NotificationListItem;
