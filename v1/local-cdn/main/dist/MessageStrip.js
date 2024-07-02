var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MessageStrip_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
import { MESSAGE_STRIP_CLOSE_BUTTON, MESSAGE_STRIP_CLOSABLE, MESSAGE_STRIP_ERROR, MESSAGE_STRIP_WARNING, MESSAGE_STRIP_SUCCESS, MESSAGE_STRIP_INFORMATION, } from "./generated/i18n/i18n-defaults.js";
// Styles
import messageStripCss from "./generated/themes/MessageStrip.css.js";
var DesignClassesMapping;
(function (DesignClassesMapping) {
    DesignClassesMapping["Information"] = "ui5-message-strip-root--info";
    DesignClassesMapping["Positive"] = "ui5-message-strip-root--positive";
    DesignClassesMapping["Negative"] = "ui5-message-strip-root--negative";
    DesignClassesMapping["Warning"] = "ui5-message-strip-root--warning";
})(DesignClassesMapping || (DesignClassesMapping = {}));
var IconMapping;
(function (IconMapping) {
    IconMapping["Information"] = "information";
    IconMapping["Positive"] = "sys-enter-2";
    IconMapping["Negative"] = "error";
    IconMapping["Warning"] = "alert";
})(IconMapping || (IconMapping = {}));
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-message-strip` component enables the embedding of app-related messages.
 * It displays 4 designs of messages, each with corresponding semantic color and icon: Information, Positive, Warning and Negative.
 * Each message can have a Close button, so that it can be removed from the UI, if needed.
 *
 * ### Usage
 *
 * For the `ui5-message-strip` component, you can define whether it displays
 * an icon in the beginning and a close button. Moreover, its size and background
 * can be controlled with CSS.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MessageStrip.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.9.0
 * @slot {Array<Node>} default
 * Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
let MessageStrip = MessageStrip_1 = class MessageStrip extends UI5Element {
    _closeClick() {
        this.fireEvent("close");
    }
    static async onDefine() {
        MessageStrip_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    static designAnnouncementMappings() {
        const getTranslation = (text) => {
            return MessageStrip_1.i18nBundle.getText(text);
        };
        return {
            Information: getTranslation(MESSAGE_STRIP_INFORMATION),
            Positive: getTranslation(MESSAGE_STRIP_SUCCESS),
            Negative: getTranslation(MESSAGE_STRIP_ERROR),
            Warning: getTranslation(MESSAGE_STRIP_WARNING),
        };
    }
    get hiddenText() {
        return `${MessageStrip_1.designAnnouncementMappings()[this.design]} ${this.hideCloseButton ? "" : this._closableText}`;
    }
    get _closeButtonText() {
        return MessageStrip_1.i18nBundle.getText(MESSAGE_STRIP_CLOSE_BUTTON);
    }
    get _closableText() {
        return MessageStrip_1.i18nBundle.getText(MESSAGE_STRIP_CLOSABLE);
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
        return IconMapping[this.design];
    }
    get designClasses() {
        return DesignClassesMapping[this.design];
    }
};
__decorate([
    property({
        type: MessageStripDesign,
        defaultValue: MessageStripDesign.Information,
    })
], MessageStrip.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], MessageStrip.prototype, "hideIcon", void 0);
__decorate([
    property({ type: Boolean })
], MessageStrip.prototype, "hideCloseButton", void 0);
__decorate([
    slot()
], MessageStrip.prototype, "icon", void 0);
MessageStrip = MessageStrip_1 = __decorate([
    customElement({
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
     * @public
     */
    ,
    event("close")
], MessageStrip);
MessageStrip.define();
export default MessageStrip;
//# sourceMappingURL=MessageStrip.js.map