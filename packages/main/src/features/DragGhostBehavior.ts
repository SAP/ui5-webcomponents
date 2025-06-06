import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * Interface for components that support drag ghost functionality
 */
export interface DragGhostProvider {
	/**
	 * Number of items being dragged (for multi-drag scenarios)
	 */
	movingItemsCount: number;
	/**
	 * Template function for rendering the drag ghost
	 */
	dragElementTemplate?: () => JSX.Element;
	/**
	 * Get the drag ghost DOM element
	 */
	getDragGhost(): HTMLElement | null;
	/**
	 * Text to display in the drag ghost
	 */
	getDragGhostText(): string;
}

/**
 * Drag ghost behavior that can be composed into UI5 components
 */
export class DragGhostBehavior<T extends UI5Element & DragGhostProvider> {
	private component: T;

	constructor(component: T) {
		this.component = component;
	}

	get shouldShowDragGhost(): boolean {
		return this.component.movingItemsCount > 1;
	}

	/**
	 * Handle drag start event - sets up drag image if ghost is available
	 */
	onDragStart(e: DragEvent): void {
		const dragGhost = this.component.getDragGhost();
		if (dragGhost && e.dataTransfer && this.shouldShowDragGhost) {
			e.dataTransfer.setDragImage(dragGhost, 0, 0);
		}
	}

	async loadDragGhostTemplate(): Promise<void> {
		if (this.shouldShowDragGhost && !this.component.dragElementTemplate) {
			// TOOD: Should we offer preloading of the default template?
			try {
				const module = await import("./DragGhostTemplate.js");
				this.component.dragElementTemplate = module.default;
			} catch (error) {
				console.error("Failed to load drag ghost template", error); /* eslint-disable-line no-console */
			}
		}
	}
}

export function createDragGhostBehavior<T extends UI5Element & DragGhostProvider>(
	component: T,
): DragGhostBehavior<T> {
	return new DragGhostBehavior(component);
}

export default DragGhostBehavior;
