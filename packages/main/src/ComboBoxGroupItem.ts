import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IComboBoxItem } from "./ComboBox.js";
import ComboBoxItem from "./ComboBoxItem.js";

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
@customElement("ui5-cb-group-item")
class ComboBoxGroupItem extends UI5Element implements IComboBoxItem {
		/**
		 * Defines the text of the component.
		 * @default ""
		 * @public
		 */
		@property()
		text!: string;

		/**
		 * Indicates whether the item is focssed
		 * @protected
		 */
		@property({ type: Boolean })
		focused!: boolean;

		/**
		 * Defines the items of the <code>ui5-li-group</code>.
		 * @public
		 */
		@slot({
			"default": true,
			invalidateOnChildChange: true,
			type: HTMLElement,
		})
		items!: Array<ComboBoxItem>;

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
}

ComboBoxGroupItem.define();

export default ComboBoxGroupItem;
