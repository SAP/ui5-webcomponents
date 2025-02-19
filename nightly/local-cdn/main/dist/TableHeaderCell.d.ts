import TableCellBase from "./TableCellBase.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import type TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import "@ui5/webcomponents-icons/dist/sort-ascending.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell` component represents a column in the `ui5-table`.
 *
 * As it is tightly coupled to the `ui5-table`, it should only be used in the `ui5-table-header-row`
 * to ensure correct layout and design.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
declare class TableHeaderCell extends TableCellBase {
    /**
     * Defines the width of column.
     *
     * @default "auto"
     * @public
     */
    width: string;
    /**
     * Defines the minimum width of the column.
     *
     * If the table is in `Popin` mode and the minimum width does not fit anymore,
     * the column will move into the popin.
     *
     * **Note:** If `minWidth` has the `auto` value, the table ensures that the column is wider than at least `3rem`.
     *
     * @default "auto"
     * @public
     */
    minWidth: string;
    /**
     * Defines the maximum width of the column.
     *
     * @default "auto"
     * @public
     */
    maxWidth: string;
    /**
     * Defines the importance of the column.
     *
     * This property affects the popin behaviour.
     * Columns with higher importance will move into the popin area later then less important
     * columns.
     *
     * @default 0
     * @public
     */
    importance: number;
    /**
     * The text for the column when it pops in.
     *
     * @default undefined
     * @since 2.7.0
     * @public
     */
    popinText?: string;
    /**
     * Defines the sort indicator of the column.
     *
     * @default "None"
     * @since 2.8.0
     * @public
     */
    sortIndicator: `${SortOrder}`;
    /**
     * Defines the action of the column.
     *
     * **Note:** While multiple actions are technically possible, this is not supported.
     *
     * @public
     * @since 2.8.0
     */
    action: Array<TableHeaderCellActionBase>;
    _popin: boolean;
    protected ariaRole: string;
    _popinWidth: number;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    get _sortIcon(): string | undefined;
}
export default TableHeaderCell;
