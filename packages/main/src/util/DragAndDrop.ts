import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element";

let draggedElement: UI5Element | null = null;
let eventTarget: EventTarget | null = null;

const setDraggedComponent = (element: UI5Element | null) => {
	draggedElement = element;
};

const getDraggedComponent = () => {
	return draggedElement;
};

const getDraggedEventTarget = () => {
	return eventTarget;
};

document.documentElement.addEventListener("dragstart", (e: DragEvent) => {
	if (e.dataTransfer) {
		eventTarget = e.target;
		e.dataTransfer.dropEffect = "move";
	}
});

export {
	setDraggedComponent,
	getDraggedComponent,
	getDraggedEventTarget,
};
