import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

// Template
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import CustomListItem from "./CustomListItem.js";
import ListItemType from "./types/ListItemType.js";
import type { AccessibilityAttributes } from "./ListItem.js";
import { ISelectMenuOption } from "./Interfaces.js";

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
 * @extends UI5Element
 * @implements {ISelectMenuOption}
 * @public
 * @since 1.17.0
 * @slot {Array<Node>} default  Defines the content of the component.
 */
@customElement({
	tag: "ui5-select-menu-option",
	renderer: litRender,
	styles: CustomListItem.styles,
	template: CustomListItemTemplate,
	dependencies: [],
})
class SelectMenuOption extends CustomListItem implements ISelectMenuOption {
	/**
	 * Defines the text, displayed inside the <code>ui5-select</code> input filed
	 * when the option gets selected.
	 *
	 * @public
	 */
	@property()
	displayText!: string;

	/**
	 * Defines the value of the <code>ui5-select</code> inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the <code>name</code> property of <code>ui5-select</code>.
	 *
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @default "Active"
	 * @public
	 * @deprecated
	 */
	@property({ type: ListItemType, defaultValue: ListItemType.Active })
	type!: `${ListItemType}`;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @public
	 * @deprecated
	 */
	@property({ type: Object })
	accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * <b>Note:</b> The property is inherited and not supported. If set, it won't take any effect.
	 *
	 * @public
	 * @deprecated
	 */
	@property({ type: Boolean })
	navigated!: boolean;

	/**
	 * <b>Note:</b> The slot is inherited and not supported. If set, it won't take any effect.
	 *
	 * @public
	 * @deprecated
	 */
	@slot()
	deleteButton!: Array<HTMLElement>;

	get stableDomRef() {
		return "";
	}

	get _accInfo() {
		const accInfoSettings = {
			ariaSelected: this.selected,
		};
		return { ...super._accInfo, ...accInfoSettings };
	}
}

SelectMenuOption.define();

export default SelectMenuOption;
