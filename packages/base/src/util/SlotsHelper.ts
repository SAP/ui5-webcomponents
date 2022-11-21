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
