import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemBase from "./ListItemBase.js";

// Template
import ListItemGroupTemplate from "./generated/templates/ListItemGroupTemplate.lit.js";

// Styles
import ListItemGroupCss from "./generated/themes/ListItemGroup.css.js";
import StandardListItem from "./StandardListItem.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";

/**
 * @class
 *
 * @csspart header - The group header of the list item.
 *
 * @constructor
 * @extends ListItemBase
 * @public
 *
 */
@customElement({
	tag: "ui5-li-group",
	languageAware: true,
	template: ListItemGroupTemplate,
	styles: [ListItemGroupCss],
	dependencies: [StandardListItem, ListItemGroupHeader],
})
class ListItemGroup extends ListItemBase {
	static i18nBundle: I18nBundle;

	/**
	 * Defines the header text of the <code>ui5-li-group</code>.
	 * <br><br>
	 */
	@property({ type: String })
	headerText!: string;

	/**
	 * Defines the items of the <code>ui5-li-group</code>.
	 * <br><br>
	 *
	 * @public
	 * @slot items
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	items!: Array<ListItemBase>;

	static async onDefine() {
		ListItemGroup.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get groupHeaderItem() {
		return this.shadowRoot!.querySelector<ListItemGroupHeader>("[ui5-li-group-header]")!;
	}
}

ListItemGroup.define();

export default ListItemGroup;
