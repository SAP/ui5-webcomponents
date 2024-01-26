import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <h3>Usage</h3>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/FormStep.js";</code>
 *
 * @public
 */
@customElement("ui5-form-step")
class FormStep extends UI5Element {
	/**
	 * Defines the breakpoint of the current form step.
	 * Supported values are CSS sizes, such as px, rem, or one of the predefined breakpoints:
	 * <ul>
	 * 	* <li> XL (> 1439px)</li>
	 * <li> L (> 1023px)</li>
	 * <li> M (> 600px)</li>
	 * <li> S (< 600px)</li>
	 * </ul>
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	minWidth?: string; // or breakpoint

	/**
	 * Defines number of columns for the current form step.
	 *
	 * @public
	 * @default "1"
	 */
	@property({ validator: Integer, defaultValue: 1 })
	columns!: number;
}

FormStep.define();

export default FormStep;
