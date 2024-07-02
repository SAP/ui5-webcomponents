import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IComboBoxItem } from "./ComboBox.js";
/**
 * @class
 * The `ui5-cb-group-item` is type of suggestion item,
 * that can be used to split the `ui5-combobox` suggestions into groups.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @implements {IComboBoxItem}
 * @since 1.0.0-rc.15
 */
declare class ComboBoxItemGroup extends UI5Element implements IComboBoxItem {
    /**
     * Defines the text of the component.
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Indicates whether the item is focused
     * @protected
     */
    focused: boolean;
    /**
     * Defines the items of the <code>ui5-cb-item-group</code>.
     * @public
     */
    items: Array<IComboBoxItem>;
    /**
     * Used to avoid tag name checks
     * @protected
     */
    get isGroupItem(): boolean;
    get stableDomRef(): string;
    get _isVisible(): boolean;
}
declare const isInstanceOfComboBoxItemGroup: (object: any) => object is ComboBoxItemGroup;
export { isInstanceOfComboBoxItemGroup };
export default ComboBoxItemGroup;
