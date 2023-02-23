import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import List from "@ui5/webcomponents/dist/List.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import NotificationListItem from "./NotificationListItem.js";

// Icons
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";

// Texts
import {
	NOTIFICATION_LIST_GROUP_ITEM_TXT,
	NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT,
	NOTIFICATION_LIST_ITEM_READ,
	NOTIFICATION_LIST_ITEM_UNREAD,
	NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE,
	NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE,
	NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE,
	NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import NotificationListGroupItemTemplate from "./generated/templates/NotificationListGroupItemTemplate.lit.js";

// Styles
import NotificationListGroupItemCss from "./generated/themes/NotificationListGroupItem.css.js";

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
 * <li><code>TitleText</code> to entitle the group</li>
 * <li>Custom actions - with the use of <code>ui5-notification-action</code></li>
 * <li>Items of the group</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The component can be used in a standard <code>ui5-list</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li-notification-group</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title-text - Used to style the titleText of the notification list group item</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/NotificationListGroupItem.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/NotificationAction.js";</code> (optional)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.NotificationListGroupItem
 * @extends sap.ui.webc.fiori.NotificationListItemBase
 * @tagname ui5-li-notification-group
 * @since 1.0.0-rc.8
 * @appenddocs sap.ui.webc.fiori.NotificationAction
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
@customElement("ui5-li-notification-group")
@languageAware

/**
 * Fired when the <code>ui5-li-notification-group</code> is expanded/collapsed by user interaction.
 *
 * @event
 * @public
 * @event sap.ui.webc.fiori.NotificationListGroupItem#toggle
 */
@event("toggle")
class NotificationListGroupItem extends NotificationListItemBase {
/**
 * Defines if the group is collapsed or expanded.
 * @type {boolean}
 * @defaultvalue false
 * @name sap.ui.webc.fiori.NotificationListGroupItem.prototype.collapsed
 * @public
 */
@property({ type: Boolean })
collapsed!: boolean;

/**
 * Defines if the items <code>counter</code> would be displayed.
 * @type {boolean}
 * @defaultvalue false
 * @name sap.ui.webc.fiori.NotificationListGroupItem.prototype.showCounter
 * @public
 */
@property({ type: Boolean })
showCounter!: boolean;

/**
 * Defines the items of the <code>ui5-li-notification-group</code>,
 * usually <code>ui5-li-notification</code> items.
 *
 * @type {sap.ui.webc.fiori.INotificationListItem[]}
 * @slot items
 * @name sap.ui.webc.fiori.NotificationListGroupItem.prototype.default
 * @public
 */
@slot({ type: HTMLElement, "default": true })
items!: Array<NotificationListItem>

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

static get dependencies() {
	return [
		List,
		Button,
		Icon,
		BusyIndicator,
		Popover,
	];
}

get itemsCount() {
	return this.items.length;
}

get overflowBtnAccessibleName() {
	return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
}

get closeBtnAccessibleName() {
	return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE);
}

get toggleBtnAccessibleName() {
	if (this.collapsed) {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE);
	}

	return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE);
}

get priorityText() {
	if (this.priority === Priority.High) {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT);
	}

	if (this.priority === Priority.Medium) {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT);
	}

	if (this.priority === Priority.Low) {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT);
	}

	return "";
}

get accInvisibleText() {
	return `${this.groupText} ${this.readText} ${this.priorityText} ${this.counterText}`;
}

get readText() {
	if (this.read) {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_READ);
	}

	return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_UNREAD);
}

get groupText() {
	return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TXT);
}

get counterText() {
	const text = NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT);
	return this.showCounter ? `${text} ${this.itemsCount}` : "";
}

get ariaLabelledBy() {
	const id = this._id;
	const ids = [];

	if (this.hasTitleText) {
		ids.push(`${id}-title-text`);
	}

	ids.push(`${id}-invisibleText`);
	return ids.join(" ");
}

get _ariaExpanded() {
	return !this.collapsed;
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
