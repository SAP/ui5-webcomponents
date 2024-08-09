import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Button from "./Button.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-split-button` enables users to trigger actions. It is constructed of two separate actions -
 * default action and arrow action that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - `Space` or `Enter` for default action,
 * and `Arrow Down` or `Arrow Up` for arrow action.
 *
 * ### Usage
 *
 * `ui5-split-button` consists two separate buttons:
 *
 * - for the first one (default action) you can define some `text` or an `icon`, or both.
 * Also, it is possible to define different icon for active state of this button - `activeIcon`.
 * - the second one (arrow action) contains only `slim-arrow-down` icon.
 *
 * You can choose a `design` from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow actions have the same design.
 *
 * You can set the `ui5-split-button` as enabled or disabled. Both parts of an enabled
 * `ui5-split-button` can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-split-button` appears inactive and any of the two buttons
 * cannot be pressed.
 *
 * ### Keyboard Handling
 *
 * - `Space` or `Enter` - triggers the default action
 * - `Shift` or `Escape` - if `Space` is pressed, releases the default action button without triggering the click event.
 * - `Arrow Down`, `Arrow Up`, `Alt`+`Arrow Down`, `Alt`+`Arrow Up`, or `F4` - triggers the arrow action
 * There are separate events that are fired on activating of `ui5-split-button` parts:
 *
 * - `click` for the first button (default action)
 * - `arrow-click` for the second button (arrow action)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SplitButton.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
declare class SplitButton extends UI5Element {
    /**
     * Defines the icon to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * Example:
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines the icon to be displayed in active state as graphical element within the component.
     * @default ""
     * @public
     */
    activeIcon: string;
    /**
     * Defines whether the arrow button should have the active state styles or not.
     * @default false
     * @public
     * @since 1.21.0
     */
    activeArrowButton: boolean;
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
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Indicates if the elements is on focus
     * @default false
     * @private
     */
    focused: boolean;
    /**
     * Accessibility-related properties for inner elements of the Split Button
     * @private
     */
    _splitButtonAccInfo: Record<string, boolean>;
    /**
     * Defines the tabIndex of the component.
     * @default "0"
     * @private
     */
    _tabIndex: string;
    /**
     * Indicates if there is Space key pressed
     * @default false
     * @private
     */
    _spacePressed: boolean;
    /**
     * Indicates if there is SHIFT or ESCAPE key pressed
     * @default false
     * @private
     */
    _shiftOrEscapePressed: boolean;
    /**
     * Defines the active state of the text button
     * @default false
     * @private
     */
    _textButtonActive: boolean;
    /**
     * Defines the icon of the text button
     * @default ""
     * @private
     */
    _textButtonIcon: string;
    /**
     * Defines the state of the internal Button used for the Arrow button of the SplitButton.
     * @default false
     * @private
     */
    _activeArrowButton: boolean;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: Array<Node>;
    _textButtonPress: {
        handleEvent: () => void;
        passive: boolean;
    };
    _isDefaultActionPressed: boolean;
    _isKeyDownOperation: boolean;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    /**
     * Function that makes sure the focus is properly managed.
     * @private
     */
    _manageFocus(button?: Button | SplitButton): void;
    onBeforeRendering(): void;
    _handleMouseClick(e: MouseEvent): void;
    _onFocusOut(e: FocusEvent): void;
    _onFocusIn(e: FocusEvent): void;
    _textButtonFocusIn(e?: FocusEvent): void;
    _onKeyDown(e: KeyboardEvent): void;
    _onKeyUp(e: KeyboardEvent): void;
    _fireClick(e?: Event): void;
    _fireArrowClick(e?: Event): void;
    _textButtonRelease(): void;
    _arrowButtonPress(e: MouseEvent): void;
    _arrowButtonRelease(e: MouseEvent): void;
    _setTabIndexValue(): void;
    _onArrowButtonActiveStateChange(e: CustomEvent): void;
    /**
     * Checks if the pressed key is an arrow key.
     * @param e - keyboard event
     * @private
     */
    _isArrowKeyAction(e: KeyboardEvent): boolean;
    /**
     * Checks if the pressed key is a default action key (Space or Enter).
     * @param e - keyboard event
     * @private
     */
    _isDefaultAction(e: KeyboardEvent): boolean;
    /**
     * Checks if the pressed key is an escape key or shift key.
     * @param e - keyboard event
     * @private
     */
    _isShiftOrEscape(e: KeyboardEvent): boolean;
    /**
     * Handles the click event and the focus on the arrow button.
     * @param e - keyboard event
     * @private
     */
    _handleArrowButtonAction(e: KeyboardEvent | MouseEvent): void;
    /**
     * Handles the default action and the active state of the respective button.
     * @param e - keyboard event
     * @private
     */
    _handleDefaultAction(e: KeyboardEvent): void;
    _handleShiftOrEscapePressed(): void;
    get effectiveActiveArrowButton(): boolean;
    get textButtonAccText(): string | null;
    get isTextButton(): boolean;
    get textButton(): Button | null | undefined;
    get arrowButton(): Button | null | undefined;
    get accessibilityInfo(): {
        ariaExpanded: boolean;
        ariaHaspopup: boolean;
        description: string;
        keyboardHint: string;
    };
    get ariaLabelText(): string;
}
export default SplitButton;
