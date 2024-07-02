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
    /**
     * Defines whether the item is filtered
     * @private
     */
    _isVisible: boolean;
    get isMultiComboBoxItem(): boolean;
}
declare const isInstanceOfMultiComboBoxItem: (object: any) => object is MultiComboBoxItem;
export default MultiComboBoxItem;
export { isInstanceOfMultiComboBoxItem };
