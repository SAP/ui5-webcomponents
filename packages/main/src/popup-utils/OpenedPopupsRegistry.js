import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";

let openedRegistry = [];

const addOpenedPopup = (instance, parentPopovers = []) => {
	if (!openedRegistry.includes(instance)) {
		openedRegistry.push({
			instance,
			parentPopovers,
		});
	}

	if (openedRegistry.length === 1) {
		attachGlobalListener();
	}
};

const removeOpenedPopup = instance => {
	openedRegistry = openedRegistry.filter(el => {
		return el !== instance.instance;
	});

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
		openedRegistry.pop().instance.close(true);
	}
};

const attachGlobalListener = () => {
	document.addEventListener("keydown", _keydownListener);
};

const detachGlobalListener = () => {
	document.removeEventListener("keydown", _keydownListener);
};

export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
