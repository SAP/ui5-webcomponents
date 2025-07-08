import type UI5Element from "../../UI5Element.js";
import MovePlacement from "../../types/MovePlacement.js";
import Orientation from "../../types/Orientation.js";
import type { DragAndDropSettings } from "./DragRegistry.js";
import DragRegistry from "./DragRegistry.js";
import handleDrop from "./handleDrop.js";
import handleDragOver from "./handleDragOver.js";
import { findClosestPosition } from "./findClosestPosition.js";

type DragAndDropCallbacks = {
	getItemsForDragDrop: () => Array<HTMLElement>;
	getOrientation: () => Orientation;
	getDropIndicator: () => { targetReference: HTMLElement | null; placement: MovePlacement } | null;
	setDropIndicator: (targetReference: HTMLElement | null, placement?: MovePlacement) => void;
	shouldContainsDraggedElement?: (draggedElement: HTMLElement, targetElement: HTMLElement) => boolean;
	getDragAndDropSettings?: () => DragAndDropSettings;
	getTargetFromPosition?: (element: HTMLElement) => HTMLElement;
};

type DragAndDropMixinInstance = {
	_ondragenter: (e: DragEvent) => void;
	_ondragleave: (e: DragEvent) => void;
	_ondragover: (e: DragEvent) => void;
	_ondrop: (e: DragEvent) => void;
	_cleanupDragAndDrop: () => void;
};

function createDragAndDropMixin<T extends UI5Element>(callbacks: DragAndDropCallbacks): DragAndDropMixinInstance {
	// Store bound methods to enable proper cleanup
	let boundMethods: DragAndDropMixinInstance | null = null;

	const methods = {
		_ondragenter(this: T, e: DragEvent) {
			e.preventDefault();
		},

		_ondragleave(this: T, e: DragEvent) {
			if (e.relatedTarget instanceof Node && this.shadowRoot!.contains(e.relatedTarget)) {
				return;
			}

			callbacks.setDropIndicator(null);
		},

		_ondragover(this: T, e: DragEvent) {
			const draggedElement = DragRegistry.getDraggedElement();
			const items = callbacks.getItemsForDragDrop();

			if (!(e.target instanceof HTMLElement) || !items.length) {
				callbacks.setDropIndicator(null);
				return;
			}

			const orientation = callbacks.getOrientation();
			const clientPosition = orientation === Orientation.Vertical ? e.clientY : e.clientX;
			const closestPosition = findClosestPosition(items, clientPosition, orientation);

			if (!closestPosition) {
				callbacks.setDropIndicator(null);
				return;
			}

			// Allow components to transform the target element
			if (callbacks.getTargetFromPosition) {
				closestPosition.element = callbacks.getTargetFromPosition(closestPosition.element);
			}

			// Check if dragged element contains the target (prevent dropping on itself or children)
			if (draggedElement && callbacks.shouldContainsDraggedElement) {
				if (callbacks.shouldContainsDraggedElement(draggedElement, closestPosition.element)) {
					callbacks.setDropIndicator(null);
					return;
				}
			}

			// Filter out "On" placement if dropping on the dragged element itself
			if (closestPosition.element === draggedElement) {
				closestPosition.placements = closestPosition.placements.filter(placement => placement !== MovePlacement.On);
			}

			const settings = callbacks.getDragAndDropSettings?.() || {};
			const { targetReference, placement } = handleDragOver(e, this, closestPosition, closestPosition.element, settings);

			callbacks.setDropIndicator(targetReference, placement as MovePlacement);
		},

		_ondrop(this: T, e: DragEvent) {
			const dropIndicator = callbacks.getDropIndicator();

			if (!dropIndicator?.targetReference || !dropIndicator?.placement) {
				return;
			}

			const settings = callbacks.getDragAndDropSettings?.() || {};
			handleDrop(e, this, dropIndicator.targetReference, dropIndicator.placement as MovePlacement, settings);
			callbacks.setDropIndicator(null);
		},

		_cleanupDragAndDrop() {
			// Clear all references to prevent memory leaks
			if (boundMethods) {
				boundMethods._ondragenter = () => { };
				boundMethods._ondragleave = () => { };
				boundMethods._ondragover = () => { };
				boundMethods._ondrop = () => { };
				boundMethods = null;
			}

			// Clear callbacks object to break potential circular references
			Object.keys(callbacks).forEach(key => {
				delete (callbacks as any)[key];
			});
		},
	};

	// Store reference for cleanup
	boundMethods = methods;

	return methods;
}

export default createDragAndDropMixin;
export type {
	DragAndDropCallbacks,
	DragAndDropMixinInstance,
};
