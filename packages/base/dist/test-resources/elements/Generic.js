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
		},
		multiProp: {
			type: String,
			multiple: true,
		},
		defaultValueProp: {
			type: String,
			defaultValue: "Hello",
		}
	},
	managedSlots: true,
	slots: {
		default: {
			type: Node,
		},
		other: {
			type: HTMLElement,
		},
		individual: {
			type: HTMLElement,
			individualSlots: true,
		},
		named: {
			type: HTMLElement,
			propertyName: "items",
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
			return html`<div><p>
				<slot></slot>
				<slot name="other"></slot>
				<slot name="individual-1"></slot>
				<slot name="individual-2"></slot>
			</p></div>`;
		};
	}

	static get styles() {
		return `:host {
                    display: inline-block;
                    border: 1px solid black;
                    color: var(--var1);
                }`;
	}

	onBeforeRendering() {}
	onAfterRendering() {}
	onEnterDOM() {}
	onExitDOM() {}
}

Generic.define();

export default Generic;
