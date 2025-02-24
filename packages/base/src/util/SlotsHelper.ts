import UI5Element from "../UI5Element.js";

/**
 * Determines the slot to which a node should be assigned
 * @param node Text node or HTML element
 * @returns {string}
 */
const getSlotName = (node: Node) => {
	// Text nodes can only go to the default slot
	if (!(node instanceof HTMLElement)) {
		return "default";
	}

	// Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
	const slot = node.getAttribute("slot");
	if (slot) {
		const match = slot.match(/^(.+?)-\d+$/);
		return match ? match[1] : slot;
	}

	// If autoSlot is used, take it as a slot name
	if (node instanceof UI5Element) {
		const ctor = node.constructor as typeof UI5Element;
		const autoSlot = ctor.getMetadata().getAutoSlot();
		if (autoSlot) {
			node.slot = autoSlot;
			return autoSlot;
		}
	}

	// Use default slot as a fallback
	return "default";
};

const getSlottedNodes = (node: Node) => {
	if (node instanceof HTMLSlotElement) {
		return node.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
	}

	return [node];
};

const getSlottedNodesList = (nodeList: Array<Node>) => {
	return nodeList.reduce((acc, curr) => acc.concat(getSlottedNodes(curr)), [] as Array<Node>);
};

export {
	getSlotName,
	getSlottedNodes,
	getSlottedNodesList,
};
