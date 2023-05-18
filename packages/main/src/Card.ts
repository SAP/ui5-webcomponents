import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import CardTemplate from "./generated/templates/CardTemplate.lit.js";
import Icon from "./Icon.js";
import type CardHeader from "./CardHeader.js";

import {
	ARIA_ROLEDESCRIPTION_CARD,
	ARIA_LABEL_CARD_CONTENT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import cardCss from "./generated/themes/Card.css.js";

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card</code> is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a <code>ui5-card</code> can be arbitrary HTML content.
 * The header can be used through slot <code>header</code>. For which there is a <code>ui5-card-header</code> component to achieve the card look and feel.
 *
 * Note: We recommend the usage of <code>ui5-card-header</code> for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Card";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/CardHeader.js";</code> (for <code>ui5-card-header</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Card
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-card
 * @public
 * @appenddocs sap.ui.webc.main.CardHeader
 */
@customElement({
	tag: "ui5-card",
	languageAware: true,
	renderer: litRender,
	template: CardTemplate,
	styles: cardCss,
	dependencies: [Icon],
})
class Card extends UI5Element {
	/**
	 * Defines the accessible name of the component, which is used as the name of the card region and should be unique per card.
	 * <b>Note:</b> <code>accessibleName</code> should be always set, unless <code>accessibleNameRef</code> is set.
	 *
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.Card.prototype.accessibleName
	 * @public
	 * @since 1.0.0-rc.16
	*/
	@property()
	accessibleName!: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.Card.prototype.accessibleNameRef
	 * @public
	 * @since 1.0.0-rc.16
	*/
	@property()
	accessibleNameRef!: string;

	/**
	 * Defines the content of the component.
	 * @type {HTMLElement[]}
	 * @slot content
	 * @name sap.ui.webc.main.Card.prototype.default
	 * @public
	*/
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the header of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-card-header</code> for the intended design.
	 * @type {sap.ui.webc.main.ICardHeader[]}
	 * @since 1.0.0-rc.15
	 * @slot header
	 * @name sap.ui.webc.main.Card.prototype.header
	 * @public
	*/
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	header!: Array<CardHeader>;

	static i18nBundle: I18nBundle;

	get classes() {
		return {
			root: {
				"ui5-card-root": true,
				"ui5-card--interactive": this._hasHeader && this.header[0].interactive,
				"ui5-card--nocontent": !this.content.length,
			},
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

	static async onDefine() {
		Card.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Card.define();

export default Card;
