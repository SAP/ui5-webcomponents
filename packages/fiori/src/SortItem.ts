import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { ISortItem } from "./Interfaces";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-sort-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/SortItem.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @implements {ISortItem}
 * @public
 */
@customElement("ui5-sort-item")
class SortItem extends UI5Element implements ISortItem {
	/**
	 * Defines the text of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines if the component is selected.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;
}

SortItem.define();

export default SortItem;
