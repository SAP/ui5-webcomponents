import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation.js";
import Function from "@ui5/webcomponents-base/src/types/Function.js";

import { fetchResourceBundle, getResourceBundle } from "./ResourceBundleProvider.js";
import TokenizerRenderer from "./build/compiled/TokenizerRenderer.lit.js";

// Styles
import styles from "./themes/Tokenizer.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";
import TokenizerTemplateContext from "./TokenizerTemplateContext.js";

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
		_openOverflowPopover: { type: Function },
		_tokenDelete: { type: Function },
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

	static get renderer() {
		return TokenizerRenderer;
	}

	static get calculateTemplateContext() {
		return TokenizerTemplateContext.calculate;
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
		this._tokenDelete = this._handleTokenDelete.bind(this);
		this._openOverflowPopover = this._handleOpenOverflowPopover.bind(this);

		this._itemNav.getItemsCallback = () => {
			if (this.disabled) {
				return [];
			}

			return this._getTokens();
		};

		this._delegates.push(this._itemNav);
		this.resourceBundle = getResourceBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this._itemNav.init();

		if (this._lastTokenCount !== this.tokens.length) {
			this._recalculateLayouting = true;
		}

		this._lastTokenCount = this.tokens.length;
		this._nMoreText = this.resourceBundle.getText("MULTIINPUT_SHOW_MORE_TOKENS", [this._hiddenTokens.length]);
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

	_handleOpenOverflowPopover() {
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

	_handleTokenDelete(event) {
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

	static async define(...params) {
		await fetchResourceBundle("@ui5/webcomponents");
		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Tokenizer.define();
});

export default Tokenizer;
