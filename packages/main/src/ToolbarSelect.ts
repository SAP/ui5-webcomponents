import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Templates
import Select, { IOption } from "./Select.js";
import Option from "./Option.js";
import { IToolbarItem } from "./Toolbar.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-select` component is used to create a toolbar drop-down list.
 * The items inside the `ui5-toolbar-select` define the available options by using the `ui5-toolbar-select-option` component.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarSelect.js";`
 *
 * `import "@ui5/webcomponents/dist/ToolbarSelectOption.js";` (comes with `ui5-toolbar-select`)
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar-select",
	dependencies: [Select, Option],
	styles: [
		Select.styles,
		ToolbarItemCss,
	],
})

class ToolbarSelect extends Select implements IToolbarItem {
	/**
	 * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
	 * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
	 * @public
	 * @default "Default"
	 */
	@property({ type: ToolbarItemOverflowBehavior, defaultValue: ToolbarItemOverflowBehavior.Default })
	overflowPriority!: `${ToolbarItemOverflowBehavior}`;

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the item.
	 * It will close by default.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	preventOverflowClosing!: boolean;

	@property({ type: Boolean })
	overflowed!: boolean;

	get toolbarDisplayText() {
		return this.selectedOption?.textContent || "";
	}

	get hasSubmenu() {
		return true;
	}

	get subMenuItems() {
		return this.options.map(option => {
			return {
				_id: option._id,
				displayText: option.textContent || "",
				onMenuItemClick: () => this.onSubMenuClick(option),
			};
		});
	}

	onSubMenuClick(option: IOption) {
		if (this.selectedOption === option) {
			return;
		}
		const currentOptionIndex = this.selectedOption ? this.options.indexOf(this.selectedOption) : -1;
		const newOptionIndex = this.options.indexOf(option);

		this._changeSelectedItem(currentOptionIndex, newOptionIndex);
	}
}

ToolbarSelect.define();

export default ToolbarSelect;
