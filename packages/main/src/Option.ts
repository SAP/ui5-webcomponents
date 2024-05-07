import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import OptionBase from "./OptionBase.js";

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
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-option",
})
class Option extends OptionBase {
	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default null
	 * @public
	 */
	@property({ defaultValue: null })
	icon?: string | null;

	/**
	 * Defines the additional text displayed at the end of the option element.
	 * @default ""
	 * @public
	 * @since 1.3.0
	 */
	@property()
	additionalText!: string;
}

Option.define();

export default Option;
