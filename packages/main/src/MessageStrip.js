import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import URI from "@ui5/webcomponents-base/src/types/URI.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import MessageStripTemplateContext from "./MessageStripTemplateContext.js";
import MessageStripType from "./types/MessageStripType.js";
import MessageStripRenderer from "./build/compiled/MessageStripRenderer.lit.js";
import Icon from "./Icon.js";

// Styles
import messageStripCss from "./themes/MessageStrip.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-messagestrip",
	properties: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {

		/**
		 * Defines the <code>ui5-messagestrip</code> type.
		 * <br></br>
		 * <b>Note:</b> Available options are <code>Information"</code>, <code>"Positive"</code>, <code>"Negative"</code>,
		 * and "Warning".
		 *
		 * @type {MessageStripType}
		 * @defaultvalue "Information"
		 * @public
		 */
		type: {
			type: MessageStripType,
			defaultValue: MessageStripType.Information,
		},

		/**
		 * Defines the icon to be displayed as graphical element within the <code>ui5-messagestrip</code>.
		 * If no icon is given, the default icon for the MessageStrip type will be added.
		 * The SAP-icons font provides numerous options.
		 * <br></br>
		 * Example:
		 * <br>
		 * <pre>ui5-messagestrip icon="sap-icon://palette"</pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {URI}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: URI,
			defaultValue: null,
		},

		/**
		 * Defines whether the MessageStrip renders icon in the beginning.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideIcon: {
			type: Boolean,
		},

		/**
		 * Defines whether the MessageStrip renders close icon.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideCloseButton: {
			type: Boolean,
		},

		_closeButton: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {
		/**
		 * Defines the text of the <code>ui5-messagestrip</code>.
		 * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		text: {
			type: Node,
			multiple: true,
		},
	},
	defaultSlot: "text",
	events: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {

		/**
		 * Fired when the close button is pressed either with a
		 * click/tap or by using the Enter or Space key.
		 *
		 * @event
		 * @public
		 */
		close: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-messagestrip</code> component enables the embedding of app-related messages.
 * It displays 4 types of messages, each with corresponding semantic color and icon: Information, Positive, Warning and Negative.
 * Each message can have a close button, so that it can be removed from the UI if needed.
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-messagestrip</code> component, you can define whether it displays
 * an icon in the beginning and a close button. Moreover, its size and background
 * can be controlled with CSS.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MessageStrip";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MessageStrip
 * @extends UI5Element
 * @tagname ui5-messagestrip
 * @public
 * @since 0.9.0
 */
class MessageStrip extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return MessageStripRenderer;
	}

	static get calculateTemplateContext() {
		return MessageStripTemplateContext.calculate;
	}

	static get styles() {
		return messageStripCss;
	}

	constructor() {
		super();

		this._closeButton = {
			press: this._handleCloseIconPress.bind(this),
		};
	}

	_handleCloseIconPress() {
		this.fireEvent("close", {});
	}

	static async define(...params) {
		await Promise.all([
			Icon.define(),
		]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	MessageStrip.define();
});

export default MessageStrip;
