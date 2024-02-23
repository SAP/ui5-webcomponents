import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import StandardListItem from "./StandardListItem.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";
import MenuItem from "./MenuItem.js";
import HasPopup from "./types/HasPopup.js";

// Styles
import menuListItemCss from "./generated/themes/MenuListItem.css.js";

/**
 * @class
 *
 * @constructor
 * @extends StandardListItem
 * @since 1.23.0
 * @private
 */
@customElement({
	tag: "ui5-menu-li",
	template: StandardListItemTemplate,
	styles: [StandardListItem.styles, menuListItemCss],
})
class MenuListItem extends StandardListItem {
	/**
	 * Defines the associated MenuItem instance
	 * @private
	 */
	@property({ type: Object })
	associatedItem?: MenuItem;

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

	_onfocusin(e: FocusEvent): void {
		super._onfocusin(e);

		this.fireEvent("item-focusin", { item: e.target });
	}

	override _onfocusout(e: FocusEvent): void {
		super._onfocusout(e);

		this.fireEvent("item-focusout", { item: e.target });
	}
}

MenuListItem.define();

export default MenuListItem;
