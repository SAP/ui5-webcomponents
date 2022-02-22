import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import CardTemplate from "./generated/templates/CardTemplate.lit.js";
import Icon from "./Icon.js";

import {
	ARIA_ROLEDESCRIPTION_CARD,
	ARIA_LABEL_CARD_CONTENT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import cardCss from "./generated/themes/Card.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-card",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Defines the content of the component.
		 * @type {HTMLElement[]}
		 * @slot content
		 * @public
		 */
		"default": {
			propertyName: "content",
			type: HTMLElement,
		},

		/**
		 * Defines the header of the component.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-card-header</code> for the intended design.
		 * @type {HTMLElement[]}
		 * @since 1.0.0-rc.15
		 * @slot content
		 * @public
		 */
		header: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

		/**
		 * Defines the accessible name of the component, which is used as the name of the card region and should be unique per card.
		 * <b>Note:</b> <code>accessibleName</code> should be always set, unless <code>accessibleNameRef</code> is set.
		 *
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.16
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines the IDs of the elements that label the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.16
		 */
		accessibleNameRef: {
			type: String,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Card.prototype */ {

	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card</code> is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a <code>ui5-card</code> can be arbitrary HTML content.
 * The header can be used through slot <code>header</code>. For which there is a <code>ui5-card-header</code> component to achieve the card look and fill.
 *
 * Note: We recommend the usage of <code>ui5-card-header</code> for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Card";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/CardHeader.js";</code> (for <code>ui5-card-header</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Card
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-card
 * @public
 * @appenddocs CardHeader
 */
class Card extends UI5Element {
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
			"ui5-card-root": true,
			"ui5-card--nocontent": !this.content.length,
		};
	}

	get _hasHeader() {
		return !!this.header.length;
	}

	get _getAriaLabel() {
		const effectiveAriaLabelText = getEffectiveAriaLabelText(this),
			effectiveAriaLabel = effectiveAriaLabelText ? ` ${effectiveAriaLabelText}` : "";
		return Card.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD) + effectiveAriaLabel;
	}

	get _ariaCardContentLabel() {
		return Card.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
	}

	static get dependencies() {
		return [Icon];
	}

	static async onDefine() {
		Card.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Card.define();

export default Card;
