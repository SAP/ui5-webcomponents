import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellBase from "./TableCellBase.js";
import type Table from "./Table.js";
/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
declare abstract class TableRowBase extends UI5Element {
    cells: Array<TableCellBase>;
    _invalidate: number;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    getFocusDomRef(): this;
    _informSelectionChange(): void;
    isHeaderRow(): boolean;
    _onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    get _table(): Table | undefined;
    get _tableId(): string | undefined;
    get _tableSelection(): import("./TableSelection.js").default | undefined;
    get _isSelected(): boolean | undefined;
    get _isSelectable(): boolean | undefined;
    get _isMultiSelect(): boolean | undefined;
    get _hasRowSelector(): boolean | undefined;
    get _selectionCell(): HTMLElement | null;
    get _visibleCells(): TableCellBase[];
    get _popinCells(): TableCellBase[];
    get _i18nRowSelector(): string;
    get isTableRowBase(): boolean;
}
export default TableRowBase;
