import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import FormItemTemplate from "./generated/templates/FormItemTemplate.lit.js";

// Styles
import FormItemCss from "./generated/themes/FormItem.css.js";

import type { IFormItem } from "./Form.js";
import FormItemSpacing from "./types/FormItemSpacing.js";

/**
 * @class
 *
 * ### Overview
 *
 * The FormItem (ui5-form-item) represents pair of a label and
 * one or more components (text or text fields), associated to it.
 *
 * ### Usage
 *
 * The FormItem is being used in FormGroup (ui5-form-group) or directly in Form (ui5-form).
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/FormItem.js";
 *
 * @csspart layout - Used to style the parent element of the label and content parts.
 * @csspart label - Used to style the label part of the form item.
 * @csspart content - Used to style the content part of the form item.
 *
 * @constructor
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-form-item",
	renderer: litRender,
	styles: FormItemCss,
	template: FormItemTemplate,
})
class FormItem extends UI5Element implements IFormItem {
	/**
	 * Defines the column span of the component,
	 * e.g how many columns the component should span to.
	 *
	 * **Note:** The column span should be a number between 1 and the available columns of the FormGroup (when items are placed in a group)
	 * or the Form. The available columns can be affected by the FormGroup#columnSpan and/or the Form#layout.
	 * A number bigger than the available columns won't take effect.
	 *
	 * @default undefined
	 * @public
	 */
	@property({ validator: Integer, defaultValue: undefined })
	columnSpan?: number;

	/**
	 * Defines the label of the component.
	 * @public
	 */
	@slot()
	labelContent!: Array<HTMLElement>;

	/**
	 * Defines the content of the component,
	 * associated to `labelContent`.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
	})
	content!: Array<HTMLElement>;

	/**
	 * @private
	 */
	@property({ type: String, defaultValue: "S12 M4 L4 XL4" })
	labelSpan!: string;

	/**
	 * @private
	 */
	@property({ type: FormItemSpacing, defaultValue: FormItemSpacing.Normal })
	itemSpacing!: `${FormItemSpacing}`;

	get isGroup() {
		return false;
	}
}

FormItem.define();

export default FormItem;
