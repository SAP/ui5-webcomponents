import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/information.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import MessageStripDesign from "./types/MessageStripDesign.js";
import MessageStripTemplate from "./generated/templates/MessageStripTemplate.lit.js";
import type { IIcon } from "./Interfaces.js";
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

enum DesignClassesMapping {
	Information = "ui5-message-strip-root--info",
	Positive = "ui5-message-strip-root--positive",
	Negative = "ui5-message-strip-root--negative",
	Warning = "ui5-message-strip-root--warning",
}

enum IconMapping {
	Information = "information",
	Positive = "sys-enter-2",
	Negative = "error",
	Warning = "alert",
}

type DesignTypeAnnouncemnt = Record<MessageStripDesign, string>;

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
 * @extends UI5Element
 * @public
 * @since 0.9.0
 * @slot {Node[]} default
 * Defines the text of the component.
 * <br><br>
 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
@customElement({
	tag: "ui5-message-strip",
	languageAware: true,
	renderer: litRender,
	template: MessageStripTemplate,
	styles: messageStripCss,
	dependencies: [Icon, Button],
})
/**
 * Fired when the close button is pressed either with a
 * click/tap or by using the Enter or Space key.
 *
 * @public
 */
@event("close")

class MessageStrip extends UI5Element {
	/**
	 * Defines the component type.
	 *
	 * @default "Information"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({
		type: MessageStripDesign,
		defaultValue: MessageStripDesign.Information,
	})
	design!: `${MessageStripDesign}`;

	/**
	 * Defines whether the MessageStrip will show an icon in the beginning.
	 * You can directly provide an icon with the <code>icon</code> slot. Otherwise, the default icon for the type will be used.
	 *
	 * @default false
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	hideIcon!: boolean;

	/**
	 * Defines whether the MessageStrip renders close button.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideCloseButton!: boolean;

	/**
	 * Defines the content to be displayed as graphical element within the component.
	 * <br><br>
	 * <b>Note:</b> If no icon is given, the default icon for the component type will be used.
	 * The SAP-icons font provides numerous options.
	 * <br><br>
	 *
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @public
	 */
	@slot()
	icon!: Array<IIcon>;

	static i18nBundle: I18nBundle;

	_closeClick() {
		this.fireEvent("close");
	}

	static async onDefine() {
		MessageStrip.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	static designAnnouncementMappings(): DesignTypeAnnouncemnt {
		const getTranslation = (text:I18nText): string => {
			return MessageStrip.i18nBundle.getText(text);
		};

		return {
			Information: getTranslation(MESSAGE_STRIP_INFORMATION),
			Positive: getTranslation(MESSAGE_STRIP_SUCCESS),
			Negative: getTranslation(MESSAGE_STRIP_ERROR),
			Warning: getTranslation(MESSAGE_STRIP_WARNING),
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

	get classes(): ClassMap {
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
		return IconMapping[this.design];
	}

	get designClasses() {
		return DesignClassesMapping[this.design];
	}
}

MessageStrip.define();

export default MessageStrip;
