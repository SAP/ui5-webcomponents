import type Table from "./Table";
import type TableCellBase from "./TableCellBase";
import type TableRowBase from "./TableRowBase";

const isInstanceOfTable = (obj: any): obj is Table => {
	return "isTable" in obj && !!obj.isTable;
};

const isInstanceOfTableCellBase = (obj: any): obj is TableCellBase => {
	return "isTableCellBase" in obj && !!obj.isTableCellBase;
};

const isInstanceOfTableRowBase = (obj: any): obj is TableRowBase => {
	return "isTableRowBase" in obj && !!obj.isTableRowBase;
};

export {
	isInstanceOfTable,
	isInstanceOfTableCellBase,
	isInstanceOfTableRowBase,
};
