import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IComboBoxItem } from "./ComboBox.js";

/**
 * @class
 * The <code>ui5-cb-group-item</code> is type of suggestion item,
 * that can be used to split the <code>ui5-combobox</code> suggestions into groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ComboBoxGroupItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-cb-group-item
 * @public
 * @implements sap.ui.webc.main.IComboBoxItem
 * @since 1.0.0-rc.15
 */
@customElement("ui5-cb-group-item")
class ComboBoxGroupItem extends UI5Element implements IComboBoxItem {
		/**
		 * Defines the text of the component.
		 *
		 * @type {string}
		 * @name sap.ui.webc.main.ComboBoxGroupItem.prototype.text
		 * @defaultvalue ""
		 * @public
		 */
		@property()
		text!: string;

		/**
		 * Indicates whether the item is focssed
		 * @protected
		 */
		@property({ type: Boolean })
		focused!: boolean;

		/**
		 * Used to avoid tag name checks
		 * @protected
		 */
		get isGroupItem(): boolean {
			return true;
		}
}

ComboBoxGroupItem.define();

export default ComboBoxGroupItem;
