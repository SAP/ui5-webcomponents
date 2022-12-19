/**
 * Handles drag and drop event listeners on document.body.
 * Ensures that there is only 1 listener per type attached (drag, drop, leave). Event listeners will only be attached when
 * there is at least 1 UploadCollection subscribed.
 */

import EventProvider from "@ui5/webcomponents-base/dist/EventProvider.js";
import UploadCollectionDnDOverlayMode from "../types/UploadCollectionDnDMode.js";

type DnDEventListener = (param: DnDEventListenerParam) => void;

type DnDEventListenerParam = {
	mode: UploadCollectionDnDOverlayMode,
};

const draggingFiles = (event: DragEvent) => {
	return event.dataTransfer && Array.from(event.dataTransfer.types).includes("Files");
};

const eventProvider = new EventProvider<DnDEventListenerParam, void>();
const EVENT = "UploadCollectionBodyDndEvent";
let lastDragEnter: HTMLElement | null = null;
let globalHandlersAttached = false;

const ondragenter = (event: DragEvent) => {
	if (!draggingFiles(event)) {
		return;
	}

	lastDragEnter = event.target as HTMLElement;
	eventProvider.fireEvent(EVENT, { mode: UploadCollectionDnDOverlayMode.Drag });
};

const ondragleave = (event: DragEvent) => {
	if (lastDragEnter === event.target) {
		eventProvider.fireEvent(EVENT, { mode: UploadCollectionDnDOverlayMode.None });
	}
};

const ondrop = () => {
	eventProvider.fireEvent(EVENT, { mode: UploadCollectionDnDOverlayMode.None });
};

const ondragover = (event: DragEvent) => {
	event.preventDefault();
};

const attachGlobalHandlers = () => {
	document.body.addEventListener("dragenter", ondragenter);
	document.body.addEventListener("dragleave", ondragleave);
	document.body.addEventListener("drop", ondrop);
	document.body.addEventListener("dragover", ondragover);
};

const detachGlobalHandlers = () => {
	document.body.removeEventListener("dragenter", ondragenter);
	document.body.removeEventListener("dragleave", ondragleave);
	document.body.removeEventListener("drop", ondrop);
	document.body.removeEventListener("dragover", ondragover);
	globalHandlersAttached = false;
};

const attachBodyDnDHandler = (handler: DnDEventListener) => {
	eventProvider.attachEvent(EVENT, handler);

	if (!globalHandlersAttached) {
		attachGlobalHandlers();
		globalHandlersAttached = true;
	}
};

const detachBodyDnDHandler = (handler: DnDEventListener) => {
	eventProvider.detachEvent(EVENT, handler);

	if (!eventProvider.hasListeners(EVENT)) {
		detachGlobalHandlers();
	}
};

export {
	attachBodyDnDHandler,
	detachBodyDnDHandler,
	draggingFiles,
};

export type {
	DnDEventListener,
	DnDEventListenerParam,
};
