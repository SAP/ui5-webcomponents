import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";

// Template
import FormGroupTemplate from "./generated/templates/FormGroupTemplate.lit.js";

// Styles
import FormGroupCss from "./generated/themes/FormGroup.css.js";
import type FormItem from "./FormItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-form-group</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/FormGroup.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.FormGroup
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-form-group
 * @public
 */
@customElement({
	tag: "ui5-form-group",
	renderer: litRender,
	styles: FormGroupCss,
	template: FormGroupTemplate,
	dependencies: [],
})
class FormGroup extends UI5Element {
	@property()
	heading!: string;

	@property()
	colsXL!: number;

	@property()
	colsL!: number;

	@property()
	wide!: boolean;

	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: true,
	})
	items!: Array<FormItem>;

	get isGroup() {
		return true;
	}
	get formGroupRepresentation() {
		return executeTemplate(FormGroupTemplate, this);
	}
}

FormGroup.define();

export default FormGroup;
