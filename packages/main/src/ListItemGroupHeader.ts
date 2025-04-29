import { slot, property, customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import ListItemBase from "./ListItemBase.js";

import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";

// Template
import ListItemGroupHeaderTemplate from "./ListItemGroupHeaderTemplate.js";

// Styles
import ListItemGroupHeaderCss from "./generated/themes/ListItemGroupHeader.css.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";

/**
 * @class
 * The `ui5-li-group-header` is a special list item, used only to separate other list items into logical groups.
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItemBase
 * @private
 */
@customElement({
	tag: "ui5-li-group-header",
	languageAware: true,
	template: ListItemGroupHeaderTemplate,
	styles: [ListItemBase.styles, ListItemGroupHeaderCss],
})
class ListItemGroupHeader extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"];
	/**
	 * Defines the text alternative of the component.
	 *
	 * **Note:** If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	@property()
	accessibleRole: `${ListItemAccessibleRole}` = ListItemAccessibleRole.ListItem;

	@slot()
	subItems!: Array<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get effectiveAccRole(): AriaRole {
		return toLowercaseEnumValue(this.accessibleRole);
	}

	get groupItem() {
		return true;
	}

	get _pressable() {
		return false;
	}

	get groupHeaderText() {
		return ListItemGroupHeader.i18nBundle.getText(GROUP_HEADER_TEXT);
	}

	get ariaLabelText() {
		return [this.textContent, this.accessibleName].filter(Boolean).join(" ");
	}

	get hasSubItems() {
		return this.subItems.length > 0;
	}
}

ListItemGroupHeader.define();

export default ListItemGroupHeader;
