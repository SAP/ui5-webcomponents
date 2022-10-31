import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";

import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";

// Template
import GroupHeaderListItemTemplate from "./generated/templates/GroupHeaderListItemTemplate.lit.js";

// Styles
import groupheaderListItemCss from "./generated/themes/GroupHeaderListItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-li-groupheader",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.GroupHeaderListItem.prototype */ {
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
	slots: /** @lends sap.ui.webcomponents.main.GroupHeaderListItem.prototype */ {
		/**
		 * Defines the text of the component.
		 * <br>
		 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.GroupHeaderListItem.prototype */ {
	},
};

/**
 * @class
 * The <code>ui5-li-groupheader</code> is a special list item, used only to separate other list items into logical groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.GroupHeaderListItem
 * @extends sap.ui.webcomponents.main.ListItemBase
 * @tagname ui5-li-groupheader
 * @implements sap.ui.webcomponents.main.IListItem
 * @public
 */
class GroupHeaderListItem extends ListItemBase {
	static get template() {
		return GroupHeaderListItemTemplate;
	}

	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [ListItemBase.styles, groupheaderListItemCss];
	}

	get group() {
		return true;
	}

	get groupHeaderText() {
		return GroupHeaderListItem.i18nBundle.getText(GROUP_HEADER_TEXT);
	}

	get ariaLabelText() {
		return [this.textContent, this.accessibleName].filter(Boolean).join(" ");
	}

	static async onDefine() {
		GroupHeaderListItem.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

GroupHeaderListItem.define();

export default GroupHeaderListItem;
