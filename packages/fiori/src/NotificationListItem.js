import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";

import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";
import NotificationListItemBase from "./NotificationListItemBase.js";

// Icons
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";

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

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-notification",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.NotificationListItem.prototype */ {

		/**
		 * Defines if the <code>titleText</code> and <code>description</code> should wrap,
		 * they truncate by default.
		 *
		 * <br><br>
		 * <b>Note:</b> by default the <code>titleText</code> and <code>decription</code>,
		 * and a <code>ShowMore/Less</code> button would be displayed.
		 * @type {sap.ui.webcomponents.main.types.WrappingType}
		 * @defaultvalue "None"
		 * @public
		 * @since 1.0.0-rc.15
		 */
		wrappingType: {
			type: WrappingType,
			defaultValue: WrappingType.None,
		},

		/**
		 * Defines the state of the <code>titleText</code> and <code>description</code>,
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
		 * <br>
		 * <b>Note:</b>In order to be complaint with the UX guidlines and for best experience,
		 * we recommend using avatars with 2rem X 2rem in size (32px X 32px). In case you are using the <code>ui5-avatar</code>
		 * you can set its <code>size</code> property to <code>XS</code> to get the required size - <code>&lt;ui5-avatar size="XS">&lt;/ui5-avatar></code>.
		 *
		 * @type {sap.ui.webcomponents.main.IAvatar}
		 * @slot
		 * @public
		 */
		avatar: {
			type: HTMLElement,
		},

		/**
		 * Defines the elements, displayed in the footer of the of the component.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footnotes: {
			type: HTMLElement,
			individualSlots: true,
		},

		/**
		 * Defines the content of the <code>ui5-li-notification</code>,
		 * usually a description of the notification.
		 *
		 * <br><br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot description
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
 * The component has a rich set of various properties that allows the user to set <code>avatar</code>, <code>titleText</code>, descriptive <code>content</code>
 * and <code>footnotes</code> to fully describe a notification.
 * <br>
 *
 * The user can:
 * <ul>
 * <li>display a <code>Close</code> button</li>
 * <li>can control whether the <code>titleText</code> and <code>description</code> should wrap or truncate
 * and display a <code>ShowMore</code> button to switch between less and more information</li>
 * <li>add custom actions by using the <code>ui5-notification-action</code> component</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The component can be used in a standard <code>ui5-list</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li-notification</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title-text - Used to style the titleText of the notification list item</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/NotificationListItem.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/NotificationAction.js";</code> (optional)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.NotificationListItem
 * @extends sap.ui.webcomponents.fiori.NotificationListItemBase
 * @tagname ui5-li-notification
 * @appenddocs NotificationAction
 * @since 1.0.0-rc.8
 * @implements sap.ui.webcomponents.fiori.INotificationListItem, sap.ui.webcomponents.main.IListItem
 * @public
 */
class NotificationListItem extends NotificationListItemBase {
	constructor() {
		super();

		// the titleText overflow height
		this._titleTextOverflowHeight = 0;

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
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_SHOW_LESS);
		}

		return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_SHOW_MORE);
	}

	get overflowBtnAccessibleName() {
		return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
	}

	get closeBtnAccessibleName() {
		return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE);
	}

	get hideShowMore() {
		if (this.wrappingType === WrappingType.None && this._showMore) {
			return undefined;
		}

		return true;
	}

	get descriptionDOM() {
		return this.shadowRoot.querySelector(".ui5-nli-description");
	}

	get titleTextDOM() {
		return this.shadowRoot.querySelector(".ui5-nli-title-text");
	}

	get titleTextHeight() {
		return this.titleTextDOM.offsetHeight;
	}

	get descriptionHeight() {
		return this.descriptionDOM.offsetHeight;
	}

	get titleTextOverflows() {
		const titleText = this.titleTextDOM;

		if (!titleText) {
			return false;
		}

		return titleText.offsetHeight < titleText.scrollHeight;
	}

	get descriptionOverflows() {
		const description = this.descriptionDOM;

		if (!description) {
			return false;
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

		if (this.hasTitleText) {
			ids.push(`${id}-title-text`);
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
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT);
		}

		if (this.priority === Priority.Medium) {
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT);
		}

		if (this.priority === Priority.Low) {
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT);
		}

		return "";
	}

	get accInvisibleText() {
		const notificationText = NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_TXT);
		const readText = this.read ? NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_READ) : NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_UNREAD);
		const priorityText = this.priorityText;

		return `${notificationText} ${readText} ${priorityText}`;
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
		if (this.wrappingType === WrappingType.Normal) {
			this._showMore = false;
			return;
		}

		const titleTextWouldOverflow = this.titleTextHeight > this._titleTextOverflowHeight;
		const descWouldOverflow = this.hasDesc && this.descriptionHeight > this._descOverflowHeight;
		const overflows = titleTextWouldOverflow || descWouldOverflow;

		if (this._showMorePressed && overflows) {
			this._showMore = true;
			return;
		}

		if (this.titleTextOverflows || this.descriptionOverflows) {
			this._titleTextOverflowHeight = this.titleTextHeight;
			this._descOverflowHeight = this.hasDesc ? this.descriptionHeight : 0;
			this._showMore = true;
			return;
		}

		this._showMore = false;
	}
}

NotificationListItem.define();

export default NotificationListItem;
