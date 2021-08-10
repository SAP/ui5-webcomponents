import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import FilterItemTemplate from "./generated/templates/FilterItemTemplate.lit.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";


/**
 * @public
 */
const metadata = {
	tag: "ui5-filter-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.FilterItem.prototype */ {
		/**
		 * Defines the text of the component
		 * 
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.FilterItem.prototype */ {
		/**
		 * Defines the <code>values</code> list.
		 * @type {ui5-filter-item-option}
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
 * @extends UI5Element
 * @since 1.0.0-rc.16
 * @tagname ui5-filter-item
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
		return [ListItem.styles];
	}

	static get template() {
		return FilterItemTemplate;
	}

	static get dependencies() {
		return [
			ListItem,
		];
	}
}

FilterItem.define();

export default FilterItem;
