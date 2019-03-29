import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";
import ListItem from "./ListItem";
import CustomListItemTemplateContext from "./CustomListItemTemplateContext";
import CustomListItemRenderer from "./build/compiled/CustomListItemRenderer.lit";

// Styles
import columnListItemCss from "./themes-next/CustomListItem.css";

addCustomCSS("ui5-li-custom", "sap_fiori_3", columnListItemCss);
addCustomCSS("ui5-li-custom", "sap_belize", columnListItemCss);
addCustomCSS("ui5-li-custom", "sap_belize_hcb", columnListItemCss);

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-custom",
	styleUrl: [
		"ListItemBase.css",
		"ListItem.css",
		"CustomListItem.css",
	],
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

	static get renderer() {
		return CustomListItemRenderer;
	}

	static get calculateTemplateContext() {
		return CustomListItemTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	CustomListItem.define();
});

export default CustomListItem;
