import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

// Template
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import CustomListItem from "./CustomListItem.js";
import ListItemType from "./types/ListItemType.js";
import type { ListItemAccessibilityAttributes as SelectMenuOptionAccessibilityAttributes } from "./ListItem.js";
import type { IButton } from "./Button.js";
import type { IOption } from "./Select.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-select-menu-option` component represents an option in the `ui5-select-menu`.
 *
 * ### Usage
 *
 * For the `ui5-select-menu-option`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/SelectMenuOption.js";`
 * @constructor
 * @extends CustomListItem
 * @implements {IOption}
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
class SelectMenuOption extends CustomListItem implements IOption {
	/**
	 * Defines the text, displayed inside the `ui5-select` input filed
	 * when the option gets selected.
	 * @default ""
	 * @public
	 */
	@property()
	displayText?: string;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is hidden.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare disabled

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default ""
	 * @public
	 */
	@property()
	value = "";

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default "Active"
	 * @public
	 * @deprecated
	 */
	@property()
	type: `${ListItemType}` = "Active";

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default undefined
	 * @public
	 * @deprecated
	 */
	@property({ type: Object })
	declare accessibilityAttributes: SelectMenuOptionAccessibilityAttributes;

	/**
	 * **Note:** The property is inherited and not supported. If set, it won't take any effect.
	 * @default false
	 * @public
	 * @deprecated
	 */
	@property({ type: Boolean })
	declare navigated

	/**
	 * **Note:** The slot is inherited and not supported. If set, it won't take any effect.
	 * @public
	 * @deprecated
	 */
	@slot()
	declare deleteButton: Array<IButton>;

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
export type {
	SelectMenuOptionAccessibilityAttributes,
};
