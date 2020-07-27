import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ComboBoxItemTemplate from "./generated/templates/ComboBoxItemTemplate.lit.js";

// Styles
import ComboBoxItemCss from "./generated/themes/ComboBoxItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-cb-item",
	properties: /** @lends  sap.ui.webcomponents.main.ComboBoxItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-cb-item</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: { type: String },
	},
	slots: {
		//
	},
	events: {
		//
	},
};

/**
 * @class
 * The <code>ui5-cb-item</code> represents the item for a <code>ui5-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxItem
 * @extends UI5Element
 * @tagname ui5-cb-item
 * @public
 */
class ComboBoxItem extends UI5Element {
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
