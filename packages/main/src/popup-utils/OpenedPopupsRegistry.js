import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";

let openedRegistry = [];

const addOpenedPopup = (instance, parentPopovers = []) => {
	if (!openedRegistry.includes(instance)) {
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

const removeOpenedPopup = instance => {
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

const _keydownListener = event => {
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

const _updateTopModalPopup = event => {
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
