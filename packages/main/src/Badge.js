import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import BadgeTemplate from "./generated/templates/BadgeTemplate.lit.js";

import { BADGE_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

// Styles
import badgeCss from "./generated/themes/Badge.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-badge",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.Badge.prototype */  {

		/**
		 * Defines the color scheme of the component.
		 * There are 10 predefined schemes. Each scheme applies different values for the <code>background-color</code> and <code>border-color</code>.
		 * To use one you can set a number from <code>"1"</code> to <code>"10"</code>. The <code>colorScheme</code> <code>"1"</code> will be set by default.
		 * <br><br>
		 * <b>Note:</b> Color schemes have no visual representation in High Contrast Black (sap_belize_hcb) theme.
		 * @type {string}
		 * @defaultvalue "1"
		 * @public
		 */
		colorScheme: {
			type: String,
			defaultValue: "1",
		},

		/**
		 * Defines if the badge has an icon.
		 * @private
		 */
		_hasIcon: {
			type: Boolean,
		},

		/**
		 * Defines if the badge has only an icon (and no text).
		 * @private
		 */
		_iconOnly: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Badge.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},

		/**
		 * Defines the icon to be displayed in the component.
		 *
		 * @type {sap.ui.webcomponents.main.IIcon}
		 * @slot
		 * @public
		 */
		icon: {
			type: HTMLElement,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-badge</code> is a small non-interactive component which contains text information and color chosen from a list of predefined color schemes.
 * It serves the purpose to attract the user attention to some piece of information (state, quantity, condition, etc.).
 *
 * <h3>Usage Guidelines</h3>
 * <ul>
 * <li>If the text is longer than the width of the component, it doesn’t wrap, it shows ellipsis.</li>
 * <li>When truncated, the full text is not visible, therefore, it’s recommended to make more space for longer texts to be fully displayed.</li>
 * <li>Colors are not semantic and have no visual representation in High Contrast Black (sap_belize_hcb) theme.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Badge";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Badge
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-badge
 * @since 0.12.0
 * @public
 */
class Badge extends UI5Element {
	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return BadgeTemplate;
	}

	static get styles() {
		return badgeCss;
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this._hasIcon = this.hasIcon;
		this._iconOnly = this.iconOnly;
	}

	get hasText() {
		return !!this.textContent.trim().length;
	}

	get hasIcon() {
		return !!this.icon.length;
	}

	get iconOnly() {
		return this.hasIcon && !this.hasText;
	}

	get badgeDescription() {
		return this.i18nBundle.getText(BADGE_DESCRIPTION);
	}
}

Badge.define();

export default Badge;
