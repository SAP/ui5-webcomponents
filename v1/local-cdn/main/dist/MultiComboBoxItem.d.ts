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
declare class MultiComboBoxItem extends ComboBoxItem implements IMultiComboBoxItem {
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    selected: boolean;
    get isMultiComboBoxItem(): boolean;
}
export default MultiComboBoxItem;
