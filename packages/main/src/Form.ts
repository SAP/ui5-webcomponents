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
import FormItemSpacing from "./types/FormItemSpacing.js";

const constructableStyleMap = new Map<string, CSSStyleSheet>();
const MAX_COLS_S = 1;
const MAX_COLS_L = 2;
const MAX_COLS_M = 2;
const MAX_COLS_XL = 6;

type ItemsInfo = {
	item: FormGroup | FormItem,
	classes: string,
	items: Array<FormItem>,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <b>Note:</b> The component is experimental and its subject to API changes.
 *
 * The Form is a layout component that arranges labels and form fields (like input fields) pairs
 * into specific number of columns.
 *
 * <h3>Structure</h3>
 *
 * <ul>
 * <li><b>Form</b> (<code>ui5-form</code>) is the top-level container component, responsible for the content layout and the resposiveness.</li>
 * <li><b>FormGroup</b> (<code>ui5-form-group</code>)  enables the grouping of the Form content.</li>
 * <li><b>FormItem</b> (<code>ui5-form-item</code>) is a pair of label and form field and can be used directly in a Form, or as part of a FormGroup.</li>
 * </ul>
 *
 * The simplest Form (<code>ui5-form</code>) consists of a header area on top,
 * displaying a header text (see the <code>headingText</code> property) or a custom header
 * and content below - arbitrary number of FormItems (ui5-form-item),
 * representing the pairs of label and form field.
 *
 * And, there is also "grouping" available to assist the implementation of richer UIs.
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
 * To change the layout, use the <code>layout</code> property - f.e. layout="S1 M2 L3 XL6".
 *
 * <h5>Groups distribution</h5>
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
 * <br>
 *
 * Example #3 (unbalanced distribution):
 * <br>
 * 3 columns and 2 groups: the larger one will use 2 columns, the smaller 1 column.
 * 5 columns and 3 groups: two of the groups will use 2 columns each, the smallest 1 column.
 * <br>
 * <b>Note:</b> The size of a group element is determined by the number of FormItems assigned to it.
 * In case of equality, the first in the DOM will use more columns and the last - less columns.
 * <br>
 *
 * Example #4 (more groups than columns):
 * <br>
 * 3 columns and 4 groups: each FormGroup uses only 1 column, the last FormGroup will wrap on the second row.
 *
 * <h5>Group column-span</h5>
 *
 * <h5>Label placement</h5>
 *
 * The placement of the labels depends on the size of the used column.
 * If there is enough space, the labels are next to their associated fields, otherwise  - above the fields.
 * By default, the labels take 4/12 of the FormItem, leaving 8/12 parts to associated fields.
 * You can control what space the labels should take via the <code>labelSpan</code> property
 * <b>For example:</b> To always place the labels on top set: <code>labelSpan="S12 M12 L12 XL12"</code> property.
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
 * <code>import @ui5/webcomponents/dist/FormStep.js";</code>
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
	 * @default "S1 M1 L2 XL2"
	 * @public
	 */
	@property()
	layout!: string;

	/**
	 * Defines the width proportion of the labels and fields of a FormItem by breakpoint.
	 * <br><br>
	 *
	 * By default, the labels take 4/12 (or 1/3) of the form item in M,L and XL sizes,
	 * and 12/12 in S size, e.g in S the label is on top of its assotiated field.
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
	@property()
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
	 * <br><br>
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
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	steps!: Array<FormStep>;

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

	onBeforeRendering() {
		this.setColumnLayout();
		this.setLabelSpan();
		this.setGroupsColSpan();
	}

	onAfterRendering() {
		if (this.hasCustomSteps) {
			this.createStepCSSStyleSheet();
		}
	}

	setColumnLayout() {
		if (this.hasCustomSteps) {
			this.steps.forEach((step: FormStep) => {
				if (step.minWidth === "S") {
					this.columnsS = step.columns;
				} else if (step.minWidth === "M") {
					this.columnsM = step.columns;
				} else if (step.minWidth === "L") {
					this.columnsL = step.columns;
				} else if (step.minWidth === "XL") {
					this.columnsXl = step.columns;
				}
			});
			return;
		}

		const layoutArr = this.layout.split(" ");
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

	setLabelSpan() {
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
			item.itemSpacing = this.itemSpacing;
		});
	}

	setGroupsColSpan() {
		if (!this.hasGroupItems) {
			return;
		}

		const itemsCount = this.items.length;
		const sortedItems = [...this.items].sort((itemA: FormGroup | FormItem, itemB: FormGroup | FormItem) => {
			return (itemB as FormGroup)?.children?.length - (itemA as FormGroup)?.children?.length;
		});

		sortedItems.forEach((item: FormGroup | FormItem, idx: number) => {
			(item as FormGroup).colsXl = this.getGroupsColSpan(this.columnsXl, itemsCount, idx, (item as FormGroup));
			(item as FormGroup).colsL = this.getGroupsColSpan(this.columnsL, itemsCount, idx, (item as FormGroup));
			(item as FormGroup).colsM = this.getGroupsColSpan(this.columnsM, itemsCount, idx, (item as FormGroup));
		});
	}

	getGroupsColSpan(cols: number, groups: number, index: number, group: FormGroup): number {
		if (group.columnSpan) {
			return group.columnSpan;
		}

		// The number of available columns match the number of groups, or only 1 column is available - each group takes 1 column.
		// For example: 1 column - 1 group, 2 columns - 2 groups, 3 columns - 3 groups, 4columns - 4 groups
		if (cols === 1 || cols <= groups) {
			return 1;
		}

		// The number of available columns IS multiple of the number of groups.
		// For example: 2 column - 1 group, 3 columns - 1 groups, 4 columns - 1 group, 4 columns - 2 groups
		if (cols % groups === 0) {
			return cols / groups;
		}

		// The number of available columns IS NOT multiple of the number of groups.
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
		return this.items.some((item: FormGroup | FormItem) => item.isGroup);
	}

	get hasCustomHeader(): boolean {
		return !!this.header.length;
	}

	get hasCustomSteps(): boolean {
		return !!this.steps.length;
	}

	get ariaLabelledByID(): string | undefined {
		return this.hasCustomHeader ? undefined : `${this._id}-header-text`;
	}

	get itemsInfo(): Array<ItemsInfo> {
		return this.items.map((item: FormGroup | FormItem) => {
			return {
				item,
				classes: `ui5-form-column-spanL-${(item as FormGroup).colsL} ui5-form-column-spanXL-${(item as FormGroup).colsXl} ui5-form-column-spanМ-${(item as FormGroup).colsM}`,
				items: Array.from((item as FormGroup).children) as Array<FormItem>,
			};
		});
	}

	createStepCSSStyleSheet() {
		if (this.columnsS > 1) {
			this.shadowRoot!.adoptedStyleSheets.push(this.getStepCSSStyleSheet("S", this.columnsS));
		}
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

	getStepCSS(step: string, colsNumber: number) {
		let containerQuery;
		let maxSupported!: number;

		if (step === "XL") {
			maxSupported = MAX_COLS_XL;
			containerQuery = `@container (min-width: 1440px) {`;
		} else if (step === "L") {
			maxSupported = MAX_COLS_L;
			containerQuery = `@container (width > 1023px) and (width < 1439px) {`;
		} else if (step === "M") {
			maxSupported = MAX_COLS_M;
			containerQuery = `@container (width > 599px) and (width < 1024px) {`;
		} else if (step === "S") {
			maxSupported = MAX_COLS_S;
			containerQuery = `@container (max-width: 599px) {`;
		}

		let stepSpanCSS = "";
		let cols = colsNumber;

		while (cols > maxSupported) {
			stepSpanCSS += `
			.ui5-form-column-span${step}-${cols} {
				grid-column: span ${cols};
			}
			.ui5-form-column-span${step}-${cols} .ui5-form-group-layout {
				grid-template-columns: repeat(${cols}, 1fr);
			}
			`;
			cols--;
		}

		return `
			${containerQuery}
			:host([columns-${step.toLocaleLowerCase()}="${cols}"]) .ui5-form-layout {
				grid-template-columns: repeat(${cols}, 1fr);
			}
			
			${stepSpanCSS}
		}`;
	}
}

Form.define();

export default Form;
