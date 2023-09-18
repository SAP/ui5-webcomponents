import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ComboBoxItem from "./ComboBoxItem.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";

/**
 * @class
 * The <code>ui5-mcb-item</code> represents the item for a <code>ui5-multi-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MultiComboBoxItem
 * @extends sap.ui.webc.main.ComboBoxItem
 * @abstract
 * @tagname ui5-mcb-item
 * @implements sap.ui.webc.main.IMultiComboBoxItem
 * @public
 */
@customElement("ui5-mcb-item")
class MultiComboBoxItem extends ComboBoxItem implements IMultiComboBoxItem {
	/**
	 * Defines the selected state of the component.
	 * @type {boolean}
	 * @name sap.ui.webc.main.MultiComboBoxItem.prototype.selected
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
