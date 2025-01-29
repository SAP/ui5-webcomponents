import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type BadgeDesign from "./types/BadgeDesign.js";

/**
 * @class
 *
 * The `ui5-button-badge` component defines a badge that appears in the `ui5-button`.
 * `import "@ui5/webcomponents/dist/ButtonBadge.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 2.7.0
 * @public
 */
@customElement({
	tag: "ui5-button-badge",
})
class ButtonBadge extends UI5Element {
	/**
     * Determines where the badge should be placed.
     * @since 2.7.0
	 * @public
	*/
	@property()
	design: `${BadgeDesign}` = "AttentionDot";

	/**
     * Defines the text of the component.
     * @since 2.7.0
	 * @public
	*/
	@property()
	text: string = "";
}

ButtonBadge.define();

export default ButtonBadge;
