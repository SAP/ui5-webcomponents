import UI5Element from "../../src/UI5Element.ts";
import litRender, { html } from "../../src/renderer/LitRenderer.ts";

const metadata = {
	tag: "ui5-test-parent",
	managedSlots: true,
	slots: {
		default: {
			type: Node,
			invalidateOnChildChange: {
				properties: ["prop1"]
			},
		},
		items: {
			type: HTMLElement,
			invalidateOnChildChange: {
				properties: true
			},
		}
	}
};

class Parent extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return litRender;
	}

	static get template() {
		return element => {
			return html`<div>
				<slot></slot>
			</div>`;
		};
	}
}

Parent.define();
