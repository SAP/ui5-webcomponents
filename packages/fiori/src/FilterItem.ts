import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type FilterItemOption from "./FilterItemOption.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-filter-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/FilterItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.FilterItem
 * @extends sap.ui.webc.base.UI5Element
 * @since 1.0.0-rc.16
 * @tagname ui5-filter-item
 * @implements sap.ui.webc.fiori.IFilterItem
 * @public
 */
@customElement("ui5-filter-item")
class FilterItem extends UI5Element {
	/**
	 * Defines the text of the component.
	 *
	 * @name sap.ui.webc.fiori.FilterItem.prototype.text
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the additional text of the component.
	 *
	 * @name sap.ui.webc.fiori.FilterItem.prototype.additionalText
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the <code>values</code> list.
	 * @name sap.ui.webc.fiori.FilterItem.prototype.value
	 * @type {sap.ui.webc.fiori.IFilterItemOption[]}
	 * @slot values
	 * @public
	 */
	@slot()
	values!: Array<FilterItemOption>;
}

FilterItem.define();

export default FilterItem;
