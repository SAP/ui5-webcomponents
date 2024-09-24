import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { event } from "@ui5/webcomponents-base/dist/decorators.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type Table from "./Table.js";
import type { ITableFeature, TableMoveEventDetail } from "./Table.js";
import type TableRow from "./TableRow.js";

/**
 * ### Overview
 *
 * The `ui5-table-reorder` component enables reordering of table rows via drag and drop.
 *
 * @constructor
 * @public
 */
@customElement({ tag: "ui5-table-reorder" })
@event("reorder")
class TableReorder extends UI5Element implements ITableFeature {
	readonly identifier: string = "TableReorder";
	_table?: Table;
	_onMoveOverBound: (e: CustomEvent<TableMoveEventDetail>) => void;
	_onMoveBound: (e: CustomEvent<TableMoveEventDetail>) => void;

	constructor() {
		super();
		this._onMoveOverBound = this._onMoveOver.bind(this);
		this._onMoveBound = this._onMove.bind(this);
	}

	onTableActivate(table: Table): void {
		this._table = table;
		// @ts-ignore
		this._table.addEventListener("move-over", this._onMoveOverBound);
		// @ts-ignore
		this._table.addEventListener("move", this._onMoveBound);
	}

	_onMoveOver(e: CustomEvent<TableMoveEventDetail>) {
		const { source, destination } = e.detail;

		if (source.element.hasAttribute("ui5-table-row") && destination.element.hasAttribute("ui5-table-row") && destination.placement !== "On") {
			e.preventDefault();
		}
	}

	_onMove(e: CustomEvent<TableMoveEventDetail>) {
		const { source, destination } = e.detail;

		if (source.element.hasAttribute("ui5-table-row") && destination.element.hasAttribute("ui5-table-row")) {
			this._reorderRow(source.element, destination.element, destination.placement);
		}
	}

	_reorderRow(source: HTMLElement, destination: HTMLElement, placement: `${MovePlacement}`) {
		if (!this._table) {
			return;
		}

		const sourceIndex = this._table.rows.indexOf(source as TableRow);
		const destinationIndex = this._table.rows.indexOf(destination as TableRow);

		if (sourceIndex === -1 || destinationIndex === -1) {
			return;
		}

		switch (placement) {
		case "Before":
			this._table.insertBefore(source, destination);
			break;
		case "After":
			this._table.insertBefore(source, destination.nextElementSibling);
			break;
		default:
			break;
		}
	}
}

TableReorder.define();

export default TableReorder;
