import UI5Element from "../../../UI5Element.js";
import customElement from "../../../decorators/customElement.js";
import property from "../../../decorators/property.js";
import litRender, { html } from "../../../renderer/LitRenderer.js";

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

AccessorBase.define();

export default AccessorBase;
