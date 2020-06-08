import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/src/Keys.js";
import "@ui5/webcomponents-icons/dist/icons/decline.js";
import "@ui5/webcomponents-icons/dist/icons/message-information.js";
import "@ui5/webcomponents-icons/dist/icons/message-success.js";
import "@ui5/webcomponents-icons/dist/icons/message-error.js";
import "@ui5/webcomponents-icons/dist/icons/message-warning.js";
import MessageStripType from "./types/MessageStripType.js";
import MessageStripTemplate from "./generated/templates/MessageStripTemplate.lit.js";
import Icon from "./Icon.js";
import { MESSAGE_STRIP_CLOSE_BUTTON } from "./generated/i18n/i18n-defaults.js";

// Styles
import messageStripCss from "./generated/themes/MessageStrip.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-messagestrip",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {

		/**
		 * Defines the <code>ui5-messagestrip</code> type.
		 * <br><br>
		 * <b>Note:</b> Available options are <code>"Information"</code>, <code>"Positive"</code>, <code>"Negative"</code>,
		 * and <code>"Warning"</code>.
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
		 * Defines whether the MessageStrip will show an icon in the beginning.
		 * You can directly provide an icon with the <code>icon</code> slot. Otherwise, the default icon for the type will be used.
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
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {
		/**
		 * Defines the text of the <code>ui5-messagestrip</code>.
		 * <br><br>
		 * <b>Note:</b> Аlthough this slot accepts HTML Elements,
		 * it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},

		/**
		 * Defines the content to be displayed as graphical element within the <code>ui5-messagestrip</code>.
		 * <br><br>
		 * <b>Note:</b> If no icon is given, the default icon for the <code>ui5-messagestrip</code> type will be used.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {HTMLElement}
         * @slot
		 * @public
		 */
		"icon": {
			type: HTMLElement,
		},
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
 * Each message can have a Close button, so that it can be removed from the UI, if needed.
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

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	_closeClick() {
		this.fireEvent("close", {});
	}

	_closeKeyDown(event) {
		if (isEnter(event)) {
			this.fireEvent("close");
		}

		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	_closeKeyUp(event) {
		if (isSpace(event)) {
			this.fireEvent("close");
		}
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");

		await Icon.define();
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
			"Information": "message-information",
			"Positive": "message-success",
			"Negative": "message-error",
			"Warning": "message-warning",
		};
	}

	get hiddenText() {
		return `Message Strip ${this.type} ${this.noCloseButton ? "" : "closable"}`;
	}

	get _closeButtonText() {
		return this.i18nBundle.getText(MESSAGE_STRIP_CLOSE_BUTTON);
	}

	get classes() {
		return {
			label: {
				"ui5-messagestrip-text": true,
				"ui5-messagestripNoCloseButton": this.noCloseButton,
			},
			main: {
				"ui5-messagestrip-root": true,
				"ui5-messagestrip-icon--hidden": this.noIcon,
				"ui5-messagestrip-close-icon--hidden": this.noCloseButton,
				[this.typeClasses]: true,
			},
		};
	}

	get iconProvided() {
		return this.icon.length > 0;
	}

	get standardIconName() {
		return MessageStrip.iconMappings()[this.type];
	}

	get typeClasses() {
		return MessageStrip.typeClassesMappings()[this.type];
	}
}

MessageStrip.define();

export default MessageStrip;
