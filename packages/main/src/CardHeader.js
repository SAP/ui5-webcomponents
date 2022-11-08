import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CardHeaderTemplate from "./generated/templates/CardHeaderTemplate.lit.js";

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

		/**
		 * Defines an avatar image, displayed in the left most part of the header.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		avatar: {
			type: HTMLElement,
		},

		/**
		 * Defines an action, displayed in the right most part of the header.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		action: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.CardHeader.prototype */ {

		/**
		 * Defines the title text.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		titleText: {
			type: String,
		},

		/**
		 * Defines the subtitle text.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		subtitleText: {
			type: String,
		},

		/**
		 * Defines the status text.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		status: {
			type: String,
		},

		/**
		 * Defines if the component would be interactive,
		 * e.g gets hover effect, gets focus outline and <code>click</code> event is fired, when pressed.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		interactive: {
			type: Boolean,
		},

		/**
		 * Define the <code>aria-level</code> attribute of the component
		 * <b>Note: </b> If the interactive property is set, <code>aria-level</code> attribute is not rendered at all.
		 * @private
		 * @type {sap.ui.webcomponents.base.types.Integer}
		 * @defaultValue 3
		 */
		ariaLevel: {
			type: Integer,
			defaultValue: 3,
		},

		_headerActive: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.CardHeader.prototype */ {

		/**
		 * Fired when the component is activated by mouse/tap or by using the Enter or Space key.
		 * <br><br>
		 * <b>Note:</b> The event would be fired only if the <code>interactive</code> property is set to true.
		 * @event sap.ui.webcomponents.main.CardHeader#click
		 * @public
		 */
		"click": {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card-header</code> is a component, meant to be used as a header of the <code>ui5-card</code> component.
 * It displays valuable information, that can be defined with several properties, such as: <code>titleText</code>, <code>subtitleText</code>, <code>status</code>
 * and two slots: <code>avatar</code> and <code>action</code>.
 *
 * <h3>Keyboard handling</h3>
 * In case you enable <code>interactive</code> property, you can press the <code>ui5-card-header</code> by Space and Enter keys.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-card</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the root DOM element of the CardHeader</li>
 * <li>title - Used to style the title of the CardHeader</li>
 * <li>subtitle - Used to style the subtitle of the CardHeader</li>
 * <li>status - Used to style the status of the CardHeader</li>
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
 * @public
 * @since 1.0.0-rc.15
 */
class CardHeader extends UI5Element {
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
			"ui5-card-header--interactive": this.interactive,
			"ui5-card-header--active": this.interactive && this._headerActive,
		};
	}

	get _root() {
		return this.shadowRoot.querySelector(".ui5-card-header");
	}

	get ariaRoleDescription() {
		return this.interactive ? CardHeader.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : CardHeader.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
	}

	get ariaRoleFocusableElement() {
		return this.interactive ? "button" : null;
	}

	get ariaCardAvatarLabel() {
		return CardHeader.i18nBundle.getText(AVATAR_TOOLTIP);
	}

	get ariaLabelledBy() {
		const labels = [];

		if (this.titleText) {
			labels.push(`${this._id}-title`);
		}

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

	static async onDefine() {
		CardHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_actionsFocusin() {
		this._root.classList.add("ui5-card-header-hide-focus");
	}

	_actionsFocusout() {
		this._root.classList.remove("ui5-card-header-hide-focus");
	}

	_click(event) {
		// prevents the native browser "click" event from firing
		event.stopImmediatePropagation();

		if (this.interactive && this._root.contains(event.target)) {
			this.fireEvent("click");
		}
	}

	_keydown(event) {
		if (!this.interactive || !this._root.contains(event.target)) {
			return;
		}

		const enter = isEnter(event);
		const space = isSpace(event);

		this._headerActive = enter || space;

		if (enter) {
			this.fireEvent("click");
			return;
		}

		if (space) {
			event.preventDefault();
		}
	}

	_keyup(event) {
		if (!this.interactive || !this._root.contains(event.target)) {
			return;
		}

		const space = isSpace(event);

		this._headerActive = false;

		if (space) {
			this.fireEvent("click");
		}
	}
}

CardHeader.define();

export default CardHeader;
