import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-filter-item-option",
	properties: /** @lends sap.ui.webcomponents.fiori.FilterItemOption.prototype */ {
		/**
		 * Defines the text of the component.
		 *
		 * @public
		 * @type {string}
		 * @defaultvalue ""
		 */
		text: {
			type: String,
		},

		/**
		 * Defines whether the option is selected
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		selected: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.FilterItemOption.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.fiori.FilterItemOption.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-filter-item-option</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/FilterItemOption.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.FilterItemOption
 * @extends sap.ui.webcomponents.base.UI5Element
 * @since 1.0.0-rc.16
 * @tagname ui5-filter-item-option
 * @implements sap.ui.webcomponents.fiori.IFilterItemOption
 * @public
 */
class FilterItemOption extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

FilterItemOption.define();

export default FilterItemOption;
