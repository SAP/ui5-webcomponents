import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle.js";
import ListItemBase from "./ListItemBase.js";

// Template
import GroupHeaderListItemRenderer from "./build/compiled/GroupHeaderListItemRenderer.lit.js";
import GroupHeaderListItemTemplateContext from "./GroupHeaderListItemTemplateContext.js";

// Styles
import listItemBaseCss from "./themes/ListItemBase.css.js";
import groupheaderListItemCss from "./themes/GroupHeaderListItem.css.js";

addCustomCSS("ui5-li-groupheader", "sap_fiori_3", listItemBaseCss);
addCustomCSS("ui5-li-groupheader", "sap_fiori_3", groupheaderListItemCss);

addCustomCSS("ui5-li-groupheader", "sap_belize", listItemBaseCss);
addCustomCSS("ui5-li-groupheader", "sap_belize", groupheaderListItemCss);

addCustomCSS("ui5-li-groupheader", "sap_belize_hcb", listItemBaseCss);
addCustomCSS("ui5-li-groupheader", "sap_belize_hcb", groupheaderListItemCss);

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-groupheader",
	styleUrl: [
		"ListItemBase.css",
		"GroupHeaderListItem.css",
	],
	usesNodeText: true,
	properties: /** @lends  sap.ui.webcomponents.main.GroupHeaderListItem.prototype */ {
	},
	events: /** @lends  sap.ui.webcomponents.main.GroupHeaderListItem.prototype */ {
	},
};

/**
 * @class
 * The <code>ui5-li-group-header</code> is a special list item, used only to separate other list items into logical groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.GroupHeaderListItem
 * @extends ListItemBase
 * @tagname ui5-li-groupheader
 * @usestextcontent
 * @public
 */
class GroupHeaderListItem extends ListItemBase {
	static get renderer() {
		return GroupHeaderListItemRenderer;
	}

	static get metadata() {
		return metadata;
	}

	static get calculateTemplateContext() {
		return GroupHeaderListItemTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	GroupHeaderListItem.define();
});

export default GroupHeaderListItem;
