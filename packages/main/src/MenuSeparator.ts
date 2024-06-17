import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import menuSeparatorTemplate from "./generated/templates/MenuSeparatorTemplate.lit.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import ListItemBase from "./ListItemBase.js";
import CustomListItem from "./CustomListItem.js";
import type { IMenuItem } from "./Menu.js";
/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends ListItemBase
 * @implements {IMenuItem}
 * @public
 * @since 2.0
 */
@customElement({
	tag: "ui5-menu-separator",
	renderer: litRender,
	styles: [menuSeparatorCss],
	template: menuSeparatorTemplate,
	dependencies: [
		CustomListItem,
	],
})

class MenuSeparator extends ListItemBase implements IMenuItem {
	/**
	 * **Note:** This property is inherited and not supported. If set, it won't take any effect.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare selected: boolean;

	get isSeparator() {
		return true;
	}

	get classes(): ClassMap {
		return {
			main: {
				"ui5-menu-separator": true,
			},
		};
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
	get _pressable() {
		return false;
	}
}
MenuSeparator.define();

export default MenuSeparator;
