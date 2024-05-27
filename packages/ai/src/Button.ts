import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Deps
import MainButton from "@ui5/webcomponents/dist/Button.js";

// Template
import template from "./generated/templates/ButtonTemplate.lit.js";

// Styles
import styles from "./generated/themes/Button.css.js";

/**
 * @class
 * @constructor
 * @extends UI5Element
 */
@customElement({
	tag: "ui5-ai-button",
	renderer: litRender,
	template,
	styles,
	dependencies: [MainButton],
})
class Button extends UI5Element {
	@property()
	icon!: string;

	@property()
	endIcon!: string;
}

Button.define();

export default Button;
