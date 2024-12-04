import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import type { DragAndDropSettings } from "./DragRegistry.js";
import DragRegistry from "./DragRegistry.js";

function handleDrop(e: DragEvent, component: UI5Element, target: HTMLElement, placement: `${MovePlacement}`, settings: DragAndDropSettings = {}): void {
	e.preventDefault();
	const draggedElement = DragRegistry.getDraggedElement();

	if (!draggedElement && settings?.crossDnD) {
		return;
	}

	const originalEvent = settings.originalEvent ? { originalEvent: e } : {};
	component.fireDecoratorEvent("move", {
		...originalEvent,
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
