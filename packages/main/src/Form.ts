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
import type FormStep from "./FormStep.js";

const constructableStyleMap = new Map<string, CSSStyleSheet>();

type ItemsInfo = {
	item: FormGroup | FormItem,
	classes: string,
	items: Array<FormItem>
}

enum ItemSpacing {
	"Normal" = "Normal",
	"Large" = "Large",
}

enum FormLabelPlacement {
	"Auto" = "Auto",
	"Side" = "Side",
	"Top" = "Top"
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The Form is a layout component that arranges labels and form fields (like input fields) pairs
 * into specific number of columns.
 *
 * <h3>Structure</h3>
 *
 * <ul>
 * <li><b>Form</b>(<code>ui5-form</code>) is the top-level container component, responsible for the content layout and the resposiveness.</li>
 * <li><b>FormGroup</b>(<code>ui5-form-group</code>)  enables the grouping of the Form content.</li>
 * <li><b>FormItem</b>(<code>ui5-form-item</code>) is a pair of label and form field and can be used directly in a Form, or as part of a FormGroup.</li>
 * </ul>
 *
 * The simplest Form (<code>ui5-form</code>) consists of a header area on top,
 * displaying a header text (see the <code>headingText</code> property) or a custom header.
 * And, content below - arbitrary number of FormItems (ui5-form-item),
 * representing the pairs of label and form field.
 *
 * However, there is also "grouping" available to assist the implementation of richer UIs.
 * This is enabled by the FormGroup (<code>ui5-form-group</code>) component.
 * In this case, the Form is structured into FormGroups and each FormGroup consists of FormItems.
 *
 * <h3>Responsiveness</h3>
 *
 * The Form component reacts and changes its layout on perdefined breakpoints.
 * Depending on its size, the Form content (FormGroups and FormItems) gets divided into one or more columns as follows:
 * <ul>
 * <li> XL (> 1439px) – up to 6 columns (default: 2)</li>
 * <li> L (1023px - 1439px) - up to 3 columns (default: 2)</li>
 * <li> M (600px - 1022px) – up to 2 columns (default: 1)</li>
 * <li> S (< 600px) – 1 column</li>
 * </ul>
 *
 * <h5>Layout</h5>
 *
 * By default, the Form content will be distributed into 2 columns for "XL" and "L" breakpoints
 * and inside 1 column for "M" and "S" breakpoints.
 * To change the layout, use the <code>layout</code> property - f.e. layout="S1 M2 L3 XL6".
 *
 * <h5>Groups distribution</h5>
 *
 * To make better use of screen space, there is built-in logic to calculate
 * how many columns should a FormGroup occupy.
 * <br><br>
 *
 * Example (perfect match):
 * <br>
 * 4 columns and 4 groups: each group will use 1 column.
 * <br><br>
 *
 * Example (balanced distribution):
 * <br>
 * 4 columns and 2 groups: each group will use 2 columns.
 * <br><br>
 *
 * Example (unbalanced distribution):
 * <br>
 * 3 columns and 2 groups: the larger one will use 2 columns, the smaller 1 column.
 * 5 columns and 3 groups: two of the groups will use 2 columns each, the smallest 1 column.
 * <br>
 * <b>Note:</b> The size of a group element is determined by the number of FormItems assigned to it.
 * In case of equality, the first in the DOM will use more columns and the last - less columns.
 * <br><br>
 *
 * Example (more groups than columns):
 * <br>
 * 3 columns and 4 groups: each FormGroup uses only 1 column, the last FormGroup will wrap on the second row.
 *
 * <h5>Label placement</h5>
 *
 * The placement of the labels and fields depends on the size of the used column.
 * If there is enough space, the labels are next to the fields, otherwise above the fields.
 * However, you can enforce "Inline" or "Vertical" placement via the <code>labelPlacement</code> property.
 *
 * <h3>Custom Responinsiveness</h3>
 *
 * <h3>Usage</h3>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Form.js";</code>
 * <code>import @ui5/webcomponents/dist/FormGroup.js";</code>
 * <code>import @ui5/webcomponents/dist/FormItem.js";</code>
 *
 * @public
 * @since 1.23
 */
@customElement({
	tag: "ui5-form",
	renderer: litRender,
	styles: FormCss,
	template: FormTemplate,
	dependencies: [Title],
})
class Form extends UI5Element {
	/**
	 * Defines the number of columns to distribute the content by breakpoint.
	 * <br><br>
	 *
	 * Supported values:
	 * <ul>
	 * <li>for S - always 1 column, e.g. S1.</li>
	 * <li>for M - up to 2 columns, e.g. M1 and M2.</li>
	 * <li>for L - up to 3 columns, e.g. L1, L2 and L3.</li>
	 * <li>for XL - up to 6 columns, e.g. XL1, XL2...XL6.</li>
	 * </ul>
	 *
	 * @defaultvalue "S1 M1 L2 XL2"
	 * @public
	 */
	@property()
	layout!: string;

