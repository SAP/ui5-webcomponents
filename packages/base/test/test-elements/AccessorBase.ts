import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import litRender, { html } from "../../src/renderer/LitRenderer.js";

@customElement({
	renderer: litRender,
})
class AccessorBase extends UI5Element {
	storage: boolean = false;

	@property({ type: Boolean })
	set myProp(value: boolean) {
		this.storage = value;
	}

	get myProp() {
		return this.storage;
	}

	render() {
		return html`<div>${this.myProp}</div>`;
	}
}

export default AccessorBase;
