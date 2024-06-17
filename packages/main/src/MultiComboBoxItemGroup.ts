import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import type MultiComboBoxItem from "./MultiComboBoxItem.js";

/**
 * @class
 * The `ui5-mcb-item-group` is type of suggestion item,
 * that can be used to split the `ui5-multi-combobox` suggestions into groups.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @implements {IMultiComboBoxItem}
 * @since 2.0
 */
@customElement("ui5-mcb-item-group")
class MultiComboBoxItemGroup extends UI5Element implements IMultiComboBoxItem {
	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the items of the <code>ui5-mcb-item-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	items!: Array<MultiComboBoxItem>;

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

MultiComboBoxItemGroup.define();

const isInstanceOfMultiComboBoxItemGroup = (object: any): object is MultiComboBoxItemGroup => {
	return "isGroupItem" in object;
};

export default MultiComboBoxItemGroup;

export { isInstanceOfMultiComboBoxItemGroup };
