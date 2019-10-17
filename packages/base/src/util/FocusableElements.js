import UI5Element from "../UI5Element.js";
import isNodeHidden from "./isNodeHidden.js";
import isNodeClickable from "./isNodeClickable.js";

const getFirstFocusableElement = container => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, true);
};

const getLastFocusableElement = container => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, false);
};

const findFocusableElement = (container, forward) => {
	let child;
	if (container.assignedNodes && container.assignedNodes()) {
		const assignedElements = container.assignedNodes();
		child = forward ? assignedElements[0] : assignedElements[assignedElements.length - 1];
	} else {
		child = forward ? container.firstChild : container.lastChild;
	}

	let focusableDescendant;

	while (child) {
		const originalChild = child;

		child = child instanceof UI5Element ? child.getFocusDomRef() : child;
		if (!child) {
			return null;
		}

		if (child.nodeType === 1 && !isNodeHidden(child)) {
			if (isNodeClickable(child)) {
				return (child && typeof child.focus === "function") ? child : null;
			}

			focusableDescendant = findFocusableElement(child, forward);
			if (focusableDescendant) {
				return (focusableDescendant && typeof focusableDescendant.focus === "function") ? focusableDescendant : null;
			}
		}

		child = forward ? originalChild.nextSibling : originalChild.previousSibling;
	}

	return null;
};

export {
	getFirstFocusableElement,
	getLastFocusableElement,
};
