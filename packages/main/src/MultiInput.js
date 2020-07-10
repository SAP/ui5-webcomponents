import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import Input from "./Input.js";
import MultiInputTemplate from "./generated/templates/MultiInputTemplate.lit.js";
import styles from "./generated/themes/MultiInput.css.js";
import Token from "./Token.js";
import Tokenizer from "./Tokenizer.js";
import Icon from "./Icon.js";

const metadata = {
	tag: "ui5-multi-input",
	properties: {
		showValueHelpIcon: {
			type: Boolean,
		},
		expandedTokenizer: {
			type: Boolean,
		},

		morePopoverOpen: {
			type: Boolean,
		},
	},

	slots: {
		tokens: {
			type: Token,
			multiple: true,
		},
	},

	events: {
		"value-help-icon-press": {},
	},
};

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
		return [styles, Input.styles];
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

	_tokenizerFocusOut() {
		this.tokenizer.contentDom.scrollLeft = 0;
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

		if (!relatedTarget) {
			this.expandedTokenizer = false;
		}
	}

	shouldOpenSuggestions() {
		const parent = super.shouldOpenSuggestions();

		const valueHelpPressed = this._valueHelpIconPressed;

		return parent && !valueHelpPressed;
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
