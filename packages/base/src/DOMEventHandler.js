import ManagedEvents from "./events/ManagedEvents.js";
import getShadowDOMTarget from "./events/getShadowDOMTarget.js";

const handleEvent = function handleEvent(event) {
	// Get the DOM node where the original event occurred
	let target = getShadowDOMTarget(event);

	// Traverse the DOM
	let shouldPropagate = true;
	while (shouldPropagate && target instanceof HTMLElement) {
		shouldPropagate = processDOMNode(target, event);
		if (shouldPropagate) {
			target = getParentDOMNode(target);
		}
	}
};


const processDOMNode = function processDOMNode(node, event) {
	if (node && node.isUI5Element) {
		return dispatchEvent(node, event);
	}
	return true;
};

const dispatchEvent = function dispatchEvent(element, event) {
	// Handle the original event (such as "keydown")
	element._handleEvent(event);
	if (event.isImmediatePropagationStopped()) {
		return false;
	}

	/* eslint-disable */
	if (event.isPropagationStopped()) {
		return false;
	}
	/* eslint-enable */

	return true;
};

const getParentDOMNode = function getParentDOMNode(node) {
	const parentNode = node.parentNode;

	if (parentNode && (parentNode instanceof window.ShadowRoot) && parentNode.host) {
		return parentNode.host;
	}

	return parentNode;
};

const isOtherInstanceRegistered = () => {
	return window["@ui5/webcomponents-base/DOMEventHandler"];
};

const registerInstance = () => {
	window["@ui5/webcomponents-base/DOMEventHandler"] = true;
};

class DOMEventHandler {
	constructor() {
		throw new Error("Static class");
	}

	static start() {
		// register the handlers just once in case other bundles include and call this method multiple times
		if (!isOtherInstanceRegistered()) {
			ManagedEvents.bindAllEvents(handleEvent);
			registerInstance();
		}
	}

	static stop() {
		ManagedEvents.unbindAllEvents(handleEvent);
	}
}

export default DOMEventHandler;
