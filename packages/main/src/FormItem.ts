import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

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
 * <code>import @ui5/webcomponents/dist/FormItem.js";</code>
 *
 * @constructor
 * @public
 * @since 1.23.0
 */
@customElement({
	tag: "ui5-form-item",
	renderer: litRender,
	styles: FormItemCss,
	template: FormItemTemplate,
})
class FormItem extends UI5Element implements IFormItem {
	/**
	 * Defines the label of the component.
	 * @public
	 */
	@slot()
	labelContent!: Array<HTMLElement>;

	/**
	 * Defines the content of the component,
	 * associated to <code>labelContent</code>.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
	})
	fields!: Array<HTMLElement>;

	/**
	 * @private
	 */
	@property({ defaultValue: "S12 M4 L4 XL4" })
	labelSpan!: string;

	@property({ type: FormItemSpacing, defaultValue: FormItemSpacing.Normal })
	itemSpacing!: FormItemSpacing;

	get isGroup() {
		return false;
	}
}

FormItem.define();

export default FormItem;
