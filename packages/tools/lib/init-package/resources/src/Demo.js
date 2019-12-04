import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DemoTemplate from "./generated/templates/DemoTemplate.lit.js";

// Styles
import DemoCss from "./generated/themes/Demo.css.js";


const metadata = {
	tag: "ui5-demo",
	properties: {
		//
	},
	slots: {
		//
	},
	events: {
		//
	},
};

class Demo extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return DemoCss;
	}

	static get template() {
		return DemoTemplate;
	}

	static async define(...params) {
		super.define(...params);
	}
}

Demo.define();

export default Demo;
