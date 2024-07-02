import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IComboBoxItem } from "./ComboBox.js";
/**
 * @class
 * The `ui5-cb-item` represents the item for a `ui5-combobox`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {IComboBoxItem}
 * @public
 */
declare class ComboBoxItem extends UI5Element implements IComboBoxItem {
    /**
     * Defines the text of the component.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the additional text of the component.
     * @default undefined
     * @since 1.0.0-rc.11
     * @public
     */
    additionalText?: string;
    /**
     * Indicates whether the item is filtered
     * @private
     */
    _isVisible: boolean;
    /**
     * Indicates whether the item is focssed
     * @protected
     */
    focused: boolean;
    /**
     * Indicates whether the item is selected
     * @protected
     */
    selected: boolean;
    get stableDomRef(): string;
}
export default ComboBoxItem;
