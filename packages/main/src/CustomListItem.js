import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import ListItem from "./ListItem.js";
import CustomListItemTemplate from "./build/compiled/CustomListItemTemplate.lit.js";

// Styles
import columnListItemCss from "./themes/CustomListItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-custom",
	defaultSlot: "content",
	slots: /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */ {

		/**
		 * Defines the content of the <code>ui5-li-custom</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
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

	static get render() {
		return litRender;
	}

	static get template() {
		return CustomListItemTemplate;
	}

	static get styles() {
		return [ListItem.styles, columnListItemCss];
	}

	get classes() {
		const result = super.classes;

		// Modify main classes
		result.main.sapMCustomLI = true;

		return result;
	}
}

CustomListItem.define();

export default CustomListItem;
