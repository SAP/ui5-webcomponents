import PseudoEvents from '@ui5/webcomponents-core/dist/sap/ui/events/PseudoEvents';
import ControlEvents from './events/ControlEvents';
import WebComponent from './WebComponent';

const handleEvent = function (event) {

	// Get the DOM node where the original event occurred
	let target = getDomTarget(event);
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

const getDomTarget = function(event) {

	// Default - composedPath should be used (also covered by polyfill)
	if (typeof event.composedPath === "function") {
		const composedPath = event.composedPath();
		if (Array.isArray(composedPath) && composedPath.length) {
			return composedPath[0];
		}
	}

	// Fallback
	return event.target;
};

const processDOMNode = function(node, event) {
	if (node && node instanceof WebComponent) {
		return dispatchEvent(node, event);
	}
	return true;
};

const dispatchEvent = function(ui5WebComponent, event) {

	// Handle the original event (such as "keydown")
	ui5WebComponent._handleEvent(event);
	if (event.isImmediatePropagationStopped()) {
		return false;
	}

	// Handle pseudo events that derive from the original event (such as "sapselect")
	const pseudoTypes = getPseudoTypesFor(event);
	for (let i = 0, len = pseudoTypes.length; i < len; i++) {
		ui5WebComponent._handleEvent(event, pseudoTypes[i]);
		if (event.isImmediatePropagationStopped()) {
			return false;
		}
	}

	if (event.isPropagationStopped()) {
		return false;
	}

	return true;
};

// Stores the calculated list of pseudo events per event
const pseudoMap = new WeakMap();

const getPseudoTypesFor = function(event) {

	if (pseudoMap.has(event)) {
		return pseudoMap.get(event);
	}

	const aPseudoTypes = [];

	if (PseudoEvents.getBasicTypes().indexOf(event.type) !== -1) {
		const iLength = PseudoEvents.order.length;
		let oPseudo = null;

		for (let i = 0; i < iLength; i++) {
			oPseudo = PseudoEvents.events[PseudoEvents.order[i]];
			if (oPseudo.aTypes
				&& oPseudo.aTypes.indexOf(event.type) > -1
				&& oPseudo.fnCheck
				&& oPseudo.fnCheck(event)) {
				aPseudoTypes.push(oPseudo.sName);
			}
		}
	}

	pseudoMap.set(event, aPseudoTypes);

	return aPseudoTypes;
};

const getParentDOMNode = function(node) {
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
