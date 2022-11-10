import isNodeHidden from "./isNodeHidden.js";
import isNodeClickable from "./isNodeClickable.js";
import { instanceOfUI5Element } from "../UI5Element.js";

const isFocusTrap = (el: HTMLElement) => {
	return el.hasAttribute("data-ui5-focus-trap");
};

const getFirstFocusableElement = async (container: HTMLElement | null | undefined, startFromContainer: boolean): Promise<HTMLElement | null> => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, true, startFromContainer);
};

const getLastFocusableElement = async (container: HTMLElement, startFromContainer: boolean) => {
	if (!container || isNodeHidden(container)) {
		return null;
	}

	return findFocusableElement(container, false, startFromContainer);
};

const isElemFocusable = (el: HTMLElement) => {
	return el.hasAttribute("data-ui5-focus-redirect") || !isNodeHidden(el);
};

const findFocusableElement = async (container: HTMLElement, forward: boolean, startFromContainer?: boolean): Promise<HTMLElement | null> => {
	let child: HTMLElement | undefined;

	if (container.shadowRoot) {
		child = forward ? container.shadowRoot.firstChild as HTMLElement : container.shadowRoot.lastChild as HTMLElement;
	} else if (container instanceof HTMLSlotElement && container.assignedNodes()) {
		const assignedElements = container.assignedNodes();
		child = forward ? assignedElements[0] as HTMLElement : assignedElements[assignedElements.length - 1] as HTMLElement;
	} else if (startFromContainer) {
		child = container;
	} else {
		child = forward ? container.firstElementChild as HTMLElement : container.lastElementChild as HTMLElement;
	}

	let focusableDescendant;

	/* eslint-disable no-await-in-loop */

	while (child) {
		const originalChild: HTMLElement | undefined = child;

		if (instanceOfUI5Element(child)) {
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

		child = forward ? originalChild.nextSibling as HTMLElement : originalChild.previousSibling as HTMLElement;
	}

	/* eslint-enable no-await-in-loop */

	return null;
};

export {
	getFirstFocusableElement,
	getLastFocusableElement,
};
