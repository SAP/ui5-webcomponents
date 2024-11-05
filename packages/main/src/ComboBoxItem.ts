import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
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
@customElement("ui5-cb-item")
class ComboBoxItem extends UI5Element implements IComboBoxItem {
	/**
	 * Defines the text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessor text: string | undefined;

	/**
	 * Defines the additional text of the component.
	 * @default undefined
	 * @since 1.0.0-rc.11
	 * @public
	 */
	@property()
	accessor additionalText: string | undefined;

	/**
	 * Indicates whether the item is filtered
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	accessor _isVisible = false;

	/**
	 * Indicates whether the item is focssed
	 * @protected
	 */
	@property({ type: Boolean })
	accessor focused = false;

	/**
	 * Indicates whether the item is selected
	 * @protected
	 */
	@property({ type: Boolean })
	accessor selected = false;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

ComboBoxItem.define();

export default ComboBoxItem;
