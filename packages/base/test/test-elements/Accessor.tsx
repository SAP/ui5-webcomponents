import AccessorBase from "./AccessorBase.js";
import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	tag: "ui5-test-accessor",
	renderer: jsxRenderer,
})
class Accessor extends AccessorBase {
	@property()
	// @ts-ignore
	title: string;

	ala: string = "default";

	render() {
		return (
			<div>{`${this.myProp}`}</div>
		);
	}
}

Accessor.define();

export default Accessor;
