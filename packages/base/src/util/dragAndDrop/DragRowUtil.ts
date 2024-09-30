import type UI5Element from "../../UI5Element";
import DragRegistry from "./DragRegistry.js";
import { findClosestPosition } from "./findClosestPosition.js";
import Orientation from "../../types/Orientation.js";
import MovePlacement from "../../types/MovePlacement.js";

type DragOverResult = {
	targetReference: HTMLElement | null;
	placement: any;
}

/**
 * Drags an element over a list of items and returns the target reference and the placement of the dragged element.
 *
 * @param e {DragEvent} The drag event.
 * @param component {UI5Element} The component, which contains the items.
 * @param items {Array<HTMLElement>} The items, which the dragged element is dragged over.
 * @returns {DragOverResult} The target reference and the placement of the dragged element.
 */
function dragOver(e: DragEvent, component: UI5Element, items: Array<HTMLElement>): DragOverResult {
	const dragOverResult: DragOverResult = {
		targetReference: null,
		placement: null,
	};

	const draggedElement = DragRegistry.getDraggedElement();

	if (!(e.target instanceof HTMLElement) || !draggedElement) {
		return dragOverResult;
	}

	const closestPosition = findClosestPosition(
		items,
		e.clientY,
		Orientation.Vertical,
	);

	if (closestPosition) {
		const placements = closestPosition.placements;
		dragOverResult.targetReference = e.target;

		const placementAccepted = placements.some(placement => {
			const beforeItemMovePrevented = !component.fireEvent("move-over", {
				originalEvent: e,
				source: {
					element: draggedElement,
				},
				destination: {
					element: closestPosition.element,
					placement,
				},
			}, true);

			if (beforeItemMovePrevented) {
				e.preventDefault();
				dragOverResult.targetReference = closestPosition.element;
				dragOverResult.placement = placement;
				return true;
			}

			return false;
		});

		if (!placementAccepted) {
			dragOverResult.targetReference = null;
		}
	}

	return dragOverResult;
}

function dropRow(e: DragEvent, component: UI5Element, target: HTMLElement, placement: `${MovePlacement}`): void {
	e.preventDefault();
	const draggedElement = DragRegistry.getDraggedElement();

	if (!draggedElement) {
		return;
	}

	component.fireEvent("move", {
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

export {
	DragOverResult,
	dragOver,
	dropRow,
};
