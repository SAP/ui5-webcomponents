import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import List from "@ui5/webcomponents/dist/List.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import NotificationListItemBase from "./NotificationListItemBase.js";

// Icons
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/decline.js";

// Texts
import {
	NOTIFICATION_LIST_GROUP_ITEM_TXT,
	NOTIFICATION_LIST_ITEM_READ,
	NOTIFICATION_LIST_ITEM_UNREAD,
	NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE,
	NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import NotificationListGroupItemTemplate from "./generated/templates/NotificationListGroupItemTemplate.lit.js";

// Styles
import NotificationListGroupItemCss from "./generated/themes/NotificationListGroupItem.css.js";

type NotificationListGroupItemToggleEventDetail = {
	item: NotificationListGroupItem,
};

/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification-group` is a special type of list item,
 * that unlike others can group items within self, usually `ui5-li-notification` items.
 *
 * The component consists of:
 *
 * - `Toggle` button to expand and collapse the group
 * - `TitleText` to entitle the group
 * - Items of the group
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NotificationListGroupItem.js";`
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 */
@customElement({
	tag: "ui5-li-notification-group",
	languageAware: true,
	styles: NotificationListGroupItemCss,
	template: NotificationListGroupItemTemplate,
	dependencies: [
		List,
		Button,
		Icon,
		BusyIndicator,
		Popover,
	],
})

/**
 * Fired when the `ui5-li-notification-group` is expanded/collapsed by user interaction.
 * @public
 */
@event("toggle")

class NotificationListGroupItem extends NotificationListItemBase {
	/**
	 * Defines if the group is collapsed or expanded.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	collapsed!: boolean;

	/**
	 * Defines if the items `counter` would be displayed.
	 * @default false
	 * @private
	 * @deprecated With the new design the items counter will not be shown.
	 */
	@property({ type: Boolean })
	showCounter!: boolean;

	/**
	 * Defines if the `close` button would be displayed.
	 * @default false
	 * @private
	 * @deprecated With the new design the close button will not be shown.
	 */
	@property({ type: Boolean })
	showClose!: boolean;

	/**
	 * Defines the items of the `ui5-li-notification-group`,
	 * usually `ui5-li-notification` items.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<NotificationListItemBase>

	onBeforeRendering() {
		if (this.busy) {
			this.clearChildBusyIndicator();
		}

		if (this.showCounter) {
			console.warn("The property 'showCounter' is deprecated and removed for the ui5-li-notification-group."); // eslint-disable-line
		}

		if (this.priority !== "None") {
			console.warn("The property 'priority' is deprecated and removed for the ui5-li-notification-group."); // eslint-disable-line
		}

		if (this.showClose) {
			console.warn("The property 'showClose' is deprecated and removed for the ui5-li-notification-group."); // eslint-disable-line
		}

		if (this.actions.length > 0) {
			console.warn("ui5-notification-action is deprecated and removed as of version 2.0. For ui5-li-notification-group there are no group actions allowed."); // eslint-disable-line
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

	get toggleBtnAccessibleName() {
		if (this.collapsed) {
			return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE);
		}

		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE);
	}

	get accInvisibleText() {
		return `${this.groupText} ${this.readText}`;
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

	get groupCollapsedIcon() {
		return this.collapsed ? "navigation-right-arrow" : "navigation-down-arrow";
	}

	/**
	 * Event handlers
	 *
	 */
	_onBtnToggleClick() {
		this.collapsed = !this.collapsed;
		this.fireEvent<NotificationListGroupItemToggleEventDetail>("toggle", { item: this });
	}
}

NotificationListGroupItem.define();

export default NotificationListGroupItem;
export type {
	NotificationListGroupItemToggleEventDetail,
};
