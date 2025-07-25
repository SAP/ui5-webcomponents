import type MovePlacement from "../../types/MovePlacement.js";

let draggedElement: HTMLElement | null = null;

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};

const clearDraggedElement = () => {
	draggedElement = null;
};

const getDraggedElement = () => {
	return draggedElement;
};

type DragAndDropSettings = {
	/**
	 * Allow cross-browser and file drag and drop.
	 */
	crossDnD?: boolean;
	/**
	 * Pass the original event in the event parameters.
	 */
	originalEvent?: boolean;
};

type MoveEventDetail = {
	originalEvent: Event,
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
};

const DragRegistry = {
	setDraggedElement,
	clearDraggedElement,
	getDraggedElement,
};

export default DragRegistry;

export type {
	DragAndDropSettings,
	MoveEventDetail,
};
