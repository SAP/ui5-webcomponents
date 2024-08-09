import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
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
 * @since 2.0.0
 */
declare class MultiComboBoxItemGroup extends UI5Element implements IMultiComboBoxItem {
    /**
     * Defines the text of the component.
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Defines the items of the <code>ui5-mcb-item-group</code>.
     * @public
     */
    items: Array<MultiComboBoxItem>;
    /**
     * Used to avoid tag name checks
     * @protected
     */
    get isGroupItem(): boolean;
    get selected(): boolean;
    get stableDomRef(): string;
}
declare const isInstanceOfMultiComboBoxItemGroup: (object: any) => object is MultiComboBoxItemGroup;
export default MultiComboBoxItemGroup;
export { isInstanceOfMultiComboBoxItemGroup };
