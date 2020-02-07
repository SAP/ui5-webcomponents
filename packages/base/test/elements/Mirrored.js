import UI5Element from "../../UI5Element.js";
import litRender, { html } from "../../renderer/LitRenderer.js";

const metadata = {
	tag: "ui5-test-mirrored",
	slots: {
		default: {
			type: Node,
			mirrored: true,
		},
		items: {
			type: HTMLElement,
		}
	}
};

class Parent extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			return html`<div style="border: 1px solid red;">
				<span>NORMAL SHADOW ROOT</span>
				<slot name="items"></slot>
			</div>`;
		};
	}

	static get staticAreaTemplate() {
		return element => {
			return html`<div style="border: 1px solid blue;">
				<span>STATIC SHADOW ROOT</span>
				<slot></slot>
			</div>`;
		};
	}
}

Parent.define();
