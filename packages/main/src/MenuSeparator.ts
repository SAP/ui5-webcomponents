import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuSeparatorTemplate from "./generated/templates/MenuSeparatorTemplate.lit.js";
// import menuItemCss from "./generated/themes/MenuItem.css.js";
import ListItem from "./ListItem.js";
// import type { IMenuItem } from "./Menu.js";

/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
@customElement({
	tag: "ui5-menu-separator",
	renderer: litRender,
	styles: [ListItem.styles],
	template: menuSeparatorTemplate,
	dependencies: [
	],
})
class MenuSeparator extends ListItem /* implements IMenuItem */ {
	get isSeparator() {
		return true;
	}
}

MenuSeparator.define();

export default MenuSeparator;
