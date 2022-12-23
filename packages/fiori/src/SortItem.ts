import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

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
 * @author SAP SE
 * @alias sap.ui.webc.fiori.SortItem
 * @extends sap.ui.webc.base.UI5Element
 * @since 1.0.0-rc.16
 * @tagname ui5-sort-item
 * @implements sap.ui.webc.fiori.ISortItem
 * @public
 */
@customElement("ui5-sort-item")
class SortItem extends UI5Element {
	/**
	 * Defines the text of the component.
	 *
	 * @name sap.ui.webc.fiori.SortItem.prototype.text
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines if the component is selected.
	 *
	 * @name sap.ui.webc.fiori.SortItem.prototype.selected
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;
}

SortItem.define();

export default SortItem;
