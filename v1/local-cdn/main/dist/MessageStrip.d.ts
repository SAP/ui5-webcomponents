import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/information.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import MessageStripDesign from "./types/MessageStripDesign.js";
import type { IIcon } from "./Icon.js";
declare enum DesignClassesMapping {
    Information = "ui5-message-strip-root--info",
    Positive = "ui5-message-strip-root--positive",
    Negative = "ui5-message-strip-root--negative",
    Warning = "ui5-message-strip-root--warning"
}
declare enum IconMapping {
    Information = "information",
    Positive = "sys-enter-2",
    Negative = "error",
    Warning = "alert"
}
type DesignTypeAnnouncemnt = Record<MessageStripDesign, string>;
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
declare class MessageStrip extends UI5Element {
    /**
     * Defines the component type.
     * @default "Information"
     * @public
     * @since 1.0.0-rc.15
     */
    design: `${MessageStripDesign}`;
    /**
     * Defines whether the MessageStrip will show an icon in the beginning.
     * You can directly provide an icon with the `icon` slot. Otherwise, the default icon for the type will be used.
     * @default false
     * @public
     * @since 1.0.0-rc.15
     */
    hideIcon: boolean;
    /**
     * Defines whether the MessageStrip renders close button.
     * @default false
     * @public
     */
    hideCloseButton: boolean;
    /**
     * Defines the content to be displayed as graphical element within the component.
     *
     * **Note:** If no icon is given, the default icon for the component type will be used.
     * The SAP-icons font provides numerous options.
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @public
     */
    icon: Array<IIcon>;
    static i18nBundle: I18nBundle;
    _closeClick(): void;
    static onDefine(): Promise<void>;
    static designAnnouncementMappings(): DesignTypeAnnouncemnt;
    get hiddenText(): string;
    get _closeButtonText(): string;
    get _closableText(): string;
    get classes(): ClassMap;
    get iconProvided(): boolean;
    get standardIconName(): IconMapping;
    get designClasses(): DesignClassesMapping;
}
export default MessageStrip;
