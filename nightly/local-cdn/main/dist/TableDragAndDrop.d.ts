import type Table from "./Table.js";
import TableExtension from "./TableExtension.js";
export default class TableDragAndDrop extends TableExtension {
    _table: Table;
    constructor(table: Table);
    _ondragenter(e: DragEvent): void;
    _ondragleave(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
}
