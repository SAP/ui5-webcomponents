import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import type { DragAndDropSettings } from "./DragRegistry.js";
import DragRegistry from "./DragRegistry.js";

function handleDrop<T extends UI5Element>(e: DragEvent, component: T, target: HTMLElement, placement: `${MovePlacement}`, settings: DragAndDropSettings = {}): void {
	e.preventDefault();
	const draggedElement = DragRegistry.getDraggedElement();

	if (!draggedElement && settings?.crossDnD) {
		return;
	}

	const originalEvent = settings.originalEvent ? { originalEvent: e } : {};
	component.fireDecoratorEvent("move" as keyof T["eventDetails"], {
		...originalEvent,
		source: {
			element: draggedElement,
		},
		destination: {
			element: target,
			placement,
		},
	} as T["eventDetails"][keyof T["eventDetails"]]);

	draggedElement?.focus();
}

export default handleDrop;
