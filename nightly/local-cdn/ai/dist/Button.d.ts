import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
import type ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type ButtonState from "./ButtonState.js";
import "./ButtonState.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component serves as a button for AI-related scenarios. Users can trigger actions by clicking or tapping the `ui5-ai-button`
 * or by pressing keyboard keys like [Enter] or [Space].
 *
 * ### Usage
 *
 * For the `ui5-ai-button` user interface, you can define one or more button states by placing `ui5-ai-button-state` components in their default slot.
 * Each state has a name for identification and can include text, an icon, and an end icon, as needed for its purpose.
 * You can define a split mode for the `ui5-ai-button`, which will results in displaying an arrow button for additional actions.
 *
 * You can choose from a set of predefined designs for `ui5-ai-button` (as in `ui5-button`) to match the desired styling.
 *
 * The `ui5-ai-button` can be activated by clicking or tapping it. You can change the button state in the click event handler. When the button is
 * in split mode, you can activate the default button action by clicking or tapping it, or by pressing keyboard keys like [Enter] or [Space].
 * You can activate the arrow button by clicking or tapping it, or by pressing keyboard keys like [Arrow Up], [Arrow Down], or [F4].
 * To display additional actions, you can attach a menu to the arrow button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Button.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @experimental The Button and ButtonState web components are availabe since 2.0 under an experimental flag and their API and behaviour are subject to change.
 */
declare class Button extends UI5Element {
    eventDetails: {
        "click": void;
        "arrow-button-click": void;
    };
    /**
     * Defines the component design.
     * @default "Default"
     * @public
     */
    design?: `${ButtonDesign}`;
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the current state of the component.
     *
     * @default undefined
     * @public
     */
    state?: string;
    /**
     * Defines the active state of the arrow button in split mode.
     * Set to true when the button is in split mode and a menu with additional options
     * is opened by the arrow button. Set back to false when the menu is closed.
     * @default false
     * @public
     * @since 2.6.0
     */
    arrowButtonPressed: boolean;
    /**
     * Keeps the current state object of the component.
     * @private
     */
    _currentStateObject?: ButtonState;
    /**
     * Determines if the button is in icon-only mode.
     * This property is animation related only.
     * @default false
     * @private
     */
    iconOnly?: boolean | undefined;
    /**
     * Defines the available states of the component.
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that
     * you only use `ui5-ai-button-state` components in order to preserve the intended design.
     * @public
     */
    states: Array<ButtonState>;
    _splitButton?: SplitButton;
    _hiddenSplitButton?: SplitButton;
    get _hideArrowButton(): boolean;
    get _effectiveState(): string;
    get _effectiveStateObject(): ButtonState | undefined;
    get _stateIconOnly(): boolean;
    get _stateText(): string | undefined;
    get _stateIcon(): string | undefined;
    get _stateEndIcon(): string | undefined;
    get _hasText(): boolean;
    onBeforeRendering(): void;
    /**
     * Starts the fade-out animation.
     * @private
     */
    _fadeOut(): Promise<void>;
    /**
     * Starts the fade-in animation.
     * @private
     */
    _fadeIn(): void;
    /**
     * Resets the fade phases when the animation is completed.
     * @private
     */
    _resetFade(): void;
    /**
     * Handles the click event.
     * @private
     */
    _onClick(e: CustomEvent): void;
    /**
     * Handles the arrow-button-click event when `ui5-ai-button` is in split mode.
     * @private
     */
    _onArrowClick(e: CustomEvent): void;
}
export default Button;
