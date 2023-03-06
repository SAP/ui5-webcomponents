import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
import Tokenizer, { ClipboardDataOperation } from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/value-help.js";

type MultiInputTokenDeleteEventDetail = {
	token: Token;
}

/**
 * @class
 * <h3>Overview</h3>
 * A <code>ui5-multi-input</code> field allows the user to enter multiple values, which are displayed as <code>ui5-token</code>.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 * <ul>
 * <li>Type a value in the input and press enter or focus out the input field (<code>change</code> event is fired)</li>
 * <li>Select a value from the suggestion list (<code>suggestion-item-select</code> event is fired)</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MultiInput";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MultiInput
 * @extends sap.ui.webc.main.Input
 * @tagname ui5-multi-input
 * @appenddocs sap.ui.webc.main.Token
 * @since 1.0.0-rc.9
 * @public
 */
@customElement({
	tag: "ui5-multi-input",
	renderer: litRender,
	template: MultiInputTemplate,
	styles: [Input.styles, styles],
	dependencies: [
		...Input.dependencies,
		Tokenizer,
		Token,
		Icon,
	],
})
/**
 * Fired when the value help icon is pressed
 * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
 *
 * @event sap.ui.webc.main.MultiInput#value-help-trigger
 * @public
 */
@event("value-help-trigger")

/**
 * Fired when a token is about to be deleted.
 *
 * @event sap.ui.webc.main.MultiInput#token-delete
 * @param {HTMLElement} token deleted token.
 * @public
 */
@event("token-delete", {
	detail: {
		token: { type: HTMLElement },
	},
})

class MultiInput extends Input {
	/**
	 * Determines whether a value help icon will be visualized in the end of the input.
	 * Pressing the icon will fire <code>value-help-trigger</code> event.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiInput.prototype.showValueHelpIcon
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showValueHelpIcon!: boolean;

	/**
	 * Indicates whether the tokenizer is expanded or collapsed(shows the n more label)
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	expandedTokenizer!: boolean;

	/**
	 * Indicates whether the tokenizer has tokens
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	tokenizerAvailable!: boolean;

	/**
	 * Defines the component tokens.
	 *
	 * @type {sap.ui.webc.main.IToken[]}
	 * @name sap.ui.webc.main.MultiInput.prototype.tokens
	 * @slot tokens
	 * @public
	 */
	@slot()
	tokens!: Array<Token>;

	_skipOpenSuggestions: boolean;
	_valueHelpIconPressed: boolean;

	constructor() {
		super();

		// Prevent suggestions' opening.
		this._skipOpenSuggestions = false;
		this._valueHelpIconPressed = false;
	}

	valueHelpPress() {
		this.closePopover();
		this.fireEvent("value-help-trigger");
	}

	showMorePress() {
		this.expandedTokenizer = false;
		this.focus();
	}

	tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>) {
		const focusedToken = e.detail.ref;
		const selectedTokens = this.tokens.filter(token => token.selected);
		const shouldFocusInput = this.tokens.length - 1 === 0 || this.tokens.length === selectedTokens.length;

		if (this._readonly) {
			return;
		}

		if (focusedToken) {
			this.fireEvent<MultiInputTokenDeleteEventDetail>("token-delete", { token: focusedToken });
			if (shouldFocusInput) {
				this.focus();
			}

			return;
		}

		if (selectedTokens.indexOf(focusedToken) === -1) {
			selectedTokens.push(focusedToken);
		}

		selectedTokens.forEach(token => {
			this.fireEvent("token-delete", { token });
		});
	}

	valueHelpMouseDown(e: MouseEvent) {
		const target = e.target as Icon;
		this.closePopover();
		this.tokenizer.closeMorePopover();
		this._valueHelpIconPressed = true;
		target.focus();
	}

	_tokenizerFocusOut(e: FocusEvent) {
		if (!this.contains(e.relatedTarget as HTMLElement)) {
			this.tokenizer._tokens.forEach(token => { token.selected = false; });
			this.tokenizer.scrollToStart();
		}
	}

	valueHelpMouseUp() {
		setTimeout(() => {
			this._valueHelpIconPressed = false;
		}, 0);
	}

	innerFocusIn() {
		this.expandedTokenizer = true;
		this.focused = true;
		this.tokenizer.scrollToEnd();
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		const target = e.target as HTMLInputElement;
		const isHomeInBeginning = isHome(e) && target.selectionStart === 0;

		if (isHomeInBeginning) {
			this._skipOpenSuggestions = true; // Prevent input focus when navigating through the tokens
			return this._focusFirstToken(e);
		}

		if (isLeft(e) || isBackSpace(e)) {
			this._skipOpenSuggestions = true;
			return this._handleLeft(e);
		}

		this._skipOpenSuggestions = false;

		if (isShow(e)) {
			this.valueHelpPress();
		}
	}

	_onTokenizerKeydown(e: KeyboardEvent) {
		const rightCtrl = isRightCtrl(e);
		const isCtrl = !!(e.metaKey || e.ctrlKey);
		const tokens = this.tokens;

		if (isRight(e) || isEnd(e) || rightCtrl) {
			e.preventDefault();
			const lastTokenIndex = this.tokens.length - 1;

			if (e.target === this.tokens[lastTokenIndex] && this.tokens[lastTokenIndex] === document.activeElement) {
				setTimeout(() => {
					this.focus();
				}, 0);
			} else if (rightCtrl) {
				e.preventDefault();
				return this.tokenizer._handleArrowCtrl(e, e.target as Token, this.tokens, true);
			}
		}

		if (isCtrl && ["c", "x"].includes(e.key.toLowerCase())) {
			e.preventDefault();

			const isCut = e.key.toLowerCase() === "x";
			const selectedTokens = tokens.filter(token => token.selected);

			if (isCut) {
				const cutResult = this.tokenizer._fillClipboard(ClipboardDataOperation.cut, selectedTokens);

				selectedTokens.forEach(token => {
					this.fireEvent<MultiInputTokenDeleteEventDetail>("token-delete", { token });
				});

				this.focus();

				return cutResult;
			}

			return this.tokenizer._fillClipboard(ClipboardDataOperation.copy, selectedTokens);
		}
	}

	_handleLeft(e: KeyboardEvent) {
		const cursorPosition = this.getDomRef()!.querySelector(`input`)!.selectionStart;
		const tokens = this.tokens;
		const lastToken = tokens.length && tokens[tokens.length - 1];

		if (cursorPosition === 0 && lastToken) {
			e.preventDefault();
			lastToken.focus();
			this.tokenizer._itemNav.setCurrentItem(lastToken);
		}
	}

	_focusFirstToken(e: KeyboardEvent) {
		const tokens = this.tokens;
		const firstToken = tokens.length && tokens[0];

		if (firstToken) {
			e.preventDefault();

			firstToken.focus();
			this.tokenizer._itemNav.setCurrentItem(firstToken);
		}
	}

	_onfocusout(e: FocusEvent) {
		super._onfocusout(e);
		const relatedTarget = e.relatedTarget as HTMLElement;
		const insideDOM = this.contains(relatedTarget);
		const insideShadowDom = this.shadowRoot!.contains(relatedTarget);

		if (!insideDOM && !insideShadowDom) {
			this.expandedTokenizer = false;

			// we need to reset tabindex setting by tokenizer
			this.tokenizer._itemNav._currentIndex = -1;
		}
	}

	/**
	 * @override
	 */
	async _onfocusin(e: FocusEvent) {
		const inputDomRef = await this.getInputDOMRef();

		if (e.target === inputDomRef) {
			await super._onfocusin(e);
		}
	}

	lastItemDeleted() {
		setTimeout(() => {
			this.focus();
		}, 0);
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);
		this.tokenizerAvailable = this.tokens && this.tokens.length > 0;
	}

	get iconsCount() {
		return super.iconsCount + (this.showValueHelpIcon ? 1 : 0);
	}

	get tokenizer() {
		return this.shadowRoot!.querySelector<Tokenizer>("[ui5-tokenizer]")!;
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
}

MultiInput.define();

export default MultiInput;
export { MultiInputTokenDeleteEventDetail };
