import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type FormItemSpacing from "./types/FormItemSpacing.js";
/**
 * Interface for components that can be slotted inside `ui5-form` as items.
 * @public
 * @experimental
 * @since 2.0.0
 */
interface IFormItem extends HTMLElement {
    labelSpan: string;
    itemSpacing: `${FormItemSpacing}`;
    readonly isGroup: boolean;
    colsXl?: number;
    colsL?: number;
    colsM?: number;
    colsS?: number;
    columnSpan?: number;
}
type GroupItemsInfo = {
    groupItem: IFormItem;
    classes: string;
    items: Array<ItemsInfo>;
};
type ItemsInfo = {
    item: IFormItem;
    classes: string;
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
declare class Form extends UI5Element {
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
    layout: string;
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
    labelSpan: string;
    /**
     * Defines the header text of the component.
     *
     * **Note:** The property gets overridden by the `header` slot.
     *
     * @default undefined
     * @public
     */
    headerText?: string;
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
    itemSpacing: `${FormItemSpacing}`;
    /**
     * Defines the component header area.
     *
     * **Note:** When a `header` is provided, the `headerText` property is ignored.
     * @public
     */
    header: Array<HTMLElement>;
    /**
     * Defines the component content - FormGroups or FormItems.
     *
     * **Note:** Mixing FormGroups and standalone FormItems (not belonging to a group) is not supported.
     * Either use FormGroups and make sure all FormItems are part of a FormGroup, or use just FormItems without any FormGroups.
     * @public
     */
    items: Array<IFormItem>;
    /**
     * @private
     */
    columnsS: number;
    labelSpanS: number;
    columnsM: number;
    labelSpanM: number;
    columnsL: number;
    labelSpanL: number;
    columnsXl: number;
    labelSpanXl: number;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    setColumnLayout(): void;
    setLabelSpan(): void;
    setGroupsColSpan(): void;
    getGroupsColSpan(cols: number, groups: number, index: number, group: IFormItem): number;
    get hasGroupItems(): boolean;
    get hasHeader(): boolean;
    get hasCustomHeader(): boolean;
    get ariaLabelledByID(): string | undefined;
    get groupItemsInfo(): Array<GroupItemsInfo>;
    get itemsInfo(): Array<ItemsInfo>;
    getItemsInfo(items?: Array<IFormItem>): Array<ItemsInfo>;
    createAdditionalCSSStyleSheet(): void;
    getAdditionalCSS(step: string, colsNumber: number): string | undefined;
    getCSSStyleSheet(cssText: string): CSSStyleSheet;
}
export default Form;
export { IFormItem, };
