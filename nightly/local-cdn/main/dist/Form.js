var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
// Template
import FormTemplate from "./generated/templates/FormTemplate.lit.js";
// Styles
import FormCss from "./generated/themes/Form.css.js";
import Title from "./Title.js";
const additionalStylesMap = new Map();
const StepColumn = {
    "S": 1,
    "M": 2,
    "L": 3,
    "XL": 6,
};
/**
 * @class
 *
 * ### Overview
 *
 * The Form is a layout component that arranges labels and form fields (like input fields) pairs
 * into a specific number of columns.
 *
 * ### Structure
 *
 * - **Form** (`ui5-form`) is the top-level container component, responsible for the content layout and responsiveness.
 * - **FormGroup** (`ui5-form-group`) enables the grouping of the Form content.
 * - **FormItem** (`ui5-form-item`) is a pair of label and form fields and can be used directly in a Form, or as part of a FormGroup.
 *
 * The simplest Form (`ui5-form`) consists of a header area on top,
 * displaying a header text (see the `headingText` property) and content below - an arbitrary number of FormItems (ui5-form-item),
 * representing the pairs of label and form fields.
 *
 * And, there is also "grouping" available to assist the implementation of richer UIs.
 * This is enabled by the FormGroup (`ui5-form-group`) component.
 * In this case, the Form is structured into FormGroups and each FormGroup consists of FormItems.
 *
 *  ### Responsiveness
 *
 * The Form component reacts and changes its layout on predefined breakpoints.
 * Depending on its size, the Form content (FormGroups and FormItems) gets divided into one or more columns as follows:
 * - **S** (< 600px) – 1 column is recommended (default: 1)
 * - **M** (600px - 1022px) – up to 2 columns are recommended (default: 1)
 * - **L** (1023px - 1439px) - up to 3 columns are recommended (default: 2)
 * - **XL** (> 1439px) – up to 6 columns are recommended (default: 2)
 *
 * To change the layout, use the `layout` property - f.e. layout="S1 M2 L3 XL6".
 *
 * ### Groups
 *
 * To make better use of screen space, there is built-in logic to determine how many columns should a FormGroup occupy.
 *
 * - **Example #1** (perfect match):
 * 4 columns and 4 groups: each group will use 1 column.
 *
 * - **Example #2** (balanced distribution):
 * 4 columns and 2 groups: each group will use 2 columns.
 * 6 columns and 2 groups: each group will use 3 columns.
 *
 * - **Example #3** (unbalanced distribution):
 * 3 columns and 2 groups: the larger one will use 2 columns, the smaller 1 column.
 * 5 columns and 3 groups: two of the groups will use 2 columns each, the smallest 1 column.
 *
 * **Note:** The size of a group element is determined by the number of FormItems assigned to it.
 * In the case of equality, the first in the DOM will use more columns, and the last - fewer columns.
 *
 * - **Example #4** (more groups than columns):
 * 3 columns and 4 groups: each FormGroup uses only 1 column, the last FormGroup will wrap on the second row.
 *
 * ### Groups Column Span
 *
 * To influence the built-in group distribution, described in the previous section,
 * you can use the FormGroup's `columnSpan` property, that defines how many columns the group should expand to.
 *
 * ### Items Column Span
 *
 * FormItem's columnSpan property defines how many columns the form item should expand to inside a form group or the form.
 *
 * ### Items Label Span
 *
 * The placement of the labels depends on the size of the used column.
 * If there is enough space, the labels are next to their associated fields, otherwise  - above the fields.
 * By default, the labels take 4/12 of the FormItem, leaving 8/12 parts to associated fields.
 * You can control what space the labels should take via the `labelSpan` property.
 *
 * **For example:** To always place the labels on top set: `labelSpan="S12 M12 L12 XL12"` property.
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/Form.js";
 * - import @ui5/webcomponents/dist/FormGroup.js";
 * - import @ui5/webcomponents/dist/FormItem.js";
 *
 * @csspart header - Used to style the wrapper of the header.
 * @csspart layout - Used to style the element defining the form column layout.
 * @csspart column - Used to style a single column of the form column layout.
 *
 * @public
 * @since 2.0.0
 * @experimental This component is availabe since 2.0 under an experimental flag and its API and behaviour are subject to change.
 * @extends UI5Element
 */
