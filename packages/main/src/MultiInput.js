import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
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
		 * Determines whether a value help icon will be should in the end of the input.
		 * Pressing the icon will fire <code>value-help-icon-press</code> event.
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
	slots: /** @lends  sap.ui.webcomponents.main.MultiInput.prototype */ {
		/**
		 * Defines the <code>ui5-multi-input</code> tokens.
		 * <br><br>
		 * Example: <br>
		 * &lt;ui5-multi-input><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-token slot="tokens" text="Token 1">&lt;/ui5-token><br>
		 * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-token slot="tokens" text="Token 2">&lt;/ui5-token><br>
		 * &lt;/ui5-multi-input>
		 * <br> <br>
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		tokens: {
			type: HTMLElement,
			multiple: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.MultiInput.prototype */ {
		/**
		 * Fired when value state icon is pressed.
		 *
		 * @event sap.ui.webcomponents.main.MultiInput#value-help-icon-press
		 * @public
		 */
		"value-help-icon-press": {},
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

	valueHelpPress(event) {
		this.closePopover();
		this.fireEvent("value-help-icon-press", {});
	}

	showMorePress(event) {
		this.expandedTokenizer = false;
		this.focus();
	}

	tokenDelete(event) {
		this.fireEvent("token-delete", {
			token: event.detail.ref,
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
	}

	_onfocusout(event) {
		super._onfocusout(event);
		const relatedTarget = event.relatedTarget;
		const insideDOM = this.contains(relatedTarget);
		const insideShadowDom = this.shadowRoot.contains(relatedTarget);

		if (!insideDOM && !insideShadowDom) {
			this.expandedTokenizer = false;
		}
	}

	shouldOpenSuggestions() {
		const parent = super.shouldOpenSuggestions();
		const valueHelpPressed = this._valueHelpIconPressed;
		const nonEmptyValue = this.value !== "";

		return parent && nonEmptyValue && !valueHelpPressed;
	}

	lastItemDeleted() {
		setTimeout(() => {
			this.focus();
		}, 0);
	}

	get tokenizer() {
		return this.shadowRoot.querySelector("ui5-tokenizer");
	}

	static async onDefine() {
		await Promise.all([
			Tokenizer.define(),
			Token.define(),
			Icon.define(),
		]);
	}
}

MultiInput.define();

export default MultiInput;
