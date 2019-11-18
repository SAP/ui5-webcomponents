import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MessageToastTemplate from "./generated/templates/MessageToastTemplate.lit.js";

// Styles
import MessageToastCss from "./generated/themes/MessageToast.css.js";


const metadata = {
	tag: "ui5-messagetoast",
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

class MessageToast extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return MessageToastCss;
	}

	static get template() {
		return MessageToastTemplate;
	}

	static async define(...params) {
		super.define(...params);
	}
}

MessageToast.define();

export default MessageToast;
