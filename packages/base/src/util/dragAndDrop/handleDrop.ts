import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import DragRegistry from "./DragRegistry.js";

function handleDrop(e: DragEvent, component: UI5Element, target: HTMLElement, placement: `${MovePlacement}`): void {
	e.preventDefault();
	const draggedElement = DragRegistry.getDraggedElement();

	if (!draggedElement) {
		return;
	}

	component.fireDecoratorEvent("move", {
		originalEvent: e,
		source: {
			element: draggedElement,
		},
		destination: {
			element: target,
			placement,
		},
	});

	draggedElement?.focus();
}

export default handleDrop;
