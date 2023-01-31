import type UI5Element from "../UI5Element.js";

type InvalidateCallback = (param: any) => void;
const observers = new WeakMap<HTMLElement, MutationObserver>();
const inputAssociatedLabels = new WeakMap<UI5Element, Array<HTMLElement>>();
const elementPropertyChangeCallback = new WeakMap<UI5Element, InvalidateCallback>();

type AccessibleElement = HTMLElement & {
  accessibleNameRef: string;
  accessibleName: string;
};

const observerOptions = {
	childList: true,
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

	return _getAriaLabelledByTexts(el);
};

/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const _getAriaLabelledByTexts = (el: HTMLElement) => {
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

const _getAssociatedLabels = (el: HTMLElement): NodeListOf<HTMLElement> => {
	return (el.getRootNode() as HTMLElement).querySelectorAll<HTMLElement>(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
};

const _getRefferencedElement = (el: HTMLElement, elementId: string): HTMLElement | null => {
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

const _createLabelObserver = (el: UI5Element, callback: () => void, label: HTMLElement) => {
	const observer = new MutationObserver(() => {
		callback();
		updateInputAssociatedObservers(el);
	});
	observers.set(label, observer);
	observer.observe(label, observerOptions);
};

const _createInvalidateCallbackForProperty = (el: UI5Element, propName: string, assosiatedElementsArray: Array<HTMLElement>, callback: () => void) => {
	if (!elementPropertyChangeCallback.has(el)) {
		const invalidateCallback = (param: any) => {
			if (!(param.type === "property" && param.name === propName)) {
				return;
			}
			debugger;
			// remove old refferenced elements from tracking
			const oldValue = param.oldValue;
			if (oldValue) {
				const ids = oldValue.split(" ");
				ids.forEach((id:string) => {
					const oldIndex = assosiatedElementsArray.findIndex(
						itm => itm.id === id,
					);
					if (oldIndex !== -1) {
						_deleteLabelObserver(assosiatedElementsArray[oldIndex]);
						assosiatedElementsArray.splice(oldIndex, 1);
					}
				});
			}
			// add new refferenced elements for tracking
			const newValue = param.newValue;
			if (newValue) {
				const ids = newValue.split(" ");
				ids.forEach((id:string) => {
					const refEl = _getRefferencedElement(el, id);
					if (refEl) {
						assosiatedElementsArray.push(refEl);
						_createLabelObserver(el, callback, refEl);
						callback();
					}
				});
			}
		};
		el.attachInvalidate(invalidateCallback);
		elementPropertyChangeCallback.set(el, invalidateCallback);
	}
};

const observeAssosiatedLabels = (el: UI5Element, callback: () => void, trackedProperties: string[]) => {
	const assosiatedElementsArray: Array<HTMLElement> = [];

	// adding ellements pointed from accessibleNameRef/accessibleName properties
	trackedProperties.forEach(propName => {
		const propertyValue = el[propName as keyof typeof el] as string;
		if (propertyValue) {
			const ids = propertyValue.split(" ");
			ids.forEach(id => {
				debugger;
				const refEl = _getRefferencedElement(el, id);
				if (refEl && !assosiatedElementsArray.includes(refEl)) {
					assosiatedElementsArray.push(refEl);
					_createLabelObserver(el, callback, refEl);
					_createInvalidateCallbackForProperty(el, propName, assosiatedElementsArray, callback);
				}
			});
		}
	});

	// adding labels with for attribute
	const labels = _getAssociatedLabels(el);
	labels.forEach((label: HTMLElement) => {
		if (!assosiatedElementsArray.includes(label)) {
			assosiatedElementsArray.push(label);
			_createLabelObserver(el, callback, label);
		}
	});
	inputAssociatedLabels.set(el, assosiatedElementsArray);
	if (assosiatedElementsArray.length) {
		callback();
	}
};

const _deleteLabelObserver = (label: HTMLElement) => {
	const observer = observers.get(label);
	if (observer) {
		observer.disconnect();
		observers.delete(label);
	}
};

const disposeAssosiatedLabelsObservers = (el: UI5Element) => {
	const labels = _getAssociatedLabels(el);
	labels.forEach((label: HTMLElement) => {
		_deleteLabelObserver(label);
	});
	inputAssociatedLabels.delete(el);
	const invalidationCallback = elementPropertyChangeCallback.get(el);
	if (invalidationCallback) {
		el.detachInvalidate(invalidationCallback);
		elementPropertyChangeCallback.delete(el);
	}
};

const updateInputAssociatedObservers = (el: UI5Element) => {
	const labelsActual = _getAssociatedLabels(el);
	const labelsOld = (inputAssociatedLabels.get(el) as Array<HTMLElement>) ?? [];
	const labelsNew: Array<HTMLElement> = [];
	labelsOld.forEach((label: HTMLElement) => {
		if (!Array.from(labelsActual).find(node => node === label)) {
			const observer = observers.get(label);
			if (observer) {
				observer.disconnect();
				observers.delete(label);
			}
		} else {
			labelsNew.push(label);
		}
	});
	inputAssociatedLabels.set(el, labelsNew);
};

export {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	observeAssosiatedLabels,
	disposeAssosiatedLabelsObservers,
	updateInputAssociatedObservers,
};
