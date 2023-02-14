import UI5Element, { ChangeInfo } from "../UI5Element.js";

type InvalidateCallback = (changeInfo: ChangeInfo) => void;
type MutationCallback = () => void;
type AssociatedElement = {
	observer: MutationObserver | null;
	callbacks: Array<MutationCallback>;
};
type RegisteredElement = {
	host: UI5Element;
	observedElements: Array<HTMLElement>;
	callback: MutationCallback;
	invalidationCallback: InvalidateCallback;
};

const associatedElements = new WeakMap<HTMLElement, AssociatedElement>();
const registeredElements = new WeakMap<UI5Element, RegisteredElement>();

type AccessibleElement = HTMLElement & {
	accessibleNameRef: string;
	accessibleName: string;
};

const observerOptions = {
	attributes: true,
	childList: true,
	characterData: true,
	subtree: true,
};

const getEffectiveAriaLabelText = (el: HTMLElement) => {
	const accessibleEl = el as AccessibleElement;

	if (!accessibleEl.accessibleNameRef) {
		if (accessibleEl.accessibleName) {
			return accessibleEl.accessibleName;
		}

		return undefined;
	}

	return getAllAccessibleNameRefTexts(el);
};

/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const getAllAccessibleNameRefTexts = (el: HTMLElement) => {
	const ids = (el as AccessibleElement).accessibleNameRef?.split(" ") ?? [];
	const owner = el.getRootNode() as HTMLElement;
	let result = "";

	ids.forEach((elementId: string, index: number) => {
		const element = owner.querySelector(`[id='${elementId}']`);
		const text = `${element && element.textContent ? element.textContent : ""}`;
		if (text) {
			result += text;
			if (index < ids.length - 1) {
				result += " ";
			}
		}
	});

	return result;
};

const _getAllAssociatedElementsFromDOM = (el: UI5Element): Array<HTMLElement> => {
	const set = new Set<HTMLElement>();
	// adding labels with attribute for matching the el.id
	const labelsForAssociated = _getAssociatedLabels(el);
	labelsForAssociated.forEach(itm => {
		set.add(itm);
	});
	// adding other elements that id is the same as accessibleNameRef value
	const value = el["accessibleNameRef" as keyof typeof el] as string;
	const ids = value?.split(" ") ?? [];
	ids.forEach(id => {
		const refEl = _getReferencedElementById(el, id);
		if (refEl) {
			set.add(refEl);
		}
	});
	return Array.from(set);
};

const _getAssociatedLabels = (el: HTMLElement): Array<HTMLElement> => {
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll<HTMLElement>(`[for="${el.id}"]`);
	return Array.from(labels);
};

const _getReferencedElementById = (el: HTMLElement, elementId: string): HTMLElement | null => {
	return (el.getRootNode() as HTMLElement).querySelector<HTMLElement>(`[id='${elementId}']`);
};

/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el: HTMLElement) => {
	const results: Array<string> = [];
	const labels = _getAssociatedLabels(el);

	labels.forEach((label: HTMLElement) => {
		const labelText = label.textContent;
		labelText && results.push(labelText);
	});

	if (results.length) {
		return results.join(" ");
	}

	return undefined;
};

const _createInvalidationCallback = (el: UI5Element) => {
	const invalidationCallback = (changeInfo: ChangeInfo) => {
		if (!(changeInfo && changeInfo.type === "property" && changeInfo.name === "accessibleNameRef")) {
			return;
		}
		const registeredElement = registeredElements.get(el);
		if (!registeredElement) {
			return;
		}
		const oldAssociatedElements = registeredElement.observedElements;
		const newAssociatedElements = _getAllAssociatedElementsFromDOM(el);
		oldAssociatedElements.forEach(oldElement => {
			if (!newAssociatedElements.includes(oldElement)) {
				_removeObservedElementFromRegisteredElement(registeredElement, oldElement);
			}
		});
		newAssociatedElements.forEach(newElement => {
			if (!oldAssociatedElements.includes(newElement)) {
				_addObservedElementToRegisteredElement(registeredElement, newElement);
				registeredElement.observedElements.push(newElement);
			}
		});
		registeredElement?.callback();
	};
	return invalidationCallback;
};

const registerUI5Element = (el: UI5Element, callback: MutationCallback) => {
	if (registeredElements.has(el)) {
		return;
	}
	const allAssociatedElements = _getAllAssociatedElementsFromDOM(el);
	const invalidationCallback = _createInvalidationCallback(el);
	const registeredElement = {
		host: el,
		observedElements: allAssociatedElements,
		callback,
		invalidationCallback,
	};
	registeredElements.set(el, registeredElement);
	el.attachInvalidate(invalidationCallback);

	allAssociatedElements.forEach((element: HTMLElement) => {
		_addObservedElementToRegisteredElement(registeredElement, element);
	});
	callback();
};

const _addObservedElementToRegisteredElement = (registeredElement: RegisteredElement, element: HTMLElement) => {
	let associatedElement = associatedElements.get(element);
	if (!associatedElement) {
		associatedElement = { observer: null, callbacks: [] };
		const observer = new MutationObserver(() => {
			const callbacks = (associatedElement as AssociatedElement).callbacks;
			callbacks.forEach(callback => {
				callback();
			});
			const domEl = document.getElementById(element.id);
			// if no longer should be observed from this registeredElement, remove it
			if (!(registeredElement.host.id === element.getAttribute("for") || domEl)) {
				_removeObservedElementFromRegisteredElement(registeredElement, element);
			}
		});
		associatedElement.observer = observer;
		observer.observe(element, observerOptions);
		associatedElements.set(element, associatedElement);
	}
	if (!associatedElement.callbacks.includes(registeredElement.callback)) {
		associatedElement.callbacks.push(registeredElement.callback);
	}
};

const _removeObservedElementFromRegisteredElement = (registeredElement: RegisteredElement, element: HTMLElement) => {
	const associatedElement = associatedElements.get(element);
	if (associatedElement) {
		associatedElement.callbacks = associatedElement.callbacks.filter(itm => itm !== registeredElement.callback);
		if (!associatedElement.callbacks.length) {
			associatedElement.observer?.disconnect();
			associatedElements.delete(element);
		}
	}
	registeredElement.observedElements = registeredElement.observedElements.filter(itm => itm !== element);
};

const deregisterUI5Element = (el: UI5Element) => {
	const registeredElement = registeredElements.get(el);
	if (!registeredElement) {
		return;
	}
	const oldObservedElements = [...registeredElement.observedElements];
	oldObservedElements.forEach(observedElement => {
		_removeObservedElementFromRegisteredElement(registeredElement, observedElement);
	});
	el.detachInvalidate(registeredElement.invalidationCallback);
	registeredElements.delete(el);
};

export {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	registerUI5Element,
	deregisterUI5Element,
	getAllAccessibleNameRefTexts,
};
