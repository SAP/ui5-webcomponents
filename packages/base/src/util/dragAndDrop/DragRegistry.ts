import type UI5Element from "../../UI5Element";

let draggedElement: HTMLElement | null = null;
let draggedComponent: HTMLElement | null = null;
let globalHandlersAttached = false;
const dropAreas = new Set<UI5Element>();

const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	e.dataTransfer.dropEffect = "move";
	e.dataTransfer.effectAllowed = "move";

	draggedElement = e.target;
};

const ondragend = () => {
	draggedElement = null;
	draggedComponent = null;
};

const ondrop = () => {
	draggedElement = null;
	draggedComponent = null;
};

const setDraggedComponent = (component: HTMLElement | null) => {
	draggedComponent = component;
};

const getDraggedElement = () => {
	return draggedComponent ?? draggedElement;
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

const registerDropArea = (area: UI5Element) => {
	dropAreas.add(area);

	if (!globalHandlersAttached) {
		attachGlobalHandlers();
	}
};

const deregisterDropArea = (area: UI5Element) => {
	dropAreas.delete(area);

	if (dropAreas.size === 0 && globalHandlersAttached) {
		detachGlobalHandlers();
	}
};

export {
	registerDropArea,
	deregisterDropArea,
	getDraggedElement,
	setDraggedComponent,
};
