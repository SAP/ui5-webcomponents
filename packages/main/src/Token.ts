import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isBackSpace,
	isSpace,
	isDelete,
	isSpaceCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/sys-cancel.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { TOKEN_ARIA_DELETABLE, TOKEN_ARIA_LABEL } from "./generated/i18n/i18n-defaults.js";

import Icon from "./Icon.js";
import type { IIcon } from "./Icon.js";
import type { IToken } from "./MultiInput.js";
import TokenTemplate from "./generated/templates/TokenTemplate.lit.js";

// Styles
import tokenStyles from "./generated/themes/Token.css.js";

type TokenDeleteEventDetail = {
	backSpace: boolean;
	delete: boolean;
}

/**
 * @class
 *
 * ### Overview
 *
 * Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Token.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.9
 * @implements {IToken}
 * @public
 */
@customElement({
	tag: "ui5-token",
	languageAware: true,
	renderer: litRender,
	template: TokenTemplate,
	styles: tokenStyles,
	dependencies: [Icon],
})

/**
 * Fired when the the component is selected by user interaction with mouse or by clicking space.
 * @private
 */
@event("select")

/**
 * Fired when the backspace, delete or close icon of the token is pressed
 * @param {Boolean} backSpace Indicates whether token is deleted by backspace key.
 * @param {Boolean} delete Indicates whether token is deleted by delete key.
 * @private
 */
@event<TokenDeleteEventDetail>("delete", {
	detail: {
		"backSpace": { type: Boolean },
		"delete": { type: Boolean },
	},
})

class Token extends UI5Element implements IToken {
	/**
	 * Defines the text of the token.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines whether the component is selected or not.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component can not be deleted or selected,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Set by the tokenizer when a token is in the "more" area (overflowing)
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	overflows!: boolean;

	@property({ type: Boolean })
	singleToken!: boolean;

	/**
	 * Defines whether the component is focused or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Defines whether the token is being deleted
	 * This flag is used in the ui5-multi-combobox
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	toBeDeleted!: boolean;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	/**
	 * Indicates whether the token is visible or not.
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isVisible!: boolean;

	/**
	 * Defines the close icon for the token. If nothing is provided to this slot, the default close icon will be used.
	 * Accepts `ui5-icon`.
	 * @public
	 * @since 1.0.0-rc.9
	 */
	@slot()
	closeIcon!: Array<IIcon>;

	static i18nBundle: I18nBundle;

	_handleSelect() {
		if (!this.toBeDeleted) {
			this.selected = !this.selected;
			this.fireEvent("select");
		}
	}

	_focusin() {
		this.focused = true;
	}

	_focusout() {
		this.focused = !this.focused;
	}

	_delete() {
		this.toBeDeleted = true;
		this.fireEvent("delete");
	}

	_keydown(e: KeyboardEvent) {
		const isBackSpacePressed = isBackSpace(e);
		const isDeletePressed = isDelete(e);

		if (!this.readonly && (isBackSpacePressed || isDeletePressed)) {
			e.preventDefault();

			this.fireEvent<TokenDeleteEventDetail>("delete", {
				backSpace: isBackSpacePressed,
				"delete": isDeletePressed,
			});
		}

		if (isSpace(e) || isSpaceCtrl(e)) {
			e.preventDefault();

			this._handleSelect();
		}
	}

	onBeforeRendering() {
		this.toBeDeleted = false;
	}

	get tokenDeletableText() {
		return Token.i18nBundle.getText(TOKEN_ARIA_DELETABLE);
	}

	get textDom() {
		return this.getDomRef()?.querySelector(".ui5-token--text");
	}

	get isTruncatable() {
		if (!this.textDom) {
			return false;
		}

		return Math.ceil(this.textDom.getBoundingClientRect().width) < Math.ceil(this.textDom.scrollWidth);
	}

	get ariaDescription() {
		let description = Token.i18nBundle.getText(TOKEN_ARIA_LABEL);

		if (!this.readonly) {
			description += ` ${Token.i18nBundle.getText(TOKEN_ARIA_DELETABLE)}`;
		}

		return description;
	}

	static async onDefine() {
		Token.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Token.define();

export default Token;
export type { TokenDeleteEventDetail };
