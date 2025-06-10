import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";

let draggedElement: HTMLElement | null = null;
let customDragTemplate: HTMLElement | null = null;
let globalHandlersAttached = false;
const subscribers = new Set<UI5Element>();
const selfManagedDragAreas = new Set<HTMLElement | ShadowRoot>();

const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	if (!selfManagedDragAreas.has(e.target)) {
		draggedElement = e.target;
	}
};

const ondragend = () => {
	draggedElement = null;
	customDragTemplate = null;
};

const ondrop = () => {
	draggedElement = null;
	customDragTemplate = null;
};

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};
type SetDraggedElementFunction = typeof setDraggedElement;

const getDraggedElement = () => {
	return draggedElement;
};

const setCustomDragTemplate = (element: HTMLElement) => {
	customDragTemplate = element;
};

const createDefaultMultiDragElement = (count: number): HTMLElement => {
	// Create a ui5-li element programmatically
	const listItem = document.createElement("ui5-li");
	listItem.textContent = `${count} items`;

	// Style the element to look like a drag preview
	listItem.style.cssText = `
		position: absolute;
		top: -1000px;
		left: -1000px;
	`;

	// Add to document body temporarily
	document.body.appendChild(listItem);

	return listItem;
};

const startMultipleDrag = (dragEvent: DragEvent, count: number): void => {
	if (count <= 0 || !dragEvent.dataTransfer) {
		return;
	}

	if (customDragTemplate) {
		// Use component's custom template
		customDragTemplate.style.display = "flex";
		dragEvent.dataTransfer.setDragImage(customDragTemplate, 20, 10);

		// Clean up after drag starts
		requestAnimationFrame(() => {
			if (customDragTemplate) {
				customDragTemplate.style.display = "none";
				customDragTemplate = null;
			}
		});
	} else {
		// Use default template
		const customDragElement = createDefaultMultiDragElement(count);
		dragEvent.dataTransfer.setDragImage(customDragElement, 20, 10);

		// Clean up the temporary element after the drag operation starts
		requestAnimationFrame(() => {
			if (customDragElement) {
				customDragElement.remove();
			}
		});
	}
};

const attachGlobalHandlers = () => {
	if (globalHandlersAttached) {
		return;
	}

	document.body.addEventListener("dragstart", ondragstart);
	document.body.addEventListener("dragend", ondragend);
	document.body.addEventListener("drop", ondrop);
	globalHandlersAttached = true;
};

const detachGlobalHandlers = () => {
	document.body.removeEventListener("dragstart", ondragstart);
	document.body.removeEventListener("dragend", ondragend);
	document.body.removeEventListener("drop", ondrop);
	globalHandlersAttached = false;
};

const subscribe = (subscriber: UI5Element) => {
	subscribers.add(subscriber);

	if (!globalHandlersAttached) {
		attachGlobalHandlers();
	}
};

const unsubscribe = (subscriber: UI5Element) => {
	subscribers.delete(subscriber);

	if (subscribers.size === 0 && globalHandlersAttached) {
		detachGlobalHandlers();
	}
};

const addSelfManagedArea = (area: HTMLElement | ShadowRoot) => {
	selfManagedDragAreas.add(area);

	return setDraggedElement;
};

const removeSelfManagedArea = (area: HTMLElement | ShadowRoot) => {
	selfManagedDragAreas.delete(area);
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
	subscribe,
	unsubscribe,
	addSelfManagedArea,
	removeSelfManagedArea,
	getDraggedElement,
	startMultipleDrag,
	setCustomDragTemplate,
};

window.DragRegistry = DragRegistry;

export default DragRegistry;
export type {
	SetDraggedElementFunction,
	DragAndDropSettings,
	MoveEventDetail,
};