let Form = class Form extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the number of columns to distribute the form content by breakpoint.
         *
         * Supported values:
         * - `S` - 1 column by default (1 column is recommended)
         * - `M` - 1 column by default (up to 2 columns are recommended)
         * - `L` - 2 columns by default (up to 3 columns are recommended)
         * - `XL` - 2 columns by default (up to 6 columns  are recommended)
         *
         * @default "S1 M1 L2 XL2"
         * @public
         */
        this.layout = "S1 M1 L2 XL2";
        /**
         * Defines the width proportion of the labels and fields of a FormItem by breakpoint.
         *
         * By default, the labels take 4/12 (or 1/3) of the form item in M,L and XL sizes,
         * and 12/12 in S size, e.g in S the label is on top of its associated field.
         *
         * The supported values are between 1 and 12. Greater the number, more space the label will use.
         *
         * **Note:** If "12" is set, the label will be displayed on top of its assosiated field.
         * @default "S12 M4 L4 XL4"
         * @public
         */
        this.labelSpan = "S12 M4 L4 XL4";
        /**
         * Defines the vertical spacing between form items.
         *
         * **Note:** If the Form is meant to be switched between "non-edit" and "edit" modes,
         * we recommend using "Large" item spacing in "non-edit" mode, and "Normal" - for "edit" mode,
         * to avoid "jumping" effect, caused by the hight difference between texts in "non-edit" mode and the input fields in "edit" mode.
         *
         * @default "Normal"
         * @public
         */
        this.itemSpacing = "Normal";
        /**
         * @private
         */
        this.columnsS = 1;
        this.labelSpanS = 12;
        this.columnsM = 1;
        this.labelSpanM = 4;
        this.columnsL = 2;
        this.labelSpanL = 4;
        this.columnsXl = 2;
        this.labelSpanXl = 4;
    }
    onBeforeRendering() {
        // Parse the layout and set it to the FormGroups/FormItems.
        this.setColumnLayout();
        // Parse the labelSpan and set it to the FormGroups/FormItems.
        this.setLabelSpan();
        // Define how many columns a group should take.
        this.setGroupsColSpan();
    }
    onAfterRendering() {
        // Create additional CSS for number of columns that are not supported by default.
        this.createAdditionalCSSStyleSheet();
    }
    setColumnLayout() {
        const layoutArr = this.layout.split(" ");
        layoutArr.forEach((breakpoint) => {
            if (breakpoint.startsWith("S")) {
                this.columnsS = parseInt(breakpoint.slice(1));
            }
            else if (breakpoint.startsWith("M")) {
                this.columnsM = parseInt(breakpoint.slice(1));
            }
            else if (breakpoint.startsWith("L")) {
                this.columnsL = parseInt(breakpoint.slice(1));
            }
            else if (breakpoint.startsWith("XL")) {
                this.columnsXl = parseInt(breakpoint.slice(2));
            }
        });
    }
    setLabelSpan() {
        this.labelSpan.split(" ").forEach((breakpoint) => {
            if (breakpoint.startsWith("S")) {
                this.labelSpanS = parseInt(breakpoint.slice(1));
            }
            else if (breakpoint.startsWith("M")) {
                this.labelSpanM = parseInt(breakpoint.slice(1));
            }
            else if (breakpoint.startsWith("L")) {
                this.labelSpanL = parseInt(breakpoint.slice(1));
            }
            else if (breakpoint.startsWith("XL")) {
                this.labelSpanXl = parseInt(breakpoint.slice(2));
            }
        });
        this.items.forEach((item) => {
            item.labelSpan = this.labelSpan;
            item.itemSpacing = this.itemSpacing;
        });
    }
    setGroupsColSpan() {
        if (!this.hasGroupItems) {
            return;
        }
        const itemsCount = this.items.length;
        const sortedItems = [...this.items].sort((itemA, itemB) => {
            return itemB?.items.length - itemA?.items.length;
        });
        sortedItems.forEach((item, idx) => {
            item.colsXl = this.getGroupsColSpan(this.columnsXl, itemsCount, idx, item);
            item.colsL = this.getGroupsColSpan(this.columnsL, itemsCount, idx, item);
            item.colsM = this.getGroupsColSpan(this.columnsM, itemsCount, idx, item);
            item.colsS = this.getGroupsColSpan(this.columnsS, itemsCount, idx, item);
        });
    }
    getGroupsColSpan(cols, groups, index, group) {
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
    get hasGroupItems() {
        return this.items.some((item) => item.isGroup);
    }
    get hasHeader() {
        return this.hasCustomHeader || !!this.headerText;
    }
    get hasCustomHeader() {
        return !!this.header.length;
    }
    get ariaLabelledByID() {
        return this.hasCustomHeader ? undefined : `${this._id}-header-text`;
    }
    get groupItemsInfo() {
        return this.items.map((groupItem) => {
            return {
                groupItem,
                classes: `ui5-form-column-spanL-${groupItem.colsL} ui5-form-column-spanXL-${groupItem.colsXl} ui5-form-column-spanM-${groupItem.colsM} ui5-form-column-spanS-${groupItem.colsS}`,
                items: this.getItemsInfo(Array.from(groupItem.children)),
            };
        });
    }
    get itemsInfo() {
        return this.getItemsInfo();
    }
    getItemsInfo(items) {
        return (items || this.items).map((item) => {
            return {
                item,
                classes: item.columnSpan ? `ui5-form-item-span-${item.columnSpan}` : "",
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
            const additionalStyle = this.getAdditionalCSS(step.breakpoint, step.columns);
            if (additionalStyle) {
                this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this.getCSSStyleSheet(additionalStyle)];
            }
        });
    }
    getAdditionalCSS(step, colsNumber) {
        if (StepColumn[step] >= colsNumber) {
            return;
        }
        const key = `${step}-${colsNumber}`;
        if (!additionalStylesMap.has(key)) {
            let containerQuery;
            let supporedColumnsNumber = StepColumn.S;
            let stepSpanCSS = "";
            let cols = colsNumber;
            if (step === "S") {
                supporedColumnsNumber = StepColumn.S;
                containerQuery = `@container (max-width: 599px) {`;
            }
            else if (step === "M") {
                supporedColumnsNumber = StepColumn.M;
                containerQuery = `@container (width > 599px) and (width < 1024px) {`;
            }
            else if (step === "L") {
                supporedColumnsNumber = StepColumn.L;
                containerQuery = `@container (width > 1023px) and (width < 1439px) {`;
            }
            else if (step === "XL") {
                containerQuery = `@container (min-width: 1440px) {`;
                supporedColumnsNumber = StepColumn.XL;
            }
            while (cols > supporedColumnsNumber) {
                stepSpanCSS += `
				:host([columns-${step.toLocaleLowerCase()}="${cols}"]) .ui5-form-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}

				.ui5-form-column-span${step}-${cols},
				.ui5-form-item-span-${cols} {
					grid-column: span ${cols};
				}

				.ui5-form-column-span${step}-${cols} .ui5-form-group-layout {
					grid-template-columns: repeat(${cols}, 1fr);
				}
				`;
                cols--;
            }
            const css = `${containerQuery}${stepSpanCSS}}`;
            additionalStylesMap.set(key, css);
        }
        return additionalStylesMap.get(key);
    }
    getCSSStyleSheet(cssText) {
        const style = new CSSStyleSheet();
        style.replaceSync(cssText);
        return style;
    }
};
__decorate([
    property()
], Form.prototype, "layout", void 0);
__decorate([
    property()
], Form.prototype, "labelSpan", void 0);
__decorate([
    property()
], Form.prototype, "headerText", void 0);
__decorate([
    property()
], Form.prototype, "itemSpacing", void 0);
__decorate([
    slot({ type: HTMLElement })
], Form.prototype, "header", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        individualSlots: true,
        invalidateOnChildChange: true,
    })
], Form.prototype, "items", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "columnsS", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "labelSpanS", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "columnsM", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "labelSpanM", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "columnsL", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "labelSpanL", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "columnsXl", void 0);
__decorate([
    property({ type: Number })
], Form.prototype, "labelSpanXl", void 0);
Form = __decorate([
    customElement({
        tag: "ui5-form",
        renderer: litRender,
        styles: FormCss,
        template: FormTemplate,
        dependencies: [Title],
    })
], Form);
Form.define();
export default Form;
//# sourceMappingURL=Form.js.map