import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SegmentedButton, { SegmentedButtonSelectionChangeEventDetail } from "./SegmentedButton.js";
import MessageViewItem from "./MessageViewItem.js";
import ListItemType from "./types/ListItemType.js";
import List from "./List.js";
import Icon from "./Icon.js";
import CustomListItem from "./CustomListItem.js";
import Link from "./Link.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";

import MessageViewTemplate from "./generated/templates/MessageViewTemplate.lit.js";

// Styles
import MessageViewCss from "./generated/themes/MessageView.css.js";

// Texts
import { MESSAGE_VIEW_MORE_INFORMATION } from "./generated/i18n/i18n-defaults.js";

enum MessageType {
	None = "None",
	Error = "Error",
	Warning = "Warning",
	Success = "Success",
	Info = "Info"
}

enum MessageTypeIcon {
	Info = "information",
	Success = "status-positive",
	Error = "error",
	Warning = "status-critical"
}

enum DesignClassesMapping {
	Info = "information",
	Success = "success",
	Error = "error",
	Warning = "warning",
}

enum MessageViewMode {
	Messages = "messages",
	Details = "details",
}

type MessageItem = {
	message: MessageViewItem,
	messageIcon: string,
	messageDesign: string,
	position: number,
	visible: boolean,
}

type MessageButtonDataType = {
	messageType: string,
	messageCount: number,
	messageIcon: string,
	messageDesign: string,
	pressed: boolean
}

type MessageViewItemClickEventDetail = {
	item: MessageItem
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-message-view</code> component is used to display a summarized list of different types of messages (error, warning, success, and information messages).
 *
 * <h3>Usage</h3>
 *
 * You can use the message view to display messages that are not related to form or table fields.
 * These messages are triggered in response to a user action.
 * Although the message view can be embedded within various controls, we recommend that you use it only within a dialog.
 * Use the message view if you want to display multiple messages triggered by an action within a disruptive dialog.
 *
 * For the <code>ui5-message-view</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/MessageView.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MessageView
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-message-view
 * @public
 */
@customElement({
	tag: "ui5-message-view",
	renderer: litRender,
	languageAware: true,
	styles: MessageViewCss,
	template: MessageViewTemplate,
	dependencies: [SegmentedButton, SegmentedButtonItem, List, CustomListItem, Icon, Link],
})
/**
 * Fired when an item is being clicked.
 *
 * @event sap.ui.webc.main.MessageView#item-click
 * @public
 */
@event("item-click", {
	detail: {
		item: { type: HTMLElement },
	},
})
class MessageView extends UI5Element {
	/**
	 * Defines the items of the component.
	 *
	 * @type {sap.ui.webc.main.MessageViewItem[]}
	 * @name sap.ui.webc.main.MessageView.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<MessageViewItem>;

	/**
	 * Stores the selected message type
	 * @type {string}
	 * @private
	 */
	@property()
	_selectedMessageType!: string;

	/**
	 * Stores the list of messages
	 * @type {Array<MessageItem>}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_messages!: Array<MessageItem>

	/**
	 * Stores the selected message position if any
	 * @type {Integer}
	 * @private
	 */
	@property({ type: Integer, defaultValue: 0 })
	_selectedMessagePosition!: number

	static i18nBundle: I18nBundle;

	static async onDefine() {
		MessageView.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
		this._selectedMessageType = MessageType.None;
	}

	onBeforeRendering() {
		// Enhance the ui5-message-view-item with proper message icon and design classes
		this._messages = this.items.map((item, index) => {
			return {
				message: item,
				messageIcon: MessageTypeIcon[item.type as keyof typeof MessageTypeIcon],
				messageDesign: DesignClassesMapping[item.type as keyof typeof DesignClassesMapping],
				visible: true,
				position: index + 1,
				listItemType: item.description ? ListItemType.Navigation : ListItemType.Inactive,
			};
		});

		if (this._messages.length === 1) {
			this._selectedMessagePosition = 1;
		}
	}

	/**
	 * Closes the details message view and fires the view-change event of the underlying ui5-message-view-item
	 * @public
	*/
	closeSelectedMessage() {
		if (this.hasSelectedMessage) {
			this.selectedMessage.message.onViewChange(MessageViewMode.Messages);
		}
		this._selectedMessagePosition = 0;
	}

	/**
	 * Filters the messages by selected message type
	 * @private
	 */
	_filterByMessageType(e: CustomEvent<SegmentedButtonSelectionChangeEventDetail>) {
		if (e.detail.selectedItems.length) {
			this._selectedMessageType = e.detail.selectedItems[0].getAttribute("data-message-type")!;
		}
	}

	/**
	 * Selects a message from the list and navigates to message detailed description
	 * item-click event is fired and view-change event of the underlying message is fired
	 * @private
	 */
	_selectListItem(e: any) {
		const item = e.detail.item;
		this.fireEvent<MessageViewItemClickEventDetail>("item-click", { item });

		this._selectedMessagePosition = item.position ? item.position : 0;

		if (this.selectedMessage) {
			this.selectedMessage.message.onViewChange(MessageViewMode.Details);
		}
	}

	get messageItemsByType() {
		const result: Array<MessageButtonDataType> = [];

		Object.values(MessageType).forEach(mt => {
			const count = this._messages.filter(i => i.message.type === mt).length;
			if (count > 0) {
				result.push({
					messageType: mt,
					messageCount: count,
					messageIcon: MessageTypeIcon[mt as keyof typeof MessageTypeIcon],
					messageDesign: DesignClassesMapping[mt as keyof typeof DesignClassesMapping],
					pressed: mt === this._selectedMessageType,
				});
			}
		});

		return result;
	}

	get hasSelectedMessage() {
		return this._selectedMessagePosition > 0;
	}

	get moreInformationText() {
		return MessageView.i18nBundle.getText(MESSAGE_VIEW_MORE_INFORMATION);
	}

	get filteredItems() {
		if (this._selectedMessageType !== MessageType.None) {
			this._messages.forEach(item => { item.visible = item.message.type === this._selectedMessageType; });
		}
		return this._messages;
	}

	get hasHeaderButtons() {
		return this._messages.map(m => m.message.type).filter((type, idx, self) => self.indexOf(type) === idx).length > 1;
	}

	get selectedMessage() {
		return this._messages[this._selectedMessagePosition - 1];
	}
}

MessageView.define();

export default MessageView;

export {
	MessageViewMode,
};
