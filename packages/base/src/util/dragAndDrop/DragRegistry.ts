import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import MultipleDragGhostCss from "../../generated/css/MultipleDragGhost.css.js";

import { getI18nBundle } from "../../i18nBundle.js";

import {
	DRAG_DROP_MULTIPLE_TEXT,
} from "../../generated/i18n/i18n-defaults.js";

const MIN_MULTI_DRAG_COUNT = 2;

let customDragElementPromise: Promise<HTMLElement> | null = null;
let globalHandlersAttached = false;
const subscribers = new Set<UI5Element>();
const selfManagedDragAreas = new Set<HTMLElement | ShadowRoot>();
let draggedElements: Array<EventTarget> = [];

const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	draggedElements = e.composedPath();

	handleMultipleDrag(e);
};

const handleMultipleDrag = async (e: DragEvent) => {
	if (!customDragElementPromise || !e.dataTransfer) {
		return;
	}
	const dragElement = await customDragElementPromise;
	// Add to document body temporarily
	document.body.appendChild(dragElement);

	e.dataTransfer.setDragImage(dragElement, 0, 0);

	// Clean up the temporary element after the drag operation starts
	requestAnimationFrame(() => {
		dragElement.remove();
	});
};

const ondragend = () => {
	draggedElements = [];
	customDragElementPromise = null;
};

const ondrop = () => {
	draggedElements = [];
	customDragElementPromise = null;
};

const getDraggedElement = (rootNode: Node) => {
	// get only elements that are part of the current rootNode
	const _draggedElements = draggedElements.filter((el): el is HTMLElement => el instanceof HTMLElement && el.getRootNode() === rootNode);

	if (_draggedElements.length === 0) {
		return null;
	}

	// special handling for TabContainer. Maybe add generic method to UI5Element and override it in TabContainer
	if (_draggedElements[0].hasAttribute("ui5-tabcontainer")) {
		return ((_draggedElements[0] as unknown) as { _getDraggedElement: () => HTMLElement | null })._getDraggedElement();
	}

	return _draggedElements[0];
};

const createDefaultMultiDragElement = async (count: number): Promise<HTMLElement> => {
	const dragElement = document.createElement("div");
	const i18nBundle = await getI18nBundle("@ui5/webcomponents-base");

	const dragElementShadow = dragElement.attachShadow({ mode: "open" });

	const styles = new CSSStyleSheet();
	styles.replaceSync(MultipleDragGhostCss);

	dragElementShadow.adoptedStyleSheets = [styles];
	dragElementShadow.textContent = i18nBundle.getText(DRAG_DROP_MULTIPLE_TEXT, count);

	return dragElement;
};

/**
 * Starts a multiple drag operation by creating a drag ghost element.
 * The drag ghost will be displayed when dragging multiple items.
 *
 * @param {number} count - The number of items being dragged.
 * @param {DragEvent} e - The drag event that triggered the operation.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const startMultipleDrag = (count: number, e: DragEvent): void => {
	if (count < MIN_MULTI_DRAG_COUNT) {
		console.warn(`Cannot start multiple drag with count ${count}. Minimum is ${MIN_MULTI_DRAG_COUNT}.`); // eslint-disable-line
		return;
	}

	customDragElementPromise = createDefaultMultiDragElement(count);
};

const attachGlobalHandlers = () => {
	if (globalHandlersAttached) {
		return;
	}

	document.body.addEventListener("dragstart", ondragstart);
	document.body.addEventListener("dragend", ondragend);
	document.body.addEventListener("drop", ondrop);
	globalHandlersAttached = true;
};

const detachGlobalHandlers = () => {
	document.body.removeEventListener("dragstart", ondragstart);
	document.body.removeEventListener("dragend", ondragend);
	document.body.removeEventListener("drop", ondrop);
	globalHandlersAttached = false;
};

const subscribe = (subscriber: UI5Element) => {
	subscribers.add(subscriber);

	if (!globalHandlersAttached) {
		attachGlobalHandlers();
	}
};

const unsubscribe = (subscriber: UI5Element) => {
	subscribers.delete(subscriber);

	if (subscribers.size === 0 && globalHandlersAttached) {
		detachGlobalHandlers();
	}
};

type DragAndDropSettings = {
	/**
	 * Allow cross-browser and file drag and drop.
	 */
	crossDnD?: boolean;
	/**
	 * Pass the original event in the event parameters.
	 */
	originalEvent?: boolean;
};

type MoveEventDetail = {
	originalEvent: Event,
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
};

const DragRegistry = {
	subscribe,
	unsubscribe,
	getDraggedElement,
	startMultipleDrag,
};

export default DragRegistry;
export {
	startMultipleDrag,
};
export type {
	DragAndDropSettings,
	MoveEventDetail,
};
