import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	renderer: jsxRenderer,
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
		return (
			<div>{this.myProp}</div>
		);
	}
}

export default AccessorBase;
