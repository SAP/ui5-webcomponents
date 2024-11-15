import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isInstanceOfTable } from "./TableUtils.js";
import type Table from "./Table.js";

abstract class TableRowActionBase extends UI5Element {
	get _table(): Table | undefined {
		const element = this.parentElement?.parentElement;
		return isInstanceOfTable(element) ? element : undefined;
	}
}

export default TableRowActionBase;
