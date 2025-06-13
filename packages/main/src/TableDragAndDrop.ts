import { createDragAndDropBehavior } from "./features/DragAndDropBehavior.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import TableExtension from "./TableExtension.js";
import type Table from "./Table.js";

export default class TableDragAndDrop extends TableExtension {
	_table: Table;
	private _dragAndDropBehavior: ReturnType<typeof createDragAndDropBehavior<Table>>;

	constructor(table: Table) {
		super();
		this._table = table;

		// Create drag and drop behavior with table-specific configuration
		this._dragAndDropBehavior = createDragAndDropBehavior(this._table, {
			orientation: Orientation.Vertical,
			getDraggableElements: () => this._table.rows,
			getDropIndicator: () => {
				if (this._table.dropIndicatorDOM) {
					return {
						targetReference: this._table.dropIndicatorDOM.targetReference,
						placement: this._table.dropIndicatorDOM.placement,
					};
				}
				return null;
			},
			setDropIndicator: (targetReference, placement) => {
				this._table.dropIndicatorDOM.targetReference = targetReference;
				if (placement) {
					this._table.dropIndicatorDOM.placement = placement;
				}
			},
			settings: { crossDnD: true, originalEvent: true },
		});
	}

	initialize() {
		this._dragAndDropBehavior.initialize();
	}

	cleanup() {
		this._dragAndDropBehavior.cleanup();
	}

	_ondragenter(e: DragEvent) {
		this._dragAndDropBehavior.onDragEnter(e);
	}

	_ondragleave(e: DragEvent) {
		this._dragAndDropBehavior.onDragLeave(e);
	}

	_ondragover(e: DragEvent) {
		this._dragAndDropBehavior.onDragOver(e);
	}

	_ondrop(e: DragEvent) {
		this._dragAndDropBehavior.onDrop(e);
	}
}
