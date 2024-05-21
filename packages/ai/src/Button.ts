import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
/**
 * @class
 * @constructor
 * @extends UI5Element
 */
@customElement({
	tag: "ui5-ai-button",
})
class Button extends UI5Element {
}

Button.define();

export default Button;