	/**
	 * Defines the width proportion of the labels and fields of a FormItem by breakpoint.
	 * <br><br>
	 *
	 * The supported values are between 1 and 12. Greater the number, more space the label will use.
	 * <br>
	 * <b>Note:</b> If "12" is set, the label will be displayed on top of its corresponding field.
	 * @defaultvalue "S12 M4 L4 XL4"
	 * @public
	 */
	@property()
	labelSpan!: string;

	/**
	 * Defines header text of the component.
	 * <br><br>
	 * <b>Note:</b> This property is overridden by the <code>header</code> slot.
	 *
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the vertical spacing between form items:
	 * <ul>
	 * <li> "Normal" - </li>
	 * <li> "Large" - </li>
	 * </ul>
	 *
	 * @defaultvalue "Normal"
	 * @public
	 */
	@property({ type: ItemSpacing, defaultValue: ItemSpacing.Normal })
	itemSpacing!: ItemSpacing;

	/**
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 1 })
	columnsS!: number;
	@property({ validator: Integer, defaultValue: 4 })
	labelSpanS!: number;

	@property({ validator: Integer, defaultValue: 1 })
	columnsM!: number;
	@property({ validator: Integer, defaultValue: 4 })
	labelSpanM!: number;

	@property({ validator: Integer, defaultValue: 2 })
	columnsL!: number;
	@property({ validator: Integer, defaultValue: 4 })
	labelSpanL!: number;

	@property({ validator: Integer, defaultValue: 2 })
	columnsXl!: number;
	@property({ validator: Integer, defaultValue: 4 })
	labelSpanXl!: number;

	/**
	 * Defines the placement of the labels of the FormItems.
	 *
	 * <ul>
	 * <li> "Side" - the labels are displayed next to the form fields.</li>
	 * <li> "Top" - th elabels are displayed on top of the form fields.</li>
	 * <li> "Auto" - label switches between side and top placement, based on the available space.</li>
	 * </ul>
	 * @defaultvalue "Auto"
	 * @public
	 */
	@property({ type: FormLabelPlacement, defaultValue: FormLabelPlacement.Auto })
	labelPlacement!: FormLabelPlacement;

	/**
	 * Defines the component header area.
	 * <br><br>
	 * <b>Note:</b> When a <code>header</code> is provided, the <code>headerText</code> property is ignored.
	 * @public
	 */
	@slot({ type: HTMLElement })
	header!: Array<HTMLElement>;

