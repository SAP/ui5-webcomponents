import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import CustomListItem from "./CustomListItem.js";
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
})
class MenuListItem extends CustomListItem {
	/**
	 * Defines the associated MenuItem instance
	 * @private
	 */
	@property({ type: Object })
	associatedItem?: MenuItem;

	get text() {
		return this.associatedItem?.text;
	}

	get icon() {
		return this.associatedItem?.icon;
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

	get _additionalText() {
		return this.associatedItem?.hasSubmenu ? "" : this.associatedItem?.additionalText;
	}

	get _siblingsWithIcon() {
		return this.associatedItem?._siblingsWithIcon;
	}

	get _focusable() {
		return true;
	}

	get _accInfo() {
		const accInfoSettings = {
			role: "menuitem",
			ariaHaspopup: this.associatedItem?.hasSubmenu ? HasPopup.Menu.toLowerCase() as Lowercase<HasPopup> : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}
}

MenuListItem.define();

export default MenuListItem;
