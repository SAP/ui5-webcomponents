import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
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
	NOTIFICATION_LIST_ITEM_INFORMATION_STATUS_TXT,
	NOTIFICATION_LIST_ITEM_SUCCESS_STATUS_TXT,
	NOTIFICATION_LIST_ITEM_ERROR_STATUS_TXT,
	NOTIFICATION_LIST_ITEM_WARNING_STATUS_TXT,
	NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE,
	NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE,
	NOTIFICATION_LIST_ITEM_IMPORTANT_TXT,
} from "./generated/i18n/i18n-defaults.js";

// Templates
import NotificationListItemTemplate from "./generated/templates/NotificationListItemTemplate.lit.js";

// Styles
import NotificationListItemCss from "./generated/themes/NotificationListItem.css.js";

import type { NotificationListItemBaseCloseEventDetail as NotificationListItemCloseEventDetail } from "./NotificationListItemBase.js";

type NotificationListItemPressEventDetail = {
	item: NotificationListItem,
};

type Footnote = Record<string, any>;

/**
 * Defines the icons corresponding to the notification's priority.
 */
const ICON_PER_PRIORITY = {
	[Priority.High]: "message-error",
	[Priority.Medium]: "message-warning",
	[Priority.Low]: "message-success",
	[Priority.None]: "",
};

/**
 * Defines the icons corresponding to the notification's status indicator.
 */
const ICON_PER_STATUS = {
	[ValueState.Error]: "message-error",
	[ValueState.Warning]: "message-warning",
	[ValueState.Success]: "message-success",
	[ValueState.Information]: "message-information",
	[ValueState.None]: "",
};

/**
 * @class
 *
 * ### Overview
 * The `ui5-li-notification` is a type of list item, meant to display notifications.
 *
 * The component has a rich set of various properties that allows the user to set `avatar`, `menu`, `titleText`, descriptive `content`
 * and `footnotes` to fully describe a notification.
 *
 * The user can:
 *
 * - display a `Close` button
 * - can control whether the `titleText` and `description` should wrap or truncate
 * and display a `ShowMore` button to switch between less and more information
 * - add actions by using the `ui5-menu` component
 *
 * **Note:** Adding custom actions by using the `ui5-notification-action` component is deprecated!
 *
 * ### Usage
 * The component can be used in a standard `ui5-list`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NotificationListItem.js";`
 *
 * `import "@ui5/webcomponents/dist/NotificationAction.js";` (optional)
 * @constructor
 * @extends NotificationListItemBase
 * @since 1.0.0-rc.8
 * @public
 * @csspart title-text - Used to style the titleText of the notification list item
 */
@customElement({
	tag: "ui5-li-notification",
	languageAware: true,
	styles: NotificationListItemCss,
	template: NotificationListItemTemplate,
	dependencies: [
		Button,
		Icon,
		BusyIndicator,
		Link,
		Popover,
	],
})

@event("_press")
class NotificationListItem extends NotificationListItemBase {
	/**
	* Defines if the `titleText` and `description` should wrap,
	* they truncate by default.
	*
	* **Note:** by default the `titleText` and `description`,
	* and a `ShowMore/Less` button would be displayed.
	* @default "None"
	* @public
	* @since 1.0.0-rc.15
	*/
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: `${WrappingType}`;

	/**
	 * Defines the status indicator of the item.
	 * @default "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	statusIndicator!: `${ValueState}`;

	/**
	 * Defines the `priority` of the item.
	 *
	 * **Note:** this property is deprecated and will be removed in future. Please use "statusIndicator" property instead.
	 * @default "None"
	 * @public
	 * @deprecated
	 */
	@property({ type: Priority, defaultValue: Priority.None })
	priority!: `${Priority}`;

	/**
	 * Defines the `Important` label of the item.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	indicateImportance!: boolean;

	/**
	* Defines the state of the `titleText` and `description`,
	* if less or more information is displayed.
	* @private
	*/
	@property({ type: Boolean })
	_showMorePressed!: boolean;

	/**
	* Defines the visibility of the `showMore` button.
	* @private
	*/
	@property({ type: Boolean })
	_showMore!: boolean;

