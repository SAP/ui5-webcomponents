import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import CardTemplate from "./generated/templates/CardTemplate.lit.js";
import Icon from "./Icon.js";

import {
	ARIA_ROLEDESCRIPTION_CARD,
	AVATAR_TOOLTIP,
	ARIA_LABEL_CARD_CONTENT,
	ARIA_ROLEDESCRIPTION_CARD_HEADER,
	ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import cardCss from "./generated/themes/Card.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-card",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Defines the content of the <code>ui5-card</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "content",
			type: HTMLElement,
		},

		/**
		 * Defines the visual representation in the header of the card.
		 * Supports images and icons.
		 * <b>Note:</b>
		 * SAP-icons font provides numerous options. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		avatar: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Defines the title displayed in the <code>ui5-card</code> header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the subheading displayed in the <code>ui5-card</code> header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		subheading: {
			type: String,
		},

		/**
		 * Defines the status displayed in the <code>ui5-card</code> header.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		status: {
			type: String,
		},

		/**
		 * Defines if the <code>ui5-card</code> header would be interactive,
		 * e.g gets hover effect, gets focused and <code>headerPress</code> event is fired, when it is pressed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		headerInteractive: {
			type: Boolean,
		},

		_headerActive: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Fired when the <code>ui5-card</code> header is activated
		 * by mouse/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event would be fired only if the <code>headerInteractive</code> property is set to true.
		 * @event
		 * @public
		 * @since 0.10.0
		 */
		headerClick: {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card</code> is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a <code>ui5-card</code> can be arbitrary HTML content.
 * The header can be used through several properties, such as:
 * <code>heading</code>, <code>subheading</code>, <code>status</code>
 * and a slot:
 * <code>avatar</code>.
 *
 * <h3>Keyboard handling</h3>
 * In case you enable <code>headerInteractive</code> property, you can press the <code>ui5-card</code> header by Space and Enter keys.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Card";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Card
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-card
 * @public
 */
class Card extends UI5Element {
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
		return CardTemplate;
	}

	static get styles() {
		return cardCss;
	}

	get classes() {
		return {
			main: {
				"ui5-card-root": true,
				"ui5-card--nocontent": !this.content.length,
			},
			header: {
				"ui5-card-header": true,
				"ui5-card-header--interactive": this.headerInteractive,
				"ui5-card-header--active": this.headerInteractive && this._headerActive,
			},
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

	get hasHeader() {
		return !!(this.heading || this.subheading || this.status || this.avatar);
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	get ariaCardRoleDescription() {
		return this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD);
	}

	get ariaCardHeaderRoleDescription() {
		return this.headerInteractive ? this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : this.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
	}

	get ariaCardAvatarLabel() {
		return this.i18nBundle.getText(AVATAR_TOOLTIP);
	}

	get ariaCardContentLabel() {
		return this.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
	}

	get hasAvatar() {
		return !!this.avatar.length;
	}

	static async onDefine() {
		await Promise.all([
			Icon.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	_headerClick() {
		if (this.headerInteractive) {
			this.fireEvent("headerClick");
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
			this.fireEvent("headerClick");
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
			this.fireEvent("headerClick");
		}
	}
}

Card.define();

export default Card;
