import { isEscape } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";

const POPUP_ANIMATION_DURATION = 300;
let registry = [];
let zIndex = 42;

const addOpenedPopup = instance => {
	registry.push(instance);

	// increase the zIndex with 2 so we can put a block layer between 2 popups
	zIndex += 2;
	instance.style.zIndex = zIndex;

	updateBlockLayerIndex(instance, true);

	if (registry.length === 1) {
		attachGlobalListener();
	}
};

const removeOpenedPopup = instance => {
	registry = registry.filter(el => {
		return el !== instance;
	});

	updateBlockLayerIndex(instance, false);

	if (!registry.length) {
		detachGlobalListener();
	}
};

const getOpenedPopups = () => {
	return [...registry];
};

const _keydownListener = event => {
	if (isEscape(event)) {
		const topPopup = registry[registry.length - 1];

		topPopup && topPopup.close();
	}
};

const attachGlobalListener = () => {
	document.addEventListener("keydown", _keydownListener);
};

const detachGlobalListener = () => {
	document.removeEventListener("keydown", _keydownListener);
};

const getBlockLayer = () => {
	const id = "ui5-popup-block-layer";
	let element = document.getElementById(id);

	if (!element) {
		element = document.createElement("div");
		element.id = id;

		element.style = `
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: red;
			background-color: #000000;
			outline: 0 none;
			z-index: -1;
			opacity: 0.6;
			display: none;
		`;
	}

	return element;
};

const updateBlockLayerIndex = () => {
	const layer = getBlockLayer();
	const modals = registry.filter(item => item.modal);
	const hideLayer = !modals.length;

	// if there are more than 1 modals opened -> move the layer 1 modal before the top one
	if (modals.length > 1) {
		modals[modals.length - 2].appendChild(layer);
	} else {
		// when just 1 modal is open - move the layer on the body
		document.body.appendChild(layer);
	}

	setTimeout(() => {
		layer.style.display = hideLayer ? "none" : "block";
	}, hideLayer ? POPUP_ANIMATION_DURATION : 0);

	const lastModalIndex = modals[modals.length - 1] ? modals[modals.length - 1].style.zIndex : (zIndex - 1);

	layer.style.zIndex = (parseInt(lastModalIndex) - 1);
};

export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
