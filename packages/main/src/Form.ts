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
import FormItemSpacing from "./types/FormItemSpacing.js";

const constructableStyleMap = new Map<string, CSSStyleSheet>();

const StepColumn = {
	"S": 1,
	"M": 2,
	"L": 3,
	"XL": 6,
};

interface IFormItem extends HTMLElement {
	labelSpan: string
	itemSpacing: FormItemSpacing;
	readonly isGroup: boolean;
	colsXl?: number;
	colsL?: number;
	colsM?: number;
	colsS?: number;
	columnSpan?: number;
}

type ItemsInfo = {
	item: IFormItem,
	classes: string,
	items: Array<FormItem>,
}

/**
 * @class
 *
 * <b>Note:</b> THE COMPONENT IS <b>EXPERIMENTAL</b> AND SUBJECT TO API AND INTERACTION CHANGES.
 * <br><br>
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The Form is a layout component that arranges labels and form fields (like input fields) pairs
 * into a specific number of columns.
 *
 * <h3>Structure</h3>
 *
 * <ul>
 * <li><b>Form</b> (<code>ui5-form</code>) is the top-level container component, responsible for the content layout and responsiveness.</li>
 * <li><b>FormGroup</b> (<code>ui5-form-group</code>) enables the grouping of the Form content.</li>
 * <li><b>FormItem</b> (<code>ui5-form-item</code>) is a pair of label and form fields and can be used directly in a Form, or as part of a FormGroup.</li>
 * </ul>
 *
 * The simplest Form (<code>ui5-form</code>) consists of a header area on top,
 * displaying a header text (see the <code>headingText</code> property) and content below - an arbitrary number of FormItems (ui5-form-item),
 * representing the pairs of label and form fields.
 *
 * And, there is also "grouping" available to assist the implementation of richer UIs.
 * This is enabled by the FormGroup (<code>ui5-form-group</code>) component.
 * In this case, the Form is structured into FormGroups and each FormGroup consists of FormItems.
 *
 * <h3>Responsiveness</h3>
 *
 * The Form component reacts and changes its layout on predefined breakpoints.
 * Depending on its size, the Form content (FormGroups and FormItems) gets divided into one or more columns as follows:
 * <ul>
 * <li> <b>S</b> (< 600px) – 1 column is recommended (default: 1)</li>
 * <li> <b>M</b> (600px - 1022px) – up to 2 columns are recommended (default: 1)</li>
 * <li> <b>L</b> (1023px - 1439px) - up to 3 columns are recommended (default: 2)</li>
 * <li> <b>XL</b> (> 1439px) – up to 6 columns are recommended (default: 2)</li>
 * </ul>
 * To change the layout, use the <code>layout</code> property - f.e. layout="S1 M2 L3 XL6".
 *
 * <h4>Groups distribution</h4>
 *
 * To make better use of screen space, there is built-in logic to calculate
 * how many columns should a FormGroup occupy.
 * <br>
 *
 * Example #1 (perfect match):
 * <br>
 * 4 columns and 4 groups: each group will use 1 column.
 * <br>
 *
 * Example #2 (balanced distribution):
 * <br>
 * 4 columns and 2 groups: each group will use 2 columns.
 * 6 columns and 2 groups: each group will use 3 columns.
 * <br>
 *
 * Example #3 (unbalanced distribution):
 * <br>
 * 3 columns and 2 groups: the larger one will use 2 columns, the smaller 1 column.
 * 5 columns and 3 groups: two of the groups will use 2 columns each, the smallest 1 column.
 * <br>
 * <b>Note:</b> The size of a group element is determined by the number of FormItems assigned to it.
 * In the case of equality, the first in the DOM will use more columns, and the last - fewer columns.
 * <br>
 *
 * Example #4 (more groups than columns):
 * <br>
 * 3 columns and 4 groups: each FormGroup uses only 1 column, the last FormGroup will wrap on the second row.
 *
 * <h4>Group column-span</h4>
 *
 * To influence the built-in group distribution, you can use the FormGroup's <code>columnSpan</code> property,
 * that defines how many columns the group should expand to.
 *
 *
 * <h4>Label placement</h4>
 *
 * The placement of the labels depends on the size of the used column.
 * If there is enough space, the labels are next to their associated fields, otherwise  - above the fields.
 * By default, the labels take 4/12 of the FormItem, leaving 8/12 parts to associated fields.
 * You can control what space the labels should take via the <code>labelSpan</code> property
 * <b>For example:</b> To always place the labels on top set: <code>labelSpan="S12 M12 L12 XL12"</code> property.
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Form.js";</code><br>
 * <code>import @ui5/webcomponents/dist/FormGroup.js";</code><br>
 * <code>import @ui5/webcomponents/dist/FormItem.js";</code><br>
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
	 * <li>for S - 1 column by default (1 column is recommended)</li>
	 * <li>for M - 1 column by default (up to 2 columns are recommended)</li>
	 * <li>for L - 2 columns by default (up to 3 columns are recommended)</li>
	 * <li>for XL - 2 columns by default (up to 6 columns  are recommended)</li>
	 * </ul>
	 *
	 * @default "S1 M1 L2 XL2"
	 * @public
	 */
	@property({ defaultValue: "S1 M1 L2 XL2" })
	layout!: string;

	/**
	 * Defines the width proportion of the labels and fields of a FormItem by breakpoint.
	 * <br><br>
	 *
	 * By default, the labels take 4/12 (or 1/3) of the form item in M,L and XL sizes,
	 * and 12/12 in S size, e.g in S the label is on top of its associated field.
	 * <br><br>
	 *
	 * The supported values are between 1 and 12.
	 * Greater the number, more space the label will use.
	 * <br><br>
	 *
	 * <b>Note:</b> If "12" is set, the label will be displayed on top of its assosiated field.
	 * @default "S12 M4 L4 XL4"
	 * @public
	 */
	@property({ defaultValue: "S12 M4 L4 XL4" })
	labelSpan!: string;

	/**
	 * Defines header text of the component.
	 * <br><br>
	 * <b>Note:</b> This property is overridden by the <code>header</code> slot.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Defines the vertical spacing between form items.
	 * <ul>
	 * <li> "Normal" - smaller vertical space between form items </li>
	 * <li> "Large" - greater vertical space between form items </li>
	 * </ul>
	 * <br>
	 *
	 * <b>Note:</b> If the Form is meant to be switched between "non-edit" (display only) and "edit" modes,
	 * we recommend using "Large" item spacing in "non-edit" mode, and "Normal" - for "edit" mode,
	 * to avoid "jumping" effect, caused by different hights of the simple texts in "non-edit" mode and input components in "edit" mode.
	 * @default "Normal"
	 * @public
	 */
	@property({ type: FormItemSpacing, defaultValue: FormItemSpacing.Normal })
	itemSpacing!: FormItemSpacing;

	/**
	 * Defines the component header area.
	 * <br><br>
	 *
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
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: true,
	})
	items!: Array<IFormItem>;

	/**
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 1 })
	columnsS!: number;
	@property({ validator: Integer, defaultValue: 12 })
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

	onBeforeRendering() {
		// Parse the layout and set it to the FormGroups/FormItems.
		this.setColumnLayout();

		// Parse the labelSpan and set it to the FormGroups/FormItems.
		this.setLabelSpan();

		// Define how many columns a group should take.
		this.setGroupsColSpan();

		// Create additional CSS for number of columns that are not supported by default.
		this.createAdditionalCSSStyleSheet();
	}

	setColumnLayout() {
		const layoutArr = this.layout.split(" ");
		layoutArr.forEach((breakpoint: string) => {
			if (breakpoint.startsWith("S")) {
				this.columnsS = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("M")) {
				this.columnsM = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("L")) {
				this.columnsL = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("XL")) {
				this.columnsXl = parseInt(breakpoint.slice(2));
			}
		});
	}

	setLabelSpan() {
		this.labelSpan.split(" ").forEach((breakpoint: string) => {
			if (breakpoint.startsWith("S")) {
				this.labelSpanS = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("M")) {
				this.labelSpanM = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("L")) {
				this.labelSpanL = parseInt(breakpoint.slice(1));
			} else if (breakpoint.startsWith("XL")) {
				this.labelSpanXl = parseInt(breakpoint.slice(2));
			}
		});

		this.items.forEach((item: IFormItem) => {
			item.labelSpan = this.labelSpan;
			item.itemSpacing = this.itemSpacing;
		});
	}

	setGroupsColSpan() {
		if (!this.hasGroupItems) {
			return;
		}

		const itemsCount = this.items.length;
		const sortedItems = [...this.items].sort((itemA: IFormItem, itemB: IFormItem) => {
			return (itemB as FormGroup)?.children?.length - (itemA as FormGroup)?.children?.length;
		});

		sortedItems.forEach((item: IFormItem, idx: number) => {
			item.colsXl = this.getGroupsColSpan(this.columnsXl, itemsCount, idx, item);
			item.colsL = this.getGroupsColSpan(this.columnsL, itemsCount, idx, item);
			item.colsM = this.getGroupsColSpan(this.columnsM, itemsCount, idx, item);
			item.colsS = this.getGroupsColSpan(this.columnsS, itemsCount, idx, item);
		});
	}

	getGroupsColSpan(cols: number, groups: number, index: number, group: IFormItem): number {
		// Case 0: column span is set from outside.
		if (group.columnSpan) {
			return group.columnSpan;
		}

		// CASE 1: The number of available columns match the number of groups, or only 1 column is available - each group takes 1 column.
		// For example: 1 column - 1 group, 2 columns - 2 groups, 3 columns - 3 groups, 4columns - 4 groups
		if (cols === 1 || cols <= groups) {
			return 1;
		}

		// CASE 2: The number of available columns IS multiple of the number of groups.
		// For example: 2 column - 1 group, 3 columns - 1 groups, 4 columns - 1 group, 4 columns - 2 groups
		if (cols % groups === 0) {
			return cols / groups;
		}

		// CASE 3: The number of available columns IS NOT multiple of the number of groups.
		const MIN_COL_SPAN = 1;
		const delta = cols - groups;

		// 7 cols & 4 groups => 2, 2, 2, 1
		if (delta <= groups) {
			return index < delta ? MIN_COL_SPAN + 1 : MIN_COL_SPAN;
		}

		// 7 cols & 3 groups => 3, 2, 2
		return index === 0 ? MIN_COL_SPAN + (delta - groups) + 1 : MIN_COL_SPAN + 1;
	}

	get hasGroupItems(): boolean {
		return this.items.some((item: IFormItem) => item.isGroup);
	}

	get hasCustomHeader(): boolean {
		return !!this.header.length;
	}

	get ariaLabelledByID(): string | undefined {
		return this.hasCustomHeader ? undefined : `${this._id}-header-text`;
	}

	get itemsInfo(): Array<ItemsInfo> {
		return this.items.map((item: IFormItem) => {
			return {
				item,
				classes: `ui5-form-column-spanL-${(item as FormGroup).colsL} ui5-form-column-spanXL-${(item as FormGroup).colsXl} ui5-form-column-spanM-${(item as FormGroup).colsM} ui5-form-column-spanS-${(item as FormGroup).colsS}`,
				items: Array.from((item as FormGroup).children) as Array<FormItem>,
			};
		});
	}

	createAdditionalCSSStyleSheet() {
		[
			{ breakpoint: "S", columns: this.columnsS },
			{ breakpoint: "M", columns: this.columnsM },
			{ breakpoint: "L", columns: this.columnsL },
			{ breakpoint: "XL", columns: this.columnsXl },
		].forEach(step => {
			const additionalStyleSheet = this.getAdditionalCSSStyleSheet(step.breakpoint, step.columns);
			if (additionalStyleSheet) {
				this.shadowRoot!.adoptedStyleSheets = [...this.shadowRoot!.adoptedStyleSheets, additionalStyleSheet];
			}
		});
	}

	getAdditionalCSSStyleSheet(step: string, colsNumber: number): CSSStyleSheet | undefined {
		if (StepColumn[step as keyof typeof StepColumn] >= colsNumber) {
			return;
		}

		const key = `${step}-${colsNumber}`;

		if (!constructableStyleMap.has(key)) {
			let containerQuery;
			let supporedColumnsNumber!: number;
			let stepSpanCSS = "";
			let cols = colsNumber;

			if (step === "S") {
				supporedColumnsNumber = StepColumn.S;
				containerQuery = `@container (max-width: 599px) {`;
			} else if (step === "M") {
				supporedColumnsNumber = StepColumn.M;
				containerQuery = `@container (width > 599px) and (width < 1024px) {`;
			} else if (step === "L") {
				supporedColumnsNumber = StepColumn.L;
				containerQuery = `@container (width > 1023px) and (width < 1439px) {`;
			} else if (step === "XL") {
				containerQuery = `@container (min-width: 1440px) {`;
				supporedColumnsNumber = StepColumn.XL;
			}

			while (cols > supporedColumnsNumber) {
				stepSpanCSS += `
				:host([columns-${step.toLocaleLowerCase()}="${cols}"]) .ui5-form-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}
				
				.ui5-form-column-span${step}-${cols} {
					grid-column: span ${cols};
				}
				.ui5-form-column-span${step}-${cols} .ui5-form-group-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}
				`;
				cols--;
			}

			const css = `${containerQuery}${stepSpanCSS}}`;
			const style = new CSSStyleSheet();
			style.replaceSync(css);
			constructableStyleMap.set(key, style);
		}

		return constructableStyleMap.get(key)!;
	}
}

Form.define();

export default Form;
export {
	IFormItem,
};
