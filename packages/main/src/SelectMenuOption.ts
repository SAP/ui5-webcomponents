import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import type { IOption } from "./Select.js";

// Template
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import CustomListItem from "./CustomListItem.js";
import ListItemType from "./types/ListItemType.js";
import type { AccessibilityAttributes } from "./ListItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The code>ui5-select-menu-option</code> component represents an option in the <code>ui5-select-menu</code>.
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-select-menu-option</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SelectMenuOption.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SelectMenuOption
 * @extends sap.ui.webc.main.CustomListItem
 * @implements sap.ui.webc.main.ISelectMenuOption
 * @tagname ui5-select-menu-option
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-select-menu-option",
	renderer: litRender,
	styles: CustomListItem.styles,
	template: CustomListItemTemplate,
	dependencies: [],
})
class SelectMenuOption extends CustomListItem implements IOption {
	/**
	 * Defines the text, displayed inside the <code>ui5-select</code> input filed
	 * when the option gets selected.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.displayText
	 * @public
	 */
	@property()
	displayText!: string;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is hidden.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.disabled
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the value of the <code>ui5-select</code> inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the <code>name</code> property of <code>ui5-select</code>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.value
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @type {sap.ui.webc.main.types.ListItemType}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.type
	 * @defaultvalue "Active"
	 * @public
	 * @deprecated
	 */
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	type!: `${ListItemType}`;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @type {object}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.accessibilityAttributes
	 * @public
	 * @deprecated
	 */
	@property({ type: Object })
	accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @public
	 * @type {boolean}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.navigated
	 * @deprecated
	 */
	@property({ type: Boolean })
	navigated!: boolean;

	/**
	 * Defines the content of the component.
	 * <br><br>
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.default
	 * @slot
	 * @public
	 */

	/**
	 * <b>Note:</b> The slot is inherited and not supported. If set, it won't take any effect.
	 *
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.deleteButton
     * @type {Node[]}
	 * @slot
	 * @public
	 * @deprecated
	 */

	get _accInfo() {
		const accInfoSettings = {
			ariaSelected: this.selected,
		};
		return { ...super._accInfo, ...accInfoSettings };
	}
}

SelectMenuOption.define();

export default SelectMenuOption;
