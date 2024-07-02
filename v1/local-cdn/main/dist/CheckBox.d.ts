import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/complete.js";
import "@ui5/webcomponents-icons/dist/border.js";
import "@ui5/webcomponents-icons/dist/tri-state.js";
import WrappingType from "./types/WrappingType.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
/**
 * @class
 *
 * ### Overview
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 *
 * The `ui5-checkbox` component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the `ui5-checkbox`, the user has to click or tap the square
 * box or its label.
 *
 * The `ui5-checkbox` component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the `ui5-checkbox` between checked and unchecked state.
 *
 * ### Usage
 *
 * You can define the checkbox text with via the `text` property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to wrap, set the `wrappingType` property to "Normal".
 * The touchable area for toggling the `ui5-checkbox` ends where the text ends.
 *
 * You can disable the `ui5-checkbox` by setting the `disabled` property to
 * `true`,
 * or use the `ui5-checkbox` in read-only mode by setting the `readonly`
 * property to `true`.
 *
 * ### Keyboard Handling
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the `ui5-checkbox`.
 *
 * - [Space],[Enter] - Toggles between different states: checked, not checked.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CheckBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the outermost wrapper of the `ui5-checkbox`
 * @csspart label - Used to style the label of the `ui5-checkbox`
 * @csspart icon - Used to style the icon of the `ui5-checkbox`
 */
declare class CheckBox extends UI5Element implements IFormElement {
    /**
     * Receives id(or many ids) of the elements that label the component
     * @default ""
     * @public
     * @since 1.1.0
     */
    accessibleNameRef: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @public
     * @default ""
     * @since 1.1.0
     */
    accessibleName: string;
    /**
     * Defines whether the component is disabled.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Determines whether the `ui5-checkbox` is in display only state.
     *
     * When set to `true`, the `ui5-checkbox` is not interactive, not editable, not focusable
     * and not in the tab chain. This setting is used for forms in review mode.
     *
     * **Note:** When the property `disabled` is set to `true` this property has no effect.
     * @since 1.22.0
     * @public
     * @default false
     */
    displayOnly: boolean;
    /**
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 1.3.0
     */
    required: boolean;
    /**
    * Defines whether the component is displayed as partially checked.
    *
    * **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
    * interaction and the resulting visual state depends on the values of the `indeterminate`
    * and `checked` properties:
    *
    * -  If the component is checked and indeterminate, it will be displayed as partially checked
    * -  If the component is checked and it is not indeterminate, it will be displayed as checked
    * -  If the component is not checked, it will be displayed as not checked regardless value of the indeterminate attribute
    * @default false
    * @public
    * @since 1.0.0-rc.15
    */
    indeterminate: boolean;
    /**
     * Defines if the component is checked.
     *
     * **Note:** The property can be changed with user interaction,
     * either by cliking/tapping on the component, or by
     * pressing the Enter or Space key.
     * @default false
     * @formEvents change
     * @formProperty
     * @public
     */
    checked: boolean;
    /**
     * Defines the text of the component.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component text wraps when there is not enough space.
     *
     * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
     * @default "None"
     * @public
     */
    wrappingType: `${WrappingType}`;
    /**
     * Determines the name with which the component will be submitted in an HTML form.
     *
     * **Important:** For the `name` property to have effect, you must add the following import to your project:
     * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
     *
     * **Note:** When set, a native `input` HTML element
     * will be created inside the component so that it can be submitted as
     * part of an HTML form. Do not use this property unless you need to submit a form.
     * @default ""
     * @public
     */
    name: string;
    /**
     * Defines the active state (pressed or not) of the component.
     * @private
     */
    active: boolean;
    /**
     * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
     * when `name` property is set.
     * @private
     */
    formSupport: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    _deactivate: () => void;
    constructor();
    onBeforeRendering(): void;
    _enableFormSupport(): void;
    _onclick(): void;
    _onmousedown(): void;
    _onmouseup(): void;
    _onfocusout(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    toggle(): this;
    canToggle(): boolean;
    valueStateTextMappings(): {
        Error: string;
        Warning: string;
        Success: string;
    };
    get ariaLabelText(): string | undefined;
    get classes(): {
        main: {
            "ui5-checkbox--hoverable": boolean;
        };
    };
    get ariaReadonly(): "true" | undefined;
    get effectiveAriaDisabled(): "true" | undefined;
    get effectiveAriaChecked(): boolean | "mixed";
    get ariaLabelledBy(): string | undefined;
    get ariaDescribedBy(): string | undefined;
    get hasValueState(): boolean;
    get valueStateText(): string | undefined;
    get effectiveTabIndex(): string | undefined;
    get isCompletelyChecked(): boolean;
    get isDisplayOnly(): boolean;
    get displayOnlyIcon(): "complete" | "tri-state" | "border";
    static onDefine(): Promise<void>;
}
export default CheckBox;
