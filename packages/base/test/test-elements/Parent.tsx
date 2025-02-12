import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import slot from "../../src/decorators/slot.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	tag: "ui5-test-parent",
	renderer: jsxRenderer,
})
class Parent extends UI5Element {
	@slot({
		type: Node,
		"default": true,
		invalidateOnChildChange: {
			properties: ["prop1"],
			slots: false,
		},
	})
	content!: Array<Node>;

	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	items!: Array<HTMLElement>;

	static get template() {
		return () => <div>
				<slot></slot>
			</div>;
		};
}

Parent.define();

export default Parent;
