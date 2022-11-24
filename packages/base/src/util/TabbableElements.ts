import isElementTabbable from "./isElementTabbable.js";

const getTabbableElements = (el: HTMLElement) => {
	return getTabbables([...el.children]);
};

const getLastTabbableElement = (el: HTMLElement) => {
	const tabbables = getTabbables([...el.children]);
	return tabbables.length ? tabbables[tabbables.length - 1] : null;
};

const getTabbables = (nodes: Array<Node>, tabbables?: Array<HTMLElement>) => {
	const tabbableElements = tabbables || [];

	if (!nodes) {
		return tabbableElements;
	}

	nodes.forEach(currentNode => {
		if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.COMMENT_NODE) {
			return;
		}

		let currentElement = currentNode as HTMLElement;
		if (currentElement.hasAttribute("data-sap-no-tab-ref")) {
			return;
		}

		if (currentElement.shadowRoot) {
			// get the root node of the ShadowDom (1st none style tag)
			const children = currentElement.shadowRoot.children;
			currentElement = Array.from(children).find(node => node.tagName !== "STYLE") as HTMLElement;
		}

		if (!currentElement) {
			return;
		}

		if (isElementTabbable(currentElement)) {
			tabbableElements.push(currentElement);
		}

		if (currentElement.tagName === "SLOT") {
			getTabbables((currentElement as HTMLSlotElement).assignedNodes() as Array<HTMLElement>, tabbableElements);
		} else {
			getTabbables([...currentElement.children], tabbableElements);
		}
	});

	return tabbableElements;
};

export {
	getTabbableElements,
	getLastTabbableElement,
};
