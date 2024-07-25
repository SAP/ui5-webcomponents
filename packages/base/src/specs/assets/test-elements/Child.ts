import UI5Element from "../../../UI5Element.js";
import customElement from "../../../decorators/customElement.js";
import property from "../../../decorators/property.js";
import litRender, { html } from "../../../renderer/LitRenderer.js";

@customElement({
	tag: "ui5-test-child",
	renderer: litRender,
})
class Child extends UI5Element {
	@property()
	prop1?: string;

	@property()
	prop2?: string;

	@property()
	prop3?: string;

	static get template() {
		return () => {
			return html`<div></div>`;
		};
	}
}

Child.define();
