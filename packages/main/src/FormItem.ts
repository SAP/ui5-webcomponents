import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Label from "./Label.js";
import { FormLabelPlacement } from "./Form.js";

import FormItemTemplate from "./generated/templates/FormItemTemplate.lit.js";

// Styles
import FormItemCss from "./generated/themes/FormItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-form-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/FormItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.FormItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-form-item
 * @public
 */
@customElement({
	tag: "ui5-form-item",
	renderer: litRender,
	styles: FormItemCss,
	template: FormItemTemplate,
	dependencies: [Label],
})
class FormItem extends UI5Element {
	@property({ validator: Integer, defaultValue: 4 })
	labelSpanS!: number;

	@property({ validator: Integer, defaultValue: 4 })
	labelSpanM!: number;

	@property({ validator: Integer, defaultValue: 4 })
	labelSpanL!: number;

	@property({ validator: Integer, defaultValue: 4 })
	labelSpanXl!: number;

	@property({ type: FormLabelPlacement, defaultValue: FormLabelPlacement.Auto })
	labelPlacement!: FormLabelPlacement;

	@slot()
	labelContent!: Array<HTMLElement>;

	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
	})
	fields!: Array<HTMLElement>;

	get isGroup() {
		return false;
	}
}

FormItem.define();

export default FormItem;
