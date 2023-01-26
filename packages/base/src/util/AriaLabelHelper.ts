import type UI5Element from "../UI5Element.js";

const observers = new WeakMap<Node, MutationObserver>();
const inputAssociatedLabels = new WeakMap<UI5Element, Array<Node>>();

type AccessibleElement = HTMLElement & {
	accessibleNameRef: string,
	accessibleName: string,
}

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
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el: HTMLElement) => {
	const results: Array<string> = [];
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);

	labels.forEach((label: Node) => {
		const labelText = label.textContent;
		labelText && results.push(labelText);
	});

	if (results.length) {
		return results.join(" ");
	}

	return undefined;
};

const observeAssosiatedLabels = (el: UI5Element, callback: MutationCallback) => {
	const assosiatedLabelsArray: Array<Node> = [];
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
	labels.forEach((label: Node) => {
		assosiatedLabelsArray.push(label);
		const observerOptions = {
			childList: true,
			subtree: true,
		};
		const observer = new MutationObserver(callback);
		observers.set(label, observer);
		observer.observe(label, observerOptions);
	});
	inputAssociatedLabels.set(el, assosiatedLabelsArray);
};

const disposeAssosiatedLabelsObservers = (el: UI5Element) => {
	const labels = (el.getRootNode() as HTMLElement).querySelectorAll(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
	labels.forEach((label: Node) => {
		const observer = observers.get(label);
		if (observer) {
			observer.disconnect();
			observers.delete(label);
		}
	});
	inputAssociatedLabels.delete(el);
};

const updateInputAssociatedObservers = (el: UI5Element) => {
	const labelsActual = (el.getRootNode() as HTMLElement).querySelectorAll(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
	const labelsOld = inputAssociatedLabels.get(el) as Array<Node> ?? [];
	const labelsNew: Array<Node> = [];
	labelsOld.forEach((label: Node) => {
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
