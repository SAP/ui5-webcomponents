let draggedElement: HTMLElement | null = null;
let draggedComponent: HTMLElement | null = null;

document.documentElement.addEventListener("dragstart", (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	e.dataTransfer.dropEffect = "move";
	e.dataTransfer.effectAllowed = "move";

	draggedElement = e.target;
});

document.documentElement.addEventListener("dragend", () => {
	draggedElement = null;
	draggedComponent = null;
});

document.documentElement.addEventListener("drop", () => {
	draggedElement = null;
	draggedComponent = null;
});

const setDraggedComponent = (component: HTMLElement | null) => {
	draggedComponent = component;
};

const getDraggedElement = () => {
	return draggedComponent ?? draggedElement;
};

export {
	getDraggedElement,
	setDraggedComponent,
};
