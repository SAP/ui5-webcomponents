import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Styles
import MessageViewItemCss from "./generated/themes/MessageViewItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>message-view-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/MessageViewItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MessageViewItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname message-view-item
 * @public
 */
@customElement({
	tag: "ui5-message-view-item",
	renderer: litRender,
	styles: MessageViewItemCss,
	themeAware: true,
	languageAware: true,
	dependencies: [],
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @event sap.ui.webc.main.MessageViewItem#view-change
 * @public
 */
@event("view-change", {
	detail: {
		viewType: { type: String },
	},
})
class MessageViewItem extends UI5Element {
	/**
	 * Defines the title of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MessageViewItem.prototype.heading
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	heading!: string;

	/**
	 * Defines the title of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MessageViewItem.prototype.subtitle
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	subtitle!: string;

	/**
	 * Defines the description of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MessageViewItem.prototype.description
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	description!: string;

	/**
	 * Defines the type of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MessageViewItem.prototype.type
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	type!: string;
}

MessageViewItem.define();

export default MessageViewItem;
