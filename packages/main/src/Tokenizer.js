import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
	isEnd,
	isHome,
	isHomeShift,
	isEndShift,
	isHomeCtrl,
	isEndCtrl,
	isRight,
	isLeft,
	isUp,
	isDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import Title from "./Title.js";
import Button from "./Button.js";
import StandardListItem from "./StandardListItem.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";
import TokenizerPopoverTemplate from "./generated/templates/TokenizerPopoverTemplate.lit.js";
import {
	MULTIINPUT_SHOW_MORE_TOKENS,
	TOKENIZER_ARIA_LABEL,
	TOKENIZER_POPOVER_REMOVE,
	TOKENIZER_ARIA_CONTAIN_TOKEN,
	TOKENIZER_ARIA_CONTAIN_ONE_TOKEN,
	TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Tokenizer.css.js";
import TokenizerPopoverCss from "./generated/themes/TokenizerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

// reuse suggestions focus styling for NMore popup
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tokenizer",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webc.main.Tokenizer.prototype */ {
		"default": {
			propertyName: "tokens",
			type: HTMLElement,
			individualSlots: true,
		},
		"valueStateMessage": {
			propertyName: "valueStateMessage",
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webc.main.Tokenizer.prototype */ {
		showMore: { type: Boolean },

		disabled: { type: Boolean },

		/**
		 * Indicates if the tokenizer should show all tokens or n more label instead
		 *
		 * @private
		 */
		expanded: { type: Boolean },

		morePopoverOpener: { type: Object },

		popoverMinWidth: {
			type: Integer,
		},

		/**
		 * Indicates the value state of the related input component.
		 *
		 * @type {sap.ui.webc.base.types.ValueState}
		 * @defaultvalue "None"
		 * @private
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		_nMoreCount: { type: Integer },
	},
	events: /** @lends sap.ui.webc.main.Tokenizer.prototype */ {
		"token-delete": {
			detail: {
				ref: { type: HTMLElement },
			},
		},

		"show-more-items-press": {
			detail: {
				ref: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * A container for tokens.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Tokenizer
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-tokenizer
 * @usestextcontent
 * @private
 */
class Tokenizer extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TokenizerTemplate;
	}

	static get styles() {
		return styles;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss, TokenizerPopoverCss];
	}

	static get staticAreaTemplate() {
		return TokenizerPopoverTemplate;
	}

	_handleResize() {
		this._nMoreCount = this.overflownTokens.length;
	}

	constructor() {
		super();

		this._resizeHandler = this._handleResize.bind(this);

		this._itemNav = new ItemNavigation(this, {
			currentIndex: "-1",
			getItemsCallback: this._getVisibleTokens.bind(this),
		});

		this._scrollEnablement = new ScrollEnablement(this);
	}

	async onBeforeRendering() {
		if (this.showPopover && !this._getTokens().length) {
			const popover = await this.getPopover();
			popover.close();
		}

		this._nMoreCount = this.overflownTokens.length;
	}

	onEnterDOM() {
		ResizeHandler.register(this.shadowRoot.querySelector(".ui5-tokenizer--content"), this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.shadowRoot.querySelector(".ui5-tokenizer--content"), this._resizeHandler);
	}

	async _openOverflowPopover() {
		if (this.showPopover) {
			const popover = await this.getPopover();

			popover.showAt(this.morePopoverOpener || this);
		}

		this.fireEvent("show-more-items-press");
	}

	_getTokens() {
		return this.getSlottedNodes("tokens");
	}

	get _tokens() {
		return this.getSlottedNodes("tokens");
	}

	get showPopover() {
		return Object.keys(this.morePopoverOpener).length;
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
		this._scrollEnablement.scrollContainer = (this.expanded || !this.narrowContentDom) ? this.expandedContentDom : this.narrowContentDom;

		if (this.expanded) {
			this._expandedScrollWidth = this.expandedContentDom.scrollWidth;
			this.scrollToEnd();
		}

		if (!this.expanded) {
			this.scrollToStart();
		}
	}

	_delete(event) {
		if (!event.detail) { // if there are no details, the event is triggered by a click
			this._tokenClickDelete(event, event.target);
			return;
		}

		if (this._selectedTokens.length) {
			this._selectedTokens.forEach(token => this._tokenKeyboardDelete(event, token));
		} else {
			this._tokenKeyboardDelete(event);
		}
	}

	_tokenClickDelete(event, token) {
		const tokens = this._getVisibleTokens();
		const deletedTokenIndex = token ? tokens.indexOf(token) : tokens.indexOf(event.target); // The index of the token that just got deleted
		const nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1; // The index of the next token that needs to be focused next due to the deletion
		const nextToken = tokens[nextTokenIndex]; // if the last item was deleted this will be undefined

		this._handleCurrentItemAfterDeletion(nextToken);

		this.fireEvent("token-delete", { ref: token || event.target });
	}

	_handleCurrentItemAfterDeletion(nextToken) {
		if (nextToken && !isPhone()) {
			this._itemNav.setCurrentItem(nextToken); // update the item navigation with the new token or undefined, if the last was deleted

			setTimeout(() => {
				nextToken.focus();
			}, 0);
		}
	}

	_tokenKeyboardDelete(event, token) {
		let nextTokenIndex; // The index of the next token that needs to be focused next due to the deletion

		const tokens = this._getVisibleTokens();
		const deletedTokenIndex = token ? tokens.indexOf(token) : tokens.indexOf(event.target); // The index of the token that just got deleted
		const notSelectedTokens = tokens.filter(t => !t.selected);

		if (event.detail && event.detail.backSpace) { // on backspace key select the previous item (unless deleting the first)
			nextTokenIndex = deletedTokenIndex === 0 ? deletedTokenIndex + 1 : deletedTokenIndex - 1;
		} else { // on delete key or mouse click on the "x" select the next item (unless deleting the last)
			nextTokenIndex = deletedTokenIndex === tokens.length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
		}

		let nextToken = tokens[nextTokenIndex]; // if the last item was deleted this will be undefined

		if (notSelectedTokens.length > 1) {
			while (nextToken && nextToken.selected) {
				nextToken = event.detail.backSpace ? tokens[--nextTokenIndex] : tokens[++nextTokenIndex];
			}
		} else {
			nextToken = notSelectedTokens[0];
		}

		this._handleCurrentItemAfterDeletion(nextToken);

		this.fireEvent("token-delete", { ref: token || event.target });
	}

	itemDelete(event) {
		const token = event.detail.item.tokenRef;

		this.fireEvent("token-delete", { ref: token });
	}

	_onkeydown(event) {
		if (isSpaceShift(event)) {
			event.preventDefault();
		}

		if (isSpace(event) || isSpaceCtrl(event)) {
			event.preventDefault();

			return this._handleTokenSelection(event, false);
		}

		if (isHomeShift(event)) {
			this._handleHomeShift(event);
		}

		if (isEndShift(event)) {
			this._handleEndShift(event);
		}

		this._handleItemNavigation(event, this._tokens);
	}

	_handleItemNavigation(event, tokens) {
		const isCtrl = !!(event.metaKey || event.ctrlKey);

		if (isLeftCtrl(event) || isRightCtrl(event) || isDownCtrl(event) || isUpCtrl(event)) {
			return this._handleArrowCtrl(event, event.target, tokens, isRightCtrl(event) || isDownCtrl(event));
		}

		if (isLeftShift(event) || isRightShift(event) || isUpShift(event) || isDownShift(event) || isLeftShiftCtrl(event) || isRightShiftCtrl(event)) {
			event.preventDefault();
			return this._handleArrowShift(event.target, tokens, (isRightShift(event) || isRightShiftCtrl(event) || isDownShift(event)));
		}

		if (isHome(event) || isEnd(event) || isHomeCtrl(event) || isEndCtrl(event)) {
			event.preventDefault();
			return this._handleHome(tokens, isEnd(event) || isEndCtrl(event));
		}

		if (isCtrl && event.key.toLowerCase() === "a") {
			event.preventDefault();

			return this._toggleTokenSelection(tokens);
		}

		if (isLeft(event) || isRight(event) || isUp(event) || isDown(event)) {
			const nextTokenIdx = this._calcNextTokenIndex(this._tokens.find(token => token.focused), tokens, (isRight(event) || isDown(event)));
			this._scrollToToken(tokens[nextTokenIdx]);
		}
	}

	_handleHome(tokens, endKeyPressed) {
		if (!tokens || !tokens.length) {
			return -1;
		}

		const index = endKeyPressed ? tokens.length - 1 : 0;

		tokens[index].focus();
		this._itemNav.setCurrentItem(tokens[index]);
	}

	_handleHomeShift(event) {
		const tokens = this.tokens;
		const currentTokenIdx = tokens.indexOf(event.target);

		tokens.filter((token, index) => index <= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		tokens[0].focus();
		this._itemNav.setCurrentItem(tokens[0]);
	}

	_handleEndShift(event) {
		const tokens = this.tokens;
		const currentTokenIdx = tokens.indexOf(event.target);

		tokens.filter((token, index) => index >= currentTokenIdx).forEach(token => {
			token.selected = true;
		});

		tokens[tokens.length - 1].focus();
		this._itemNav.setCurrentItem(tokens[tokens.length - 1]);
	}

	_calcNextTokenIndex(focusedToken, tokens, backwards) {
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

	_handleArrowCtrl(event, focusedToken, tokens, backwards) {
		const nextIndex = this._calcNextTokenIndex(focusedToken, tokens, backwards);

		event.preventDefault();

		if (nextIndex === -1) {
			return;
		}

		setTimeout(() => tokens[nextIndex].focus(), 0);

		this._scrollToToken(tokens[nextIndex]);
		this._itemNav.setCurrentItem(tokens[nextIndex]);
	}

	_handleArrowShift(focusedToken, tokens, backwards) {
		const focusedTokenIndex = tokens.indexOf(focusedToken);
		const nextIndex = backwards ? (focusedTokenIndex + 1) : (focusedTokenIndex - 1);

		if (nextIndex === -1 || nextIndex === tokens.length) {
			return;
		}

		focusedToken.selected = true;
		tokens[nextIndex].selected = true;
		setTimeout(() => tokens[nextIndex].focus(), 0);

		this._scrollToToken(tokens[nextIndex]);
		this._itemNav.setCurrentItem(tokens[nextIndex]);
	}

	_click(event) {
		this._handleTokenSelection(event);
	}

	_onmousedown(event) {
		if (event.target.hasAttribute("ui5-token")) {
			if (!event.target.toBeDeleted) {
				this._itemNav.setCurrentItem(event.target);
				this._scrollToToken(event.target);
			}
		}
	}

	_toggleTokenSelection(tokens) {
		if (!tokens || !tokens.length) {
			return;
		}

		const tokensAreSelected = tokens.every(token => token.selected);
		tokens.forEach(token => { token.selected = !tokensAreSelected; });
	}

	_handleTokenSelection(event, deselectAll = true) {
		if (event.target.hasAttribute("ui5-token")) {
			const deselectTokens = deselectAll ? this._tokens : [event.target];

			deselectTokens.forEach(token => {
				if (token !== event.target) {
					token.selected = false;
				}
			});
		}
	}

	_fillClipboard(shortcutName, tokens) {
		const tokensTexts = tokens.filter(token => token.selected).map(token => token.text).join("\r\n");

		/* fill clipboard with tokens' texts so parent can handle creation */
		const cutToClipboard = event => {
			if (event.clipboardData) {
				event.clipboardData.setData("text/plain", tokensTexts);
			} else {
				event.originalEvent.clipboardData.setData("text/plain", tokensTexts);
			}

			event.preventDefault();
		};

		document.addEventListener(shortcutName, cutToClipboard);
		document.execCommand(shortcutName);
		document.removeEventListener(shortcutName, cutToClipboard);
	}

	/**
	 * Scrolls the container of the tokens to its beginning.
	 * This method is used by MultiInput and MultiComboBox.
	 * @private
	 */
	scrollToStart() {
		if (this._scrollEnablement.scrollContainer) {
			this._scrollEnablement.scrollTo(0, 0);
		}
	}

	/**
	 * Scrolls the container of the tokens to its end when expanded.
	 * This method is used by MultiInput and MultiComboBox.
	 * @private
	 */
	scrollToEnd() {
		const expandedTokenizerScrollWidth = this.expandedContentDom && (this.effectiveDir !== "rtl" ? this.expandedContentDom.scrollWidth : -this.expandedContentDom.scrollWidth);
		if (this._scrollEnablement.scrollContainer) {
			this._scrollEnablement.scrollTo(expandedTokenizerScrollWidth, 0, 5, 10);
		}
	}

	/**
	 * Scrolls token to the visible area of the container.
	 * Adds 4 pixels to the scroll position to ensure padding and border visibility on both ends
	 * @private
	 */
	_scrollToToken(token) {
		if (!this.expandedContentDom) {
			return;
		}

		const tokenRect = token.getBoundingClientRect();
		const tokenContainerRect = this.expandedContentDom.getBoundingClientRect();

		if (tokenRect.left < tokenContainerRect.left) {
			this._scrollEnablement.scrollTo(this.expandedContentDom.scrollLeft - (tokenContainerRect.left - tokenRect.left + 5), 0);
		} else if (tokenRect.right > tokenContainerRect.right) {
			this._scrollEnablement.scrollTo(this.expandedContentDom.scrollLeft + (tokenRect.right - tokenContainerRect.right + 5), 0);
		}
	}

	async closeMorePopover() {
		const popover = await this.getPopover();

		popover.close();
	}

	get _nMoreText() {
		return Tokenizer.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, this._nMoreCount);
	}

	get showNMore() {
		return !this.expanded && this.showMore && this.overflownTokens.length;
	}

	get contentDom() {
		return this.shadowRoot.querySelector(".ui5-tokenizer--content");
	}

	get expandedContentDom() {
		return this.shadowRoot.querySelector(".ui5-tokenizer-expanded--content");
	}

	get narrowContentDom() {
		return this.shadowRoot.querySelector(".ui5-tokenizer-nmore--content");
	}

	get tokenizerLabel() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_LABEL);
	}

	get morePopoverTitle() {
		return Tokenizer.i18nBundle.getText(TOKENIZER_POPOVER_REMOVE);
	}

	get overflownTokens() {
		if (!this.contentDom) {
			return [];
		}

		// Reset the overflow prop of the tokens first in order
		// to use their dimensions for calculation because already
		// hidden tokens are set to 'display: none'
		this._getTokens().forEach(token => {
			token.overflows = false;
		});

		return this._getTokens().filter(token => {
			const parentRect = this.contentDom.getBoundingClientRect();
			const tokenRect = token.getBoundingClientRect();
			const tokenEnd = parseInt(tokenRect.right);
			const parentEnd = parseInt(parentRect.right);
			const tokenStart = parseInt(tokenRect.left);
			const parentStart = parseInt(parentRect.left);

			token.overflows = !this.expanded && ((tokenStart < parentStart) || (tokenEnd > parentEnd));

			return token.overflows;
		});
	}

	get hasValueState() {
		return this.valueState === ValueState.None || this.valueState === ValueState.Success;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	 get _valueStateMessageIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get _isPhone() {
		return isPhone();
	}

	get _selectedTokens() {
		return this._getTokens().filter(token => token.selected);
	}

	get classes() {
		return {
			wrapper: {
				"ui5-tokenizer-root": true,
				"ui5-tokenizer-nmore--wrapper": this.showMore,
				"ui5-tokenizer-no-padding": !this._getTokens().length,
			},
			content: {
				"ui5-tokenizer--content": true,
				"ui5-tokenizer-expanded--content": !this.showNMore,
				"ui5-tokenizer-nmore--content": this.showNMore,
			},
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-responsive-popover-header": this.showPopover,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			popover: {
				"min-width": `${this.popoverMinWidth}px`,
			},
			popoverValueStateMessage: {
				"width": isPhone() ? "100%" : `${this.popoverMinWidth}px`,
				"min-height": "2rem",
			},
			popoverHeader: {
				"min-height": "2rem",
			},
			popoverHeaderTitle: {
				"justify-content": "left",
			},
		};
	}

	_tokensCountText() {
		const iTokenCount = this._getTokens().length;

		if (iTokenCount === 0) {
			return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_TOKEN);
		}

		if (iTokenCount === 1) {
			return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_ONE_TOKEN);
		}

		return Tokenizer.i18nBundle.getText(TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS, iTokenCount);
	}

	/**
	 * @protected
	 */
	_focusLastToken() {
		if (this.tokens.length === 0) {
			return;
		}

		const lastToken = this.tokens[this.tokens.length - 1];
		lastToken.focus();
		this._itemNav.setCurrentItem(lastToken);
	}

	static get dependencies() {
		return [
			ResponsivePopover,
			List,
			StandardListItem,
			Title,
			Button,
		];
	}

	static async onDefine() {
		Tokenizer.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	async getPopover() {
		return (await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]");
	}
}

Tokenizer.define();

export default Tokenizer;
