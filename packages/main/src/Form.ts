import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import FormTemplate from "./generated/templates/FormTemplate.lit.js";

// Styles
import FormCss from "./generated/themes/Form.css.js";

import Title from "./Title.js";
import type FormItem from "./FormItem.js";
import type FormGroup from "./FormGroup.js";

type ItemsInfo = {
	item: FormGroup | FormItem,
	classes: string,
	items: Array<FormItem>
}

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
	columnsXl!: number;

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

	onAfterRendering() {
		this.calcGroupsDistribution();
	}

	calcGroupsDistribution() {
		if (this.items.length === 0 || !this.hasGroups) {
			return this.items;
		}

		// The number of available columns is less than number of the groups
		// For example: 4 columns - 5 groups, 3 columns - 4 groups, 2 columns - 3 groups, 1 column - 2 groups
		if (this.columnsXl < this.items.length) {
			console.warn(`Number of columns ${this.columnsXl} is less than the groups - groups that don't fit will be displayed on a second row`); // eslint-disable-line
			return this.items;
		}

		// The number of available columns match the number of groups, or only 1 column is available - each group takes 1 column.
		// For example: 1 column - 1 group, 2 columns - 2 groups, 3 columns - 3 groups, 4columns - 4 groups
		if (this.columnsXl === 1 || this.columnsXl === this.items.length) {
			this.balancedDistribution(/* 1 column */);
			return this.items;
		}

		// The number of available columns IS multiple of the number of groups - groups won't take even number of columns and it's subject to further calculation.
		// Groups with more fields should take more columns. In case of parity the first group will get priority.
		// For example: 4 columns - 3 groups, 3 columns - 2 groups
		if (this.columnsXl - this.items.length === 1) {
			this.unbalancedDistribution();
		}

		return this.items;
	}

	balancedDistribution(cols = 1) {
		this.items.forEach((formGroup: FormGroup | FormItem) => {
			(formGroup as FormGroup).colsXl = cols;
		});
	}

	unbalancedDistribution() {
		const sortedItems = [...this.items].sort((itemA: FormGroup | FormItem, itemB: FormGroup | FormItem) => {
			return (itemB as FormGroup)?.children?.length - (itemA as FormGroup)?.children?.length;
		});

		sortedItems.forEach((formGroup: FormGroup | FormItem, idx: number) => {
			if (idx === 0) {
				(formGroup as FormGroup).colsXl = 2;
			} else {
				(formGroup as FormGroup).colsXl = 1;
			}
		});
	}

	get hasGroups(): boolean {
		return this.items.some((item: FormGroup | FormItem) => item.isGroup);
	}

	get hasCustomHeader(): boolean {
		return !!this.header.length;
	}

	get _ariaLabelledBy(): string | undefined {
		return this.hasCustomHeader ? undefined : `${this._id}-header-text`;
	}

	get itemsInfo() {
		const info: Array<ItemsInfo> = this.calcGroupsDistribution().map((item: FormGroup | FormItem) => {
			return {
				item,
				classes: `ui5-form-column-spanL-${(item as FormGroup).colsL || 1} ui5-form-column-spanXL-${(item as FormGroup).colsXl || 1}`,
				items: Array.from((item as FormGroup).children) as Array<FormItem>,
			};
		});

		return info;
	}
}

Form.define();

export default Form;
