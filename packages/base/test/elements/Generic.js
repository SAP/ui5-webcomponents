import UI5Element from "../../UI5Element.js";
import litRender, { html } from "../../renderer/LitRenderer.js";

const metadata = {
	tag: "ui5-test-generic",
	properties: {
		strProp: {
			type: String,
		},
		boolProp: {
			type: Boolean,
		},
		objectProp: {
			type: Object,
		},
		noAttributeProp: {
			type: String,
			noAttribute: true,
		}
	},
	slots: {
		default: {
			type: Node,
		}
	}
};

class Generic extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			return html`<div><p><slot></slot></p></div>`;
		};
	}

	static get styles() {
		return `:host {
                    display: inline-block;
                    border: 1px solid black;
                }`;
	}

	onBeforeRendering() {}
	onAfterRendering() {}
	onEnterDOM() {}
	onExitDOM() {}
}

Generic.define();
