import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isShow,
	isBackSpace,
	isLeft,
	isRight,
	isRightCtrl,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { MULTIINPUT_ROLEDESCRIPTION_TEXT } from "./generated/i18n/i18n-defaults.js";
import Input from "./Input.js";
import MultiInputTemplate from "./generated/templates/MultiInputTemplate.lit.js";
import styles from "./generated/themes/MultiInput.css.js";
import Token from "./Token.js";
import Tokenizer from "./Tokenizer.js";
import Icon from "./Icon.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-multi-input",
	properties: /** @lends sap.ui.webcomponents.main.MultiInput.prototype */ {
		/**
		 * Determines whether a value help icon will be visualized in the end of the input.
		 * Pressing the icon will fire <code>value-help-trigger</code> event.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showValueHelpIcon: {
			type: Boolean,
		},

		/**
		 * Indicates whether the tokenizer is expanded or collapsed(shows the n more label)
		 * @private
		 */
		expandedTokenizer: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.MultiInput.prototype */ {
		/**
		 * Defines the component tokens.
		 *
		 * @type {sap.ui.webcomponents.main.IToken[]}
		 * @slot
		 * @public
		 */
		tokens: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.MultiInput.prototype */ {
		/**
		 * Fired when the value help icon is pressed
		 * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
		 *
		 * @event sap.ui.webcomponents.main.MultiInput#value-help-trigger
		 * @public
		 */
		"value-help-trigger": {},

		/**
		 * Fired when a token is about to be deleted.
		 *
		 * @event sap.ui.webcomponents.main.MultiInput#token-delete
		 * @param {HTMLElement} token deleted token.
		 * @public
		 */
		"token-delete": {
			detail: {
				token: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 * <h3>Overview</h3>
 * A <code>ui5-multi-input</code> field allows the user to enter multiple values, which are displayed as <code>ui5-token</code>.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 * <ul>
 * <li>Type a value in the input and press enter or focus out the input field (<code>change</code> event is fired)
 * <li>Select a value from the suggestion list</li> (<code>suggestion-item-select</code> event is fired)
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MultiInput";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MultiInput
 * @extends Input
 * @tagname ui5-multi-input
 * @appenddocs Token
 * @since 1.0.0-rc.9
 * @public
 */
class MultiInput extends Input {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return MultiInputTemplate;
	}

	static get styles() {
		return [Input.styles, styles];
	}

	constructor() {
		super();

		// Prevent suggestions' opening.
		this._skipOpenSuggestions = false;
	}

	valueHelpPress(event) {
		this.closePopover();
		this.fireEvent("value-help-trigger", {});
	}

	showMorePress(event) {
		this.expandedTokenizer = false;
		this.focus();
	}

	tokenDelete(event) {
		const focusedToken = event.detail.ref;
		const selectedTokens = this.tokens.filter(token => token.selected);

		if (this._readonly) {
			return;
		}

		if (selectedTokens.indexOf(focusedToken) === -1) {
			selectedTokens.push(focusedToken);
		}

		selectedTokens.forEach(token => {
			this.fireEvent("token-delete", { token });
		});

		this.focus();
	}

	valueHelpMouseDown(event) {
		this.closePopover();
		this.tokenizer.closeMorePopover();
		this._valueHelpIconPressed = true;
		event.target.focus();
	}

	_tokenizerFocusOut(event) {
		if (!this.contains(event.relatedTarget)) {
			this.tokenizer._tokens.forEach(token => { token.selected = false; });
			this.tokenizer.scrollToStart();
		}
	}

	valueHelpMouseUp(event) {
		setTimeout(() => {
			this._valueHelpIconPressed = false;
		}, 0);
	}

	innerFocusIn() {
		this.expandedTokenizer = true;
		this.focused = true;
		this.tokenizer.scrollToEnd();
	}

	_onkeydown(event) {
		super._onkeydown(event);

		const isHomeInBeginning = isHome(event) && event.target.selectionStart === 0;

		if (isHomeInBeginning) {
			this._skipOpenSuggestions = true; // Prevent input focus when navigating through the tokens
			return this._focusFirstToken(event);
		}

		if (isLeft(event) || isBackSpace(event)) {
			this._skipOpenSuggestions = true;
			return this._handleLeft(event);
		}

		this._skipOpenSuggestions = false;

		if (isShow(event)) {
			this.valueHelpPress();
		}
	}

	_onTokenizerKeydown(event) {
		const rightCtrl = isRightCtrl(event);
		const isCtrl = !!(event.metaKey || event.ctrlKey);
		const tokens = this.tokens;

		if (isRight(event) || isEnd(event) || rightCtrl) {
			event.preventDefault();
			const lastTokenIndex = this.tokens.length - 1;

			if (event.target === this.tokens[lastTokenIndex] && this.tokens[lastTokenIndex] === document.activeElement) {
				setTimeout(() => {
					this.focus();
				}, 0);
			} else if (rightCtrl) {
				event.preventDefault();
				return this.tokenizer._handleArrowCtrl(event.target, this.tokens, true);
			}
		}

		if (isCtrl && ["c", "x"].includes(event.key.toLowerCase())) {
			event.preventDefault();

			const isCut = event.key.toLowerCase() === "x";
			const selectedTokens = tokens.filter(token => token.selected);

			if (isCut) {
				const cutResult = this.tokenizer._fillClipboard("cut", selectedTokens);

				selectedTokens.forEach(token => {
					this.fireEvent("token-delete", { token });
				});

				this.focus();

				return cutResult;
			}

			return this.tokenizer._fillClipboard("copy", selectedTokens);
		}
	}

	_handleLeft(event) {
		const cursorPosition = this.getDomRef().querySelector(`input`).selectionStart;
		const tokens = this.tokens;
		const lastToken = tokens.length && tokens[tokens.length - 1];

		if (cursorPosition === 0 && lastToken) {
			event.preventDefault();
			lastToken.focus();
			this.tokenizer._itemNav.setCurrentItem(lastToken);
		}
	}

	_focusFirstToken(event) {
		const tokens = this.tokens;
		const firstToken = tokens.length && tokens[0];

		if (firstToken) {
			event.preventDefault();

			firstToken.focus();
			this.tokenizer._itemNav.setCurrentItem(firstToken);
		}
	}

	_onfocusout(event) {
		super._onfocusout(event);
		const relatedTarget = event.relatedTarget;
		const insideDOM = this.contains(relatedTarget);
		const insideShadowDom = this.shadowRoot.contains(relatedTarget);

		if (!insideDOM && !insideShadowDom) {
			this.expandedTokenizer = false;

			// we need to reset tabindex setting by tokenizer
			this.tokenizer._itemNav._currentIndex = -1;
		}
	}

	/**
	 * @override
	 */
	async _onfocusin(event) {
		const inputDomRef = await this.getInputDOMRef();

		if (event.target === inputDomRef) {
			await super._onfocusin(event);
		}
	}

	shouldOpenSuggestions() {
		const parent = super.shouldOpenSuggestions();
		const valueHelpPressed = this._valueHelpIconPressed;
		const nonEmptyValue = this.value !== "";

		return parent && nonEmptyValue && !valueHelpPressed && !this._skipOpenSuggestions;
	}

	lastItemDeleted() {
		setTimeout(() => {
			this.focus();
		}, 0);
	}

	get tokenizer() {
		return this.shadowRoot.querySelector("[ui5-tokenizer]");
	}

	get _tokensCountText() {
		if (!this.tokenizer) {
			return;
		}
		return this.tokenizer._tokensCountText();
	}

	get _tokensCountTextId() {
		return `${this._id}-hiddenText-nMore`;
	}

	/**
	 * Returns the placeholder value when there are no tokens.
	 * @protected
	 */
	get _placeholder() {
		if (this.tokenizer && this.tokenizer._tokens.length) {
			return "";
		}

		return this.placeholder;
	}

	get accInfo() {
		const ariaDescribedBy = `${this._tokensCountTextId} ${this.suggestionsTextId} ${this.valueStateTextId}`.trim();
		return {
			"input": {
				...super.accInfo.input,
				"ariaRoledescription": this.ariaRoleDescription,
				"ariaDescribedBy": ariaDescribedBy,
			},
		};
	}

	get ariaRoleDescription() {
		return MultiInput.i18nBundle.getText(MULTIINPUT_ROLEDESCRIPTION_TEXT);
	}

	static get dependencies() {
		return [
			...Input.dependencies,
			Tokenizer,
			Token,
			Icon,
		];
	}
}

MultiInput.define();

export default MultiInput;
