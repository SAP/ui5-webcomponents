import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type {
	ListItemClickEventDetail,
	ListItemToggleEventDetail,
	ListItemCloseEventDetail,
} from "@ui5/webcomponents/dist/List.js";
import NotificationListItemBase from "./NotificationListItemBase.js";
import NotificationListInternal from "./NotificationListInternal.js";

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
		NotificationListInternal,
	],
})

/**
 * Fired when an item is clicked.
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
 * Fired when the `Close` button of any item is clicked.
 *
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
 * Fired when an item is toggled.
 *
 * @param {HTMLElement} item the toggled item.
 * @public
 */
@event<NotificationItemToggleEventDetail>("item-toggle", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})

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

	get _accessibleName() {
		return NotificationList.i18nFioriBundle.getText(NOTIFICATION_LIST_ACCESSIBLE_NAME);
	}

	static i18nFioriBundle: I18nBundle;

	getEnabledItems() {
		return this.innerList?.getEnabledItems() || [];
	}

	get innerList() {
		return this.shadowRoot?.querySelector("ui5-notification-list-internal") as NotificationListInternal;
	}

	_onItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireEvent<NotificationItemClickEventDetail>("item-click", { item }, true)) {
			e.preventDefault();
		}
	}

	_onItemClose(e: CustomEvent<ListItemCloseEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireEvent<NotificationItemCloseEventDetail>("item-close", { item }, true)) {
			e.preventDefault();
		}
	}

	_onItemToggle(e: CustomEvent<ListItemToggleEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireEvent<NotificationItemToggleEventDetail>("item-toggle", { item }, true)) {
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
