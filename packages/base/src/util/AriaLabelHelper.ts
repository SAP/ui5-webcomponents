import UI5Element from "../UI5Element.js";

type InvalidateCallback = (param: any) => void;
type MutationCallback = () => void;
type AssociatedElement = { observer: MutationObserver|null, callbacks: MutationCallback[] };
type RegistedElement = { elementId: string, trackedElements: HTMLElement[], trackedProperties: string[], callback: MutationCallback, invalidationCallback: InvalidateCallback };

const associatedElements = new WeakMap<HTMLElement, AssociatedElement>();
const registredElements = new WeakMap<UI5Element, RegistedElement>();

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
	const ids = (el as AccessibleElement).accessibleNameRef.split(" ");
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

const _getAllAssociatedElementsFromDOM = (el: UI5Element, trackedProperties: string[]): HTMLElement[] => {
	const set = new Set<HTMLElement>();
	// adding labels with attribute for matching the el.id
	const labelsForAssociated = (el.getRootNode() as HTMLElement).querySelectorAll<HTMLElement>(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
	Array.from(labelsForAssociated).forEach(itm => {
		set.add(itm);
	});
	// adding other elements that id is the same as any of the tracked properties value
	trackedProperties.forEach(name => {
		const value = el[name as keyof typeof el] as string;
		const ids = value.split(" ");
		ids.forEach(id => {
			const refEl = _getRefferencedElementById(el, id);
			if (refEl) {
				set.add(refEl);
			}
		});
	});
	return Array.from(set);
};

const _getAssociatedLabels = (el: HTMLElement): HTMLElement[] => {
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll<HTMLElement>(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
	return Array.from(labels);
};

const _getRefferencedElementById = (el: HTMLElement, elementId: string): HTMLElement | null => {
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

const _createInvalidationCallback = (el: UI5Element, trackedProperties: string[]) => {
	const invalidationCallback = (param: any) => {
		if (!(param && param.type === "property" && trackedProperties.includes(param.name as string))) {
			return;
		}
		const registry = registredElements.get(el);
		if (!registry) {
			return;
		}
		const oldAssociatedElements = registry.trackedElements;
		const newAssociatedElements = _getAllAssociatedElementsFromDOM(el, trackedProperties);
		oldAssociatedElements.forEach(oldElement => {
			if (!newAssociatedElements.includes(oldElement)) {
				_removeRegistryTrackedElement(registry, oldElement);
			}
		});
		newAssociatedElements.forEach(newElement => {
			if (!oldAssociatedElements.includes(newElement)) {
				_addRegistryTrackedElement(registry, newElement);
				registry.trackedElements.push(newElement);
			}
		});
		registry?.callback();
	};
	return invalidationCallback;
};

const registerUI5Element = (el: UI5Element, callback: () => void, trackedProperties: string[]) => {
	if (registredElements.has(el)) {
		return;
	}
	const allAssociatedElements = _getAllAssociatedElementsFromDOM(el, trackedProperties);
	const invalidationCallback = _createInvalidationCallback(el, trackedProperties);
	const registry = {
		elementId: el.id,
		trackedElements: allAssociatedElements,
		trackedProperties,
		callback,
		invalidationCallback,
	};
	registredElements.set(el, registry);
	el.attachInvalidate(invalidationCallback);

	allAssociatedElements.forEach((element: HTMLElement) => {
		_addRegistryTrackedElement(registry, element);
	});
	callback();
};

const _addRegistryTrackedElement = (registry:RegistedElement, trackedElement: HTMLElement) => {
	let associatedElement = associatedElements.get(trackedElement);
	if (!associatedElement) {
		associatedElement = { observer: null, callbacks: [] };
		const observer = new MutationObserver(() => {
			const callbacks = (associatedElement as AssociatedElement).callbacks;
			callbacks.forEach(callback => {
				callback();
			});
			const domEl = document.getElementById(trackedElement.id);
			// if no longer should be tracked from this registry, remove it
			if (!domEl || registry.elementId !== trackedElement.getAttribute("for")) {
				_removeRegistryTrackedElement(registry, trackedElement);
			}
		});
		associatedElement.observer = observer;
		observer.observe(trackedElement, observerOptions);
		associatedElements.set(trackedElement, associatedElement);
	}
	if (!associatedElement.callbacks.includes(registry.callback)) {
		associatedElement.callbacks.push(registry.callback);
	}
};

const _removeRegistryTrackedElement = (registry:RegistedElement, trackedElement: HTMLElement) => {
	const associatedElement = associatedElements.get(trackedElement);
	if (associatedElement) {
		associatedElement.callbacks = associatedElement.callbacks.filter(itm => itm !== registry.callback);
		if (!associatedElement.callbacks.length) {
			associatedElement.observer?.disconnect();
			associatedElements.delete(trackedElement);
		}
	}
	registry.trackedElements = registry.trackedElements.filter(itm => itm !== trackedElement);
};

const unregisterUI5Element = (el: UI5Element) => {
	const registry = registredElements.get(el);
	if (!registry) {
		return;
	}
	[...registry.trackedElements].forEach(trackedElement => {
		_removeRegistryTrackedElement(registry, trackedElement);
	});
};

export {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	registerUI5Element,
	unregisterUI5Element,
	getAllAccessibleNameRefTexts,
};
