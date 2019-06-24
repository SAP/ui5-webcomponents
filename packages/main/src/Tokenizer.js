import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import { fetchResourceBundle, getResourceBundle } from "@ui5/webcomponents-base/src/ResourceBundle.js";
import TokenizerTemplate from "./build/compiled/TokenizerTemplate.lit.js";
import { MULTIINPUT_SHOW_MORE_TOKENS } from "./i18n/defaults.js";

// Styles
import styles from "./themes/Tokenizer.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tokenizer",
	slots: /** @lends sap.ui.webcomponents.main.Tokenizer.prototype */ {
		tokens: {
			type: HTMLElement,
			multiple: true,
			individualSlots: true,
		},
	},
	defaultSlot: "tokens",
	properties: /** @lends sap.ui.webcomponents.main.Tokenizer.prototype */ {
		showMore: { type: Boolean },
		disabled: { type: Boolean },

		_nMoreText: { type: String },
		_hiddenTokens: { type: Object, multiple: true },
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

	constructor() {
		super();

		this._itemsCount = 0;
		this._lastIndex = 0;
		this._lastTokenCount = 0;
		this._recalculateLayouting = false;
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

		if (this._lastTokenCount !== this.tokens.length) {
			this._recalculateLayouting = true;
		}

		this._lastTokenCount = this.tokens.length;
		this._nMoreText = this.resourceBundle.getText(MULTIINPUT_SHOW_MORE_TOKENS, [this._hiddenTokens.length]);
	}

	onAfterRendering() {
		if (this._recalculateLayouting) {
			this._handleResize();
			this._recalculateLayouting = false;
		}
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

	_handleResize() {
		const overflowTokens = this._getTokens(true);

		if (!overflowTokens.length) {
			this._hiddenTokens = [];
		}

		this._hiddenTokens = overflowTokens;
	}

	_getTokens(overflow) {
		const firstToken = this.shadowRoot.querySelector(".ui5-tokenizer-token-placeholder");

		if (!firstToken) {
			return [];
		}

		const firstTokenTop = firstToken.getBoundingClientRect().top;
		const tokens = [];

		if (firstToken && this.tokens.length) {
			this.tokens.forEach(token => {
				const tokenTop = token.getBoundingClientRect().top;
				const tokenOverflows = overflow && tokenTop > firstTokenTop;
				const tokenVisible = !overflow && tokenTop <= firstTokenTop;

				(tokenVisible || tokenOverflows) && tokens.push(token);
			});
		}

		return tokens;
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
		return this.showMore && this._hiddenTokens.length;
	}

	get classes() {
		return {
			wrapper: {
				"ui5-tokenizer-nmore--wrapper": this.showMore,
				"ui5-tokenizer--wrapper": true,
				"ui5-tokenizer-no-padding": !this.tokens.length,
				"sapUiSizeCompact": getCompactSize(),
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
