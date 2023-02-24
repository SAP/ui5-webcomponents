import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {
	isBackSpace,
	isSpace,
	isDelete,
	isSpaceCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/sys-cancel.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { TOKEN_ARIA_DELETABLE } from "./generated/i18n/i18n-defaults.js";

import Icon from "./Icon.js";
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
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Token.js";</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Token
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-token
 * @since 1.0.0-rc.9
 * @implements sap.ui.webc.main.IToken
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
 *
 * @event sap.ui.webc.main.Token#select
 * @public
 */
@event("select")

/**
 * Fired when the backspace, delete or close icon of the token is pressed
 *
 * @event
 * @param {Boolean} backSpace Indicates whether token is deleted by backspace key.
 * @param {Boolean} delete Indicates whether token is deleted by delete key.
 * @private
 */
@event("delete", {
	detail: {
		"backSpace": { type: Boolean },
		"delete": { type: Boolean },
	},
})

class Token extends UI5Element implements ITabbable {
	/**
	 * Defines the text of the token.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Token.prototype.text
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines whether the component is read-only.
	 * <br><br>
	 * <b>Note:</b> A read-only component can not be deleted or selected,
	 * but still provides visual feedback upon user interaction.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Token.prototype.readonly
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Defines whether the component is selected or not.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Token.prototype.selected
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Set by the tokenizer when a token is in the "more" area (overflowing)
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	overflows!: boolean;

	/**
	 * Defines whether the component is focused or not.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Defines whether the token is being deleted
	 * This flag is used in the ui5-multi-combobox
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	toBeDeleted!: boolean;

	/**
	 * Defines the tabIndex of the component.
	 * @type {string}
	 * @private
	 */
	@property({ defaultValue: "-1", noAttribute: true })
	_tabIndex!: string;

	/**
	 * Defines the close icon for the token. If nothing is provided to this slot, the default close icon will be used.
	 * Accepts <code>ui5-icon</code>.
	 *
	 * @type {sap.ui.webc.main.IIcon[]}
	 * @name sap.ui.webc.main.Token.prototype.closeIcon
	 * @slot closeIcon
	 * @public
	 * @since 1.0.0-rc.9
	 */
	@slot()
	closeIcon!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;

	_handleSelect() {
		this.selected = !this.selected;
		this.fireEvent("select");
	}

	_focusin() {
		this.focused = true;
	}

	_focusout() {
		this.focused = !this.focused;
	}

	_mousedown() {
		this.toBeDeleted = true;
	}

	_delete() {
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

	get iconURI() {
		if (getTheme().includes("sap_belize")) {
			return "sys-cancel";
		}

		return "decline";
	}

	static async onDefine() {
		Token.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Token.define();

export default Token;
export type { TokenDeleteEventDetail };
