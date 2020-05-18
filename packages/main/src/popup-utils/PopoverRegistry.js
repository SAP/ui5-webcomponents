import { isClickInRect } from "./PopupUtils.js";
import { getOpenedPopups, addOpenedPopup, removeOpenedPopup } from "./OpenedPopupsRegistry.js";

let updateInterval = null;
const intervalTimeout = 300;
const openedRegistry = [];

const repositionPopovers = event => {
	openedRegistry.forEach(popover => {
		popover.reposition();
	});
};

const attachGlobalScrollHandler = () => {
	document.body.addEventListener("scroll", repositionPopovers, true);
};

const detachGlobalScrollHandler = () => {
	document.body.removeEventListener("scroll", repositionPopovers, true);
};

const runUpdateInterval = () => {
	updateInterval = setInterval(() => {
		repositionPopovers();
	}, intervalTimeout);
};

const stopUpdateInterval = () => {
	clearInterval(updateInterval);
};

const attachGlobalClickHandler = () => {
	document.addEventListener("mousedown", clickHandler);
};

const detachGlobalClickHandler = () => {
	document.removeEventListener("mousedown", clickHandler);
};

const clickHandler = event => {
	const openedPopups = getOpenedPopups();
	const isTopPopupPopover = openedPopups[openedPopups.length - 1].openBy;

	if (openedPopups.length === 0 || !isTopPopupPopover) {
		return;
	}

	// loop all open popovers
	for (let i = (openedPopups.length - 1); i !== -1; i--) {
		const popup = openedPopups[i];

		// if popup is modal, opener is clicked, popup is dialog skip closing
		if (popup.isModal || popup.isOpenerClicked(event)) {
			return;
		}

		if (isClickInRect(event, popup.getBoundingClientRect())) {
			break;
		}

		popup.close();
	}
};

const attachScrollHandler = popover => {
	popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, true);
};

const detachScrollHandler = popover => {
	popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers);
};

const addOpenedPopover = instance => {
	addOpenedPopup(instance);
	openedRegistry.push(instance);

	attachScrollHandler(instance);

	if (openedRegistry.length === 1) {
		attachGlobalScrollHandler();
		attachGlobalClickHandler();
		runUpdateInterval();
	}
};

const removeOpenedPopover = instance => {
	let count = 0;


	for (let i = openedRegistry.indexOf(instance); i < openedRegistry.length; i++) {
		openedRegistry[i].close(false, true);
		removeOpenedPopup(openedRegistry[i]);
		detachScrollHandler(openedRegistry[i]);
		count++;
	}

	// remove top popovers from registry
	Array(count).fill().forEach(() => { openedRegistry.pop(); });

	if (!openedRegistry.length) {
		detachGlobalScrollHandler();
		detachGlobalClickHandler();
		stopUpdateInterval();
	}
};

const getRegistry = () => {
	return openedRegistry;
};

export { addOpenedPopover, removeOpenedPopover, getRegistry };
