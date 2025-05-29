import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import handleDragOver from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDragOver.js";
import handleDrop from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDrop.js";
import { findClosestPosition } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type { DragAndDropSettings } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";

/**
 * Configuration interface for the drag and drop behavior
 */
export interface DragAndDropConfig {
	/**
	 * The orientation for finding closest position (Horizontal/Vertical)
	 */
	orientation: `${Orientation}`;
	/**
	 * Function to get the draggable elements
	 */
	getDraggableElements: () => HTMLElement[];
	/**
	 * Function to get the drop indicator DOM element
	 */
	getDropIndicator: () => { targetReference: HTMLElement | null; placement: `${MovePlacement}` | null; } | null;
	/**
	 * Function to set the drop indicator state
	 */
	setDropIndicator: (targetReference: HTMLElement | null, placement: `${MovePlacement}` | null) => void;
	/**
	 * Custom position calculation function (optional)
	 * If not provided, uses default findClosestPosition with clientY/clientX
	 */
	findPosition?: (elements: HTMLElement[], clientCoord: number) => {
		element: HTMLElement;
		placements: MovePlacement[];
	} | null;
	/**
	 * Custom drag over validation (optional)
	 * Called before handleDragOver to allow custom logic
	 */
	validateDragOver?: (e: DragEvent, position: { element: HTMLElement; placements: MovePlacement[] }) => boolean;
	/**
	 * Drag and drop settings
	 */
	settings?: DragAndDropSettings;
}

/**
 * Reusable drag and drop behavior that can be composed into UI5 components
 */
export class DragAndDropBehavior<T extends UI5Element> {
	private component: T;
	private config: DragAndDropConfig;

	constructor(component: T, config: DragAndDropConfig) {
		this.component = component;
		this.config = config;
	}

	initialize(): void {
		DragRegistry.subscribe(this.component);
	}

	cleanup(): void {
		DragRegistry.unsubscribe(this.component);
	}

	onDragEnter(e: DragEvent): void {
		e.preventDefault();
	}

	onDragLeave(e: DragEvent): void {
		// Only clear indicator if dragging outside the component's shadow root
		if (e.relatedTarget instanceof Node && this.component.shadowRoot!.contains(e.relatedTarget)) {
			return;
		}
		this.config.setDropIndicator(null, null);
	}

	onDragOver(e: DragEvent): void {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}

		const elements = this.config.getDraggableElements();
		if (!elements.length) {
			this.config.setDropIndicator(null, null);
			return;
		}

		// Use custom position finder or default implementation
		const closestPosition = this.config.findPosition
			? this.config.findPosition(elements, this.getClientCoordinate(e))
			: findClosestPosition(
				elements,
				this.getClientCoordinate(e),
				this.config.orientation as Orientation,
			);

		if (!closestPosition) {
			this.config.setDropIndicator(null, null);
			return;
		}

		// Allow custom validation before proceeding
		if (this.config.validateDragOver && !this.config.validateDragOver(e, closestPosition)) {
			this.config.setDropIndicator(null, null);
			return;
		}

		const { targetReference, placement } = handleDragOver(
			e,
			this.component,
			closestPosition,
			closestPosition.element,
			this.config.settings,
		);
		// TODO: placement is any
		this.config.setDropIndicator(targetReference, placement as `${MovePlacement}`);
	}

	onDrop(e: DragEvent): void {
		const dropIndicator = this.config.getDropIndicator();

		if (!dropIndicator?.targetReference || !dropIndicator?.placement) {
			return;
		}

		handleDrop(
			e,
			this.component,
			dropIndicator.targetReference,
			dropIndicator.placement,
			this.config.settings,
		);

		this.config.setDropIndicator(null, null);
	}

	private getClientCoordinate(e: DragEvent): number {
		return this.config.orientation === Orientation.Vertical ? e.clientY : e.clientX;
	}
}

export function createDragAndDropBehavior<T extends UI5Element>(
	component: T,
	config: DragAndDropConfig,
): DragAndDropBehavior<T> {
	return new DragAndDropBehavior(component, config);
}

export default DragAndDropBehavior;
