import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IFormItem } from "./Form.js";
import type FormItemSpacing from "./types/FormItemSpacing.js";
/**
 * @class
 *
 * ### Overview
 *
 * The FormItem (ui5-form-item) represents pair of a label and
 * one or more components (text or text fields), associated to it.
 *
 * ### Usage
 *
 * The FormItem is being used in FormGroup (ui5-form-group) or directly in Form (ui5-form).
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/FormItem.js";
 *
 * @csspart layout - Used to style the parent element of the label and content parts.
 * @csspart label - Used to style the label part of the form item.
 * @csspart content - Used to style the content part of the form item.
 *
 * @constructor
 * @implements {IFormItem}
 * @public
 * @since 2.0.0
 * @extends UI5Element
 */
declare class FormItem extends UI5Element implements IFormItem {
    /**
     * Defines the column span of the component,
     * e.g how many columns the component should span to.
     *
     * **Note:** The column span should be a number between 1 and the available columns of the FormGroup (when items are placed in a group)
     * or the Form. The available columns can be affected by the FormGroup#columnSpan and/or the Form#layout.
     * A number bigger than the available columns won't take effect.
     *
     * @default undefined
     * @public
     */
    columnSpan?: number;
    /**
     * Defines the label of the component.
     * @public
     */
    labelContent: Array<HTMLElement>;
    /**
     * Defines the content of the component,
     * associated to `labelContent`.
     * @public
     */
    content: Array<HTMLElement>;
    /**
     * @private
     */
    itemSpacing: `${FormItemSpacing}`;
    get isGroup(): boolean;
}
export default FormItem;
