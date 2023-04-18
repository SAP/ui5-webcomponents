import isElementHidden from "./isElementHidden.js";
import isElementClickable from "./isElementClickable.js";
import { instanceOfUI5Element } from "../UI5Element.js";

type FocusableElementPromise = Promise<HTMLElement | null>;

const isFocusTrap = (el: HTMLElement) => {
	return el.hasAttribute("data-ui5-focus-trap");
};

const getFirstFocusableElement = async (container: HTMLElement, startFromContainer?: boolean): FocusableElementPromise => {
	if (!container || isElementHidden(container)) {
		return null;
	}

	return findFocusableElement(container, true, startFromContainer);
};

const getLastFocusableElement = async (container: HTMLElement, startFromContainer?: boolean): FocusableElementPromise => {
	if (!container || isElementHidden(container)) {
		return null;
	}

	return findFocusableElement(container, false, startFromContainer);
};

const isElemFocusable = (el: HTMLElement) => {
	return el.hasAttribute("data-ui5-focus-redirect") || !isElementHidden(el);
};

const findFocusableElement = async (container: HTMLElement, forward: boolean, startFromContainer?: boolean): FocusableElementPromise => {
	let child: HTMLElement | undefined;
	let assignedElements;
	let currentIndex = -1;

	if (container.shadowRoot) {
		child = forward ? container.shadowRoot.firstChild as HTMLElement : container.shadowRoot.lastChild as HTMLElement;
	} else if (container instanceof HTMLSlotElement && container.assignedNodes()) {
		assignedElements = container.assignedNodes();
		currentIndex = forward ? 0 : assignedElements.length - 1;
		child = assignedElements[currentIndex] as HTMLElement;
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
			if (isElementClickable(child)) {
				return (child && typeof child.focus === "function") ? child : null;
			}

			focusableDescendant = await findFocusableElement(child, forward);
			if (focusableDescendant) {
				return (focusableDescendant && typeof focusableDescendant.focus === "function") ? focusableDescendant : null;
			}
		}

		child = forward ? originalChild.nextSibling as HTMLElement : originalChild.previousSibling as HTMLElement;

		// If the child element is not part of the currently assigned element,
		// we have to check the next/previous element assigned to the slot or continue with the next/previous sibling of the slot,
		// otherwise, the nextSibling/previousSibling is the next element inside the light DOM
		if (assignedElements && !assignedElements[currentIndex].contains(child)) {
			currentIndex = forward ? currentIndex + 1 : currentIndex - 1;

			child = assignedElements[currentIndex] as HTMLElement;
		}
	}

	/* eslint-enable no-await-in-loop */

	return null;
};

export {
	getFirstFocusableElement,
	getLastFocusableElement,
};
