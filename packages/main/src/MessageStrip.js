import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import MessageStripContext from "./MessageStripContext";
import MessageStripType from "./types/MessageStripType";
import MessageStripRenderer from "./build/compiled/MessageStripRenderer.lit";
import Icon from "./Icon";
import Label from "./Label";

// Styles
import belize from "./themes/sap_belize/MessageStrip.less";
import belizeHcb from "./themes/sap_belize_hcb/MessageStrip.less";
import fiori3 from "./themes/sap_fiori_3/MessageStrip.less";

ShadowDOM.registerStyle("sap_belize", "MessageStrip.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "MessageStrip.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "MessageStrip.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-messagestrip",
	styleUrl: [
		"MessageStrip.css",
	],
	usesNodeText: true,
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
		type: { type: MessageStripType, defaultValue: MessageStripType.Information },

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
		icon: { type: URI, defaultValue: null },

		/**
		 * Defines whether the MessageStrip renders icon in the beginning.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideIcon: { type: Boolean, defaultValue: false },

		/**
		 * Defines whether the MessageStrip renders close icon.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideCloseButton: { type: Boolean, defaultValue: false },

		_closeButton: { type: Object },
	},
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
 * @extends WebComponent
 * @tagname ui5-messagestrip
 * @usestextcontent
 * @public
 */
class MessageStrip extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return MessageStripRenderer;
	}

	static get calculateTemplateContext() {
		return MessageStripContext.calculate;
	}

	constructor() {
		super();

		this._closeButton = {
			_closeButtonClicked: this._closeButtonClicked.bind(this),
		};
	}

	onAfterRendering() {
		// Hack for styling the button
		if (!this.hideCloseButton) {
			this.shadowRoot.querySelector("ui5-button")._customClasses = ["sapWCButtonInMessageStrip"];
		}
	}

	_closeButtonClicked(_event) {
		this.fireEvent("close", {});
	}

	static async define(...params) {
		await Promise.all([
			Icon.define(),
			Label.define()
		]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	MessageStrip.define();
});

export default MessageStrip;
