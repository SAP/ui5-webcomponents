import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

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
	get isCustom() {
		return true;
	}
}

OptionCustom.define();

export default OptionCustom;
