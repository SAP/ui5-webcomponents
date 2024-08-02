import AccessorBase from "./AccessorBase.js";
import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import litRender, { html } from "../../src/renderer/LitRenderer.js";

@customElement({
	tag: "ui5-test-accessor",
	renderer: litRender,
})
class Accessor extends AccessorBase {
	@property()
	// @ts-ignore
	title?: string;

	render() {
		return html`<div>${this.myProp}</div>`;
	}
}

Accessor.define();

export default Accessor;
