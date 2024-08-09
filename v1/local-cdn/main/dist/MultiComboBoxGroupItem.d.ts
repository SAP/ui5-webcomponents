import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
/**
 * @class
 * The `ui5-mcb-group-item` is type of suggestion item,
 * that can be used to split the `ui5-multi-combobox` suggestions into groups.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @implements {IMultiComboBoxItem}
 * @since 1.4.0
 */
declare class MultiComboBoxGroupItem extends UI5Element implements IMultiComboBoxItem {
    /**
     * Defines the text of the component.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Used to avoid tag name checks
     * @protected
     */
    get isGroupItem(): boolean;
    get selected(): boolean;
    get stableDomRef(): string;
}
export default MultiComboBoxGroupItem;