	/**
	* Defines the avatar, displayed in the `ui5-li-notification`.
	*
	* **Note:** Consider using the `ui5-avatar` to display icons, initials or images.
	*
	* **Note:** In order to be complaint with the UX guidlines and for best experience,
	* we recommend using avatars with 2rem X 2rem in size (32px X 32px). In case you are using the `ui5-avatar`
	* you can set its `size` property to `XS` to get the required size - `<ui5-avatar size="XS"></ui5-avatar>`.
	* @public
	*/
	@slot()
	avatar!: Array<HTMLElement>;

	/**
	* Defines the menu, displayed in the `ui5-li-notification`.
	*
	* **Note:** Use this for implementing actions.
	*
	* **Note:** Should be used instead i5-notification-action, which is deprecated as of ... version.
	* @public
	*/
	@slot()
	menu!: Array<HTMLElement>;

	/**
	* Defines the elements, displayed in the footer of the of the component.
	* @public
	*/
	@slot({ type: HTMLElement, individualSlots: true })
	footnotes!: Array<HTMLElement>;

	/**
	* Defines the content of the `ui5-li-notification`,
	* usually a description of the notification.
	*
	* **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	* @public
	*/
	@slot({ type: Node, "default": true })
	description!: Array<Node>;

	_titleTextOverflowHeight: number;
	_descOverflowHeight: number;
	_onResizeBound: ResizeObserverCallback;

	constructor() {
		super();

		// the titleText overflow height
		this._titleTextOverflowHeight = 0;

		// the description overflow height
		this._descOverflowHeight = 0;

		// the resize handler
		this._onResizeBound = this.onResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._onResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResizeBound);
	}

	get hasPriority() {
		const hasPriority = this.priority !== Priority.None;

		if (hasPriority) {
			console.warn("The property 'priority' is deprecated and will be removed in future! Please use 'statusIndicator' property instead!"); // eslint-disable-line
		}

		return hasPriority;
	}

	get hasStatusIndicator() {
		return this.statusIndicator !== ValueState.None;
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
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-nli-description");
	}

	get titleTextDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-nli-title-text");
	}

	get titleTextHeight() {
		return (this.titleTextDOM as HTMLElement).offsetHeight;
	}

	get descriptionHeight() {
		return (this.descriptionDOM as HTMLElement).offsetHeight;
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
				slotName: (el as Footnote)._individualSlot,
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

	get priorityIcon() {
		return ICON_PER_PRIORITY[this.priority];
	}

	get statusIcon() {
		return ICON_PER_STATUS[this.statusIndicator];
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

	get importanceText() {
		return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_IMPORTANT_TXT);
	}

	get statusIndicatorText() {
		if (this.statusIndicator === ValueState.Success) {
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_SUCCESS_STATUS_TXT);
		}

		if (this.statusIndicator === ValueState.Warning) {
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_WARNING_STATUS_TXT);
		}

		if (this.statusIndicator === ValueState.Error) {
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_ERROR_STATUS_TXT);
		}

		if (this.statusIndicator === ValueState.Information) {
			return NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_INFORMATION_STATUS_TXT);
		}

		return "";
	}

	get accInvisibleText() {
		const notificationText = NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_TXT);
		const readText = this.read ? NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_READ) : NotificationListItem.i18nFioriBundle.getText(NOTIFICATION_LIST_ITEM_UNREAD);
		const priorityText = this.priorityText;
		const statusIndicatorText = this.statusIndicatorText;
		const importanceText = this.importanceText;

		return `${notificationText} ${readText} ${priorityText} ${statusIndicatorText} ${importanceText}`;
	}

	/**
	 * Event handlers
	 */
	_onclick(e: MouseEvent) {
		this.fireItemPress(e);
	}

	_onShowMoreClick(e: MouseEvent) {
		e.preventDefault();
		this._showMorePressed = !this._showMorePressed;
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		if (isEnter(e)) {
			this.fireItemPress(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);

		const space = isSpace(e);

		if (space && getEventMark(e) === "link") {
			this._onShowMoreClick(e as unknown as MouseEvent);
			return;
		}

		if (space) {
			this.fireItemPress(e);
		}
	}

	/**
	 * Private
	 */
	fireItemPress(e: Event) {
		if (getEventMark(e) === "button" || getEventMark(e) === "link") {
			return;
		}

		this.fireEvent<NotificationListItemPressEventDetail>("_press", { item: this });
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
export type {
	NotificationListItemPressEventDetail,
	NotificationListItemCloseEventDetail,
};
