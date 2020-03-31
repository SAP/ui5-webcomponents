import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import StandardListItem from "./StandardListItem.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-suggestion-item",
	properties: /** @lends  sap.ui.webcomponents.main.SuggestionItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-suggestion-item</code>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the description displayed right under the item text, if such is present.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		description: {
			type: String,
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * <br><br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines whether the <code>icon</code> should be displayed in the beginning of the item or in the end.
		 * <br><br>
		 * <b>Note:</b> If <code>image</code> is set, the <code>icon</code> would be displayed after the <code>image</code>.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * Defines the <code>image</code> source URI.
		 * <br><br>
		 * <b>Note:</b> The <code>image</code> would be displayed in the beginning of the item.
		 *
		 * @type {string}
		 * @public
		 */
		image: {
			type: String,
		},

		/**
		 * Defines the <code>info</code>, displayed in the end of the item.
		 * @type {string}
		 * @public
		 */
		info: {
			type: String,
		},

		/**
		 * Defines the state of the <code>info</code>.
		 * <br><br>
		 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code> and <code>"Erorr"</code>.
		 * @type {ValueState}
         * @defaultvalue "None"
		 * @public
		 */
		infoState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines the item to be displayed as a group item.
		 * <br><br>
		 * <b>Note:</b>
		 * When set, the other properties, such as <code>image</code>, <code>icon</code>, <code>description</code>, etc. will be omitted
		 * and only the <code>text</code> will be displayed.
		 * @type {boolean}
         * @defaultvalue false
		 * @public
		 */
		group: {
			type: Boolean,
		},
	},
	slots: {
	},
	events: {
	},
};

/**
 * @class
 * The <code>ui5-suggestion-item</code> represents the suggestion item of the <code>ui5-input</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SuggestionItem
 * @extends UI5Element
 * @public
 */
class SuggestionItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static async onDefine() {
		await Promise.all([
			StandardListItem.define(),
			GroupHeaderListItem.define(),
		]);
	}
}

SuggestionItem.define();

export default SuggestionItem;
