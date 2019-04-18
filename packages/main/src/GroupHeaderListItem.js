import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import ListItemBase from "./ListItemBase";

// Template
import GroupHeaderListItemRenderer from "./build/compiled/GroupHeaderListItemRenderer.lit";
import GroupHeaderListItemTemplateContext from "./GroupHeaderListItemTemplateContext";

// Styles
import groupheaderListItemCss from "./themes/GroupHeaderListItem.css";


/**
 * @public
 */
const metadata = {
	tag: "ui5-li-groupheader",
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

	static get styles() {
		return [ListItemBase.styles, groupheaderListItemCss];
	}
}

Bootstrap.boot().then(_ => {
	GroupHeaderListItem.define();
});

export default GroupHeaderListItem;
