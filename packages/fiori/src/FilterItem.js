import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
import FilterItemTemplate from "./generated/templates/FilterItemTemplate.lit.js";

import FilterItemCSS from "./generated/themes/FilterItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-filter-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.FilterItem.prototype */ {
		/**
		 * Defines the text of the component.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the additional text of the component.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 */
		additionalText: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.FilterItem.prototype */ {
		/**
		 * Defines the <code>values</code> list.
         * @type {sap.ui.webcomponents.fiori.IFilterItemOption[]}
		 * @slot values
		 * @public
		 */
		values: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.FilterItem.prototype */ {
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
 * For the <code>ui5-filter-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/FilterItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.FilterItem
 * @extends ListItem
 * @since 1.0.0-rc.16
 * @tagname ui5-filter-item
 * @implements sap.ui.webcomponents.fiori.IFilterItem
 * @public
 */
class FilterItem extends ListItem {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return [ListItem.styles, FilterItemCSS];
	}

	static get template() {
		return FilterItemTemplate;
	}
}

FilterItem.define();

export default FilterItem;
