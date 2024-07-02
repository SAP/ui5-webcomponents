import type Table from "./Table";
import type TableRow from "./TableRow";
declare const isInstanceOfTable: (obj: any) => obj is Table;
declare const isSelectionCheckbox: (e: Event) => boolean;
declare const isHeaderSelector: (e: Event) => boolean;
declare const findRowInPath: (composedPath: Array<EventTarget>) => TableRow;
export { isInstanceOfTable, isSelectionCheckbox, isHeaderSelector, findRowInPath, };
