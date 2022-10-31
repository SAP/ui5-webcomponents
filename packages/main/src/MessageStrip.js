import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/information.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import MessageStripDesign from "./types/MessageStripDesign.js";
import MessageStripTemplate from "./generated/templates/MessageStripTemplate.lit.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import {
	MESSAGE_STRIP_CLOSE_BUTTON,
	MESSAGE_STRIP_CLOSABLE,
	MESSAGE_STRIP_ERROR,
	MESSAGE_STRIP_WARNING,
	MESSAGE_STRIP_SUCCESS,
	MESSAGE_STRIP_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import messageStripCss from "./generated/themes/MessageStrip.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-message-strip",
	altTag: "ui5-messagestrip",
	languageAware: true,
	fastNavigation: true,
	properties: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {

		/**
		 * Defines the component type.
		 * <br><br>
		 * <b>Note:</b> Available options are <code>"Information"</code>, <code>"Positive"</code>, <code>"Negative"</code>,
		 * and <code>"Warning"</code>.
		 *
		 * @type {sap.ui.webcomponents.main.types.MessageStripDesign}
		 * @defaultvalue "Information"
		 * @public
		 * @since 1.0.0-rc.15
		 */
		design: {
			type: MessageStripDesign,
			defaultValue: MessageStripDesign.Information,
		},

		/**
		 * Defines whether the MessageStrip will show an icon in the beginning.
		 * You can directly provide an icon with the <code>icon</code> slot. Otherwise, the default icon for the type will be used.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.15
		 */
		hideIcon: {
			type: Boolean,
		},

		/**
		 * Defines whether the MessageStrip renders close button.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideCloseButton: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.MessageStrip.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},

		/**
		 * Defines the content to be displayed as graphical element within the component.
		 * <br><br>
		 * <b>Note:</b> If no icon is given, the default icon for the component type will be used.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {sap.ui.webcomponents.main.IIcon}
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
 * The <code>ui5-message-strip</code> component enables the embedding of app-related messages.
 * It displays 4 designs of messages, each with corresponding semantic color and icon: Information, Positive, Warning and Negative.
 * Each message can have a Close button, so that it can be removed from the UI, if needed.
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-message-strip</code> component, you can define whether it displays
 * an icon in the beginning and a close button. Moreover, its size and background
 * can be controlled with CSS.
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MessageStrip";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MessageStrip
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-message-strip
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
	}

	_closeClick() {
		this.fireEvent("close", {});
	}

	static get dependencies() {
		return [
			Icon,
			Button,
		];
	}

	static async onDefine() {
		MessageStrip.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	static designClassesMappings() {
		return {
			"Information": "ui5-message-strip-root--info",
			"Positive": "ui5-message-strip-root--positive",
			"Negative": "ui5-message-strip-root--negative",
			"Warning": "ui5-message-strip-root--warning",
		};
	}

	static iconMappings() {
		return {
			"Information": "information",
			"Positive": "sys-enter-2",
			"Negative": "error",
			"Warning": "alert",
		};
	}

	static designAnnouncementMappings() {
		return {
			"Information": MessageStrip.i18nBundle.getText(MESSAGE_STRIP_INFORMATION),
			"Positive": MessageStrip.i18nBundle.getText(MESSAGE_STRIP_SUCCESS),
			"Negative": MessageStrip.i18nBundle.getText(MESSAGE_STRIP_ERROR),
			"Warning": MessageStrip.i18nBundle.getText(MESSAGE_STRIP_WARNING),
		};
	}

	get hiddenText() {
		return `${MessageStrip.designAnnouncementMappings()[this.design]} ${this.hideCloseButton ? "" : this._closableText}`;
	}

	get _closeButtonText() {
		return MessageStrip.i18nBundle.getText(MESSAGE_STRIP_CLOSE_BUTTON);
	}

	get _closableText() {
		return MessageStrip.i18nBundle.getText(MESSAGE_STRIP_CLOSABLE);
	}

	get classes() {
		return {
			root: {
				"ui5-message-strip-root": true,
				"ui5-message-strip-root-hide-icon": this.hideIcon,
				"ui5-message-strip-root-hide-close-button": this.hideCloseButton,
				[this.designClasses]: true,
			},
		};
	}

	get iconProvided() {
		return this.icon.length > 0;
	}

	get standardIconName() {
		return MessageStrip.iconMappings()[this.design];
	}

	get designClasses() {
		return MessageStrip.designClassesMappings()[this.design];
	}
}

MessageStrip.define();

export default MessageStrip;
