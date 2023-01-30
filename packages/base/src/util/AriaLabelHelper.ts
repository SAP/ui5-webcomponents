import type UI5Element from "../UI5Element.js";

type InvalidateCallback = (param: any) => void;
const observers = new WeakMap<HTMLElement, MutationObserver>();
const inputAssociatedLabels = new WeakMap<UI5Element, Array<HTMLElement>>();
const elementPropertyChangeCallback = new WeakMap<UI5Element, InvalidateCallback>();

type AccessibleElement = HTMLElement & {
  accessibleNameRef: string;
  accessibleName: string;
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

/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all assosiated labels
 */
const _getAssociatedLabels = (el: HTMLElement): NodeListOf<HTMLElement> => {
	return (el.getRootNode() as HTMLElement).querySelectorAll<HTMLElement>(
		`[ui5-label][for="${el.id}"],label[for="${el.id}"]`,
	);
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

const createLabelObserver = (
	el: UI5Element,
	callback: () => void,
	label: HTMLElement,
	options: MutationObserverInit,
) => {
	const observer = new MutationObserver(() => {
		callback();
		updateInputAssociatedObservers(el);
	});
	observers.set(label, observer);
	observer.observe(label, options);
};

const observeAssosiatedLabels = (
	el: UI5Element,
	callback: () => void,
	propertyName: string,
) => {
	const observerOptions = {
		childList: true,
		subtree: true,
	};
	const assosiatedLabelsArray: Array<HTMLElement> = [];

	// adding label refferenced by ID
	const propertyValue = el[propertyName as keyof typeof el] as string;
	if (propertyValue) {
		const label = (el.getRootNode() as HTMLElement).querySelector<HTMLElement>(
			`[ui5-label][id="${propertyValue}"],label[id="${propertyValue}"]`,
		);
		if (label) {
			assosiatedLabelsArray.push(label);
			createLabelObserver(el, callback, label, observerOptions);
		}
	}

	// adding labels with for attribute
	const labels = _getAssociatedLabels(el);
	labels.forEach((label: HTMLElement) => {
		assosiatedLabelsArray.push(label);
		createLabelObserver(el, callback, label, observerOptions);
	});
	inputAssociatedLabels.set(el, assosiatedLabelsArray);
	if (assosiatedLabelsArray.length) {
		callback();
	}

	// create invalidate callback for the ref property
	if (propertyValue && !elementPropertyChangeCallback.has(el)) {
		const invalidateCallback = (param: any) => {
			if (param.type === "property" && param.name === propertyName) {
				const newValue = param.newValue;
				const oldValue = param.oldValue;
				const oldIndex = assosiatedLabelsArray.findIndex(
					itm => itm.id === oldValue,
				);
				if (oldIndex !== -1) {
					deleteLabelObserver(assosiatedLabelsArray[oldIndex]);
					assosiatedLabelsArray.splice(oldIndex, 1);
				}
				if (newValue) {
					const label = (
            el.getRootNode() as HTMLElement
					).querySelector<HTMLElement>(
						`[ui5-label][id="${propertyValue}"],label[id="${propertyValue}"]`,
					);
					if (label) {
						assosiatedLabelsArray.push(label);
						createLabelObserver(el, callback, label, observerOptions);
						callback();
					}
				}
			}
		};
		el.attachInvalidate(invalidateCallback);
		elementPropertyChangeCallback.set(el, invalidateCallback);
	}
};

const deleteLabelObserver = (label: HTMLElement) => {
	const observer = observers.get(label);
	if (observer) {
		observer.disconnect();
		observers.delete(label);
	}
};

const disposeAssosiatedLabelsObservers = (el: UI5Element) => {
	const labels = _getAssociatedLabels(el);
	labels.forEach((label: HTMLElement) => {
		deleteLabelObserver(label);
	});
	inputAssociatedLabels.delete(el);
	const invalidationCallback = elementPropertyChangeCallback.get(el);
	if (invalidationCallback) {
		el.detachInvalidate(invalidationCallback);
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
