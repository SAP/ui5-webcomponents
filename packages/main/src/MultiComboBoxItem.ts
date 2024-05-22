import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ComboBoxItem from "./ComboBoxItem.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";

/**
 * @class
 * The `ui5-mcb-item` represents the item for a `ui5-multi-combobox`.
 * @constructor
 * @extends ComboBoxItem
 * @abstract
 * @implements {IMultiComboBoxItem}
 * @public
 */
@customElement("ui5-mcb-item")
class MultiComboBoxItem extends ComboBoxItem implements IMultiComboBoxItem {
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare selected: boolean;

	get isMultiComboBoxItem() {
		return true;
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
