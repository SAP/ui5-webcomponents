import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import MultipleDragGhostCss from "../../generated/css/MultipleDragGhost.css.js";

import { getI18nBundle } from "../../i18nBundle.js";

let draggedElement: HTMLElement | null = null;
let customDragTemplate: HTMLElement | null = null;
let globalHandlersAttached = false;
const subscribers = new Set<UI5Element>();
const selfManagedDragAreas = new Set<HTMLElement | ShadowRoot>();

const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
		return;
	}

	if (!selfManagedDragAreas.has(e.target)) {
		draggedElement = e.target;
	}
};

const ondragend = () => {
	draggedElement = null;
	customDragTemplate = null;
};

const ondrop = () => {
	draggedElement = null;
	customDragTemplate = null;
};

const setDraggedElement = (element: HTMLElement | null) => {
	draggedElement = element;
};
type SetDraggedElementFunction = typeof setDraggedElement;

const getDraggedElement = () => {
	return draggedElement;
};

const setCustomDragTemplate = (element: HTMLElement) => {
	customDragTemplate = element;
};

const createDefaultMultiDragElement = async (count: number): Promise<HTMLElement> => {
	const dragElement = document.createElement("div");
	const i18nBundle = await getI18nBundle("@ui5/webcomponents");

	const dragElementShadow = dragElement.attachShadow({ mode: "open" });

	const styles = new CSSStyleSheet();
	styles.replaceSync(MultipleDragGhostCss);

	dragElementShadow.adoptedStyleSheets = [styles];
	const I18nText = {
		key: "DRAG_DROP_MULTIPLE_TEXT",
		defaultText: "{0} items",
	};
	dragElementShadow.innerHTML = i18nBundle.getText(I18nText, count);

	return dragElement;
};

const startMultipleDrag = async (dragEvent: DragEvent, count: number): Promise<void> => {
	if (count <= 0 || !dragEvent.dataTransfer) {
		return;
	}

	if (customDragTemplate) {
		// Use component's custom template
		customDragTemplate.style.display = "flex";
		dragEvent.dataTransfer.setDragImage(customDragTemplate, 0, 0);

		// Clean up after drag starts
		requestAnimationFrame(() => {
			if (customDragTemplate) {
				customDragTemplate.style.display = "none";
				customDragTemplate = null;
			}
		});
	} else {
		// Use default template
		const defaultDragElement = await createDefaultMultiDragElement(count);

		// Add to document body temporarily
		document.body.appendChild(defaultDragElement);

		dragEvent.dataTransfer.setDragImage(defaultDragElement, 0, 0);

		// Clean up the temporary element after the drag operation starts
		requestAnimationFrame(() => {
			defaultDragElement.remove();
		});
	}
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

const addSelfManagedArea = (area: HTMLElement | ShadowRoot) => {
	selfManagedDragAreas.add(area);

	return setDraggedElement;
};

const removeSelfManagedArea = (area: HTMLElement | ShadowRoot) => {
	selfManagedDragAreas.delete(area);
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
	addSelfManagedArea,
	removeSelfManagedArea,
	getDraggedElement,
	startMultipleDrag,
	setCustomDragTemplate,
};

// window.DragRegistry = DragRegistry;

export default DragRegistry;
export type {
	SetDraggedElementFunction,
	DragAndDropSettings,
	MoveEventDetail,
};
