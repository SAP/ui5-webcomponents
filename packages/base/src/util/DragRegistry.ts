let draggedElement: HTMLElement | null = null;

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};

const getDraggedElement = () => {
	return draggedElement;
};

document.documentElement.addEventListener("dragstart", (e: DragEvent) => {
	if (e.dataTransfer && e.target instanceof HTMLElement) {
		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.effectAllowed = "move";
		setDraggedElement(e.target);
	}
});

document.documentElement.addEventListener("dragend", () => {
	setDraggedElement(null);
});

document.documentElement.addEventListener("drop", () => {
	setDraggedElement(null);
});

export default getDraggedElement;
