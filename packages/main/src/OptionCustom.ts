import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import type { IOption } from "./Select.js";
import ListItemBase from "./ListItemBase.js";

// Template
import OptionCustomTemplate from "./generated/templates/OptionCustomTemplate.lit.js";

// Styles
import optionBaseCss from "./generated/themes/OptionBase.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option-custom` component defines a custom content of an option in the `ui5-select`.
 * A component to be the same way as the standard `ui5-option`.
 * The component accepts arbitrary HTML content to allow full customization.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/OptionCustom.js";`
 * @constructor
 * @since 2.0.0
 * @extends ListItemBase
 * @implements {IOption}
 * @public
 */
@customElement({
	tag: "ui5-option-custom",
	template: OptionCustomTemplate,
	styles: [
		ListItemBase.styles,
		optionBaseCss,
	],
})
class OptionCustom extends ListItemBase implements IOption {
	/**
	 * Defines the text, displayed inside the `ui5-select` input filed
	 * when the option gets selected.
	 * @default ""
	 * @public
	 */
	@property()
	displayText!: string;

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	content!: Array<Node>;

	/**
	 * Defines the text of the tooltip that would be displayed for the list item.
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	tooltip!: string;

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	get effectiveDisplayText() {
		return this.displayText || this.textContent || "";
	}
}

OptionCustom.define();

export default OptionCustom;
