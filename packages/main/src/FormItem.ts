import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

// Template
import FormItemTemplate from "./generated/templates/FormItemTemplate.lit.js";

// Styles
import FormItemCss from "./generated/themes/FormItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The FormItem (ui5-form-item) represents pair of a label and
 * one or more components (text or text fields), associated to it.
 *
 * <h3>Usage</h3>
 *
 * The FormItem is being used in FormGroup (ui5-form-group) or directly in Form (ui5-form).
 *
 * <h3>ES6 Module Import</h3>
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
class FormItem extends UI5Element {
	/**
	 * Defines the label of the component.
	 * @public
	 */
	@slot()
	labelContent!: Array<HTMLElement>;

	/**
	 * Defines the content of the component,
	 * assotiated to <code>labelContent</code>.
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
	@property({ validator: Integer, defaultValue: 4 })
	labelSpanS!: number;

	@property({ validator: Integer, defaultValue: 4 })
	labelSpanM!: number;

	@property({ validator: Integer, defaultValue: 4 })
	labelSpanL!: number;

	@property({ validator: Integer, defaultValue: 4 })
	labelSpanXl!: number;

	@property()
	itemSpacing!: string;

	get isGroup() {
		return false;
	}
}

FormItem.define();

export default FormItem;
