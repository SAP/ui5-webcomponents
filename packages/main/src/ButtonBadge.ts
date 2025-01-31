import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type BadgeDesign from "./types/ButtonBadgeDesign.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ButtonBadgeTemplate from "./ButtonBadgeTemplate.js";

// Styles
import buttonBadgeCss from "./generated/themes/ButtonBadge.css.js";

/**
 * @class
 *
 * The `ui5-button-badge` component defines a badge that appears in the `ui5-button`.
 *
 *  * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ButtonBadge.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.7.0
 * @public
 */
@customElement({
	tag: "ui5-button-badge",
	renderer: jsxRenderer,
	template: ButtonBadgeTemplate,
	styles: buttonBadgeCss,
})
class ButtonBadge extends UI5Element {
	/**
     * Determines where the badge should be placed and how it should be styled.
     * @since 2.7.0
	 * @public
	*/
	@property()
	design: `${BadgeDesign}` = "AttentionDot";

	/**
     * Defines the text of the component.
	 *
	 * **Note:** Text is not needed when the `design` property is set to `AttentionDot`.
     * @since 2.7.0
	 * @public
	*/
	@property()
	text: string = "";
}

ButtonBadge.define();

export default ButtonBadge;
