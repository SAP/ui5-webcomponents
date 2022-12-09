import { isClickInRect } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import { getOpenedPopups, addOpenedPopup, removeOpenedPopup } from "./OpenedPopupsRegistry.js";

let updateInterval = null;
const intervalTimeout = 300;
const openedRegistry = [];

const repositionPopovers = event => {
	openedRegistry.forEach(popover => {
		popover.instance.reposition();
	});
};

const attachGlobalScrollHandler = () => {
	document.body.addEventListener("scroll", repositionPopovers, true);
};

const detachGlobalScrollHandler = () => {
	document.body.removeEventListener("scroll", repositionPopovers, true);
};

const attachScrollHandler = popover => {
	popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, true);
};

const detachScrollHandler = popover => {
	popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers);
};

const runUpdateInterval = () => {
	updateInterval = setInterval(() => {
		repositionPopovers();
	}, intervalTimeout);
};

const stopUpdateInterval = () => {
	clearInterval(updateInterval);
};

const attachPopupClosers = () => {
	document.addEventListener("mousedown", clickHandler);
	document.body.addEventListener("focusout", focusoutHandler);
};

const detachPopupClosers = () => {
	document.removeEventListener("mousedown", clickHandler);
	document.body.removeEventListener("focusout", focusoutHandler);
};

const skipClosing = new Map();
const clickHandler = event => {
	const openedPopups = getOpenedPopups();
	const isTopPopupPopover = openedPopups[openedPopups.length - 1].instance.showAt;

	if (openedPopups.length === 0 || !isTopPopupPopover) {
		return;
	}

	// loop all open popovers
	for (let i = (openedPopups.length - 1); i !== -1; i--) {
		const popup = openedPopups[i].instance;

		// if popup is modal, opener is clicked, popup is dialog skip closing
		if (popup.isModal || popup.isOpenerClicked(event)) {
			return;
		}

		if (isClickInRect(event, popup.getBoundingClientRect())) {
			skipClosing.set(popup, true);
			break;
		}

		popup.close();
	}
};

const focusoutHandler = event => {
	// browser window lost focus, don't close popover
	if (event.target === document.activeElement) {
		return;
	}

	const popoverThatLosesFocus = getOpenedPopups().findLast(p => p.instance.contains(event.target));
	if (!popoverThatLosesFocus || event.relatedTarget) {
		skipClosing.clear();
		return;
	}

	const popup = popoverThatLosesFocus.instance;
	if (skipClosing.has(popup)) {
		skipClosing.delete(popup);
		return;
	}

	[popup, ...popoverThatLosesFocus.parentPopovers].forEach(p => p.close());
};

const addOpenedPopover = instance => {
	const parentPopovers = getParentPopoversIfNested(instance);

	addOpenedPopup(instance, parentPopovers);
	openedRegistry.push({
		instance,
		parentPopovers,
	});

	attachScrollHandler(instance);

	if (openedRegistry.length === 1) {
		attachGlobalScrollHandler();
		attachPopupClosers();
		runUpdateInterval();
	}
};

const removeOpenedPopover = instance => {
	const popoversToClose = [instance];

	for (let i = 0; i < openedRegistry.length; i++) {
		const indexOfCurrentInstance = openedRegistry[i].parentPopovers.indexOf(instance);
		if (openedRegistry[i].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
			popoversToClose.push(openedRegistry[i].instance);
		}
	}

	for (let i = popoversToClose.length - 1; i >= 0; i--) {
		for (let j = 0; j < openedRegistry.length; j++) {
			let indexOfItemToRemove;
			if (popoversToClose[i] === openedRegistry[j].instance) {
				indexOfItemToRemove = j;
			}

			if (indexOfItemToRemove >= 0) {
				removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
				detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
				const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
				itemToClose[0].instance.close(false, true);
			}
		}
	}

	if (!openedRegistry.length) {
		detachGlobalScrollHandler();
		detachPopupClosers();
		stopUpdateInterval();
	}
};

const getRegistry = () => {
	return openedRegistry;
};

const getParentPopoversIfNested = instance => {
	let currentElement = instance.parentNode;
	const parentPopovers = [];

	while (currentElement.parentNode) {
		for (let i = 0; i < openedRegistry.length; i++) {
			if (currentElement && currentElement === openedRegistry[i].instance) {
				parentPopovers.push(currentElement);
			}
		}

		currentElement = currentElement.parentNode;
	}

	return parentPopovers;
};

export { addOpenedPopover, removeOpenedPopover, getRegistry };
