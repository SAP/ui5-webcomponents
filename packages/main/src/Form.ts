import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import FormTemplate from "./generated/templates/FormTemplate.lit.js";

// Styles
import FormCss from "./generated/themes/Form.css.js";

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
	dependencies: [],
})
class Form extends UI5Element {
	@property()
	headerText!: string;

	@slot({ type: HTMLElement })
	header!: Array<HTMLElement>;

	get hasCustomHeader() {
		return !!this.header.length;
	}
}

Form.define();

export default Form;
