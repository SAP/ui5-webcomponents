import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import Popup from "../Popup.js";

type RegisteredPopupT = {
	instance: Popup;
	parentPopovers: Array<Popup>;
}

let openedRegistry: Array<RegisteredPopupT> = [];

const addOpenedPopup = (instance: Popup, parentPopovers: Array<Popup> = []) => {
	if (!openedRegistry.some(popup => popup.instance === instance)) {
		openedRegistry.push({
			instance,
			parentPopovers,
		});
	}

	_updateTopModalPopup();

	if (openedRegistry.length === 1) {
		attachGlobalListener();
	}
};

const removeOpenedPopup = (instance: Popup) => {
	openedRegistry = openedRegistry.filter(el => {
		return el.instance !== instance;
	});

	_updateTopModalPopup();

	if (!openedRegistry.length) {
		detachGlobalListener();
	}
};

const getOpenedPopups = () => {
	return [...openedRegistry];
};

const _keydownListener = (event: KeyboardEvent) => {
	if (!openedRegistry.length) {
		return;
	}

	if (isEscape(event)) {
		openedRegistry[openedRegistry.length - 1].instance.close(true);
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

	for (let i = openedRegistry.length - 1; i >= 0; i--) {
		popup = openedRegistry[i].instance;

		if (!hasModal && popup.isModal) {
			popup.isTopModalPopup = true;
			hasModal = true;
		} else {
			popup.isTopModalPopup = false;
		}
	}
};

export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
