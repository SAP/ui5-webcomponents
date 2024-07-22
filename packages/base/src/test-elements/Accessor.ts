import AccessorBase from "./AccessorBase.js";
import customElement from "../decorators/customElement.js";
import property from "../decorators/property.js";
import litRender, { html } from "../renderer/LitRenderer.js";

@customElement({
	tag: "ui5-test-accessor",
	renderer: litRender,
})
class Accessor extends AccessorBase {
	@property()
	title?: string;

	render() {
		return html`<div>${this.myProp}</div>`;
	}
}

Accessor.define();

export default Accessor;
