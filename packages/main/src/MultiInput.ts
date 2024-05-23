import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
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
	isDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { MULTIINPUT_ROLEDESCRIPTION_TEXT } from "./generated/i18n/i18n-defaults.js";
import Input from "./Input.js";
import MultiInputTemplate from "./generated/templates/MultiInputTemplate.lit.js";
import styles from "./generated/themes/MultiInput.css.js";
import Token from "./Token.js";
import Tokenizer from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/value-help.js";

import type {
	InputSelectionChangeEventDetail as MultiInputSelectionChangeEventDetail,
} from "./Input.js";

interface IToken extends HTMLElement, ITabbable {
	text: string;
	readonly: boolean,
	selected: boolean,
	isTruncatable: boolean,
}

type MultiInputTokenDeleteEventDetail = {
	token: IToken;
}

/**
 * @class
 * ### Overview
 * A `ui5-multi-input` field allows the user to enter multiple values, which are displayed as `ui5-token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Move between suggestion items (`selection-change` event is fired)
 * - Clicking on a suggestion item (`selection-change` event is fired if the clicked item is different than the current value. Also `change` event is fired )
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiInput.js";`
 * @constructor
 * @extends Input
 * @since 1.0.0-rc.9
 * @public
 */
@customElement({
	tag: "ui5-multi-input",
	renderer: litRender,
	formAssociated: true,
	template: MultiInputTemplate,
	styles: [Input.styles, styles],
	get dependencies() {
		return [
			...Input.dependencies,
			Input,
			Tokenizer,
			Token,
			Icon,
		];
	},
})
/**
 * Fired when the value help icon is pressed
 * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
 * @public
 */
@event("value-help-trigger")

/**
 * Fired when a token is about to be deleted.
 * @param {HTMLElement} token deleted token.
 * @public
 */
@event<MultiInputTokenDeleteEventDetail>("token-delete", {
	detail: {
		/**
		 * @public
		 */
		token: { type: HTMLElement },
	},
})

class MultiInput extends Input implements IFormInputElement {
	/**
	 * Determines whether a value help icon will be visualized in the end of the input.
	 * Pressing the icon will fire `value-help-trigger` event.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showValueHelpIcon = false;

	/**
	 * Indicates whether the tokenizer has tokens
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	tokenizerAvailable = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * **Note:** When the component is used inside a form element,
	 * the value is sent as the first element in the form data, even if it's empty.
	 * @default ""
	 * @public
	 */
	@property()
	declare name?: string;

	/**
	 * Defines the component tokens.
	 * @public
	 */
	@slot({ type: HTMLElement })
	tokens!: Array<IToken>;

	_skipOpenSuggestions: boolean;
	_valueHelpIconPressed: boolean;

	get formValidity(): ValidityStateFlags {
		const tokens = (this.tokens || []);

		return { valueMissing: this.required && !this.value && !tokens.length };
	}

	get formFormattedValue(): FormData | string | null {
		const tokens = (this.tokens || []);

		if (tokens.length && this.name) {
			const formData = new FormData();

			formData.append(this.name, this.value);

			for (let i = 0; i < tokens.length; i++) {
				formData.append(this.name, tokens[i].text);
			}

			return formData;
		}

		return this.value;
	}

	constructor() {
		super();

		// Prevent suggestions' opening.
		this._skipOpenSuggestions = false;
		this._valueHelpIconPressed = false;
	}

