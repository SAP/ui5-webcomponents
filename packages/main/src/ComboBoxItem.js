import UI5MinimalElement from "@ui5/webcomponents-base/dist/UI5MinimalElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ComboBoxItemTemplate from "./generated/templates/ComboBoxItemTemplate.lit.js";

// Styles
import ComboBoxItemCss from "./generated/themes/ComboBoxItem.css.js";


const metadata = {
	tag: "ui5-combobox-item",
	properties: {
		text: { type: String },
	},
	slots: {
		//
	},
	events: {
		//
	},
};

class ComboBoxItem extends UI5MinimalElement {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ComboBoxItemCss;
	}

	static get template() {
		return ComboBoxItemTemplate;
	}
}

ComboBoxItem.define();

export default ComboBoxItem;
