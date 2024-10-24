import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import type Token from "./Token.js";
import type { IToken } from "./MultiInput.js";
import type { TokenDeleteEventDetail } from "./Token.js";
type TokenizerTokenDeleteEventDetail = {
    tokens: Token[];
};
type TokenizerSelectionChangeEventDetail = {
    tokens: Token[];
};
type TokenizerDialogButtonPressDetail = {
    confirm: boolean;
};
declare enum ClipboardDataOperation {
    cut = "cut",
    copy = "copy"
}
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-tokenizer` is an invisible container for `ui5-token`s that supports keyboard navigation and token selection.
 *
 * The `ui5-tokenizer` consists of two parts:
 * - Tokens - displays the available tokens.
 * - N-more indicator - contains the number of the remaining tokens that cannot be displayed due to the limited space.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-tokenizer` provides advanced keyboard handling.
 * When a token is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Left] or [Right] / [Up] or [Down] - Navigates left and right through the tokens.
 * - [Home] - Navigates to the first token.
 * - [End] - Navigates to the last token.
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete):
 *
 * - [Space] - Selects a token.
 * - [Backspace] / [Delete] - Deletes a token.
 * **Note:** The deletion of a token is handled by the application with the use of the `token-delete` event.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tokenizer.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 */
declare class Tokenizer extends UI5Element {
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
     * Defines whether the component is disabled.
     *
     * **Note:** A disabled component is completely noninteractive.
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
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     */
    accessibleNameRef?: string;
    /**
     * Indicates if the tokenizer should show all tokens or n more label instead
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    expanded: boolean;
    /**
     * Indicates if the nMore popover is open
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    open: boolean;
    /**
     * Defines the ID or DOM Reference of the element that the menu is shown at
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the tokenizer.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @private
     * @default undefined
     */
    opener?: HTMLElement;
    /**
     * Sets the min-width of the nMore Popover.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @private
     */
    popoverMinWidth?: number;
    /**
     * Prevents tokens to be part of the tab chain.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    preventInitialFocus: boolean;
    /**
     * Prevent opening of n-more Popover when label is clicked
     * **Note:** Used inside MultiComboBox component.
     * @default false
     * @private
     */
    preventPopoverOpen: boolean;
    /**
     * Hides the popover arrow.
     * **Note:** Used inside MultiInput and MultiComboBox components.
     * @default false
     * @private
     */
    hidePopoverArrow: boolean;
    _nMoreCount: number;
    _tokensCount: number;
    tokens: Array<Token>;
    static i18nBundle: I18nBundle;
    _resizeHandler: ResizeObserverCallback;
    _itemNav: ItemNavigation;
    _scrollEnablement: ScrollEnablement;
    _expandedScrollWidth?: number;
    _tokenDeleting: boolean;
    _preventCollapse: boolean;
    _skipTabIndex: boolean;
    _previousToken: Token | null;
    _focusedElementBeforeOpen?: HTMLElement | null;
    _deletedDialogItems: Token[];
    _handleResize(): void;
    constructor();
    onBeforeRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleNMoreClick(): void;
    _onmousedown(e: MouseEvent): void;
    onTokenSelect(): void;
    _getVisibleTokens(): Token[];
    onAfterRendering(): void;
    _delete(e: CustomEvent<TokenDeleteEventDetail>): void;
    _tokenClickDelete(e: CustomEvent<TokenDeleteEventDetail>, token: Token): void;
    _handleCurrentItemAfterDeletion(nextToken: Token): void;
    /**
     * Removes a token from the Tokenizer.
     * This method should only be used by ui5-multi-combobox and ui5-multi-input
     * @protected
     * @param token Token to be focused.
     * @param forwardFocusToPrevious Indicates whether the focus will be forwarded to previous or next token after deletion.
     */
    deleteToken(token: Token, forwardFocusToPrevious?: boolean): void;
    itemDelete(e: CustomEvent): Promise<void>;
    handleBeforeClose(): void;
    handleBeforeOpen(): void;
    handleAfterClose(): void;
    handleDialogButtonPress(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onPopoverListKeydown(e: KeyboardEvent): void;
    _handleItemNavigation(e: KeyboardEvent, tokens: Array<Token>): void | -1;
    _handleHome(tokens: Array<Token>, endKeyPressed: boolean): -1 | undefined;
    _handleHomeShift(e: KeyboardEvent): void;
    _handleEndShift(e: KeyboardEvent): void;
    _calcNextTokenIndex(focusedToken: IToken, tokens: Array<IToken>, backwards: boolean): number;
    _handleArrowCtrl(e: KeyboardEvent, focusedToken: IToken, tokens: Array<IToken>, backwards: boolean): void;
    _handleArrowShift(focusedToken: Token, tokens: Array<Token>, backwards: boolean): void;
    _click(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(e: FocusEvent): void;
    _toggleTokenSelection(tokens: Array<Token>): void;
    _handleTokenSelection(e: KeyboardEvent | MouseEvent, deselectAll?: boolean): void;
    _fillClipboard(shortcutName: ClipboardDataOperation, tokens: Array<IToken>): void;
    /**
     * Scrolls the container of the tokens to its beginning.
     * This method is used by MultiInput and MultiComboBox.
     * @protected
     */
    scrollToStart(): void;
    /**
     * Scrolls the container of the tokens to its end when expanded.
     * This method is used by MultiInput and MultiComboBox.
     * @protected
     */
    scrollToEnd(): void;
    /**
     * Scrolls token to the visible area of the container.
     * Adds 4 pixels to the scroll position to ensure padding and border visibility on both ends
     * @protected
     */
    _scrollToToken(token: IToken): void;
    _getList(): List;
    get _tokens(): Token[];
    get morePopoverOpener(): HTMLElement;
    get _nMoreText(): string | undefined;
    get showNMore(): boolean;
    get contentDom(): HTMLElement;
    get moreLink(): HTMLElement | null;
    get tokenizerLabel(): string;
    get tokenizerAriaDescription(): string | undefined;
    get _ariaDisabled(): true | undefined;
    get _ariaReadonly(): true | undefined;
    get morePopoverTitle(): string;
    get overflownTokens(): Token[];
    get _isPhone(): boolean;
    get _selectedTokens(): Token[];
    get _nMoreListMode(): ListSelectionMode.None | ListSelectionMode.Delete;
    get styles(): {
        popover: {
            "min-width": string;
        };
    };
    /**
     * @protected
     */
    _focusLastToken(): void;
    getPopover(): ResponsivePopover;
}
declare const getTokensCountText: (iTokenCount: number) => string;
export default Tokenizer;
export { getTokensCountText };
export { ClipboardDataOperation };
export type { TokenizerTokenDeleteEventDetail, TokenizerSelectionChangeEventDetail, TokenizerDialogButtonPressDetail };
