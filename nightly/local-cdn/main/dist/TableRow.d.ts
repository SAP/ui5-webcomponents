import TableRowBase from "./TableRowBase.js";
import TableCell from "./TableCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row` component represents a row in the `ui5-table`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
declare class TableRow extends TableRowBase {
    /**
     * Defines the cells of the component.
     *
     * **Note:** Use `ui5-table-cell` for the intended design.
     *
     * @public
     */
    cells: Array<TableCell>;
    /**
     * Defines the actions of the component.
     *
     * **Note:** Use `ui5-table-row-action` or `ui5-table-row-action-navigation` for the intended design.
     *
     * @since 2.7.0
     * @public
     */
    actions: Array<TableRowActionBase>;
    /**
     * Unique identifier of the row.
     *
     * @default ""
     * @public
     */
    rowKey: string;
    /**
     * Defines the position of the row respect to the total number of rows within the table when the `ui5-table-virtualizer` feature is used.
     *
     * @default -1
     * @since 2.5.0
     * @public
     */
    position: number;
    /**
     * Defines the interactive state of the row.
     *
     * @default false
     * @public
     */
    interactive: boolean;
    /**
     * Defines the navigated state of the row.
     *
     * @default false
     * @public
     */
    navigated: boolean;
    /**
     * Defines whether the row is movable.
     *
     * @default false
     * @since 2.6.0
     * @public
     */
    movable: boolean;
    _renderNavigated: boolean;
    onBeforeRendering(): void;
    focus(focusOptions?: FocusOptions | undefined): Promise<void>;
    _onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _onclick(): void;
    _onkeyup(): void;
    _onfocusout(): void;
    _onOverflowButtonClick(e: PointerEvent): void;
    get _isInteractive(): boolean;
    get _hasRowActions(): boolean;
    get _hasOverflowActions(): boolean;
    get _flexibleActions(): TableRowActionBase[];
    get _fixedActions(): TableRowActionBase[];
    get _overflowActions(): TableRowActionBase[];
}
export default TableRow;
