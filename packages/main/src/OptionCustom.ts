import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import OptionBase from "./OptionBase.js";
import optionCustomCss from "./generated/themes/OptionCustom.css.js";

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
 * @extends OptionBase
 * @public
 */
@customElement({
	tag: "ui5-option-custom",
	styles: [
		optionCustomCss,
	],
})
class OptionCustom extends OptionBase {
	/**
	 * Defines the text, displayed inside the `ui5-select` input filed
	 * when the option gets selected.
	 * @default ""
	 * @public
	 */
	@property()
	displayText!: string;

	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	get isCustom() {
		return true;
	}

	get effectiveDisplayText() {
		return this.displayText || this.textContent || "";
	}
}

OptionCustom.define();

export default OptionCustom;
