import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";
import TokenizerPopoverTemplate from "./generated/templates/TokenizerPopoverTemplate.lit.js";
import { MULTIINPUT_SHOW_MORE_TOKENS, TOKENIZER_ARIA_LABEL, TOKENIZER_POPOVER_REMOVE } from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Tokenizer.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tokenizer",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Tokenizer.prototype */ {
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
	properties: /** @lends sap.ui.webcomponents.main.Tokenizer.prototype */ {
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
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @private
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		_nMoreCount: { type: Integer },
	},
	events: /** @lends sap.ui.webcomponents.main.Tokenizer.prototype */ {
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
 * @alias sap.ui.webcomponents.main.Tokenizer
 * @extends UI5Element
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
		return [ResponsivePopoverCommonCss, ValueStateMessageCss];
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
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	async onBeforeRendering() {
		if (this.showPopover && !this._getTokens().length) {
			const popover = await this.getPopover();
			popover.close();
		}
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

			popover.open(this.morePopoverOpener || this);
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
		this._nMoreCount = this.overflownTokens.length;
		this._scrollEnablement.scrollContainer = this.expanded ? this.contentDom : this;
	}

	_tokenDelete(event) {
		let nextTokenIndex; // The index of the next token that needs to be focused next due to the deletion
		const deletedTokenIndex = this._getVisibleTokens().indexOf(event.target); // The index of the token that just got deleted

		if (event.detail && event.detail.backSpace) { // on backspace key select the previous item (unless deleting the first)
			nextTokenIndex = deletedTokenIndex === 0 ? deletedTokenIndex + 1 : deletedTokenIndex - 1;
		} else { // on delete key or mouse click on the "x" select the next item (unless deleting the last)
			nextTokenIndex = deletedTokenIndex === this._getVisibleTokens().length - 1 ? deletedTokenIndex - 1 : deletedTokenIndex + 1;
		}
		const nextToken = this._getVisibleTokens()[nextTokenIndex]; // if the last item was deleted this will be undefined
		this._itemNav.update(nextToken); // update the item navigation with the new token or undefined, if the last was deleted

		if (nextToken) {
			setTimeout(() => {
				nextToken.focus();
			}, 0);
		}

		this.fireEvent("token-delete", { ref: event.target });
	}

	itemDelete(event) {
		const token = event.detail.item.tokenRef;

		this.fireEvent("token-delete", { ref: token });
	}

	_onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();

			this._handleTokenSelection(event);
		}
	}

	_click(event) {
		this._handleTokenSelection(event);
	}

	_onmousedown(event) {
		this._itemNav.update(event.target);
	}

	_handleTokenSelection(event) {
		if (event.target.localName === "ui5-token") {
			this._tokens.forEach(token => {
				if (token !== event.target) {
					token.selected = false;
				}
			});
		}
	}

	/**
	 * Scrolls the container of the tokens to its beginning.
	 * This method is used by MultiInput and MultiComboBox.
	 * @private
	 */
	scrollToStart() {
		this.contentDom.scrollLeft = 0;
	}

	async closeMorePopover() {
		const popover = await this.getPopover();

		popover.close();
	}

	get _nMoreText() {
		return this.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, [this._nMoreCount]);
	}

	get showNMore() {
		return !this.expanded && this.showMore && this.overflownTokens.length;
	}

	get contentDom() {
		return this.shadowRoot.querySelector(".ui5-tokenizer--content");
	}

	get tokenizerLabel() {
		return this.i18nBundle.getText(TOKENIZER_ARIA_LABEL);
	}

	get morePopoverTitle() {
		return this.i18nBundle.getText(TOKENIZER_POPOVER_REMOVE);
	}

	get overflownTokens() {
		if (!this.contentDom) {
			return [];
		}

		return this._getTokens().filter(token => {
			const parentRect = this.contentDom.getBoundingClientRect();
			const tokenRect = token.getBoundingClientRect();
			const tokenLeft = tokenRect.left + tokenRect.width;
			const parentLeft = parentRect.left + parentRect.width;

			token.overflows = (tokenLeft > parentLeft) && !this.expanded;

			return token.overflows;
		});
	}

	get hasValueState() {
		return this.valueState === ValueState.None || this.valueState === ValueState.Success;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get _isPhone() {
		return isPhone();
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
				"ui5-tokenizer-nmore--content": this.showMore,
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
				"padding": isPhone() ? "0.25rem 1rem" : "0.3rem 0.625rem",
			},
			popoverHeader: {
				"min-height": "2rem",
			},
			popoverHeaderTitle: {
				"justify-content": "left",
			},
		};
	}

	static get dependencies() {
		return [
			ResponsivePopover,
			List,
			StandardListItem,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	async getPopover() {
		return (await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]");
	}
}

Tokenizer.define();

export default Tokenizer;
