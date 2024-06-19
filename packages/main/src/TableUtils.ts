import type Table from "./Table";
import type TableCellBase from "./TableCellBase";
import type TableRowBase from "./TableRowBase";

const isInstanceOfTable = (obj: any): obj is Table => {
	return "isTable" in obj;
};

const isInstanceOfTableCellBase = (obj: any): obj is TableCellBase => {
	return "isTableCellBase" in obj;
};

const isInstanceOfTableRowBase = (obj: any): obj is TableRowBase => {
	return "isTableRowBase" in obj;
};

export {
	isInstanceOfTable,
	isInstanceOfTableCellBase,
	isInstanceOfTableRowBase,
};
