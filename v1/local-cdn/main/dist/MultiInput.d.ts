import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Input from "./Input.js";
import Tokenizer from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import "@ui5/webcomponents-icons/dist/value-help.js";
import type { InputSuggestionItemSelectEventDetail as MultiInputSuggestionItemSelectEventDetail, InputSuggestionItemPreviewEventDetail as MultiInputSuggestionItemPreviewEventDetail } from "./Input.js";
interface IToken extends HTMLElement, ITabbable {
    text: string;
    readonly: boolean;
    selected: boolean;
    isTruncatable: boolean;
}
type MultiInputTokenDeleteEventDetail = {
    token: IToken;
};
/**
 * @class
 * ### Overview
 * A `ui5-multi-input` field allows the user to enter multiple values, which are displayed as `ui5-token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Select a value from the suggestion list (`suggestion-item-select` event is fired)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiInput.js";`
 * @constructor
 * @extends Input
 * @since 1.0.0-rc.9
 * @public
 */
declare class MultiInput extends Input {
    /**
     * Determines whether a value help icon will be visualized in the end of the input.
     * Pressing the icon will fire `value-help-trigger` event.
     * @default false
     * @public
     */
    showValueHelpIcon: boolean;
    /**
     * Indicates whether the tokenizer is expanded or collapsed(shows the n more label)
     * @default false
     * @private
     */
    expandedTokenizer: boolean;
    /**
     * Indicates whether the tokenizer has tokens
     * @default false
     * @private
     */
    tokenizerAvailable: boolean;
    /**
     * Defines the component tokens.
     * @public
     */
    tokens: Array<IToken>;
    _skipOpenSuggestions: boolean;
    _valueHelpIconPressed: boolean;
    constructor();
    valueHelpPress(): void;
    showMorePress(): void;
    tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>): void;
    valueHelpMouseDown(e: MouseEvent): void;
    _tokenizerFocusOut(e: FocusEvent): void;
    valueHelpMouseUp(): void;
    innerFocusIn(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onTokenizerKeydown(e: KeyboardEvent): void;
    _handleLeft(e: KeyboardEvent): void;
    _focusFirstToken(e: KeyboardEvent): void;
    _onfocusout(e: FocusEvent): void;
    /**
     * @override
     */
    _onfocusin(e: FocusEvent): Promise<void>;
    lastItemDeleted(): void;
    onBeforeRendering(): void;
    get iconsCount(): number;
    get tokenizer(): Tokenizer;
    get _tokensCountText(): string | undefined;
    get _tokensCountTextId(): string;
    /**
     * Returns the placeholder value when there are no tokens.
     * @protected
     */
    get _placeholder(): string;
    get accInfo(): {
        input: {
            ariaRoledescription: string;
            ariaDescribedBy: string;
            ariaInvalid: string | undefined;
            ariaHasPopup: string | undefined;
            ariaAutoComplete: string | undefined;
            role: string | undefined;
            ariaControls: string | undefined;
            ariaExpanded: string | undefined;
            ariaDescription: string | undefined;
            ariaLabel: string | undefined;
        };
    };
    get ariaRoleDescription(): string;
    get morePopoverOpener(): HTMLElement;
    get shouldDisplayOnlyValueStateMessage(): boolean;
}
export default MultiInput;
export type { IToken, MultiInputTokenDeleteEventDetail, MultiInputSuggestionItemSelectEventDetail, MultiInputSuggestionItemPreviewEventDetail, };
