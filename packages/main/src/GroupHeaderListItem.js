import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/compatibility/ShadowDOM";
import ListItemBase from "./ListItemBase";
// Template
import GroupHeaderListItemRenderer from "./build/compiled/GroupHeaderListItemRenderer.lit";
import GroupHeaderListItemTemplateContext from "./GroupHeaderListItemTemplateContext";

// Styles
import belize from "./themes/sap_belize/GroupHeaderListItem.less";
import belizeHcb from "./themes/sap_belize_hcb/GroupHeaderListItem.less";
import fiori3 from "./themes/sap_fiori_3/GroupHeaderListItem.less";

ShadowDOM.registerStyle("sap_belize", "GroupHeaderListItem.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "GroupHeaderListItem.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "GroupHeaderListItem.css", fiori3);

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
