import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
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
		 * Defines the content of the component.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */ {
		/**
		 * Defines the text alternative of the component.
		 * Note: If not provided a default text alternative will be set, if present.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		 accessibleName: {
			type: String,
		},
	},
};

/**
 * @class
 *
 * A component to be used as custom list item within the <code>ui5-list</code>
 * the same way as the standard <code>ui5-li</code>.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CustomListItem
 * @extends ListItem
 * @tagname ui5-li-custom
 * @implements sap.ui.webcomponents.main.IListItem
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
		return [ListItem.styles, customListItemCss];
	}

	_onkeydown(event) {
		const isTab = isTabNext(event) || isTabPrevious(event);

		if (!isTab && !this.focused) {
			return;
		}

		super._onkeydown(event);
	}

	_onkeyup(event) {
		const isTab = isTabNext(event) || isTabPrevious(event);

		if (!isTab && !this.focused) {
			return;
		}

		super._onkeyup(event);
	}

	get classes() {
		const result = super.classes;
		result.main["ui5-custom-li-root"] = true;
		return result;
	}
}

CustomListItem.define();

export default CustomListItem;
