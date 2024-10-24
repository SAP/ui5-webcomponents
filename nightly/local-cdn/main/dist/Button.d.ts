import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes, PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import type ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import IconMode from "./types/IconMode.js";
/**
 * Interface for components that may be used as a button inside numerous higher-order components
 * @public
 */
interface IButton extends HTMLElement, ITabbable {
    nonInteractive: boolean;
}
type ButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls">;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-button` component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the `ui5-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-button` UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 *
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 *
 * You can set the `ui5-button` as enabled or disabled. An enabled
 * `ui5-button` can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-button` appears inactive and cannot be pressed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Button.js";`
 * @csspart button - Used to style the native button element
 * @constructor
 * @extends UI5Element
 * @implements { IButton }
 * @public
 */
declare class Button extends UI5Element implements IButton {
    /**
     * Defines the component design.
     * @default "Default"
     * @public
     */
    design: `${ButtonDesign}`;
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the icon, displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * Example:
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the icon, displayed as graphical element within the component after the button text.
     *
     * **Note:** It is highly recommended to use `endIcon` property only together with `icon` and/or `text` properties.
     * Usage of `endIcon` only should be avoided.
     *
     * The SAP-icons font provides numerous options.
     *
     * Example:
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    endIcon?: string;
    /**
     * When set to `true`, the component will
     * automatically submit the nearest HTML form element on `press`.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.`
     * @default false
     * @public
     * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
     */
    submits: boolean;
    /**
     * Defines the tooltip of the component.
     *
     * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
     * @default undefined
     * @public
     * @since 1.2.0
     */
    tooltip?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
     * Accepts the following string values: `true` or `false`
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     *
     * - **controls**: Identifies the element (or elements) whose contents or presence are controlled by the button element.
     * Accepts a lowercase string value.
     *
     * @public
     * @since 1.2.0
     * @default {}
     */
    accessibilityAttributes: ButtonAccessibilityAttributes;
    /**
     * Defines whether the button has special form-related functionality.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default "Button"
     * @public
     * @since 1.15.0
     */
    type: `${ButtonType}`;
    /**
     * Describes the accessibility role of the button.
     *
     * **Note:** Use <code>ButtonAccessibleRole.Link</code> role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
     *
     * @default "Button"
     * @public
     * @since 1.23
     */
    accessibleRole: `${ButtonAccessibleRole}`;
    /**
     * Used to switch the active state (pressed or not) of the component.
     * @private
     */
    active: boolean;
    /**
     * Defines if a content has been added to the default slot
     * @private
     */
    iconOnly: boolean;
    /**
     * Indicates if the elements has a slotted icon
     * @private
     */
    hasIcon: boolean;
    /**
     * Indicates if the elements has a slotted end icon
     * @private
     */
    hasEndIcon: boolean;
    /**
     * Indicates if the element is focusable
     * @private
     */
    nonInteractive: boolean;
    /**
     * The current title of the button, either the tooltip property or the icons tooltip. The tooltip property with higher prio.
     * @private
     */
    buttonTitle?: string;
    /**
     * @private
     */
    _iconSettings: object;
    /**
     * Defines the tabIndex of the component.
     * @private
     */
    forcedTabIndex: string;
    /**
     * @since 1.0.0-rc.13
     * @private
     */
    _isTouch: boolean;
    _cancelAction: boolean;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: Array<Node>;
    _deactivate: () => void;
    _ontouchstart: PassiveEventListenerObject;
    static i18nBundle: I18nBundle;
    constructor();
    onEnterDOM(): void;
    onBeforeRendering(): Promise<void>;
    _onclick(e: MouseEvent): void;
    _onmousedown(e: MouseEvent): void;
    _ontouchend(e: TouchEvent): void;
    _onmouseup(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusout(): void;
    _onfocusin(e: FocusEvent): void;
    _setActiveState(active: boolean): void;
    get _hasPopup(): ("dialog" | "grid" | "listbox" | "menu" | "tree") | undefined;
    get hasButtonType(): boolean;
    get iconMode(): "" | IconMode.Decorative;
    get endIconMode(): "" | IconMode.Decorative;
    get isIconOnly(): boolean;
    static typeTextMappings(): Record<string, I18nText>;
    getDefaultTooltip(): Promise<string | undefined> | undefined;
    get buttonTypeText(): string;
    get effectiveAccRole(): string;
    get tabIndexValue(): string | undefined;
    get showIconTooltip(): boolean;
    get ariaLabelText(): string | undefined;
    get ariaDescribedbyText(): "ui5-button-hiddenText-type" | undefined;
    get _isSubmit(): boolean;
    get _isReset(): boolean;
}
export default Button;
export type { ButtonAccessibilityAttributes, IButton, };
