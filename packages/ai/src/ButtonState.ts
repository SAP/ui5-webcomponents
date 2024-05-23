import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-ai-button-state` is the item to use for defining states of `ui5-ai-button` components.
 *
 * ### Usage
 *
 * `ui5-si-button-state` is an abstract element, representing a state of `ui5-ai-button`. It is meant to be used in the `states` slot
 * of `ui5-ai-button` and should be used as standalone component.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/AiButtonState.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 2.0
 * @public
 */
@customElement("ui5-ai-button-state")

/**
 * @experimental
 */
class ButtonState extends UI5Element {
	/**
	 * Defines the key of the button state.
	 * @default ""
	 * @public
	 */
	@property()
	key!: string;

	/**
	 * Defines the key of the button state to switch when the button is being pressed.
	 * @default ""
	 * @public
	 */
	@property()
	nextState!: string;

	/**
	 * Defines the text of the button in this state.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component before the text.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component after the text.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	endIcon!: string;
}

ButtonState.define();
export default ButtonState;
