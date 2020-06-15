import ListItem from "./ListItem.js";
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import customListItemCss from "./generated/themes/CustomListItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-custom",
	slots: /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */ {

		/**
		 * Defines the content of the <code>ui5-li-custom</code>.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */ {
	},
};

/**
 * @class
 *
 * A component to be used as custom list item within the <code>ui5-list</code>
 * the same way as the standard <code>ui5-li</code>.
 *
 * The <code>ui5-li-custom</code> accepts arbitrary HTML content to allow full customization.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CustomListItem
 * @extends ListItem
 * @tagname ui5-li-custom
 * @public
 */
class CustomListItem extends ListItem {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return CustomListItemTemplate;
	}

	static get styles() {
		return [...ListItem.styles, customListItemCss];
	}

	get classes() {
		const result = super.classes;
		result.main["ui5-custom-li-root"] = true;
		return result;
	}
}

CustomListItem.define();

export default CustomListItem;