	/**
	 * Defines the component content by using FormGroups and/or FormItems.
	 * <br><br>
	 *
	 * <b>Note:</b>  Mixing FormGroups that consists of ForItems and standalone FormItems (not belonging to a group) is not supported.
	 * Either use FormGroups and make sure all FormItems are part of a FormGroup, or use just FormItems without any FormGroups.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
	})
	items!: Array<FormItem | FormGroup>;

	/**
	 * Defines custom responsive steps - breakpoint and/or number of columns.
	 * <br><br>
	 *
	 * <b>Example:</b> Re-define the colmns for the existing breakpoints
	 * <br><br>
	 * &lt;ui5-form-step breakpoint="S" columns="1">&lt;/>
	 * &lt;ui5-form-step breakpoint="M" columns="3" (normally up to 2 columns)
	 * &lt;ui5-form-step breakpoint="L" columns="4" (normally up to 3 columns)
	 * &lt;ui5-form-step breakpoint="XL" columns="6"
	 * <br><br>
	 *
	 * <b>Example:</b> Comletely redefine the resposnsiveness by defininf both the breakpoints and the respective number of columns.
	 * <br><br>
	 * &lt;ui5-form-step breakpoint="700px" columns="1">&lt/ui5-form-step>
	 * &lt;ui5-form-step breakpoint="1100px" columns="3">&lt/ui5-form-step>
	 * &lt;ui5-form-step breakpoint="1400px" columns="5">&lt/ui5-form-step>
	 * &lt;ui5-form-step breakpoint="XL" columns="6">&lt/ui5-form-step>
	 * <br><br>
	 *
	 * <b>Note:</b> When <code>steps</code> is used, the <code>layout</code> property will be ignored.
	 * @public
	 */
	@slot()
	steps!: Array<FormStep>;

	onBeforeRendering(): void {
		if (this.steps.length) {
			this.parseSteps();
		} else {
			this.parseLayout(this.layout);
		}
		this.setLabelSpans();
		this.setLabelPlacement();
		this.setGroupsColSpan();
	}

	onAfterRendering(): void {
		if (this.steps.length) {
			this.createStepCSSStyleSheet();
		}
	}

	parseSteps() {
		this.steps.forEach((step: FormStep) => {
			if (step.minWidth === "M") {
				this.columnsM = step.columns;
			} else if (step.minWidth === "L") {
				this.columnsL = step.columns;
			} else if (step.minWidth === "XL") {
				this.columnsXl = step.columns;
			}
		});
	}

	parseLayout(layout: string) {
		const layoutArr = layout.split(" ");
		layoutArr.forEach((breakpont: string) => {
			if (breakpont.startsWith("M")) {
				this.columnsM = parseInt(breakpont.slice(1));
			} else if (breakpont.startsWith("L")) {
				this.columnsL = parseInt(breakpont.slice(1));
			} else if (breakpont.startsWith("XL")) {
				this.columnsXl = parseInt(breakpont.slice(2));
			}
		});
	}

	setLabelSpans() {
		this.labelSpan.split(" ").forEach((breakpont: string) => {
			if (breakpont.startsWith("S")) {
				this.labelSpanS = parseInt(breakpont.slice(1));
			} else if (breakpont.startsWith("M")) {
				this.labelSpanM = parseInt(breakpont.slice(1));
			} else if (breakpont.startsWith("L")) {
				this.labelSpanL = parseInt(breakpont.slice(1));
			} else if (breakpont.startsWith("XL")) {
				this.labelSpanXl = parseInt(breakpont.slice(2));
			}
		});

		this.items.forEach((item: FormItem | FormGroup) => {
			item.labelSpanS = this.labelSpanS;
			item.labelSpanM = this.labelSpanM;
			item.labelSpanL = this.labelSpanL;
			item.labelSpanXl = this.labelSpanXl;
		});
	}

	setLabelPlacement() {
		this.items.forEach((item: FormItem | FormGroup) => {
			item.labelPlacement = this.labelPlacement;
		});
	}

	getGroupsColumnsSpan() {
		const itemsCount = this.items.length;
		let colsXl: number | undefined,
			colsL: number | undefined,
			colsM: number | undefined;

		// The number of available columns match the number of groups, or only 1 column is available - each group takes 1 column.
		// For example: 1 column - 1 group, 2 columns - 2 groups, 3 columns - 3 groups, 4columns - 4 groups
		if (this.columnsXl === 1 || this.columnsXl <= itemsCount) {
			colsXl = 1;
		}
		if (this.columnsL === 1 || this.columnsL <= itemsCount) {
			colsL = 1;
		}
		if (this.columnsM === 1 || this.columnsM <= itemsCount) {
			colsM = 1;
		}

		// The number of available columns IS multiple of the number of groups.
		// For example: 2 column - 1 group, 3 columns - 1 groups, 4 columns - 1 group, 4 columns - 2 groups
		if (!colsXl && this.columnsXl % itemsCount === 0) {
			colsXl = this.columnsXl / itemsCount;
		}
		if (!colsL && this.columnsL % itemsCount === 0) {
			colsL = this.columnsL / itemsCount;
		}
		if (!colsM && this.columnsM % itemsCount === 0) {
			colsM = this.columnsM / itemsCount;
		}

		// The number of available columns IS NOT multiple of the number of groups.
		// For example: 5 columns - 3 groups, 5 columns - 4 groups, 4 columns - 3 groups, 3 columns - 2 groups
		// Items will be sorted by the number of fields and ones with more fields will be given more columns.

		return { colsM, colsL, colsXl };
	}

