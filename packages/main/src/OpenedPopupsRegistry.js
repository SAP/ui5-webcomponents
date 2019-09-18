import { isEscape } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";

let registry = [];

const addOpenedPopup = instance => {
	if (!registry.includes(instance)) {
		registry.push(instance);
	}
};

const removeOpenedPopup = instance => {
	registry = registry.filter(el => {
		return el !== instance;
	});
};

const getOpenedPopups = () => {
	return [...registry];
};

document.addEventListener("keydown", event => {
	if (isEscape(event)) {
		const topPopup = registry[registry.length - 1];

		topPopup && topPopup.close();
	}
});

export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
