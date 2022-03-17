import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

// Templates
import ComboBoxNewItemTemplate from "./generated/templates/ComboBoxNewItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-cb-new-item",
	properties: /** @lends  sap.ui.webcomponents.main.ComboBoxNewItem.prototype */ {
		/**
		 * Defines the text of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: { type: String },
		/**
		 * Defines the additional text of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.11
		 * @public
		 */
		additionalText: { type: String },
	},
	slots: {
		"default": {
			type: Node,
		},
	},
};

/**
 * @class
 * The <code>ui5-cb-new-item</code> represents the item for a <code>ui5-combobox-new</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ComboBoxNewItem
 * @extends UI5Element
 * @tagname ui5-cb-item
 * @implements sap.ui.webcomponents.main.IComboBoxNewItem
 * @public
 */
class ComboBoxNewItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return ComboBoxNewItemTemplate;
	}

	// DEFAULT IMPLEMENTATION - can be overridden
	getEffectiveValue() {
		return this.textContent.toLowerCase().trim();
	}
}

ComboBoxNewItem.define();

export default ComboBoxNewItem;
