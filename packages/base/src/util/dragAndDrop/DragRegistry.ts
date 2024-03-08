import type UI5Element from "../../UI5Element";

let draggedElement: HTMLElement | null = null;
let globalHandlersAttached = false;
const subscribers = new Set<UI5Element>();
const selfManagedDragAreas = new Set<HTMLElement | ShadowRoot>();
let dragImage: HTMLElement;
const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	e.dataTransfer.dropEffect = "move";
	e.dataTransfer.effectAllowed = "move";

	if (!selfManagedDragAreas.has(e.target)) {
		draggedElement = e.target;
	}

	// const clone = e.target.cloneNode(true) as HTMLElement;
	// clone.removeAttribute("draggable");

	// document.body.appendChild(clone);
	// dragImage = clone;
	// clone.movable = false;
	// clone.active = false;
	// e.dataTransfer.setDragImage(new Image(), 0, 0);
};

const ondrag = (e: DragEvent) => {
	// e.preventDefault();
	// dragImage!.style.position = "absolute";
	// dragImage!.style.zIndex = 100;
	// dragImage!.style.pointerEvents = "none";
	// dragImage!.style.opacity = "1";
	// dragImage!.style.cursor = "grabbing";

	// window.requestAnimationFrame(() => {
	// 	dragImage!.style.left = `${e.pageX}px`;
	// 	dragImage!.style.top = `${e.pageY}px`;
	// });
};

const ondragend = () => {
	dragImage?.remove();
	draggedElement = null;
};

const ondrop = () => {
	dragImage?.remove();
	draggedElement = null;
};

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};
type SetDraggedElementFunction = typeof setDraggedElement;

const getDraggedElement = () => {
	return draggedElement;
};

const attachGlobalHandlers = () => {
	if (globalHandlersAttached) {
		return;
	}

	document.body.addEventListener("dragstart", ondragstart);
	document.body.addEventListener("drag", ondrag);
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

const DragRegistry = {
	subscribe,
	unsubscribe,
	addSelfManagedArea,
	removeSelfManagedArea,
	getDraggedElement,
};

export default DragRegistry;
export type {
	SetDraggedElementFunction,
};
