import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";

import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";

// Template
import GroupHeaderListItemTemplate from "./generated/templates/GroupHeaderListItemTemplate.lit.js";

// Styles
import groupheaderListItemCss from "./generated/themes/GroupHeaderListItem.css.js";

/**
 * @class
 * The `ui5-li-groupheader` is a special list item, used only to separate other list items into logical groups.
 *
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 *
 * @constructor
 * @extends ListItemBase
 * @public
 */
@customElement({
	tag: "ui5-li-groupheader",
	languageAware: true,
	template: GroupHeaderListItemTemplate,
	styles: [ListItemBase.styles, groupheaderListItemCss],
})
class GroupHeaderListItem extends ListItemBase {
	/**
	 * Defines the text alternative of the component.
	 *
	 * **Note:** If not provided a default text alternative will be set, if present.
	 *
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	static i18nBundle: I18nBundle;

	get groupItem() {
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
