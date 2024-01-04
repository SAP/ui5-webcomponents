import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Title from "./Title.js";

import FormTemplate from "./generated/templates/FormTemplate.lit.js";

// Styles
import FormCss from "./generated/themes/Form.css.js";
import type FormItem from "./FormItem.js";
import type FormGroup from "./FormGroup.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-form</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Form.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Form
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-form
 * @public
 */
@customElement({
	tag: "ui5-form",
	renderer: litRender,
	styles: FormCss,
	template: FormTemplate,
	dependencies: [Title],
})
class Form extends UI5Element {
	@property({ type: Boolean })
	editable!: boolean;

	@property({ validator: Integer, defaultValue: 1 })
	columnsM!: number;

	@property({ validator: Integer, defaultValue: 2 })
	columnsL!: number;

	@property({ validator: Integer, defaultValue: 2 })
	columnsXL!: number;

	@property()
	headerText!: string;

	@slot({ type: HTMLElement })
	header!: Array<HTMLElement>;

	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
	})
	items!: Array<FormItem | FormGroup>;

	get hasCustomHeader() {
		return !!this.header.length;
	}

	get _ariaLabelledBy() {
		return this.hasCustomHeader ? undefined : `${this._id}-header-text`;
	}
}

Form.define();

export default Form;
