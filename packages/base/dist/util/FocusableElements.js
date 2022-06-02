import isNodeHidden from "./isNodeHidden.js";
import isNodeClickable from "./isNodeClickable.js";

const isFocusTrap = el => {
	return el.hasAttribute("data-ui5-focus-trap");
};

const getFirstFocusableElement = async (container, startFromContainer) => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, true, startFromContainer);
};

const getLastFocusableElement = async (container, startFromContainer) => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, false, startFromContainer);
};

const isElemFocusable = el => {
	return el.hasAttribute("data-ui5-focus-redirect") || !isNodeHidden(el);
};

const findFocusableElement = async (container, forward, startFromContainer) => {
	let child;

	if (container.shadowRoot) {
		child = forward ? container.shadowRoot.firstChild : container.shadowRoot.lastChild;
	} else if (container.assignedNodes && container.assignedNodes()) {
		const assignedElements = container.assignedNodes();
		child = forward ? assignedElements[0] : assignedElements[assignedElements.length - 1];
	} else if (startFromContainer) {
		child = container;
	} else {
		child = forward ? container.firstElementChild : container.lastElementChild;
	}

	let focusableDescendant;

	/* eslint-disable no-await-in-loop */

	while (child) {
		const originalChild = child;

		if (child.isUI5Element) {
			child = await child.getFocusDomRefAsync();
		}

		if (!child) {
			return null;
		}

		if (child.nodeType === 1 && isElemFocusable(child) && !isFocusTrap(child)) {
			if (isNodeClickable(child)) {
				return (child && typeof child.focus === "function") ? child : null;
			}

			focusableDescendant = await findFocusableElement(child, forward);
			if (focusableDescendant) {
				return (focusableDescendant && typeof focusableDescendant.focus === "function") ? focusableDescendant : null;
			}
		}

		child = forward ? originalChild.nextSibling : originalChild.previousSibling;
	}

	/* eslint-enable no-await-in-loop */

	return null;
};

export {
	getFirstFocusableElement,
	getLastFocusableElement,
};
