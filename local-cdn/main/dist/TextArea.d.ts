import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Popover from "./Popover.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type FormSupportT from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
type TokenizedText = Array<string>;
type IndexedTokenizedText = Array<{
    text: string;
    last: boolean;
}>;
type ExceededText = {
    exceededText?: string;
    leftCharactersCount?: number;
    calcedMaxLength?: number;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-textarea` component is used to enter multiple lines of text.
 *
 * When empty, it can hold a placeholder similar to a `ui5-input`.
 * You can define the rows of the `ui5-textarea` and also determine specific behavior when handling long texts.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TextArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart textarea - Used to style the native textarea
 */
declare class TextArea extends UI5Element implements IFormElement {
    /**
     * Defines the value of the component.
     * @formEvents change input
     * @formProperty
     * @default ""
     * @public
     */
    value: string;
    /**
     * Indicates whether the user can interact with the component or not.
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
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 1.0.0-rc.3
     */
    required: boolean;
    /**
     * Defines a short hint intended to aid the user with data entry when the component has no value.
     * @default ""
     * @public
     */
    placeholder: string;
    /**
     * Defines the value state of the component.
     *
     * **Note:** If `maxlength` property is set,
     * the component turns into "Warning" state once the characters exceeds the limit.
     * In this case, only the "Error" state is considered and can be applied.
     * @default "None"
     * @since 1.0.0-rc.7
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines the number of visible text lines for the component.
     *
     * **Notes:**
     *
     * - If the `growing` property is enabled, this property defines the minimum rows to be displayed
     * in the textarea.
     * - The CSS `height` property wins over the `rows` property, if both are set.
     * @default 0
     * @public
     */
    rows: number;
    /**
     * Defines the maximum number of characters that the `value` can have.
     * @default undefined
     * @public
     */
    maxlength?: number;
    /**
     * Determines whether the characters exceeding the maximum allowed character count are visible
     * in the component.
     *
     * If set to `false`, the user is not allowed to enter more characters than what is set in the
     * `maxlength` property.
     * If set to `true` the characters exceeding the `maxlength` value are selected on
     * paste and the counter below the component displays their number.
     * @default false
     * @public
     */
    showExceededText: boolean;
    /**
     * Enables the component to automatically grow and shrink dynamically with its content.
     * @default false
     * @public
     */
    growing: boolean;
    /**
     * Defines the maximum number of lines that the component can grow.
     * @default 0
     * @public
     */
    growingMaxLines: number;
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
     * Defines the accessible ARIA name of the component.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the textarea.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef: string;
    /**
     * @private
     */
    focused: boolean;
    /**
     * @private
     */
    exceeding: boolean;
    /**
     * @private
     */
    _mirrorText: IndexedTokenizedText;
    /**
     * @private
     */
    _maxHeight: string;
    /**
     * @private
     */
    _width?: number;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * The value state message slot should contain only one root element.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed if the component has
     * `valueState` of type `Information`, `Warning` or `Error`.
     * @since 1.0.0-rc.7
     * @public
     */
    valueStateMessage: Array<HTMLElement>;
    /**
     * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
     * when `name` property is set.
     * @private
     */
    formSupport: Array<HTMLElement>;
    _fnOnResize: ResizeObserverCallback;
    _firstRendering: boolean;
    _openValueStateMsgPopover: boolean;
    _exceededTextProps: ExceededText;
    _keyDown?: boolean;
    FormSupport?: typeof FormSupportT;
    previousValue: string;
    valueStatePopover?: Popover;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    getInputDomRef(): HTMLTextAreaElement;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(): void;
    _onfocusin(): void;
    _onfocusout(e: FocusEvent): void;
    _onchange(): void;
    _onselect(): void;
    _onscroll(): void;
    _oninput(e: InputEvent): void;
    _onResize(): void;
    _setCSSParams(): void;
    toggleValueStateMessage(toggle: boolean): void;
    openPopover(): Promise<void>;
    closePopover(): Promise<void>;
    _getPopover(): Promise<Popover>;
    _tokenizeText(value: string): {
        text: string;
        last: boolean;
    }[];
    _mapTokenizedTextToObject(tokenizedText: TokenizedText): {
        text: string;
        last: boolean;
    }[];
    _calcExceededText(): {
        exceededText: string | undefined;
        leftCharactersCount: number | undefined;
        calcedMaxLength: number | undefined;
    };
    get classes(): {
        root: {
            "ui5-textarea-root": boolean;
            "ui5-content-native-scrollbars": boolean;
        };
        valueStateMsg: {
            "ui5-valuestatemessage-header": boolean;
            "ui5-valuestatemessage--error": boolean;
            "ui5-valuestatemessage--warning": boolean;
            "ui5-valuestatemessage--information": boolean;
        };
    };
    get styles(): {
        valueStateMsgPopover: {
            "max-width": string;
        };
    };
    get tabIndex(): 0 | -1;
    get ariaLabelText(): string | undefined;
    get ariaDescribedBy(): string | undefined;
    get ariaValueStateHiddenText(): string | undefined;
    get valueStateDefaultText(): string;
    get ariaInvalid(): "true" | null;
    get openValueStateMsgPopover(): boolean;
    get displayValueStateMessagePopover(): boolean;
    get hasCustomValueState(): boolean;
    get hasValueState(): boolean;
    get valueStateMessageText(): Node[];
    get _valueStatePopoverHorizontalAlign(): "Left" | "Right";
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon(): string;
    get valueStateTextMappings(): {
        Success: string;
        Information: string;
        Error: string;
        Warning: string;
    };
    get valueStateTypeMappings(): {
        Success: string;
        Information: string;
        Error: string;
        Warning: string;
    };
}
export default TextArea;
