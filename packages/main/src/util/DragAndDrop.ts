import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element";

let draggedElement: UI5Element | null = null;

const setDraggedElement = (element: UI5Element | null) => {
	draggedElement = element;
};

const getDraggedElement = () => {
	return draggedElement;
};

export {
	setDraggedElement,
	getDraggedElement,
};
