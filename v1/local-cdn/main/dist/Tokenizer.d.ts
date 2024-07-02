import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type Token from "./Token.js";
import type { IToken } from "./MultiInput.js";
import type { TokenDeleteEventDetail } from "./Token.js";
type TokenizerTokenDeleteEventDetail = {
    ref: Token;
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
 * A container for tokens.
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class Tokenizer extends UI5Element {
    showMore: boolean;
    disabled: boolean;
    /**
     * Prevent opening of n-more Popover when label is clicked
     * @private
     */
    preventPopoverOpen: boolean;
    /**
     * Indicates if the tokenizer should show all tokens or n more label instead
     * @private
     */
    expanded: boolean;
    morePopoverOpener: Tokenizer;
    popoverMinWidth?: number;
    /**
     * Indicates the value state of the related input component.
     * @default "None"
     * @private
     */
    valueState: `${ValueState}`;
    _nMoreCount: number;
    _tokensCount: number;
    tokens: Array<Token>;
    valueStateMessage: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    _resizeHandler: ResizeObserverCallback;
    _itemNav: ItemNavigation;
    _scrollEnablement: ScrollEnablement;
    _expandedScrollWidth?: number;
    _isOpen: boolean;
    _handleResize(): void;
    constructor();
    onBeforeRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _openMorePopoverAndFireEvent(): Promise<void>;
    openMorePopover(): Promise<void>;
    _getTokens(): Token[];
    get _tokens(): Token[];
    _onmousedown(e: MouseEvent): void;
    onTokenSelect(): void;
    _getVisibleTokens(): Token[];
    onAfterRendering(): Promise<void>;
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
    _onkeydown(e: KeyboardEvent): void;
    _handleItemNavigation(e: KeyboardEvent, tokens: Array<Token>): void | -1;
    _handleHome(tokens: Array<Token>, endKeyPressed: boolean): -1 | undefined;
    _handleHomeShift(e: KeyboardEvent): void;
    _handleEndShift(e: KeyboardEvent): void;
    _calcNextTokenIndex(focusedToken: IToken, tokens: Array<IToken>, backwards: boolean): number;
    _handleArrowCtrl(e: KeyboardEvent, focusedToken: IToken, tokens: Array<IToken>, backwards: boolean): void;
    _handleArrowShift(focusedToken: Token, tokens: Array<Token>, backwards: boolean): void;
    _click(e: MouseEvent): void;
    _toggleTokenSelection(tokens: Array<Token>): void;
    _handleTokenSelection(e: KeyboardEvent | MouseEvent, deselectAll?: boolean): void;
    _fillClipboard(shortcutName: ClipboardDataOperation, tokens: Array<IToken>): void;
    /**
     * Scrolls the container of the tokens to its beginning.
     * This method is used by MultiInput and MultiComboBox.
     * @private
     */
    scrollToStart(): void;
    /**
     * Scrolls the container of the tokens to its end when expanded.
     * This method is used by MultiInput and MultiComboBox.
     * @private
     */
    scrollToEnd(): void;
    /**
     * Scrolls token to the visible area of the container.
     * Adds 4 pixels to the scroll position to ensure padding and border visibility on both ends
     * @private
     */
    _scrollToToken(token: IToken): void;
    closeMorePopover(): Promise<void>;
    get _nMoreText(): string | undefined;
    get showNMore(): boolean;
    get contentDom(): HTMLElement;
    get expandedContentDom(): HTMLElement | null;
    get narrowContentDom(): HTMLElement | null;
    get tokenizerLabel(): string;
    get morePopoverTitle(): string;
    get overflownTokens(): Token[];
    get noValueStatePopover(): boolean;
    get valueStateMessageText(): Node[];
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon(): string;
    get _isPhone(): boolean;
    get _selectedTokens(): Token[];
    get classes(): ClassMap;
    get styles(): {
        popover: {
            "min-width": string;
        };
        popoverValueStateMessage: {
            width: string;
            "min-height": string;
        };
        popoverHeader: {
            "min-height": string;
        };
        popoverHeaderTitle: {
            "justify-content": string;
        };
    };
    _tokensCountText(): string;
    /**
     * @protected
     */
    _focusLastToken(): void;
    static onDefine(): Promise<void>;
    getPopover(): Promise<ResponsivePopover>;
}
export default Tokenizer;
export { ClipboardDataOperation };
export type { TokenizerTokenDeleteEventDetail };
