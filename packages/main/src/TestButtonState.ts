import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement("test-button-state")
class ButtonState extends UI5Element {
	@property()
	name?: string;

	@property()
	text?: string;

	@property()
	icon?: string;

	@property()
	endIcon?: string;

	@property({ type: Boolean })
	showArrowButton = false;
}

ButtonState.define();
export default ButtonState;
