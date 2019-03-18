import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import ListItem from "./ListItem";
import Icon from "./Icon";
import StandardListItemTemplateContext from "./StandardListItemTemplateContext";
import StandardListItemRenderer from "./build/compiled/StandardListItemRenderer.lit";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li",
	styleUrl: [
		"ListItemBase.css",
		"ListItem.css",
	],
	usesNodeText: true,
	properties: /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */ {

		/**
		 * Defines the description displayed right under the item text, if such is present.
		 * @type {String}
		 * @public
		 * @since 0.8.0
		 */
		description: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the <code>icon</code> source URI.
		 * </br></br>
		 * <b>Note:</b>
		 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @public
		 */
		icon: {
			type: URI,
			defaultValue: null,
		},

		/**
		 * Defines whether the <code>icon</code> should be displayed in the beginning of the list item or in the end.
		 * </br></br>
		 * <b>Note:</b> If <code>image</code> is set, the <code>icon</code> would be displayed after the <code>image</code>.
		 *
		 * @type {boolean}
		 * @public
		 */
		iconEnd: {
			type: Boolean,
		},

		/**
		 * Defines the <code>image</code> source URI.
		 * </br></br>
		 * <b>Note:</b> The <code>image</code> would be displayed in the beginning of the list item.
		 *
		 * @type {string}
		 * @public
		 */
		image: {
			type: URI,
			defaultValue: null,
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
 * @usestextcontent
 * @public
 */
class StandardListItem extends ListItem {
	static get renderer() {
		return StandardListItemRenderer;
	}

	static get metadata() {
		return metadata;
	}

	static get calculateTemplateContext() {
		return StandardListItemTemplateContext.calculate;
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	StandardListItem.define();
});

export default StandardListItem;
