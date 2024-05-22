import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
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
@customElement("ui5-cb-item-group")
class ComboBoxItemGroup extends UI5Element implements IComboBoxItem {
		/**
		 * Defines the text of the component.
		 * @default ""
		 * @public
		 */
		@property()
		text!: string;

		/**
		 * Indicates whether the item is focused
		 * @protected
		 */
		@property({ type: Boolean })
		focused!: boolean;

		/**
		 * Defines the items of the <code>ui5-cb-item-group</code>.
		 * @public
		 */
		@slot({
			"default": true,
			invalidateOnChildChange: true,
			type: HTMLElement,
		})
		items!: Array<IComboBoxItem>;

		/**
		 * Used to avoid tag name checks
		 * @protected
		 */
		get isGroupItem(): boolean {
			return true;
		}

		get stableDomRef() {
			return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
		}

		get _isVisible() {
			return this.items.some(item => item._isVisible);
		}
}

ComboBoxItemGroup.define();

const isInstanceOfComboBoxItemGroup = (object: any): object is ComboBoxItemGroup => {
	return object.isGroupItem === true;
};

export { isInstanceOfComboBoxItemGroup };
export default ComboBoxItemGroup;
