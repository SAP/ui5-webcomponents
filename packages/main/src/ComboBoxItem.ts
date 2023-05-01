import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IComboBoxItem } from "./ComboBox.js";

/**
 * @class
 * The <code>ui5-cb-item</code> represents the item for a <code>ui5-combobox</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ComboBoxItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-cb-item
 * @implements sap.ui.webc.main.IComboBoxItem
 * @public
 */
@customElement("ui5-cb-item")
class ComboBoxItem extends UI5Element implements IComboBoxItem {
	/**
	 * Defines the text of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.ComboBoxItem.prototype.text
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	text!: string

	/**
	 * Defines the additional text of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.ComboBoxItem.prototype.additionalText
	 * @defaultvalue ""
	 * @since 1.0.0-rc.11
	 * @public
	 */
	@property()
	additionalText!: string

	/**
	 * Indicates whether the item is focssed
	 * @protected
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Indicates whether the item is selected
	 * @protected
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Used to avoid tag name checks
	 * @protected
	 */
	get isGroupItem(): boolean {
		return false;
	}
}

ComboBoxItem.define();

export default ComboBoxItem;
