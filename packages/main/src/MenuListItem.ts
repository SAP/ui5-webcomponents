import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import CustomListItem from "./CustomListItem.js";
import Icon from "./Icon.js";
import MenuListItemTemplate from "./generated/templates/MenuListItemTemplate.lit.js";
import MenuItem from "./MenuItem.js";
import HasPopup from "./types/HasPopup.js";

// Styles
import menuListItemCss from "./generated/themes/MenuListItem.css.js";

/**
 * @class
 * @constructor
 * @extends CustomListItem
 * @since 1.23.0
 * @private
 */
@customElement({
	tag: "ui5-menu-li",
	template: MenuListItemTemplate,
	styles: [CustomListItem.styles, menuListItemCss],
	dependencies: [Icon],
})
class MenuListItem extends CustomListItem {
	/**
	 * Defines the associated MenuItem instance
	 * @private
	 */
	@property({ type: Object })
	associatedItem!: MenuItem;

	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 * @since 1.24.0
	 */
	@property()
	icon!: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the menu item.
	 *
	 * **Note:** The additional text would not be displayed if the item has a submenu.
	 * @default ""
	 * @public
	 * @since 1.24.0
	 */
	@property()
	additionalText!: string;

	get text() {
		return this.associatedItem?.text;
	}

	get _additionalText() {
		return this.associatedItem?._additionalText;
	}

	get hasIcon() {
		return !!this.associatedItem?.icon;
	}

	get hasSubmenu() {
		return !!(this.associatedItem?.items.length || this.associatedItem?.busy);
	}

	get subMenuOpened() {
		return !!this.associatedItem?._subMenu;
	}

	get _siblingsWithIcon() {
		return this.associatedItem?._siblingsWithIcon;
	}

	get _focusable() {
		return true;
	}

	get _accInfo() {
		const accInfoSettings = {
			ariaHaspopup: this.associatedItem?.hasSubmenu ? HasPopup.Menu.toLowerCase() as Lowercase<HasPopup> : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}
}

MenuListItem.define();

export default MenuListItem;
