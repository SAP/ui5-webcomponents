import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import CardHeaderTemplate from "./generated/templates/CardHeaderTemplate.lit.js";
import Icon from "./Icon.js";

import {
	AVATAR_TOOLTIP,
	ARIA_ROLEDESCRIPTION_CARD_HEADER,
	ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import cardHeaderCss from "./generated/themes/CardHeader.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-card-header",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.CardHeader.prototype */ {
		avatar: {
			type: HTMLElement,
		},

		/**
		 * Defines an action, displayed in the right most part of the header.
		 * <br><br>
		 * <b>Note:</b> If set, the <code>status</code> text will not be displayed,
		 * you can either have <code>action</code>, or <code>status</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 * @since 1.0.0-rc.15
		 */
		action: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.CardHeader.prototype */ {

		/**
		 * Defines the title displayed in the component header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		titleText: {
			type: String,
		},

		/**
		 * Defines the subtitle displayed in the component header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		subtitleText: {
			type: String,
		},

		/**
		 * Defines the status displayed in the component header.
		 * <br><br>
		 * <b>Note:</b> If the <code>action</code> slot is set, the <code>status</code> will not be displayed,
		 * you can either have <code>action</code>, or <code>status</code>.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		status: {
			type: String,
		},

		/**
		 * Defines if the component header would be interactive,
		 * e.g gets hover effect, gets focused and <code>headerPress</code> event is fired, when it is pressed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.15
		 */
		headerInteractive: {
			type: Boolean,
		},

		/**
		 * Defines the aria-label attribute for the component
		 *
		 * @type {String}
		 * @since 1.0.0-rc.15
		 * @private
		 * @defaultvalue ""
		 */
		ariaLabel: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the component
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.15
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		_headerActive: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.CardHeader.prototype */ {

		/**
		 * Fired when the header is activated
		 * by mouse/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event would be fired only if the <code>headerInteractive</code> property is set to true.
		 * @event sap.ui.webcomponents.main.CarHeader#header-click
		 * @public
		 * @since 1.0.0-rc.15
		 */
		"header-click": {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card-header</code> is a component that represents information in the header slot
 * of the <code>ui5-card</code> component.
 * The header can be used through several properties, such as: <code>titleText</code>, <code>subtitleText</code>, <code>status</code>
 * and two slots: <code>avatar</code> and <code>action</code>.
 *
 * <h3>Keyboard handling</h3>
 * In case you enable <code>headerInteractive</code> property, you can press the <code>ui5-card</code> header by Space and Enter keys.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-card</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the card</li>
 * <li>subtitle - Used to style the subtitle of the card</li>
 * <li>status - Used to style the status of the card</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CardHeader";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CardHeader
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-card-header
 * @appenddocs CardHeader
 * @public
 */
class CardHeader extends UI5Element {
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
		return CardHeaderTemplate;
	}

	static get styles() {
		return cardHeaderCss;
	}

	get classes() {
		return {
			"ui5-card-header": true,
			"ui5-card-header--interactive": this.headerInteractive,
			"ui5-card-header--active": this.headerInteractive && this._headerActive,
		};
	}

	get icon() {
		return !!this.avatar && this.avatar.startsWith("sap-icon://");
	}

	get image() {
		return !!this.avatar && !this.icon;
	}

	get ariaHeaderRole() {
		return this.headerInteractive ? "button" : "heading";
	}

	get ariaLevel() {
		return this.headerInteractive ? undefined : "3";
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get ariaCardHeaderRoleDescription() {
		return this.headerInteractive ? this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
	}

	get ariaCardAvatarLabel() {
		return this.i18nBundle.getText(AVATAR_TOOLTIP);
	}

	get ariaLabelledByHeader() {
		const labels = [];

		if (this.subtitleText) {
			labels.push(`${this._id}-subtitle`);
		}

		if (this.status) {
			labels.push(`${this._id}-status`);
		}

		if (this.hasAvatar) {
			labels.push(`${this._id}-avatar`);
		}

		return labels.length !== 0 ? labels.join(" ") : undefined;
	}

	get hasAvatar() {
		return !!this.avatar.length;
	}

	get hasAction() {
		return !!this.action.length;
	}

	static get dependencies() {
		return [Icon];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	_headerClick() {
		if (this.headerInteractive) {
			this.fireEvent("header-click");
		}
	}

	_headerKeydown(event) {
		if (!this.headerInteractive) {
			return;
		}

		const enter = isEnter(event);
		const space = isSpace(event);

		this._headerActive = enter || space;

		if (enter) {
			this.fireEvent("header-click");
			return;
		}

		if (space) {
			event.preventDefault();
		}
	}

	_headerKeyup(event) {
		if (!this.headerInteractive) {
			return;
		}

		const space = isSpace(event);

		this._headerActive = false;

		if (space) {
			this.fireEvent("header-click");
		}
	}
}

CardHeader.define();

export default CardHeader;
