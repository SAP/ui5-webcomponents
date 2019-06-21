import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import { fetchResourceBundle, getResourceBundle } from "@ui5/webcomponents-base/src/ResourceBundle.js";
import MessageStripType from "./types/MessageStripType.js";
import MessageStripTemplate from "./build/compiled/MessageStripTemplate.lit.js";
import Icon from "./Icon.js";

import { MESSAGE_STRIP_CLOSE_BUTTON } from "./i18n/defaults.js";

// Styles
import messageStripCss from "./themes/MessageStrip.css.js";

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
		 * Defines the icon src URI to be displayed as graphical element within the <code>ui5-messagestrip</code>.
		 * <br></br>
		 * <b>Note:</b> If no icon is given, the default icon for the <code>ui5-messagestrip</code> type will be added.
		 * The SAP-icons font provides numerous options.
		 * <br></br>
		 * Example:
		 * <br>
		 * <pre>ui5-messagestrip icon="sap-icon://palette"</pre>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the MessageStrip renders icon in the beginning.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		noIcon: {
			type: Boolean,
		},

		/**
		 * Defines whether the MessageStrip renders close icon.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		noCloseButton: {
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

	static get render() {
		return litRender;
	}

	static get template() {
		return MessageStripTemplate;
	}

	static get styles() {
		return messageStripCss;
	}

	constructor() {
		super();

		this._closeButton = {
			press: this._handleCloseIconPress.bind(this),
		};

		this.resourceBundle = getResourceBundle("@ui5/webcomponents");
	}

	_handleCloseIconPress() {
		this.fireEvent("close", {});
	}

	static async define(...params) {
		await fetchResourceBundle("@ui5/webcomponents");

		await Icon.define();

		super.define(...params);
	}

	static typeClassesMappings() {
		return {
			"Information": "ui5-messagestrip--info",
			"Positive": "ui5-messagestrip--positive",
			"Negative": "ui5-messagestrip--negative",
			"Warning": "ui5-messagestrip--warning",
		};
	}

	static iconMappings() {
		return {
			"Information": "sap-icon://message-information",
			"Positive": "sap-icon://message-success",
			"Negative": "sap-icon://message-error",
			"Warning": "sap-icon://message-warning",
		};
	}

	get hiddenText() {
		return `Message Strip ${this.type} ${this.noCloseButton ? "" : "closable"}.`;
	}

	get _closeButtonText() {
		return this.resourceBundle.getText(MESSAGE_STRIP_CLOSE_BUTTON);
	}

	get classes() {
		return {
			label: {
				"ui5-messagestrip-text": true,
				"ui5-messagestripNoCloseButton": this.noCloseButton,
			},
			closeIcon: {
				"ui5-messagestrip-close-icon": true,
			},
			main: {
				"ui5-messagestrip-root": true,
				"ui5-messagestrip-icon--hidden": this.noIcon,
				"ui5-messagestrip-close-icon--hidden": this.noCloseButton,
				[this.typeClasses]: true,
			},
		};
	}

	get messageStripIcon() {
		return this.icon || MessageStrip.iconMappings()[this.type];
	}

	get typeClasses() {
		return MessageStrip.typeClassesMappings()[this.type];
	}
}

MessageStrip.define();

export default MessageStrip;
