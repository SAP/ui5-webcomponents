import TableRowBase from "./TableRowBase.js";
import TableCell from "./TableCell.js";
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
 * @since 2.0
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
     * Unique identifier of the component.
     *
     * @default ""
     * @public
     */
    key: string;
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
    _renderNavigated: boolean;
    static onDefine(): Promise<void>;
    onBeforeRendering(): void;
    focus(focusOptions?: FocusOptions | undefined): Promise<void>;
    _onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _onclick(): void;
    _onkeyup(): void;
    _onfocusout(): void;
    get _isInteractive(): boolean;
}
export default TableRow;
