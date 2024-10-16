import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import slot from "../../src/decorators/slot.js";
import litRender, { html } from "../../src/renderer/LitRenderer.js";

@customElement({
	tag: "ui5-test-parent",
	renderer: litRender,
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
		return () => {
			return html`<div>
				<slot></slot>
			</div>`;
		};
	}
}

Parent.define();
