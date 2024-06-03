import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getFocusedElement } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle, I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isSpace,
	isSpaceCtrl,
	isSpaceShift,
	isLeftCtrl,
	isRightCtrl,
	isUpCtrl,
	isDownCtrl,
	isUpShift,
	isDownShift,
	isLeftShift,
	isRightShift,
	isLeftShiftCtrl,
	isRightShiftCtrl,
	isDeleteShift,
	isInsertCtrl,
	isEnd,
	isHome,
	isHomeShift,
	isEndShift,
	isPageUpShift,
	isPageDownShift,
	isHomeCtrl,
	isEndCtrl,
	isRight,
	isLeft,
	isUp,
	isDown,
	isEscape,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import Title from "./Title.js";
import Button from "./Button.js";
import StandardListItem from "./StandardListItem.js";
import Token from "./Token.js";
import type { IToken } from "./MultiInput.js";
import type { TokenDeleteEventDetail } from "./Token.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";
import {
	MULTIINPUT_SHOW_MORE_TOKENS,
	TOKENIZER_ARIA_LABEL,
	TOKENIZER_POPOVER_REMOVE,
	TOKENIZER_ARIA_CONTAIN_TOKEN,
	TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,
	TOKENIZER_SHOW_ALL_ITEMS,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TokenizerCss from "./generated/themes/Tokenizer.css.js";
import TokenizerPopoverCss from "./generated/themes/TokenizerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

// reuse suggestions focus styling for NMore popup
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import ListItem from "./ListItem.js";

type TokenCountMapType = { [x: number]: I18nText };

type TokenizerTokenDeleteEventDetail = {
	ref: Token;
}

type TokenizerSelectionChangeEventDetail = {
	selectedTokens: Token[];
}

type TokenizerDialogButtonPressDetail = {
	confirm: boolean;
}

enum ClipboardDataOperation {
	cut = "cut",
	copy = "copy",
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
 * @extends sap.ui.webc.base.UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-tokenizer",
	languageAware: true,
	renderer: litRender,
	template: TokenizerTemplate,
	styles: [
		TokenizerCss,
		ResponsivePopoverCommonCss,
		SuggestionsCss,
		TokenizerPopoverCss,
	],
	dependencies: [
		ResponsivePopover,
		List,
		StandardListItem,
		Title,
		Button,
	],
})

/**
 * Fired when a token is deleted (delete icon, delete or backspace is pressed)
 *
 * @param {HTMLElement} ref DOM ref of the token to be deleted.
 * @public
 */
@event<TokenizerTokenDeleteEventDetail>("token-delete", {
	detail: {
		ref: { type: HTMLElement },
	},
})

/**
 * Fired when token selection is changed by user interaction
 *
 * @param {Array<Token>} selectedTokens An array of the selected items.
 * @public
 */
@event<TokenizerSelectionChangeEventDetail>("selection-change", {
	detail: {
		selectedTokens: { type: Array },
	},
})

/**
 * Fired when a dialog button is pressed.
 *
 * @param {Boolean} confirm Indicates if the action is confirm.
 * @public
 */
@event<TokenizerDialogButtonPressDetail>("dialog-button-press", {
	detail: {
		confirm: { type: Boolean },
	},
})

/**
 * Fired when nMore link is pressed.
 * @public
 */
@event("show-more-items-press")

/**
 * Fired before nMore Popover is opened.
 * @private
 */
@event("before-more-popover-open")

class Tokenizer extends UI5Element {
	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Defines whether the component is disabled.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	accessibleNameRef?: string;

	/**
	 * Indicates if the tokenizer should show all tokens or n more label instead
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	expanded!: boolean;

	/**
	 * Indicates if the nMore popover is open
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	open!: boolean;

	/**
	 * Defines the ID or DOM Reference of the element that the menu is shown at
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @private
	 * @default ""
	 */
	@property({ validator: DOMReference, defaultValue: "" })
	opener!: HTMLElement;

