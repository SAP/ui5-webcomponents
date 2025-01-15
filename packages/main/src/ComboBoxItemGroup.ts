import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type { IComboBoxItem } from "./ComboBox.js";
import ListItemGroup from "./ListItemGroup.js";
import type ComboBoxItem from "./ComboBoxItem.js";
import ComboBoxItemGroupTemplate from "./ComboBoxItemGroupTemplate.js";

/**
 * @class
 * The `ui5-cb-group-item` is type of suggestion item,
 * that can be used to split the `ui5-combobox` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @abstract
 * @public
 * @implements {IComboBoxItem}
 * @since 1.0.0-rc.15
 */
@customElement({
	tag: "ui5-cb-item-group",
	template: ComboBoxItemGroupTemplate,
})
class ComboBoxItemGroup extends ListItemGroup implements IComboBoxItem {
	eventDetails!: ListItemGroup["eventDetails"];
	/**
	 * Defines the items of the <code>ui5-cb-item-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		individualSlots: true,
		type: HTMLElement,
	})
	items!: Array<ComboBoxItem>;

	get isGroupItem(): boolean {
		return true;
	}

	get _isVisible() {
		return this.items.some(item => item._isVisible);
	}
}

ComboBoxItemGroup.define();

const isInstanceOfComboBoxItemGroup = (object: any): object is ComboBoxItemGroup => {
	return "isGroupItem" in object;
};

export { isInstanceOfComboBoxItemGroup };
export default ComboBoxItemGroup;
