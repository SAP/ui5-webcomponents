import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SegmentedButton, { SegmentedButtonSelectionChangeEventDetail } from "./SegmentedButton.js";
import MessageViewItem from "./MessageViewItem.js";
import ListItemType from "./types/ListItemType.js";

import MessageViewTemplate from "./generated/templates/MessageViewTemplate.lit.js";

// Styles
import MessageViewCss from "./generated/themes/MessageView.css.js";

// Texts
import {
	MESSAGE_VIEW_MORE_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";
import List from "./List.js";
import Icon from "./Icon.js";
import Dialog from "./Dialog.js";

enum MessageType {
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
	List = "list",
	Details = "details"
}

type MessageItem = {
	message: MessageViewItem,
	messageIcon: string,
	messageDesign: string,
	position: number,
	visible: boolean,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>message-view</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/MessageView.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MessageView
 * @extends sap.ui.webc.base.UI5Element
 * @tagname message-view
 * @public
 */
@customElement({
	tag: "ui5-message-view",
	renderer: litRender,
	themeAware: true,
	languageAware: true,
	styles: MessageViewCss,
	template: MessageViewTemplate,
	dependencies: [SegmentedButton, List, Icon, MessageViewItem],
})
/**
 * Fired when an item is being clicked.
 *
 * @event sap.ui.webc.main.MessageView#message-view-item-click
 * @public
 */
@event("message-view-item-click", {
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
	 * Stores the selected messge type
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
	@property({ type: Integer })
	_selctedMessagePosition!: number

	static i18nBundle: I18nBundle;

	static async onDefine() {
		MessageView.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._messages = [];
	}

	onBeforeRendering() {
		// Enhance the message-view-items with proper message icon and design classes
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
			this._selctedMessagePosition = 1;
		}
	}

	get messageItemsByType() {
		const result: { messageType: string, messageCount: number, messageIcon: string, messageDesign: string, pressed: boolean }[] = [];

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
		if (!this._messages.length) {
			return false;
		}
		return this._selctedMessagePosition > 0;
	}

	get _moreInformationTextTranslation() {
		return MessageView.i18nBundle.getText(MESSAGE_VIEW_MORE_INFORMATION);
	}

	get _filteredItems() {
		if (this._selectedMessageType && this._selectedMessageType !== "undefined") {
			this._messages.forEach(item => { item.visible = item.message.type === this._selectedMessageType; });
		}
		return this._messages;
	}

	get _isSingleMessage() {
		return this._messages && this._messages.length === 1;
	}

	get _hasHeaderButtons() {
		return this._messages.map(m => m.message.type).filter((type, idx, self) => self.indexOf(type) === idx).length > 1;
	}

	get _selectedMessage() {
		return this._messages[this._selctedMessagePosition - 1];
	}

	isMessageDetailsOpen() {
		return this.hasSelectedMessage;
	}

	closeSelectedMessage() {
		if (this._selectedMessage) {
			this._selectedMessage.message.fireEvent("view-change", { mode: MessageViewMode.List, item: this._selectedMessage });
		}
		this._selctedMessagePosition = 0;
	}

	_filterByMessageType(e: CustomEvent<SegmentedButtonSelectionChangeEventDetail>) {
		if (e.detail.selectedItems && e.detail.selectedItems.length) {
			this._selectedMessageType = e.detail.selectedItems[0].id;
		}
	}

	_selectListItem(e: any) {
		const item = e.detail.item;
		this.fireEvent("message-view-item-click", { item });

		this._selctedMessagePosition = item.position ? item.position : 0;

		if (this._selectedMessage) {
			this._selectedMessage.message.fireEvent("view-change", { mode: MessageViewMode.Details, item: this._selectedMessage });
		}
	}
}

MessageView.define();

export default MessageView;

export {
	MessageViewMode,
};
