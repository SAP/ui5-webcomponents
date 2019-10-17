
import isNodeTabbable from "./isNodeTabbable.js";

const getTabbableElements = node => {
	const res = getTabbables(node.children);
	// eslint-next-line
	console.log(res); // remove afterwards
	return res;
};

const getLastTabbableElement = node => {
	const tabbables = getTabbables(node.children);
	return tabbables.length ? tabbables[tabbables.length - 1] : null;
};

const getTabbables = (nodes, tabbables) => {
	const tabbablesNodes = tabbables || [];

	Array.from(nodes).forEach(currentNode => {
		if (currentNode.nodeType === Node.TEXT_NODE) {
			return;
		}

		if (currentNode.shadowRoot) {
			// If the current node has more than 1 child, the 1st child is the style tag,
			// and the 2nd - the root node of the shadow DOM.
			// If the current node has one child (adopted stylesheets in use),
			// this has to be the root node of the shadow DOM.
			const children = currentNode.shadowRoot.children;
			currentNode = children.length > 1 ? children[1] : children[0];
		}

		if (isNodeTabbable(currentNode)) {
			tabbablesNodes.push(currentNode);
		}

		if (currentNode.tagName === "SLOT") {
			getTabbables(currentNode.assignedNodes(), tabbablesNodes);
		} else {
			getTabbables(currentNode.children, tabbablesNodes);
		}
	});

	return tabbablesNodes;
};


export {
	getTabbableElements,
	getLastTabbableElement,
};
