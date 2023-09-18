import { isTabNext, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
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
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li-custom</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>native-li - Used to style the main li tag of the list item</li>
 * <li>content - Used to style the content area of the list item</li>
 * <li>detail-button - Used to style the button rendered when the list item is of type detail</li>
 * <li>delete-button - Used to style the button rendered when the list item is in delete mode</li>
 * <li>radio - Used to style the radio button rendered when the list item is in single selection mode</li>
 * <li>checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CustomListItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-li-custom
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
@customElement({
	tag: "ui5-li-custom",
	template: CustomListItemTemplate,
	styles: [ListItem.styles, customListItemCss],
})
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
