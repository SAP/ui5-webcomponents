import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import List from "@ui5/webcomponents/dist/List.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import type NotificationAction from "./NotificationAction.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import type { NotificationListItemBaseCloseEventDetail as NotificationListGroupItemCloseEventDetail } from "./NotificationListItemBase.js";

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
	// NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT,
	// NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT,
	// NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT,
	NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE,
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
 * - `Priority` icon to display the priority of the group (deprecated!)
 * - `TitleText` to entitle the group
 * - Custom actions - with the use of `ui5-notification-action` (deprecated!)
 * - Items of the group
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NotificationListGroupItem.js";`
 *
 * `import "@ui5/webcomponents/dist/NotificationAction.js";` (optional)
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

/**
 * Fired when the <code>Close</code> button is pressed.
 *
 * @param {HTMLElement} item the closed item.
 * @public
 * @override
 * @deprecated With the new design the close button will not be shown therefore close event is not needed.
 */
@event<NotificationListGroupItemCloseEventDetail>("close", {
	detail: {
	   /**
		* @public
		*/
	   item: {
		   type: HTMLElement,
	   },
	 },
})

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
	 * @public
	 * @deprecated With the new design the items counter will not be shown.
	 */
	@property({ type: Boolean })
	showCounter!: boolean;

	/**
	 * Defines the <code>priority</code> of the item.
	 *
	 * @default "None"
	 * @public
	 * @override
	 * @deprecated With the new design the priority will not be shown.
	 */
		@property({ type: Priority, defaultValue: Priority.None })
		priority!: `${Priority}`;

	/**
	 * Defines if the <code>close</code> button would be displayed.
	 * @default false
	 * @public
	 * @override
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

	/**
	 * Defines the actions, displayed in the top-right area.
	 * <br><br>
	 * <b>Note:</b> use the <code>ui5-notification-action</code> component.
	 * @override
	 * @deprecated
	 *
	 * @public
	 */
	@slot()
	actions!: Array<NotificationAction>

	onBeforeRendering() {
		if (this.busy) {
			this.clearChildBusyIndicator();
		}

		if (this.showCounter) {
			console.warn("The property 'showCounter' is deprecated for the ui5-li-notification-group and will be removed in future."); // eslint-disable-line
		}

		if (this.priority !== "None") {
			console.warn("The property 'priority' is deprecated for the ui5-li-notification-group and will be removed in future."); // eslint-disable-line
		}

		if (this.showClose) {
			console.warn("The property 'showClose' is deprecated for the ui5-li-notification-group and will be removed in future."); // eslint-disable-line
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

	get overflowBtnAccessibleName() {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE);
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
	NotificationListGroupItemCloseEventDetail,
};
