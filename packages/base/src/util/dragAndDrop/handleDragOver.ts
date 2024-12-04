import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import type { DragAndDropSettings } from "./DragRegistry.js";
import DragRegistry from "./DragRegistry.js";

type DragOverResult = {
	targetReference: HTMLElement | null;
	placement: any;
}

type DragPosition = {
	element: HTMLElement;
	placements: MovePlacement[];
};

/**
 * Handles the dragover event.
 */
function handleDragOver<T extends UI5Element>(e: DragEvent, component: T, position: DragPosition, target: HTMLElement, settings: DragAndDropSettings = {}): DragOverResult {
	const draggedElement = DragRegistry.getDraggedElement();
	const dragOverResult: DragOverResult = {
		targetReference: null,
		placement: null,
	};

	if (!draggedElement && !settings?.crossDnD) {
		return dragOverResult;
	}

	const placements = position.placements;
	dragOverResult.targetReference = e.target as HTMLElement;

	const placementAccepted = placements.some(placement => {
		const originalEvent = settings.originalEvent ? { originalEvent: e } : {};
		const beforeItemMovePrevented = !component.fireDecoratorEvent("move-over" as keyof T["eventDetails"], {
			...originalEvent,
			source: {
				element: draggedElement,
			},
			destination: {
				element: target,
				placement,
			},
		} as T["eventDetails"][keyof T["eventDetails"]]);

		if (beforeItemMovePrevented) {
			e.preventDefault();
			dragOverResult.targetReference = position.element;
			dragOverResult.placement = placement;
			return true;
		}

		return false;
	});

	if (!placementAccepted) {
		dragOverResult.targetReference = null;
	}

	return dragOverResult;
}

export default handleDragOver;
