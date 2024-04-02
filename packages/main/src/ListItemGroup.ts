import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ListItemBase from "./ListItemBase.js";

// Template
import ListItemGroupTemplate from "./generated/templates/ListItemGroupTemplate.lit.js";

// Styles
import ListItemGroupCss from "./generated/themes/ListItemGroup.css.js";
import StandardListItem from "./StandardListItem.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";

/**
 * @class
 * ### Overview
 * The `ui5-li-group` is a special list item, used only to create groups of list items.
 *
 * This is the item to use inside a `ui5-list`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";`
 * @csspart header - Used to style the header item of the group
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0
 */
@customElement({
	tag: "ui5-li-group",
	renderer: litRender,
	languageAware: true,
	template: ListItemGroupTemplate,
	styles: [ListItemGroupCss],
	dependencies: [StandardListItem, ListItemGroupHeader],
})
class ListItemGroup extends UI5Element {
		static i18nBundle: I18nBundle;

	/**
	 * Defines the header text of the <code>ui5-li-group</code>.
	 * @public
	 * @default ""
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the items of the <code>ui5-li-group</code>.
	 * @public
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
