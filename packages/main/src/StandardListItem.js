import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import Icon from "./Icon.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li",
	properties: /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */ {

		/**
		 * Defines the description displayed right under the item text, if such is present.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 * @since 0.8.0
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
		 * Defines whether the <code>icon</code> should be displayed in the beginning of the list item or in the end.
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
		 * <b>Note:</b> The <code>image</code> would be displayed in the beginning of the list item.
		 *
		 * @type {string}
		 * @public
		 */
		image: {
			type: String,
		},

		/**
		 * Defines the <code>info</code>, displayed in the end of the list item.
		 * @type {string}
		 * @public
		 * @since 0.13.0
		 */
		info: {
			type: String,
		},

		/**
		 * Defines the state of the <code>info</code>.
		 * <br>
		 * Available options are: <code>"None"</code> (by default), <code>"Success"</code>, <code>"Warning"</code>, <code>"Information"</code> and <code>"Erorr"</code>.
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 * @since 0.13.0
		 */
		infoState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Indicates if the list item has text content.
		 * @type {boolean}
		 * @private
		 */
		hasTitle: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */ {
		/**
		 * Defines the text of the <code>ui5-li</code>.
		 * <br><br>
		 * <b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
};

/**
 * @class
 * The <code>ui5-li</code> represents the simplest type of item for a <code>ui5-list</code>.
 *
 * This is a list item,
 * providing the most common use cases such as <code>text</code>,
 * <code>image</code> and <code>icon</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.StandardListItem
 * @extends ListItem
 * @tagname ui5-li
 * @public
 */
class StandardListItem extends ListItem {
	static get template() {
		return StandardListItemTemplate;
	}

	static get metadata() {
		return metadata;
	}

	onBeforeRendering(...params) {
		super.onBeforeRendering(...params);
		this.hasTitle = !!this.textContent;
	}

	get displayImage() {
		return !!this.image;
	}

	get displayIconBegin() {
		return (this.icon && !this.iconEnd);
	}

	get displayIconEnd() {
		return (this.icon && this.iconEnd);
	}

	static async onDefine() {
		await Icon.define();
	}
}

StandardListItem.define();

export default StandardListItem;
