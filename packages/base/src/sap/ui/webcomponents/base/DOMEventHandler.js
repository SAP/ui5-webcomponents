import PseudoEvents from '@ui5/webcomponents-core/dist/sap/ui/events/PseudoEvents';
import ControlEvents from './events/ControlEvents';
import getOriginalEventTarget from './events/getOriginalEventTarget';

const handleEvent = function (event) {

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



const processDOMNode = function(node, event) {
	const id = node.getAttribute("data-sap-ui");
	const tag = node.tagName;
	let control;

	if (tag.match(/^ui5-/i)) {
		control = node;
	}

	if (control && control._handleEvent) {
		return dispatchEvent(control, event);
	}
	return true;
};

const dispatchEvent = function(control, event) {

	// Handle the original event (such as "keydown")
	control._handleEvent(event);
	if (event.isImmediatePropagationStopped()) {
		return false;
	}

	// Handle pseudo events that derive from the original event (such as "sapselect")
	const pseudoTypes = getPseudoTypesFor(event);
	for (let i = 0, len = pseudoTypes.length; i < len; i++) {
		control._handleEvent(event, pseudoTypes[i]);
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

	// Skip the custom element tag (host) only if crossing a shadow DOM boundary
	// The reason is that the event was already dispatched to the light control while traversing the shadow DOM
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
