import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuSeparatorTemplate from "./generated/templates/MenuSeparatorTemplate.lit.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import type { IMenuItem } from "./Menu.js";
/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @public
 * @since 2.0
 */
@customElement({
	tag: "ui5-menu-separator",
	renderer: litRender,
	styles: [menuSeparatorCss],
	template: menuSeparatorTemplate,
})

class MenuSeparator extends UI5Element implements IMenuItem {
	get isSeparator() {
		return true;
	}
}

MenuSeparator.define();

export default MenuSeparator;
