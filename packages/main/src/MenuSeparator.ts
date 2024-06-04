import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuSeparatorTemplate from "./generated/templates/MenuSeparatorTemplate.lit.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import ListItem from "./ListItem.js";
import { IMenuItem } from "./Menu.js";

/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 2.0
 */
@customElement({
	tag: "ui5-menu-separator",
	renderer: litRender,
	styles: [ListItem.styles, menuSeparatorCss],
	template: menuSeparatorTemplate,
	dependencies: [
	],
})
class MenuSeparator extends ListItem implements IMenuItem {
	/**
	 * Defines if the item is a separator.
	 * @default true
	 * @public
	 * @since 2.0
	 */
	get isSeparator(): boolean {
		return true;
	}

	/**
	 * @override
	 */
	get _focusable() {
		return false;
	}

	/**
	 * @override
	 */
	get isInactive() {
		return true;
	}
}

MenuSeparator.define();

export default MenuSeparator;
