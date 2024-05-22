import {
	isSpace, isPlus, isMinus, isLeft, isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import NotificationListGroupList from "./NotificationListGroupList.js";
import NotificationListItemBase from "./NotificationListItemBase.js";

// Icons
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

// Texts
import {
	NOTIFICATION_LIST_GROUP_ITEM_TXT,
	NOTIFICATION_LIST_GROUP_COLLAPSED,
	NOTIFICATION_LIST_GROUP_EXPANDED,
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
 * ### Keyboard Handling
 * The `ui5-li-notification-group` provides advanced keyboard handling.
 *
 * #### Basic Navigation
 * When a list is focused, the user can use the following keyboard shortcuts in order to navigate:
 *
 * - [Up] or [Down] - navigates up or down the items
 * - [Home] - navigates to the first item
 * - [End] - navigates to the last item
 *
 * #### Fast Navigation
 * This component provides fast navigation when the header is focused using the following keyboard shortcuts:
 *
 * - [Space] - toggles expand / collapse of the group
 * - [Plus] - expands the group
 * - [Minus] - collapses the group
 * - [Right] - expands the group
 * - [Left] - collapses the group
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
	styles: [
		NotificationListGroupItemCss,
	],
	template: NotificationListGroupItemTemplate,
	dependencies: [
		NotificationListGroupList,
		Button,
		Icon,
		BusyIndicator,
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
	 * Defines the items of the `ui5-li-notification-group`,
	 * usually `ui5-li-notification` items.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<NotificationListItemBase>

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this.loading) {
			this.clearChildBusyIndicator();
		}
		this.actionable = false;
	}

	/**
	 * Clears child items loading state to show a single loading over the entire group,
	 * instead of multiple BusyIndicator instances
	 */
	clearChildBusyIndicator() {
		this.items.forEach(item => {
			item.loading = false;
		});
	}

	get toggleBtnAccessibleName() {
		if (this.collapsed) {
			return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE);
		}

		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE);
	}

	get accInvisibleText() {
		return `${this.groupText} ${this.expandText}`;
	}

	get expandText() {
		if (this.collapsed) {
			return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_COLLAPSED);
		}

		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_EXPANDED);
	}

	get groupText() {
		return NotificationListGroupItem.i18nFioriBundle.getText(NOTIFICATION_LIST_GROUP_ITEM_TXT);
	}

	get ariaLabelledBy() {
		const id = this._id;

		return this.hasTitleText ? `${id}-title-text` : "";
	}

	get _ariaExpanded() {
		return !this.collapsed;
	}

	get _pressable() {
		return false;
	}

	get groupCollapsedIcon() {
		return this.collapsed ? "navigation-right-arrow" : "navigation-down-arrow";
	}

	get groupCollapsedTooltip() {
		// eslint-disable-next-line
		// ToDo: edit and add translation when spec is ready
		return this.collapsed ? "expand arrow" : "collapse arrow";
	}

	toggleCollapsed() {
		this.collapsed = !this.collapsed;
		this.fireEvent<NotificationListGroupItemToggleEventDetail>("toggle", { item: this });
	}

	/**
	 * Event handlers
	 *
	 */
	_onHeaderToggleClick() {
		this.toggleCollapsed();
	}

	async _onkeydown(e: KeyboardEvent) {
		await super._onkeydown(e);

		const isFocused = document.activeElement === this;
		if (!isFocused) {
			return;
		}

		const space = isSpace(e);
		const plus = isPlus(e);
		const minus = isMinus(e);
		const left = isLeft(e);
		const right = isRight(e);

		if (space) {
			this.toggleCollapsed();
		}

		if (plus || right) {
			// expand
			if (this.collapsed) {
				this.toggleCollapsed();
			}
		}

		if (minus || left) {
			// collapse
			if (!this.collapsed) {
				this.toggleCollapsed();
			}
		}
	}

	getHeaderDomRef() {
		return this.getDomRef()?.querySelector(".ui5-nli-group-header") as HTMLElement;
	}
}

NotificationListGroupItem.define();

export default NotificationListGroupItem;
export type {
	NotificationListGroupItemToggleEventDetail,
};
