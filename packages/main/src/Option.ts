import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { IOption } from "./Select.js";
import ListItemBase from "./ListItemBase.js";
import Icon from "./Icon.js";

// Template
import OptionTemplate from "./generated/templates/OptionTemplate.lit.js";

// Styles
import optionBaseCss from "./generated/themes/OptionBase.css.js";
import listItemIconCss from "./generated/themes/ListItemIcon.css.js";
import listItemAdditionalTextCss from "./generated/themes/ListItemAdditionalText.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option` component defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Option.js";`
 * @constructor
 * @extends ListItemBase
 * @implements {IOption}
 * @public
 */
@customElement({
	tag: "ui5-option",
	template: OptionTemplate,
	styles: [
		ListItemBase.styles,
		listItemAdditionalTextCss,
		listItemIconCss,
		optionBaseCss,
	],
	dependencies: [
		Icon,
	],
})
class Option extends ListItemBase implements IOption {
	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	text!: Array<Node>;

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the list item.
	 * @default ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalText!: string;

	/**
	 * Defines the text of the tooltip that would be displayed for the list item.
	 * @default ""
	 * @public
	 * @since 1.23.0
	 */
	@property({ type: String, defaultValue: "" })
	tooltip!: string;

	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	get displayIconBegin(): boolean {
		return !!this.icon;
	}

	get effectiveDisplayText() {
		return this.textContent || "";
	}
}

Option.define();

export default Option;
