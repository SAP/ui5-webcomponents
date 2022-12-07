import isElementTabbable from "./isElementTabbable.js";

/**
 * Returns the tabbable elements within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { Array<HTMLElement> } the tabbable elements
 */
const getTabbableElements = (el: HTMLElement): Array<HTMLElement> => {
	return getTabbables([...el.children]);
};

/**
 * Returns the last tabbable element within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { HTMLElement | null } the last tabbable element or "null" if not found
 */
const getLastTabbableElement = (el: HTMLElement): HTMLElement | null => {
	const tabbables = getTabbables([...el.children]);
	return tabbables.length ? tabbables[tabbables.length - 1] : null;
};

const getTabbables = (nodes: Array<Node>, tabbables?: Array<HTMLElement>): Array<HTMLElement> => {
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
