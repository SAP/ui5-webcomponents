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
			return html`<div><p></p></div>`;
		};
	}

	static get styles() {
		return `:host {
                    display: inline-block;
                    border: 1px solid black;
                }`;
	}
}

Generic.define();
