import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";

/**
 * @class
 * The <code>ui5-mcb-group-item</code> is type of suggestion item,
 * that can be used to split the <code>ui5-multi-combobox</code> suggestions into groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MultiComboBoxGroupItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-mcb-group-item
 * @public
 * @implements sap.ui.webc.main.IMultiComboBoxItem
 * @since 1.4.0
 */
@customElement("ui5-mcb-group-item")
class MultiComboBoxGroupItem extends UI5Element implements IMultiComboBoxItem {
	/**
	 * Defines the text of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.MultiComboBoxGroupItem.prototype.text
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Used to avoid tag name checks
	 * @protected
	 */
	get isGroupItem() {
		return true;
	}

	get selected() {
		return false;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

MultiComboBoxGroupItem.define();

export default MultiComboBoxGroupItem;
