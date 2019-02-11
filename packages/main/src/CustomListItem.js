import Core from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Core";
import ListItem from "./ListItem";
import CustomListItemTemplateContext from "./CustomListItemTemplateContext";
import CustomListItemRenderer from "./build/compiled/CustomListItemRenderer.lit";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-custom",
	styleUrl: [
		"ListItemBase.css",
		"ListItem.css",
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

	constructor(state) {
		super(state);
	}

	static get calculateTemplateContext() {
		return CustomListItemTemplateContext.calculate;
	}
}

Core.boot().then(_ => {
	CustomListItem.define();
});

export default CustomListItem;
