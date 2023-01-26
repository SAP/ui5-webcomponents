import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import type { ClassMap, ComponentStylesData } from "@ui5/webcomponents-base/dist/types.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItem from "./ListItem.js";
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import customListItemCss from "./generated/themes/CustomListItem.css.js";

/**
 * @class
 *
 * A component to be used as custom list item within the <code>ui5-list</code>
 * the same way as the standard <code>ui5-li</code>.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CustomListItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-li-custom
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
@customElement("ui5-li-custom")
class CustomListItem extends ListItem {
	/**
	 * Defines the text alternative of the component.
	 * Note: If not provided a default text alternative will be set, if present.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.CustomListItem.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the content of the component.
	 * @type {Node[]}
	 * @name sap.ui.webc.main.CustomListItem.prototype.default
	 * @slot
	 * @public
	 */

	static get template() {
		return CustomListItemTemplate;
	}

	static get styles(): ComponentStylesData {
		return [ListItem.styles, customListItemCss];
	}

	_onkeydown(e: KeyboardEvent) {
		const isTab = isTabNext(e) || isTabPrevious(e);

		if (!isTab && !this.focused) {
			return;
		}

		super._onkeydown(e);
	}

	_onkeyup(e: KeyboardEvent) {
		const isTab = isTabNext(e) || isTabPrevious(e);

		if (!isTab && !this.focused) {
			return;
		}

		super._onkeyup(e);
	}

	get classes(): ClassMap {
		const result = super.classes;

		result.main["ui5-custom-li-root"] = true;

		return result;
	}
}

CustomListItem.define();

export default CustomListItem;
