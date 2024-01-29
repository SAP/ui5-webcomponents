import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import StandardListItem from "./StandardListItem.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";

// Styles
import menuListItemCss from "./generated/themes/MenuListItem.css.js";

/**
 * @class
 *
 * @constructor
 * @extends ListItemBase
 * @since 1.21.3
 * @private
 */
@customElement({
	tag: "ui5-li-menu",
	template: StandardListItemTemplate,
	styles: [StandardListItem.styles, menuListItemCss],
})
class MenuListItem extends StandardListItem {
	get _focusable() {
		return true;
	}
}

MenuListItem.define();

export default MenuListItem;
