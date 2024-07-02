import type Table from "./Table";
import type TableRow from "./TableRow";

const isInstanceOfTable = (obj: any): obj is Table => {
	return "isTable" in obj && !!obj.isTable;
};

const isSelectionCheckbox = (e: Event) => {
	return e.composedPath().some((el: EventTarget) => (el as HTMLElement).hasAttribute?.("ui5-table-selection-component"));
};

const isHeaderSelector = (e: Event) => {
	return isSelectionCheckbox(e) && e.composedPath().some((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
};

const findRowInPath = (composedPath: Array<EventTarget>) => {
	return composedPath.find((el: EventTarget) => el instanceof HTMLElement && el.hasAttribute("ui5-table-row")) as TableRow;
};

const isFeature = <T>(element: any, identifier: string): element is T => {
	return element.identifier === identifier;
};

export {
	isInstanceOfTable,
	isSelectionCheckbox,
	isHeaderSelector,
	findRowInPath,
	isFeature,
};
