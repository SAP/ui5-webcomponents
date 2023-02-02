import UI5Element, { ChangeInfo } from "../UI5Element.js";

type InvalidateCallback = (changeInfo: ChangeInfo) => void;
type MutationCallback = () => void;
type AssociatedElement = { observer: MutationObserver|null, callbacks: Array<MutationCallback> };
type RegisteredElement = { host: UI5Element, observedElements: Array<HTMLElement>, trackedProperties: Array<string>, callback: MutationCallback, invalidationCallback: InvalidateCallback };

const associatedElements = new WeakMap<HTMLElement, AssociatedElement>();
const registeredElements = new WeakMap<UI5Element, RegisteredElement>();

type AccessibleElement = HTMLElement & {
	accessibleNameRef: string;
	accessibleName: string;
};

const observerOptions = {
	childList: true,
	subtree: true,
	attributes: true,
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
		result += `${element && element.textContent ? element.textContent : ""}`;

		if (index < ids.length - 1) {
			result += " ";
		}
	});

	return result;
};

const _getAllAssociatedElementsFromDOM = (el: UI5Element, trackedProperties: Array<string>): Array<HTMLElement> => {
	const set = new Set<HTMLElement>();
	// adding labels with attribute for matching the el.id
	const labelsForAssociated = _getAssociatedLabels(el);
	labelsForAssociated.forEach(itm => {
		set.add(itm);
	});
	// adding other elements that id is the same as any of the tracked properties value
	trackedProperties.forEach(name => {
		const value = el[name as keyof typeof el] as string;
		const ids = value?.split(" ") ?? [];
		ids.forEach(id => {
			const refEl = _getReferencedElementById(el, id);
			if (refEl) {
				set.add(refEl);
			}
		});
	});
	return Array.from(set);
};

const _getAssociatedLabels = (el: HTMLElement): Array<HTMLElement> => {
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll<HTMLElement>(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
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

const _createInvalidationCallback = (el: UI5Element, trackedProperties: Array<string>) => {
	const invalidationCallback = (changeInfo: ChangeInfo) => {
		if (!(changeInfo && changeInfo.type === "property" && trackedProperties.includes(changeInfo.name))) {
			return;
		}
		const registeredElement = registeredElements.get(el);
		if (!registeredElement) {
			return;
		}
		const oldAssociatedElements = registeredElement.observedElements;
		const newAssociatedElements = _getAllAssociatedElementsFromDOM(el, trackedProperties);
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

const registerUI5Element = (el: UI5Element, callback: () => void, trackedProperties: Array<string>) => {
	if (registeredElements.has(el)) {
		return;
	}
	const allAssociatedElements = _getAllAssociatedElementsFromDOM(el, trackedProperties);
	const invalidationCallback = _createInvalidationCallback(el, trackedProperties);
	const registeredElement = {
		host: el,
		observedElements: allAssociatedElements,
		trackedProperties,
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

const _addObservedElementToRegisteredElement = (registeredElement:RegisteredElement, element: HTMLElement) => {
	let associatedElement = associatedElements.get(element);
	if (!associatedElement) {
		associatedElement = { observer: null, callbacks: [] };
		const observer = new MutationObserver(() => {
			const callbacks = (associatedElement as AssociatedElement).callbacks;
			callbacks.forEach(callback => {
				callback();
			});
			const domEl = document.getElementById(element.id);
			// if no longer should be tracked from this registeredElement, remove it
			if (!domEl || registeredElement.host.id !== element.getAttribute("for")) {
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

const _removeObservedElementFromRegisteredElement = (registeredElement:RegisteredElement, element: HTMLElement) => {
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

const unregisterUI5Element = (el: UI5Element) => {
	const registeredElement = registeredElements.get(el);
	if (!registeredElement) {
		return;
	}
	const oldObservedElements = [...registeredElement.observedElements];
	oldObservedElements.forEach(observedElement => {
		_removeObservedElementFromRegisteredElement(registeredElement, observedElement);
	});
};

export {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	registerUI5Element,
	unregisterUI5Element,
	getAllAccessibleNameRefTexts,
};
