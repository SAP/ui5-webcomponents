import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";

// @ts-ignore
import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";

// Template
import GroupHeaderListItemTemplate from "./generated/templates/GroupHeaderListItemTemplate.lit.js";

// Styles
import groupheaderListItemCss from "./generated/themes/GroupHeaderListItem.css.js";

/**
 * @class
 * The <code>ui5-li-groupheader</code> is a special list item, used only to separate other list items into logical groups.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.GroupHeaderListItem
 * @extends sap.ui.webc.main.ListItemBase
 * @tagname ui5-li-groupheader
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
@customElement("ui5-li-groupheader")
@languageAware
class GroupHeaderListItem extends ListItemBase {
	/**
	 * Defines the text alternative of the component.
	 * Note: If not provided a default text alternative will be set, if present.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.GroupHeaderListItem.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the text of the component.
	 * <br>
	 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.GroupHeaderListItem.prototype.default
	 * @slot
	 * @public
	 */

	static i18nBundle: I18nBundle;

	static get template() {
		return GroupHeaderListItemTemplate;
	}

	static get styles() {
		return [ListItemBase.styles, groupheaderListItemCss];
	}

	get groupItem() {
		return true;
	}

	get groupHeaderText() {
		return GroupHeaderListItem.i18nBundle.getText(GROUP_HEADER_TEXT as I18nText);
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
