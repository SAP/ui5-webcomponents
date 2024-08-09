import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import ButtonState from "./ButtonState.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component represents a button used in AI-related scenarios.
 * It enables users to trigger actions by clicking or tapping the `ui5-ai-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-ai-button` UI, you can define one or more states of the button by placing `ai-button-state` components in its default slot.
 * Each state have a name that identifies it and can have text, icon and end icon defined (in any combination) depending on the state purpose.
 *
 * You can choose from a set of predefined designs (the same as for regular `ui5-button` component) that allow different styling to correspond to the triggered action.
 *
 * `ui5-ai-button` can be activated by clicking or tapping it. The state can be changed in `click` event handler.
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
     * Keeps the current state object of the component.
     * @private
     */
    _currentStateObject?: ButtonState;
    /**
     * Initiates button elements fade-out phase.
     * @default false
     * @private
     */
    fadeOut: boolean;
    /**
     * Initiates button fade middle phase.
     * @default false
     * @private
     */
    fadeMid: boolean;
    /**
     * Initiates button elements fade-in phase.
     * @default false
     * @private
     */
    fadeIn: boolean;
    /**
     * Defines the available states of the component.
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use `ui5-ai-button-state` components in order to preserve the intended design.
     * @public
     */
    states: Array<ButtonState>;
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
    _onclick(e: MouseEvent): void;
    get _effectiveState(): string;
    get _effectiveStateObject(): ButtonState | undefined;
    get _stateIconOnly(): boolean;
    get _stateText(): string | undefined;
    get _stateIcon(): string | undefined;
    get _stateEndIcon(): string | undefined;
    get _hasText(): boolean;
}
export default Button;
