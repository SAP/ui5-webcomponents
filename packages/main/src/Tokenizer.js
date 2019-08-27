import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { fetchResourceBundle, getResourceBundle } from "@ui5/webcomponents-base/dist/ResourceBundle.js";
import TokenizerTemplate from "./generated/templates/TokenizerTemplate.lit.js";
import { MULTIINPUT_SHOW_MORE_TOKENS } from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Tokenizer.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tokenizer",
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
		_nMoreText: { type: String },
	},
	events: /** @lends sap.ui.webcomponents.main.Tokenizer.prototype */ {
		tokenDelete: {
			detail: {
				ref: { type: HTMLElement },
			},
		},

		showMoreItemsPress: {
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

		this._itemNav.getItemsCallback = () => {
			if (this.disabled) {
				return [];
			}

			return this._getTokens();
		};

		this.resourceBundle = getResourceBundle("@ui5/webcomponents");

		this._delegates.push(this._itemNav);
	}

	onBeforeRendering() {
		this._itemNav.init();

		setTimeout(() => {
			// wait for the layouting and update the text
			this._nMoreText = this.resourceBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, [this.overflownTokensCount]);
		}, 0);
	}


	onEnterDOM() {
		ResizeHandler.register(this.shadowRoot.querySelector(".ui5-tokenizer--content"), this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.shadowRoot.querySelector(".ui5-tokenizer--content"), this._resizeHandler);
	}

	_openOverflowPopover() {
		this.fireEvent("showMoreItemsPress");
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
	}

	_tokenDelete(event) {
		if (event.detail && event.detail.backSpace) {
			this._deleteByBackspace();
		}

		this._updateAndFocus();
		this.fireEvent("tokenDelete", { ref: event.target });
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
		return this.showMore && this.overflownTokensCount;
	}

	get overflownTokensCount() {
		const placeholderToken = this.shadowRoot.querySelector(".ui5-tokenizer-token-placeholder");

		if (!placeholderToken) {
			return;
		}

		const placeholderTokenRect = placeholderToken.getBoundingClientRect();
		const tokens = this.tokens.filter(token => {
			return placeholderTokenRect.top < token.getBoundingClientRect().top;
		});

		return tokens.length;
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

	static async define(...params) {
		await fetchResourceBundle("@ui5/webcomponents");

		super.define(...params);
	}
}

Tokenizer.define();

export default Tokenizer;
