import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import type FormItem from "./FormItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The FormGroup (ui5-form-group) represents a group inside the Form (ui5-form) component
 * and it consists of FormItem (ui5-form-item) components.
 *
 * The layout of the FormGroup is mostly defined and controlled by the overarching Form (ui5-form) component.
 * Still, one can influence the layout via the FormGroup's <code>columnSpan</code> property,
 * that defines how many columns the group should expand to.
 *
 * <h3>Usage</h3>
 *
 * Тhe FormGroup (ui5-form-group) allows to split a Form into groups,
 * e.g to group FormItems that logically belong together.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/FormGroup.js";</code>
 *
 * @public
 * @since 1.23.0
 */
@customElement("ui5-form-group")
class FormGroup extends UI5Element {
	/**
	 * Defines header text of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines header text of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property({ validator: Integer, defaultValue: undefined })
	columnSpan!: number;

	/**
	 * Defines the items of the component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	items!: Array<FormItem>;

	/**
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 1 })
	colsS!: number;

	@property({ validator: Integer, defaultValue: 1 })
	colsM!: number;

	@property({ validator: Integer, defaultValue: 1 })
	colsL!: number;

	@property({ validator: Integer, defaultValue: 1 })
	colsXl!: number;

	@property()
	itemSpacing!: string;

	@property({ defaultValue: "S12 M4 L4 XL4" })
	labelSpan!: string;

	onBeforeRendering() {
		this.processFormItems();
	}

	processFormItems() {
		this.items.forEach((item: FormItem) => {
			item.labelSpan = this.labelSpan;
			item.itemSpacing = this.itemSpacing;
		});
	}

	get isGroup() {
		return true;
	}
}

FormGroup.define();

export default FormGroup;
