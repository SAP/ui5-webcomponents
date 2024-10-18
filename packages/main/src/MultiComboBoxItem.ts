import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ComboBoxItem from "./ComboBoxItem.js";
import CheckBox from "./CheckBox.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";

import styles from "./generated/themes/MultiComboBoxItem.css.js"
import MultiComboBoxItemTemplate from "./generated/templates/MultiComboBoxItemTemplate.lit.js";
import type { SelectionRequestEventDetail } from "./ListItem.js";

/**
 * @class
 * The `ui5-mcb-item` represents the item for a `ui5-multi-combobox`.
 * @constructor
 * @extends ComboBoxItem
 * @abstract
 * @implements {IMultiComboBoxItem}
 * @public
 */
@customElement({
	tag: "ui5-mcb-item",
	template: MultiComboBoxItemTemplate,
	styles: [ComboBoxItem.styles, styles],
	dependencies: [...ComboBoxItem.dependencies, CheckBox],
})
class MultiComboBoxItem extends ComboBoxItem implements IMultiComboBoxItem {
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare selected: boolean;

	/**
	 * Defines whether the item is filtered
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isVisible = false;

	get isMultiComboBoxItem() {
		return true;
	}

	_onclick(e: MouseEvent) {
		if ((e.target as HTMLElement)?.hasAttribute("ui5-checkbox")) {
			return this.fireEvent<SelectionRequestEventDetail>("_selection-requested", { item: this, selected: (e.target as CheckBox).checked, selectionComponentPressed: true });
		}

		super._onclick(e);
	}
}

const isInstanceOfMultiComboBoxItem = (object: any): object is MultiComboBoxItem => {
	return "isMultiComboBoxItem" in object;
};

MultiComboBoxItem.define();

export default MultiComboBoxItem;
export { isInstanceOfMultiComboBoxItem };
