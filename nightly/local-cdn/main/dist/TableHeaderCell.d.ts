import TableCellBase from "./TableCellBase.js";
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
     * If the table is in `Popin` mode, the column will move into the popin when
     * when the minimum width does not fit anymore.
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
    _popin: boolean;
    protected ariaRole: string;
    _popinWidth: number;
    onEnterDOM(): void;
    onBeforeRendering(): void;
}
export default TableHeaderCell;
