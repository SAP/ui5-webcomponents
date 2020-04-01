
/**
 * Handles drag and drop event listeners on document.body.
 * Ensures that there is only 1 listener per type attached (drag, drop, leave). Event listeners will only be attached when
 * there is at least 1 UploadCollection registered in the set.
 */

import UploadCollectionDnDOverlayMode from "../types/UploadCollectionDnDMode.js";

const draggingFiles = event => {
	return event.dataTransfer.types.includes("Files");
};

const uploadCollections = new Set();
let lastDragEnter = null;
let globalHandlersAttached = false;

const ondragenter = event => {
	if (!draggingFiles(event)) {
		return;
	}

	lastDragEnter = event.target;
	uploadCollections.forEach(uc => {
		if (uc._dndOverlayMode !== UploadCollectionDnDOverlayMode.Drop) {
			uc._dndOverlayMode = UploadCollectionDnDOverlayMode.Drag;
		}
	});
};

const ondragleave = event => {
	uploadCollections.forEach(uc => {
		if (lastDragEnter === event.target) {
			uc._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
		}
	});
};

const ondrop = event => {
	uploadCollections.forEach(uc => {
		uc._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
	});
};

const attachGlobalHandlers = () => {
	document.body.addEventListener("dragenter", ondragenter);
	document.body.addEventListener("dragleave", ondragleave);
	document.body.addEventListener("drop", ondrop);
};

const detachGlobalHandlers = () => {
	document.body.removeEventListener("dragenter", ondragenter);
	document.body.removeEventListener("dragleave", ondragleave);
	document.body.removeEventListener("drop", ondrop);
	globalHandlersAttached = false;
};

const addUploadCollectionInstance = uploadCollection => {
	uploadCollections.add(uploadCollection);

	if (!globalHandlersAttached) {
		attachGlobalHandlers();
		globalHandlersAttached = true;
	}
};

const removeUploadCollectionInstance = uploadCollection => {
	uploadCollections.delete(uploadCollection);

	if (uploadCollections.size === 0) {
		detachGlobalHandlers();
	}
};

export {
	addUploadCollectionInstance,
	removeUploadCollectionInstance,
	draggingFiles,
};