	setGroupsColSpan() {
		if (!this.hasGroups) {
			return;
		}

		const { colsM, colsL, colsXl } = this.getGroupsColumnsSpan();
		const itemsCount = this.items.length;

		const sortedItems = [...this.items].sort((itemA: FormGroup | FormItem, itemB: FormGroup | FormItem) => {
			return (itemB as FormGroup)?.children?.length - (itemA as FormGroup)?.children?.length;
		});

		sortedItems.forEach((formGroup: FormGroup | FormItem, index: number) => {
			if (colsXl) {
				(formGroup as FormGroup).colsXl = colsXl;
			} else {
				(formGroup as FormGroup).colsXl = index < this.columnsXl - itemsCount ? 2 : 1;
			}

			if (colsL) {
				(formGroup as FormGroup).colsL = colsL;
			} else {
				(formGroup as FormGroup).colsL = index < this.columnsL - itemsCount ? 2 : 1;
			}

			if (colsM) {
				(formGroup as FormGroup).colsM = colsM;
			} else {
				(formGroup as FormGroup).colsM = index < this.columnsM - itemsCount ? 2 : 1;
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

	get itemsInfo(): Array<ItemsInfo> {
		return this.items.map((item: FormGroup | FormItem) => {
			return {
				item,
				classes: `ui5-form-column-spanL-${(item as FormGroup).colsL || 1} ui5-form-column-spanXL-${(item as FormGroup).colsXl || 1}`,
				items: Array.from((item as FormGroup).children) as Array<FormItem>,
			};
		});
	}

	createStepCSSStyleSheet() {
		if (this.columnsM > 2) {
			this.shadowRoot!.adoptedStyleSheets.push(this.getStepCSSStyleSheet("M", this.columnsM));
		}
		if (this.columnsL > 3) {
			this.shadowRoot!.adoptedStyleSheets.push(this.getStepCSSStyleSheet("L", this.columnsL));
		}
		if (this.columnsXl > 6) {
			this.shadowRoot!.adoptedStyleSheets.push(this.getStepCSSStyleSheet("XL", this.columnsXl));
		}
	}

	getStepCSSStyleSheet(step: string, cols: number) {
		const css = this.getStepCSS(step, cols);
		const key = `${step}-${cols}`;

		if (!constructableStyleMap.has(key)) {
			const style = new CSSStyleSheet();
			style.replaceSync(css);
			constructableStyleMap.set(key, style);
		}
		return constructableStyleMap.get(key)!;
	}

	getStepCSS(step: string, cols: number) {
		let containerQuery;

		if (step === "XL") {
			containerQuery = `@container (min-width: 1440px) {`;
		} else if (step === "L") {
			containerQuery = `@container (width > 1023px) and (width < 1439px) {`;
		} else if (step === "M") {
			containerQuery = `@container (width > 599px) and (width < 1024px) {`;
		} else if (step === "S") {
			containerQuery = `@container (max-width: 599px) {`;
		}

		return `
			${containerQuery}
			:host([columns-${step.toLocaleLowerCase()}="${cols}"]) .ui5-form-layout {
				grid-template-columns: repeat(${cols}, 1fr);
			}
			
			.ui5-form-column-span${step}-${cols} {
					grid-column: span ${cols};
			}
			
			.ui5-form-column-span${step}-${cols}.ui5-form-group-layout {
					grid-template-columns: repeat(${cols}, 1fr);
			}
		}`;
	}
}

Form.define();

export default Form;
export {
	FormLabelPlacement,
};
