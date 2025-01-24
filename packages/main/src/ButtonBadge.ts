import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type BadgeDesign from "./types/BadgeDesign.js";

/**
 * @class
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ButtonBadge.js";`
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-button-badge",
})
class ButtonBadge extends UI5Element {
	/**
	 * @public
	*/
	@property()
	design: `${BadgeDesign}` = "AttentionDot";

	/**
	 * @public
	*/
	@property()
	text: string = "";
}

ButtonBadge.define();

export default ButtonBadge;
