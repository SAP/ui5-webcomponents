import getSharedResource from "@ui5/webcomponents-base/dist/getSharedResource.js";
import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import Popup from "../Popup.js";

type RegisteredPopup = {
	instance: Popup;
	parentPopovers: Array<Popup>;
}

const OpenedPopupsRegistry = getSharedResource<{ openedRegistry: Array<RegisteredPopup> }>("OpenedPopupsRegistry", { openedRegistry: [] });

const addOpenedPopup = (instance: Popup, parentPopovers: Array<Popup> = []) => {
	if (!OpenedPopupsRegistry.openedRegistry.some(popup => popup.instance === instance)) {
		OpenedPopupsRegistry.openedRegistry.push({
			instance,
			parentPopovers,
		});
	}

	_updateTopModalPopup();

	if (OpenedPopupsRegistry.openedRegistry.length === 1) {
		attachGlobalListener();
	}
};

const removeOpenedPopup = (instance: Popup) => {
	OpenedPopupsRegistry.openedRegistry = OpenedPopupsRegistry.openedRegistry.filter(el => {
		return el.instance !== instance;
	});

	_updateTopModalPopup();

	if (!OpenedPopupsRegistry.openedRegistry.length) {
		detachGlobalListener();
	}
};

const getOpenedPopups = () => {
	return [...OpenedPopupsRegistry.openedRegistry];
};

const _keydownListener = (event: KeyboardEvent) => {
	if (!OpenedPopupsRegistry.openedRegistry.length) {
		return;
	}

	if (isEscape(event)) {
		event.stopPropagation();
		OpenedPopupsRegistry.openedRegistry[OpenedPopupsRegistry.openedRegistry.length - 1].instance.closePopup(true);
	}
};

const attachGlobalListener = () => {
	document.addEventListener("keydown", _keydownListener);
};

const detachGlobalListener = () => {
	document.removeEventListener("keydown", _keydownListener);
};

const _updateTopModalPopup = () => {
	let popup;
	let hasModal = false;

	for (let i = OpenedPopupsRegistry.openedRegistry.length - 1; i >= 0; i--) {
		popup = OpenedPopupsRegistry.openedRegistry[i].instance;

		if (!hasModal && popup.isModal) {
			popup.isTopModalPopup = true;
			hasModal = true;
		} else {
			popup.isTopModalPopup = false;
		}
	}
};

export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
