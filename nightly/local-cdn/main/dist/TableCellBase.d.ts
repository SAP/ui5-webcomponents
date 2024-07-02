import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
declare abstract class TableCellBase extends UI5Element {
    /**
     * Defines the content of the component.
     * @public
     */
    content: Array<Node>;
    _popin: boolean;
    protected ariaRole: string;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    getFocusDomRef(): this;
    isTableCellBase(): boolean;
}
export default TableCellBase;