	valueHelpPress() {
		this.closeValueStatePopover();
		this.fireEvent("value-help-trigger");
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
			this.fireEvent<MultiInputTokenDeleteEventDetail>("token-delete", { token });
		});
	}

	valueHelpMouseDown(e: MouseEvent) {
		const target = e.target as Icon;
		this.closeValueStatePopover();
		this.tokenizer.open = false;
		this._valueHelpIconPressed = true;
		target.focus();
	}

	_tokenizerFocusOut(e: FocusEvent) {
		if (!this.contains(e.relatedTarget as HTMLElement) && !this.shadowRoot!.contains(e.relatedTarget as HTMLElement)) {
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
		this.tokenizer.expanded = true;
		this.focused = true;
		this.tokenizer.scrollToEnd();

		this.tokens.forEach(token => {
			token.selected = false;
		});
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);

		const target = e.target as HTMLInputElement;
		const isHomeInBeginning = isHome(e) && target.selectionStart === 0;

		if (isHomeInBeginning) {
			this._skipOpenSuggestions = true; // Prevent input focus when navigating through the tokens
			return this._focusFirstToken(e);
		}

		if (isLeft(e)) {
			this._skipOpenSuggestions = true;
			return this._handleLeft(e);
		}

		if (isBackSpace(e)) {
			this._skipOpenSuggestions = true;
			return this._handleBackspace(e);
		}

		this._skipOpenSuggestions = false;

		if (isShow(e)) {
			this.valueHelpPress();
		}
	}

	_onTokenizerKeydown(e: KeyboardEvent) {
		const rightCtrl = isRightCtrl(e);
		if (isRight(e) || isDown(e) || isEnd(e) || rightCtrl) {
			e.preventDefault();
			const lastTokenIndex = this.tokens.length - 1;

			if (e.target === this.tokens[lastTokenIndex] && this.tokens[lastTokenIndex] === document.activeElement) {
				setTimeout(() => {
					this.focus();
				}, 0);
			}
		}
	}

	_handleLeft(e: KeyboardEvent) {
		const cursorPosition = this.getDomRef()!.querySelector(`input`)!.selectionStart;
		const tokens = this.tokens;
		const lastToken = tokens.length && tokens[tokens.length - 1];

		// selectionStart property applies only to inputs of types text, search, URL, tel, and password
		if (((cursorPosition === null && !this.value) || cursorPosition === 0) && lastToken) {
			e.preventDefault();
			lastToken.focus();
			this.tokenizer._itemNav.setCurrentItem(lastToken);
		}
	}

	_handleBackspace(e: KeyboardEvent) {
		const cursorPosition = this.getDomRef()!.querySelector(`input`)!.selectionStart;
		const selectionEnd = this.getDomRef()!.querySelector(`input`)!.selectionEnd;
		const isValueSelected = cursorPosition === 0 && selectionEnd === this.value.length;
		const tokens = this.tokens;
		const lastToken = tokens.length && tokens[tokens.length - 1];

		// selectionStart property applies only to inputs of types text, search, URL, tel, and password
		if ((!this.value || (this.value && cursorPosition === 0 && !isValueSelected)) && lastToken) {
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
			this.tokenizer.expanded = false;
		}
	}

	/**
	 * @override
	 */
	_onfocusin(e: FocusEvent) {
		const inputDomRef = this.getInputDOMRef();

		if (e.target === inputDomRef) {
			super._onfocusin(e);
		}
	}

	lastItemDeleted() {
		setTimeout(() => {
			this.focus();
		}, 0);
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
		this.tokenizerAvailable = this.tokens && this.tokens.length > 0;
	}

	onAfterRendering() {
		super.onAfterRendering();

		this.tokenizer.preventInitialFocus = true;

		if (this.tokenizer.expanded) {
			this.tokenizer.scrollToEnd();
		} else {
			this.tokenizer.scrollToStart();
		}
	}

	get iconsCount() {
		return super.iconsCount + (this.showValueHelpIcon ? 1 : 0);
	}

	get tokenizer() {
		return this.shadowRoot!.querySelector<Tokenizer>("[ui5-tokenizer]")!;
	}

	get tokenizerExpanded() {
		return this.tokenizer && this.tokenizer.expanded;
	}

	get _tokensCountText() {
		if (!this.tokenizer) {
			return;
		}
		return this.tokenizer._tokensCountText();
	}

	get _tokensCountTextId() {
		return `hiddenText-nMore`;
	}

	/**
	 * Returns the placeholder value when there are no tokens.
	 * @protected
	 */
	get _placeholder() {
		if (this.tokens.length) {
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

	get morePopoverOpener(): HTMLElement {
		if (this.tokens.length === 1 && this.tokens[0].isTruncatable) {
			return this.tokens[0];
		}

		return this;
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.readonly && !this.open && this.focused && !this.tokenizer.open;
	}
}

MultiInput.define();

export default MultiInput;
export type {
	IToken,
	MultiInputTokenDeleteEventDetail,
	MultiInputSelectionChangeEventDetail,
};
