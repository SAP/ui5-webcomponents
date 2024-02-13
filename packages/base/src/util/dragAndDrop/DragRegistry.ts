import type UI5Element from "../../UI5Element";

let draggedElement: HTMLElement | null = null;
let globalHandlersAttached = false;
const subscribers = new Set<UI5Element>();
const selfManagedDragAreas = new Set<HTMLElement | ShadowRoot>();

const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	e.dataTransfer.dropEffect = "move";
	e.dataTransfer.effectAllowed = "move";

	if (!selfManagedDragAreas.has(e.target)) {
		draggedElement = e.target;
	}
};

const ondragend = () => {
	draggedElement = null;
};

const ondrop = () => {
	draggedElement = null;
};

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};

const getDraggedElement = () => {
	return draggedElement;
};

const attachGlobalHandlers = () => {
	if (globalHandlersAttached) {
		return;
	}

	document.body.addEventListener("dragstart", ondragstart);
	document.body.addEventListener("dragend", ondragend);
	document.body.addEventListener("drop", ondrop);
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
}

const unsubscribe = (subscriber: UI5Element) => {
	subscribers.delete(subscriber);
	
	if (subscribers.size === 0 && globalHandlersAttached) {
		detachGlobalHandlers();
	}
}

const registerSelfManagedDragArea = (area: HTMLElement | ShadowRoot) => {
	selfManagedDragAreas.add(area);
};

const deregisterSelfManagedDragArea = (area: HTMLElement | ShadowRoot) => {
	selfManagedDragAreas.delete(area);
};

const DragRegistry = {
	subscribe,
	unsubscribe,
	registerSelfManagedDragArea,
	deregisterSelfManagedDragArea,
	getDraggedElement,
	setDraggedElement,
}

export default DragRegistry;
