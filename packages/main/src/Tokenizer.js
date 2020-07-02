import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";
import { MULTIINPUT_SHOW_MORE_TOKENS, TOKENIZER_ARIA_LABEL } from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Tokenizer.css.js";

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
		_nMoreText: { type: String },
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

	_handleResize() {
		/*
		 * Overflow happens with a pure CSS, but we
		 * have to update the "n more" label when tokenizer is resized
		 */
		this._invalidate();
	}

	constructor() {
		super();

		this._tokensCount = 0;
		this._resizeHandler = this._handleResize.bind(this);
		this._itemNav = new ItemNavigation(this);
		this._scrollEnablement = new ScrollEnablement(this);

		this._itemNav.getItemsCallback = () => {
			if (this.disabled) {
				return [];
			}

			return this._getTokens().filter((token, index) => {
				return index < (this._getTokens().length - this.overflownTokens.length);
			});
		};

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		setTimeout(() => {
			// wait for the layouting and update the text
			this._nMoreText = this.i18nBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, [this.overflownTokens.length]);
		}, 0);
	}


	onEnterDOM() {
		ResizeHandler.register(this.shadowRoot.querySelector(".ui5-tokenizer--content"), this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.shadowRoot.querySelector(".ui5-tokenizer--content"), this._resizeHandler);
	}

	_openOverflowPopover() {
		this.fireEvent("show-more-items-press");
	}

	_getTokens() {
		return this.tokens;
	}

	onAfterRendering() {
		/*
			We schedule an invalidation as we have the tokens count
			changed and we need them rendered for the nmore count
		*/
		if (this._tokensCount !== this.tokens.length) {
			this._invalidate();
			this._tokensCount = this.tokens.length;
		}

		this._scrollEnablement.scrollContainer = this.expanded ? this.contentDom : this;
	}

	_tokenDelete(event) {
		if (event.detail && event.detail.backSpace) {
			this._deleteByBackspace();
		}

		this._updateAndFocus();
		this.fireEvent("token-delete", { ref: event.target });
	}

	/* Keyboard handling */

	_updateAndFocus() {
		if (this._getTokens().length) {
			this._itemNav.update();

			setTimeout(() => {
				this._itemNav.focusCurrent();
			}, 0);
		}
	}

	_deleteByBackspace() {
		const newIndex = this._itemNav.currentIndex - 1;

		if (newIndex < 0) {
			this._itemNav.currentIndex = 0;
		} else {
			this._itemNav.currentIndex = newIndex;
		}
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

	get overflownTokens() {
		if (!this.contentDom) {
			return [];
		}

		return this.tokens.filter(token => {
			const parentRect = this.contentDom.getBoundingClientRect();
			const tokenRect = token.getBoundingClientRect();
			const tokenLeft = tokenRect.left + tokenRect.width;
			const parentLeft = parentRect.left + parentRect.width;

			token.overflows = (tokenLeft > parentLeft) && !this.expanded;

			return token.overflows;
		});
	}

	get classes() {
		return {
			wrapper: {
				"ui5-tokenizer-root": true,
				"ui5-tokenizer-nmore--wrapper": this.showMore,
				"ui5-tokenizer-no-padding": !this.tokens.length,
			},
			content: {
				"ui5-tokenizer--content": true,
				"ui5-tokenizer-nmore--content": this.showMore,
			},
		};
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

Tokenizer.define();

export default Tokenizer;
