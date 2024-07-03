import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";

import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";

// Template
import ListItemGroupHeaderTemplate from "./generated/templates/ListItemGroupHeaderTemplate.lit.js";

// Styles
import ListItemGroupHeaderCss from "./generated/themes/ListItemGroupHeader.css.js";

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
	/**
	 * Defines the text alternative of the component.
	 *
	 * **Note:** If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	static i18nBundle: I18nBundle;

	get _effectiveInactive() {
		return true;
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

	static async onDefine() {
		ListItemGroupHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

ListItemGroupHeader.define();

export default ListItemGroupHeader;
