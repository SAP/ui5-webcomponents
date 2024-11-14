import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import { findClosestPosition } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import handleDragOver from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDragOver.js";
import handleDrop from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDrop.js";

import type Table from "./Table.js";
import TableExtension from "./TableExtension.js";

export default class TableDragAndDrop extends TableExtension {
	_table: Table;
	_onDragEnterBound: (e: DragEvent) => void;
	_onDragLeaveBound: (e: DragEvent) => void;
	_onDragOverBound: (e: DragEvent) => void;
	_onDropBound: (e: DragEvent) => void;

	constructor(table: Table) {
		super();
		this._table = table;
		this._onDragEnterBound = this._ondragenter.bind(this);
		this._onDragLeaveBound = this._ondragleave.bind(this);
		this._onDragOverBound = this._ondragover.bind(this);
		this._onDropBound = this._ondrop.bind(this);

		DragRegistry.subscribe(this._table); // TODO: Where unsubscribe?
		this._table._tableElement.addEventListener("dragenter", this._onDragEnterBound);
		this._table._tableElement.addEventListener("dragleave", this._onDragLeaveBound);
		this._table._tableElement.addEventListener("dragover", this._onDragOverBound);
		this._table._tableElement.addEventListener("drop", this._onDropBound);
	}

	_ondragenter(e: DragEvent) {
		e.preventDefault();
	}

	_ondragleave(e: DragEvent) {
		if (e.relatedTarget instanceof Node && this._table.shadowRoot!.contains(e.relatedTarget)) {
			return;
		}

		this._table.dropIndicatorDOM!.targetReference = null;
	}

	_ondragover(e: DragEvent) {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}

		const closestPosition = findClosestPosition(
			this._table.rows,
			e.clientY,
			Orientation.Vertical,
		);

		if (!closestPosition) {
			this._table.dropIndicatorDOM!.targetReference = null;
			return;
		}

		const { targetReference, placement } = handleDragOver(e, this._table, closestPosition, closestPosition.element);
		this._table.dropIndicatorDOM!.targetReference = targetReference;
		this._table.dropIndicatorDOM!.placement = placement;
	}

	_ondrop(e: DragEvent) {
		if (!this._table.dropIndicatorDOM?.targetReference || !this._table.dropIndicatorDOM?.placement) {
			return;
		}

		handleDrop(e, this._table, this._table.dropIndicatorDOM.targetReference, this._table.dropIndicatorDOM.placement);
		this._table.dropIndicatorDOM.targetReference = null;
	}
}
