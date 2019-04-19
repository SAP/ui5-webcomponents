import ControlEvents from "./events/ControlEvents.js";
import getOriginalEventTarget from "./events/getOriginalEventTarget.js";
import UI5Element from "./UI5Element.js";

const handleEvent = function handleEvent(event) {
	// Get the DOM node where the original event occurred
	let target = getOriginalEventTarget(event);
	event.ui5target = target;

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
	if (node && node instanceof UI5Element) {
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

	if (parentNode && parentNode.host) {
		return parentNode.host;
	}

	return parentNode;
};


class DOMEventHandler {
	constructor() {
		throw new Error("Static class");
	}

	static start() {
		ControlEvents.bindAnyEvent(handleEvent);
	}

	static stop() {
		ControlEvents.unbindAnyEvent(handleEvent);
	}
}

export default DOMEventHandler;
