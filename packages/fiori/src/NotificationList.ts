import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ListGrowingMode from "@ui5/webcomponents/dist/types/ListGrowingMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import List from "@ui5/webcomponents/dist/List.js";
import type {
	ListItemClickEventDetail,
	ListItemToggleEventDetail,
	ListItemCloseEventDetail,
} from "@ui5/webcomponents/dist/List.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";

// Template
import NotificationListTemplate from "./generated/templates/NotificationListTemplate.lit.js";

// Texts
import {
	NOTIFICATION_LIST_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

type NotificationItemEventDetail = {
	item: NotificationListItemBase,
}

type NotificationItemClickEventDetail = NotificationItemEventDetail;
type NotificationItemToggleEventDetail = NotificationItemEventDetail;
type NotificationItemCloseEventDetail = NotificationItemEventDetail;

/**
 * @class
 * ### Overview
 * The `ui5-notification-list` web component represents
 * a container for `ui5-li-notification-group` and `ui5-li-notification`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NotificationList.js";``
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-notification-list",
	renderer: litRender,
	languageAware: true,
	styles: [],
	template: NotificationListTemplate,
	dependencies: [
		List,
	],
})

/**
 * Fired when an item is activated, unless the item's `type` property
 * is set to `Inactive`.
 * @allowPreventDefault
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event<NotificationItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the `Close` button of any item is clicked
 *
 * **Note:** This event is only applicable to list items that can be closed (such as notification list items),
 * not to be confused with `item-delete`.
 * @param {HTMLElement} item the item about to be closed.
 * @public
 */
@event<NotificationItemCloseEventDetail>("item-close", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the `Toggle` button of any item is clicked.
 *
 * **Note:** This event is only applicable to list items that can be toggled (such as notification group list items).
 * @param {HTMLElement} item the toggled item.
 * @public
 * @since 1.0.0-rc.8
 */
@event<NotificationItemToggleEventDetail>("item-toggle", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

/**
 * Fired when the user scrolls to the bottom of the list.
 *
 * **Note:** The event is fired when the `growing='Scroll'` property is enabled.
 * @public
 */
@event("load-more")
class NotificationList extends UI5Element {
	/**
	 * Defines the items of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<NotificationListItemBase>;

	/**
	 * Defines the text that is displayed when the component contains no items.
	 * @default ""
	 * @public
	 */
	@property()
	noDataText!: string;

	/**
	 * Defines whether the component will have growing capability either by pressing a `More` button,
	 * or via user scroll. In both cases `load-more` event is fired.
	 *
	 * **Restrictions:** `growing="Scroll"` is not supported for Internet Explorer,
	 * on IE the component will fallback to `growing="Button"`.
	 * @default "None"
	 * @public
	 */
	@property({ type: ListGrowingMode, defaultValue: ListGrowingMode.None })
	growing!: `${ListGrowingMode}`;

	/**
	 * Defines the text that will be displayed inside the growing button.
	 *
	 * **Note:** If not specified a built-in text will be displayed.
	 *
	 * **Note:** This property takes effect if the `growing` property is set to the `Button`.
	 * @default ""
	 * @public
	 */
	@property()
	growingButtonText!: string;

	/**
	 * Defines if the component would display a loading indicator over the list.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	loading!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	loadingDelay!: number;

	get _accessibleName() {
		return NotificationList.i18nFioriBundle.getText(NOTIFICATION_LIST_ACCESSIBLE_NAME);
	}

	static i18nFioriBundle: I18nBundle;

	get navigationItems(): Array<ListItemBase> {
		const items = new Array<NotificationListItemBase>();

		this.items.forEach(item => {
			items.push(item);

			if (item instanceof NotificationListGroupItem && !item.collapsed) {
				item.items.forEach(subItem => {
					items.push(subItem);
				});
			}
		});

		return items;
	}

	_onItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireEvent<NotificationItemClickEventDetail>("item-click", { item }, true)) {
			e.preventDefault();
		}
	}

	_onItemClose(e: CustomEvent<ListItemCloseEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireEvent<NotificationItemClickEventDetail>("item-close", { item }, true)) {
			e.preventDefault();
		}
	}

	_onItemToggle(e: CustomEvent<ListItemToggleEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireEvent<NotificationItemClickEventDetail>("item-close", { item }, true)) {
			e.preventDefault();
		}
	}

	_onLoadMore() {
		this.fireEvent("load-more");
	}

	static async onDefine() {
		NotificationList.i18nFioriBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

NotificationList.define();

export default NotificationList;
export type {
	NotificationItemClickEventDetail,
	NotificationItemToggleEventDetail,
	NotificationItemCloseEventDetail,
};
