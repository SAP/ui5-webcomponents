import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
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
	/**
	 * Defines the header text of the <code>ui5-li-group</code>.
	 * @public
	 * @default ""
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the accessible name of the header.
	 * @public
	 * @default ""
	 */
	@property({ type: String })
	headerAccessibleName!: string;

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

	/**
	 * Indicates whether the header is focused
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	* Defines the header of the component.
	*
	* **Note:** Using this slot, the default header text of group and the value of `headerText` property will be overwritten.
	* @public
	*/
	@slot({ type: HTMLElement })
	header!: Array<ListItemBase>;

	get groupHeaderItem() {
		return this.shadowRoot!.querySelector<ListItemGroupHeader>("[ui5-li-group-header]")!;
	}

	get hasHeader(): boolean {
		return !!this.headerText || this.hasFormattedHeader;
	}

	get hasFormattedHeader(): boolean {
		return !!this.header.length;
	}

	get isListItemGroup() {
		return true;
	}
}

ListItemGroup.define();

const isInstanceOfListItemGroup = (object: any): object is ListItemGroup => {
	return "isListItemGroup" in object;
};

export default ListItemGroup;
export { isInstanceOfListItemGroup };