	/**
	 * Sets the min-width of the nMore Popover.
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @private
	 */
	@property({ validator: Integer })
	popoverMinWidth?: number;

	/**
	 * Prevents tokens to be part of the tab chain.
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	preventInitialFocus!: boolean;

	/**
	 * Prevent opening of n-more Popover when label is clicked
	 * **Note:** Used inside MultiComboBox component.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	preventPopoverOpen!: boolean;

	/**
	 * Hides the popover arrow.
	 * **Note:** Used inside MultiInput and MultiComboBox components.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	hidePopoverArrow!: boolean;

	@property({ validator: Integer })
	_nMoreCount!: number;

	@property({ validator: Integer })
	_tokensCount!: number;

	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	tokens!: Array<Token>;

	static i18nBundle: I18nBundle;
	_resizeHandler: ResizeObserverCallback;
	_itemNav: ItemNavigation;
	_scrollEnablement: ScrollEnablement;
	_expandedScrollWidth?: number;
	_tokenDeleting!: boolean;
	_preventCollapse!: boolean;
	_skipTabIndex!: boolean;
	_previousToken!: Token | null;
	_focusedElementBeforeOpen?: HTMLElement | null;

	_handleResize() {
		this._nMoreCount = this.overflownTokens.length;
	}

	constructor() {
		super();

		this._resizeHandler = this._handleResize.bind(this);

		this._itemNav = new ItemNavigation(this, {
			currentIndex: -1,
			getItemsCallback: this._getVisibleTokens.bind(this),
		});

		this._scrollEnablement = new ScrollEnablement(this);
		this._tokenDeleting = false;
	}

	onBeforeRendering() {
		const tokensLength = this._tokens.length;
		this._tokensCount = tokensLength;

		this._tokens.forEach(token => {
			token.singleToken = tokensLength === 1;
			token.readonly = this.readonly;
		});
	}

	onEnterDOM() {
		ResizeHandler.register(this.contentDom, this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.contentDom, this._resizeHandler);
	}

	_handleNMoreClick() {
		if (this.disabled) {
			return;
		}

		this.expanded = true;

		if (!this.preventPopoverOpen) {
			this.open = true;
			this.scrollToEnd();
		}

		this._tokens.forEach(token => {
			token.forcedTabIndex = "-1";
		});

		this._skipTabIndex = true;

		this.fireEvent("show-more-items-press");
	}

	_onmousedown(e: MouseEvent) {
		if ((e.target as HTMLElement).hasAttribute("ui5-token")) {
			const target = e.target as Token;
			this.expanded = true;

			if (this.open) {
				this._preventCollapse = true;
			}

			if (!target.toBeDeleted) {
				this._itemNav.setCurrentItem(target);
				this._scrollToToken(target);
			}
		}
	}

	onTokenSelect() {
		const tokens = this._tokens;
		const firstToken = tokens[0];

		if (tokens.length === 1 && firstToken.isTruncatable) {
			this.open = firstToken.selected;
		}
	}

	_getVisibleTokens() {
		if (this.disabled) {
			return [];
		}

		return this._tokens.filter((token, index) => {
			return index < (this._tokens.length - this._nMoreCount);
		});
	}

	onAfterRendering() {
		const tokensArray = this._tokens;
		const firstToken = tokensArray[0];

		this._nMoreCount = this.overflownTokens.length;

		if (firstToken && !this.disabled && !this.preventInitialFocus && !this._skipTabIndex) {
			firstToken.forcedTabIndex = "0";
		}

		this._scrollEnablement.scrollContainer = this.contentDom;

		if (this.expanded) {
			this._expandedScrollWidth = this.contentDom.scrollWidth;
		}

		this._tokenDeleting = false;
	}

	_delete(e: CustomEvent<TokenDeleteEventDetail>) {
		const target = e.target as Token;

		if (!e.detail) { // if there are no details, the event is triggered by a click
			this._tokenClickDelete(e, target);
			this.open = !this._tokens.length;

			return;
		}

		if (this._selectedTokens.length) {
			this._selectedTokens.forEach(token => this.deleteToken(token, e.detail.backSpace));
		} else {
			this.deleteToken(target, e.detail.backSpace);
		}
	}

	_tokenClickDelete(e: CustomEvent<TokenDeleteEventDetail>, token: Token) {
		const tokens = this._getVisibleTokens();
		const target = e.target as Token;
		const deletedTokenIndex = token ? tokens.indexOf(token) : tokens.indexOf(target); // The index of the token that just got deleted
		const nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1; // The index of the next token that needs to be focused next due to the deletion
		const nextToken = tokens[nextTokenIndex]; // if the last item was deleted this will be undefined

		this._handleCurrentItemAfterDeletion(nextToken);

		this._tokenDeleting = true;
		this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token || target });
	}

	_handleCurrentItemAfterDeletion(nextToken: Token) {
		if (nextToken && !isPhone()) {
			setTimeout(() => {
				nextToken.focus();
			}, 0);
		}
	}

	/**
	 * Removes a token from the Tokenizer.
	 * This method should only be used by ui5-multi-combobox and ui5-multi-input
	 * @protected
	 * @param token Token to be focused.
	 * @param forwardFocusToPrevious Indicates whether the focus will be forwarded to previous or next token after deletion.
	 */
	deleteToken(token: Token, forwardFocusToPrevious?: boolean) {
		const tokens = this._getVisibleTokens();
		const deletedTokenIndex = tokens.indexOf(token);
		let nextTokenIndex = (deletedTokenIndex === tokens.length - 1) ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
		const notSelectedTokens = tokens.filter(t => !t.selected);

		if (forwardFocusToPrevious) { // on backspace key select the previous item (unless deleting the first)
			nextTokenIndex = deletedTokenIndex === 0 ? deletedTokenIndex + 1 : deletedTokenIndex - 1;
		} else { // on delete key or mouse click on the "x" select the next item (unless deleting the last)
			nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
		}

		let nextToken = tokens[nextTokenIndex];

		if (notSelectedTokens.length > 1) {
			while (nextToken && nextToken.selected) {
				nextToken = forwardFocusToPrevious ? tokens[--nextTokenIndex] : tokens[++nextTokenIndex];
			}
		} else {
			nextToken = notSelectedTokens[0];
		}

		this._handleCurrentItemAfterDeletion(nextToken);

		this._tokenDeleting = true;
		this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });
	}

	itemDelete(e: CustomEvent) {
		const token = e.detail.item.tokenRef;
		const tokensArray = this._tokens;

		// delay the token deletion in order to close the popover before removing token of the DOM
		if (tokensArray.length === 1) {
			if (tokensArray[0].isTruncatable) {
				const morePopover = this.getPopover();

				morePopover.addEventListener("ui5-close", () => {
					this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });
				}, {
					once: true,
				});
				return;
			}

			this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });
			this.open = false;
		} else {
			this.fireEvent<TokenizerTokenDeleteEventDetail>("token-delete", { ref: token });

			const currentListItem = e.detail.item as ListItem;
			const nextListItem = currentListItem.nextElementSibling;
			const preciousListItem = currentListItem.previousElementSibling;

			if (nextListItem) {
				const nextListItemIcon = nextListItem.shadowRoot!.querySelector<HTMLElement>("[part=delete-button]")!;
				nextListItemIcon.focus();
			} else if (preciousListItem) {
				const previousListItemIcon = preciousListItem.shadowRoot!.querySelector<HTMLElement>("[part=delete-button]")!;
				previousListItemIcon.focus();
			}
		}
	}

	handleBeforeClose() {
		const tokensArray = this._tokens;

		if (isPhone()) {
			tokensArray.forEach(token => {
				token.selected = false;
			});
		}

		if (!this._tokenDeleting && !this._preventCollapse) {
			this._preventCollapse = false;
			this.expanded = false;
		}
	}

	handleBeforeOpen() {
		this.fireEvent("before-more-popover-open");
	}

	handleAfterClose() {
		this.open = false;
		this._preventCollapse = false;
		this._focusedElementBeforeOpen = null;
	}

	handleDialogButtonPress(e: MouseEvent) {
		const isOkButton = (e.target as HTMLElement).hasAttribute("data-ui5-tokenizer-dialog-ok-button");
		const confirm = !!isOkButton;

		this.fireEvent("dialog-button-press", { confirm });
		this.open = false;
	}

	_onkeydown(e: KeyboardEvent) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);

		if ((isCtrl && ["c", "x"].includes(e.key.toLowerCase())) || isDeleteShift(e) || isInsertCtrl(e)) {
			e.preventDefault();

			const isCut = e.key.toLowerCase() === "x" || isDeleteShift(e);
			const selectedTokens = this._tokens.filter(token => token.selected);

			if (isCut) {
				const cutResult = this._fillClipboard(ClipboardDataOperation.cut, selectedTokens);

				selectedTokens.forEach(token => this.deleteToken(token));

				return cutResult;
			}

			return this._fillClipboard(ClipboardDataOperation.copy, selectedTokens);
		}

		if (isCtrl && e.key.toLowerCase() === "i" && this._tokens.length > 0) {
			e.preventDefault();

			this._preventCollapse = true;
			this._focusedElementBeforeOpen = getFocusedElement();

			this.open = true;
		}

		if (isSpaceShift(e)) {
			e.preventDefault();
		}

		if (isSpace(e) || isSpaceCtrl(e)) {
			e.preventDefault();

			return this._handleTokenSelection(e, false);
		}

		if (isHomeShift(e) || isPageUpShift(e)) {
			this._handleHomeShift(e);
		}

		if (isEndShift(e) || isPageDownShift(e)) {
			this._handleEndShift(e);
		}

		this._handleItemNavigation(e, this._tokens);
	}

	_onPopoverListKeydown(e: KeyboardEvent) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);

		if ((isCtrl && e.key.toLowerCase() === "i") || isEscape(e)) {
			e.preventDefault();
			this.open = false;

			this._preventCollapse = true;
			this._focusedElementBeforeOpen && this._focusedElementBeforeOpen.focus();

			if (!this._focusedElementBeforeOpen) {
				this._focusLastToken();
			}
		}

		if (e.key.toLowerCase() === "f7") {
			e.preventDefault();

			const eventTarget = e.target as ListItem;
			const activeElement = getActiveElement();

			if (activeElement?.part.value === "native-li") {
				eventTarget.shadowRoot!.querySelector<HTMLElement>("[part=delete-button]")!.focus();
			} else {
				eventTarget.focus();
			}
		}
	}

	_handleItemNavigation(e: KeyboardEvent, tokens: Array<Token>) {
		const isCtrl = !!(e.metaKey || e.ctrlKey);
		const target = e.target as Token;

		if (isLeftCtrl(e) || isRightCtrl(e) || isDownCtrl(e) || isUpCtrl(e)) {
			return this._handleArrowCtrl(e, target, tokens, isRightCtrl(e) || isDownCtrl(e));
		}

		if (isLeftShift(e) || isRightShift(e) || isUpShift(e) || isDownShift(e) || isLeftShiftCtrl(e) || isRightShiftCtrl(e)) {
			e.preventDefault();
			return this._handleArrowShift(target, tokens, (isRightShift(e) || isRightShiftCtrl(e) || isDownShift(e)));
		}

		if (isHome(e) || isEnd(e) || isHomeCtrl(e) || isEndCtrl(e)) {
			e.preventDefault();
			return this._handleHome(tokens, isEnd(e) || isEndCtrl(e));
		}

		if (isCtrl && e.key.toLowerCase() === "a") {
			e.preventDefault();

			return this._toggleTokenSelection(tokens);
		}

		if (isLeft(e) || isRight(e) || isUp(e) || isDown(e)) {
			e.preventDefault();
			const nextTokenIdx = this._calcNextTokenIndex(this._tokens.find(token => token.focused)!, tokens, (isRight(e) || isDown(e)));
			this._scrollToToken(tokens[nextTokenIdx]);
		}
	}

	_handleHome(tokens: Array<Token>, endKeyPressed: boolean) {
		if (!tokens || !tokens.length) {
			return -1;
		}

		const index = endKeyPressed ? tokens.length - 1 : 0;

		tokens[index].focus();
	}

	_handleHomeShift(e: KeyboardEvent) {
		const tokens = this._tokens;
		const target = e.target as Token;
		const currentTokenIdx = tokens.indexOf(target);
		const previousSelectedTokens = [...this._selectedTokens];

		tokens.filter((token, index) => index <= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);

		if (selectedTokensChanged) {
			this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
				selectedTokens: this._selectedTokens,
			});
		}

		tokens[0].focus();
	}

	_handleEndShift(e: KeyboardEvent) {
		const tokens = this._tokens;
		const target = e.target as Token;
		const currentTokenIdx = tokens.indexOf(target);
		const previousSelectedTokens = [...this._selectedTokens];

		tokens.filter((token, index) => index >= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);

		if (selectedTokensChanged) {
			this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
				selectedTokens: this._selectedTokens,
			});
		}

		tokens[tokens.length - 1].focus();
	}

	_calcNextTokenIndex(focusedToken: IToken, tokens: Array<IToken>, backwards: boolean) {
		if (!tokens.length) {
			return -1;
		}

		const focusedTokenIndex = tokens.indexOf(focusedToken);
		let nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);

		if (nextIndex >= tokens.length) {
			nextIndex = tokens.length - 1;
		}

		if (nextIndex < 0) {
			nextIndex = 0;
		}

		return nextIndex;
	}

	_handleArrowCtrl(e: KeyboardEvent, focusedToken: IToken, tokens: Array<IToken>, backwards: boolean) {
		const nextIndex = this._calcNextTokenIndex(focusedToken, tokens, backwards);

		e.preventDefault();

		if (nextIndex === -1) {
			return;
		}

		setTimeout(() => {
			tokens[nextIndex].focus();
		}, 0);

		this._scrollToToken(tokens[nextIndex]);
	}

	_handleArrowShift(focusedToken: Token, tokens: Array<Token>, backwards: boolean) {
		const focusedTokenIndex = tokens.indexOf(focusedToken);
		const nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);
		const previousSelectedTokens = [...this._selectedTokens];

		if (nextIndex === -1 || nextIndex === tokens.length) {
			return;
		}

		focusedToken.selected = true;
		tokens[nextIndex].selected = true;

		const selectedTokensChanged = JSON.stringify(previousSelectedTokens) !== JSON.stringify(this._selectedTokens);

		if (selectedTokensChanged) {
			this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
				selectedTokens: this._selectedTokens,
			});
		}

		tokens[nextIndex].focus();

		this._scrollToToken(tokens[nextIndex]);
	}

	_click(e: MouseEvent) {
		if (e.metaKey || e.ctrlKey) {
			this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
				selectedTokens: this._selectedTokens,
			});
			return;
		}

		const targetToken = e.target as Token;

		if (!e.shiftKey) {
			this._previousToken = targetToken;
		}

		let focusedToken = targetToken;

		if (this._previousToken) {
			focusedToken = this._previousToken;
		} else {
			this._previousToken = focusedToken;
		}

		if (e.shiftKey) {
			const tokensArray = this._tokens;
			const lastClickedIndex = tokensArray.indexOf(targetToken);
			const firstSelectedTokenIndex = tokensArray.indexOf(focusedToken);
			const start = Math.min(lastClickedIndex, firstSelectedTokenIndex);
			const end = Math.max(lastClickedIndex, firstSelectedTokenIndex);

			if (lastClickedIndex !== -1) {
				tokensArray.forEach((token, i) => {
					token.selected = i >= start && i <= end;
				});
			}

			this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
				selectedTokens: this._selectedTokens,
			});

			return;
		}

		this._handleTokenSelection(e);
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as Token;
		this.open = false;
		this._itemNav.setCurrentItem(target);

		if (!this.expanded) {
			this.expanded = true;
		}
	}

	_onfocusout(e: FocusEvent) {
		const relatedTarget = e.relatedTarget as HTMLElement;

		this._tokens.forEach(token => {
			token.forcedTabIndex = "-1";
		});

		this._itemNav._currentIndex = -1;
		this._skipTabIndex = true;

		if (!this.contains(relatedTarget)) {
			this._tokens[0].forcedTabIndex = "0";
			this._skipTabIndex = false;
		}

		if (!this._tokenDeleting && !this._preventCollapse) {
			this._preventCollapse = false;
			this.expanded = false;
		}
	}

	_toggleTokenSelection(tokens: Array<Token>) {
		if (!tokens || !tokens.length) {
			return;
		}

		const tokensAreSelected = tokens.every(token => token.selected);
		tokens.forEach(token => { token.selected = !tokensAreSelected; });

		this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
			selectedTokens: this._selectedTokens,
		});
	}

	_handleTokenSelection(e: KeyboardEvent | MouseEvent, deselectAll = true) {
		const target = e.target as Token;

		if (target.hasAttribute("ui5-token")) {
			const deselectTokens = deselectAll ? this._tokens : [];

			deselectTokens.forEach(token => {
				if (token !== target) {
					token.selected = false;
				}
			});

			this.fireEvent<TokenizerSelectionChangeEventDetail>("selection-change", {
				selectedTokens: this._selectedTokens,
			});
		}
	}

	_fillClipboard(shortcutName: ClipboardDataOperation, tokens: Array<IToken>) {
		const tokensTexts = tokens.filter(token => token.selected).map(token => token.text).join("\r\n");

		const cutToClipboard = (e: ClipboardEvent) => {
			if (e.clipboardData) {
				e.clipboardData.setData("text/plain", tokensTexts);
			}

			e.preventDefault();
		};

		document.addEventListener(shortcutName, cutToClipboard);
		document.execCommand(shortcutName);
		document.removeEventListener(shortcutName, cutToClipboard);
	}

	/**
	 * Scrolls the container of the tokens to its beginning.
	 * This method is used by MultiInput and MultiComboBox.
	 * @protected
	 */
	scrollToStart() {
		if (this._scrollEnablement.scrollContainer) {
			this._scrollEnablement.scrollTo(0, 0);
		}
	}

	/**
	 * Scrolls the container of the tokens to its end when expanded.
	 * This method is used by MultiInput and MultiComboBox.
	 * @protected
	 */
	scrollToEnd() {
		const expandedTokenizerScrollWidth = this.contentDom && (this.effectiveDir !== "rtl" ? this.contentDom.scrollWidth : -this.contentDom.scrollWidth);
		if (this._scrollEnablement.scrollContainer) {
			this._scrollEnablement.scrollTo(expandedTokenizerScrollWidth, 0, 5, 10);
		}
	}

	/**
	 * Scrolls token to the visible area of the container.
	 * Adds 4 pixels to the scroll position to ensure padding and border visibility on both ends
	 * @protected
	 */
	_scrollToToken(token: IToken) {
		if (!this.contentDom) {
			return;
		}

		const tokenRect = token.getBoundingClientRect();
		const tokenContainerRect = this.contentDom.getBoundingClientRect();

		if (tokenRect.left < tokenContainerRect.left) {
			this._scrollEnablement.scrollTo(this.contentDom.scrollLeft - (tokenContainerRect.left - tokenRect.left + 5), 0);
		} else if (tokenRect.right > tokenContainerRect.right) {
			this._scrollEnablement.scrollTo(this.contentDom.scrollLeft + (tokenRect.right - tokenContainerRect.right + 5), 0);
		}
	}

	get _tokens() {
		return this.getSlottedNodes<Token>("tokens");
	}

	get morePopoverOpener(): HTMLElement {
		return Object.keys(this.opener).length === 0 ? this : this.opener;
	}

	get _nMoreText() {
		if (!this._nMoreCount) {
			return;
		}

		if (this._getVisibleTokens().length) {
			return Tokenizer.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, this._nMoreCount);
		}

		return Tokenizer.i18nBundle.getText(TOKENIZER_SHOW_ALL_ITEMS, this._nMoreCount);
	}

	get showNMore() {
		return !this.expanded && !!this.overflownTokens.length;
	}

	get contentDom() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer--content")!;
	}

	get moreLink() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-tokenizer-more-text");
	}

	get tokenizerLabel() {
		const effectiveLabelText = getEffectiveAriaLabelText(this);
		return effectiveLabelText || Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_LABEL);
	}

	get tokenizerAriaDescription() {
		return getEffectiveAriaLabelText(this) ? Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_LABEL) : undefined;
	}

	get _ariaDisabled() {
		return this.disabled || undefined;
	}

	get _ariaReadonly() {
		return this.readonly || undefined;
	}

	get morePopoverTitle() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_POPOVER_REMOVE);
	}

	get overflownTokens() {
		if (!this.contentDom) {
			return [];
		}

		const tokensArray = this._tokens;

		// Reset the overflow prop of the tokens first in order
		// to use their dimensions for calculation because already
		// hidden tokens are set to 'display: none'
		tokensArray.forEach(token => {
			token.overflows = false;
		});

		return tokensArray.filter(token => {
			const parentRect = this.contentDom.getBoundingClientRect();
			const tokenRect = token.getBoundingClientRect();
			const tokenEnd = Number(tokenRect.right.toFixed(2));
			const parentEnd = Number(parentRect.right.toFixed(2));
			const tokenStart = Number(tokenRect.left.toFixed(2));
			const parentStart = Number(parentRect.left.toFixed(2));

			token.overflows = !this.expanded && ((tokenStart < parentStart) || (tokenEnd > parentEnd));

			return token.overflows;
		});
	}

	get _isPhone() {
		return isPhone();
	}

	get _selectedTokens() {
		return this._tokens.filter(token => token.selected);
	}

	get _nMoreListMode() {
		if (this.readonly || this.disabled) {
			return ListSelectionMode.None;
		}

		return ListSelectionMode.Delete;
	}

	get styles() {
		return {
			popover: {
				"min-width": this.popoverMinWidth ? `${this.popoverMinWidth}px` : `${this.getBoundingClientRect().width}px`,
			},
		};
	}

	_tokensCountText() {
		const iTokenCount = this._tokens.length;

		const tokenCountMap: TokenCountMapType = {
			0: TOKENIZER_ARIA_CONTAIN_TOKEN,
			1: TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
		};

		if (iTokenCount in tokenCountMap) {
			return Tokenizer.i18nBundle.getText(tokenCountMap[iTokenCount]);
		}

		return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, iTokenCount);
	}

	/**
	 * @protected
	 */
	_focusLastToken() {
		const tokens = this._tokens;
		if (tokens.length === 0) {
			return;
		}

		const lastToken = tokens[tokens.length - 1];
		lastToken.focus();
	}

	static async onDefine() {
		Tokenizer.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	getPopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}
}

Tokenizer.define();

export default Tokenizer;
export { ClipboardDataOperation };
export type { TokenizerTokenDeleteEventDetail, TokenizerSelectionChangeEventDetail, TokenizerDialogButtonPressDetail };
